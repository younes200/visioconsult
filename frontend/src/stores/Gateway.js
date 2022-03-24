import { action, observable, computed } from "mobx";
import Janus from "../utils/janus";
import { session, patients } from ".";
import { isNil, intersectionWith, differenceWith } from "lodash";
import mqtt from "../utils/mqtt";
import { userFindById } from "../Agent";
import axios from 'axios'


class Gateway {
  opaqueId = "videocall-";

  videocall = null;

  refreshTimer;

  janus = null;

  @observable
  localStream = null;

  @observable
  remoteStream;

  @observable
  videoMuted = false;
 
  @observable
  audioMuted = false;

  @observable
  remoteAudioMuted = false

  @observable
  remoteVideoMuted = false

  @observable
  localStreamVisible = true;

  @observable
  inCall = false;

  @observable
  incomingcall = false;

  @observable
  incomingcaller;

  @observable
  callerJsep;

  @observable
  calling = false;

  @observable
  gatewayIsAvailable = true



  constructor() {
    
  }

  @action
  connect() {
    this.janus = new Janus({
      server: process.env.REACT_APP_GATEWAY_URL,
      success: () => this.onSuccess(),
      error: error => this.onError(error),
      destroyed: () => this.onDestroyed()
    });
  }
  
  onSuccess = () => {
    session.notify("Vous êtes connecté");
    
    this.attachVideoCall();
    mqtt.connect();
  };

  attachVideoCall() {
    this.janus.attach({
      plugin: "janus.plugin.videocall",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        this.gatewayIsAvailable = true;
        this.videocall = pluginHandle;
        const register = { request: "register", username: session.user.id };
        this.videocall.send({ message: register });
      },
      onmessage: this.onVideoCallMessage,
      onlocalstream: stream => {
        this.localStream = stream;
      },
      onremotestream: stream => {
        this.remoteStream = stream;

        var videoTracks = stream.getVideoTracks();
        if (
          videoTracks === null ||
          videoTracks === undefined ||
          videoTracks.length === 0
        ) {
          console.log(" No remote video");
        } else {
          console.log("Remote video available");
          console.log(videoTracks)
        }
      },
      ondataopen: () => {
        Janus.log("The DataChannel is available!");
      },
      ondata: data => {
        Janus.debug("We got data from the DataChannel! " + data);
      },
      oncleanup: () => {
        Janus.log(" ::: Got a cleanup notification :::");
        // this.janus = null;
      }
    });
  }

  // @action
  // checkGatewayServerIsAvailable() {
  //   // return fetch("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox")
  //   console.log(">>>>>>>>>>>>>>>>>> process.env.REACT_APP_GATEWAY_URL")
  //   // console.log(process.env.REACT_APP_GATEWAY_URL)

  //   // const response = await fetch('http://localhost:8188')
  //   // console.log(response)
  // //   return axios.get("https://www.google.com/search?q=axios&oq=axios&aqs=chrome..69i57j35i39l2j0l3.2907j0j7&sourceid=chrome&ie=UTF-8")
  // // .then(async (response) => {
  // //   // handle success
  // //   console.log('************** checkGatewayServerIsAvailable ************')
  // //       if (!this.gatewayIsAvailable) { 
  // //         await session.init();
  // //         // await this.connect();
  // //       // } else if (!app.online) {
  // //       //   this.online = false;
  // //       }
  // //       this.gatewayIsAvailable = true;
  // //   // console.log(response);
  // // })
  // // .catch(async (error) => {
  // //   // handle error    
  // //   console.log("***** error ************* ")
  // //   console.log(error);
  // //   this.gatewayIsAvailable = false;
  // //   await session.logOut()
  // // }) 
  // // ******************************************************



  // // WebSocketServer.on('connect', function(request) {
  // //   console.log('Hello!');
  // // });
  
  // //   return fetch(process.env.REACT_APP_GATEWAY_URL)
  // //     .then(async response => {
  // //       console.log('************** checkGatewayServerIsAvailable ************')
  // //       if (!this.gatewayIsAvailable) { 
  // //         await session.init();
  // //         // await this.connect();
  // //       // } else if (!app.online) {
  // //       //   this.online = false;
  // //       }
  // //       this.gatewayIsAvailable = true;
  // //     })
  // //     .catch(async error => {
  // //       console.log("***** error ************* ")
  // //       console.log(error);
  // //       this.gatewayIsAvailable = false;
  // //       await session.logOut()
  // //     });
  // }

  onVideoCallMessage = (body, jsep) => {
    const { result } = body;
    if (!isNil(result)) {
      if (!isNil(result.list)) {
        const { list } = result;  
        console.log(' ***** onlisting ***** / list ')
        console.log(' ****** connected patients **********  ')
        console.log(list)
        this.onListing(list);
      } else if (!isNil(result.event)) {
        const { event } = result;

        if (event === "registered") {
          session.notify("user registred");
          this.refreshList();
        } else if (event === "calling") {
          Janus.log("Waiting for the peer to answer...");
          this.calling = true;
          // TODO Any ringtone?
        } else if (event === "incomingcall") {
          const { username: userId } = result;
          this.onIncomingCall(userId, jsep);
          setTimeout(() => this.incomingcall ? this.hangup() : null , 20000)
        } else if (event === "accepted") {
          const { username: userId } = result;
          if (isNil(userId)) {
            Janus.log("Call started!");
          } else {
            Janus.log(userId + " accepted the call!");
          }
          this.calling = false;
          // Video call can start
          if (jsep) this.videocall.handleRemoteJsep({ jsep });
          //TODO: enable doHangup button
        } else if (event === "update") {
          // An 'update' event may be used to provide renegotiation attempts
          if (jsep) {
            if (jsep.type === "answer") {
              this.videocall.handleRemoteJsep({ jsep });
            } else {
              this.videocall.createAnswer({
                jsep,
                media: { data: false }, // Let's negotiate data channels as well
                success: jsep => {
                  this.videocall.send({ message: { request: "set" }, jsep });
                },
                error: error => {
                  Janus.error("WebRTC error:", error);
                }
              });
            }
          }
        } else if (event === "hangup") {
          Janus.log(
            `Call hung up by  ${result["username"]} ( ${result["reason"]})!`
          );
          this.localStream = null;
          this.remoteStream = null;
          this.calling = false;
          this.incomingcall = false;
          this.incomingcaller = null;
          this.incomingcallerJsep = null;
          this.videoMuted = false;
          this.audioMuted = false;
          if(this.videocall) {
            this.videocall.hangup();
          }          
          this.inCall = false;
          //TODO: change spinner state
        }
      }
    } else {
      // FIXME Error?
      const { error } = body;
      Janus.debug(error);
      if (error.indexOf("already taken") > 0) {
        alert("Access already used by another patient");
        // setTimeout(()=>{
        //   this.connect()
        // }, 3000)
      }
      // TODO Reset status
      this.videocall.hangup();
      //TODO: stop spinner
    }
  };

  refreshList = () => {
    this.refreshTimer = setInterval(() => {
     if(this.videocall) {
      this.videocall.send({ message: { request: "list" } });
     }
    }, 3000);
    if(this.videocall) {
    this.videocall.send({ message: { request: "list" } });
    }
  };

  onListing = list => {
    patients.onPresence(list);
  };

  onError = error => {
    alert("Janus Error", error);
  };

  onDestroyed = () => {
    this.janus = null;
  };

  onIncomingCall = async (from, jsep) => {
    const { data } = await userFindById({ id: from });
    this.incomingcaller = data;
    this.incomingcall = true;
    this.incomingcallerJsep = jsep;
  };

  answer = () => {
    this.videocall.createAnswer({
      jsep: this.incomingcallerJsep,
      media: { data: false }, // Let's negotiate data channels as well
      simulcast: false,
      success: newJsep => {
        const body = { request: "accept" };
        this.videocall.send({ message: body, jsep: newJsep });
        this.incomingcaller = null;
        this.incomingcallerJsep = null;
        this.incomingcall = false;
        this.inCall = true;
      },
      error: error => {
        Janus.error("WebRTC error:", error);
        this.inCall = false;
      }
    });
  };

  @action
  hangup() {
    this.incomingcall = false;
    this.incomingcaller = null;
    this.incomingcallerJsep = null;
    this.calling = false;
    this.inCall = false;
    this.videoMuted = false;
    this.audioMuted = false;
    // Hangup a call
    this.videocall.send({ message: { request: "hangup" } });
    this.videocall.hangup();
  }


  call(id) {
    this.videocall.createOffer({
      media: { 
        data: false, 
        audioRecv: true, 
        videoRecv: true 
      },
      simulcast: false,
      success: jsep => {
        Janus.debug("Got SDP!");
        var body = { request: "call", username: id };
        this.videocall.send({ message: body, jsep: jsep });
        this.inCall = true;
      },
      error: error => {
        Janus.error("WebRTC error...", error);
        this.inCall = false;
      }
    });
  }


  toggleRemoteAudioMute = () => {
    const muted = this.videocall.isRemoteAudioMuted();
    if (muted) {
      this.videocall.unmuteRemoteAudio();
      this.remoteAudioMuted = false;
    } else {
      this.videocall.muteRemoteAudio();
      this.remoteAudioMuted = true;
    }
    console.log(`After: ${this.remoteAudioMuted}`);
  };

  toggleRemoteVideoMute = () => {
    const muted = this.videocall.isRemoteVideoMuted();
    if (muted) {
      this.remoteVideoMuted = false;
      this.videocall.unmuteRemoteVideo();
    } else {
      this.remoteVideoMuted = true;
      this.videocall.muteRemoteVideo();
    }
  };



  toggleAudioMute = () => {
    const muted = this.videocall.isAudioMuted();
    if (muted) {
      this.videocall.unmuteAudio();
      this.audioMuted = false;
    } else {
      this.videocall.muteAudio();
      this.audioMuted = true;
    }
  };

  toggleVideoMute = () => {
    const muted = this.videocall.isVideoMuted();
    if (muted) {
      this.videoMuted = false;
      this.videocall.unmuteVideo();
    } else {
      this.videoMuted = true;
      this.videocall.muteVideo();
    }
  };

  @action
  toggleLocalStream() {
    this.localStreamVisible = !this.localStreamVisible;
  }

  disconnect() {
    if (this.janus) {
      this.janus.destroy()
      this.videocall = null
    };
    if (this.refreshTimer) {
      // this.refreshTimer.clear();
      this.refreshTimer = null;
    }
  }
}

export default Gateway;
