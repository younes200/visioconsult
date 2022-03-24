import { action, observable, computed } from "mobx";
import Janus from "../utils/janus";
import { session, patients } from ".";
import { isNil, intersectionWith, differenceWith } from "lodash";
import mqtt from "../utils/mqtt";
import { userFindById } from "../Agent";

class Robot {
  opaqueId = "videoroom-";

  janus = null;

  @observable
  robotStream;

  roomId = null;
  userId = null;

  @observable
  connecting = false;

  @observable
  joined = false;

  command = null;

  commandValue = null;

  commandInterval;

  commandTimeout;

  constructor() {}

  @action
  connect() {
    this.janus = new Janus({
      server: process.env.REACT_APP_GATEWAY_URL,
      success: () => this.onSuccess(),
      error: error => this.onError(error),
      destroyed: () => this.onDestroyed()
    });
  }

  onSuccess = () => {};
  
  onError = (error) => {
    console.log(error)
  }

  @action
  startRobotFeed(id) {
    this.userId = id;
    this.roomId = Math.floor(Math.random() * 90000) + 10000;
    this.attachVideoRoom();
    this.connecting = true;
  }

  @action
  closeRobotFeed() {
    this.leaveRoom();
    this.robotUserId = null;
    this.roomId = null;
  }

  attachVideoRoom() {
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        this.videoRoom = pluginHandle;

        this.videoRoom.send({
          message: {
            request: "create",
            room: this.roomId,
            notify_joining: true,
            bitrate: 128000,
            permanent: false
          },
          error: error => Janus.error("[VideoRoom] er", error)
        });

        Janus.log(
          `[VideoRoom] Plugin attached! (${this.videoRoom.getPlugin()}, id=${this.videoRoom.getId()})`
        );
        Janus.log("[VideoRoom]  -- This is a publisher/manager");
        const register = {
          request: "join",
          room: this.roomId,
          ptype: "publisher",
          display: session.user.id,
          id: this.videoRoom.getId()
        };
        this.videoRoom.send({ message: register });
      },
      error(error) {
        Janus.error("[VideoRoom]  -- Error attaching plugin...", error);
        // errorCallback(error);
      },
      consentDialog(on) {
        Janus.log(
          `[VideoRoom] Consent dialog should be ${on ? "on" : "off"} now`
        );
        if (on) {
          // Darken screen and show hint
        } else {
          // Restore screen
        }
        //consentDialog(on);
      },
      mediaState(medium, on) {
        Janus.log(
          `[VideoRoom] ${on ? "started" : "stopped"} receiving our ${medium}`
        );
        //mediaState(medium, on);
      },
      webrtcState(on) {
        Janus.log(
          `[VideoRoom] says our WebRTC PeerConnection is ${
            on ? "up" : "down"
          } now`
        );
        //webrtcState(on);
      },
      onmessage: (msg, jsep) => {
        const event = msg.videoroom;
        Janus.log("[VideoRoom] ::: Got a message (publisher) :::", msg, event);
        let myid;

        if (event !== undefined && event !== null) {
          switch (event) {
            case "joined": {
              const myid = msg.id;
              const mypvtid = msg.private_id;
              Janus.log(
                `[VideoRoom] Successfully joined room ${
                  msg.room
                } with ID ${myid}`
              );
              this.publishAudioFeedToRoom();
              // this.checkPropertyAndWork(msg, 'publishers');
              //console.log("publishers", msg.publishers)

              mqtt.publishJoin(this.userId, this.roomId);
              if (msg.publishers.length > 0) {
                const {
                  id,
                  display,
                  audio_codec,
                  video_codec
                } = msg.publishers[0];

                this.subscribeToFeed(id, display, audio_codec, video_codec);
              }

              break;
            }
            case "event": {
              if (msg.publishers) {
                const {
                  id,
                  display,
                  audio_codec,
                  video_codec
                } = msg.publishers[0];

                this.subscribeToFeed(id, display, audio_codec, video_codec);
                this.connecting = false;
                this.joined = false;
              }

              if (msg.unpublished) {
                //if (value === 'ok') {
                this.robotStream = null;
                //}
              }
              break;
            }
            case "destroyed": {
              //this.onDestroy()
              Janus.warn("[VideoRoom] The room has been destroyed!");
              this.connecting = false;
              this.joined = false;
              break;
            }
            default: {
              return;
            }
          }
        }
        if (jsep !== undefined && jsep !== null) {
          Janus.log("[VideoRoom] ::: Got a Jsep  :::", jsep);
          this.videoRoom.handleRemoteJsep({ jsep }); // that would trigger event with publishers (add jsep to publisher),
          // Check if any of the media we wanted to publish has
          // been rejected (e.g., wrong or unsupported codec)
        }
        //onmessage(msg, jsep);
      },
      oncleanup: () => {
        Janus.log(
          "[VideoRoom] ::: Got a cleanup notification: we are unpublished now :::"
        );
        this.onRoomCleanup();
      }
    });
  }

  publishAudioFeedToRoom = () => {
    // Publish our stream
    this.videoRoom.createOffer({
      // Add data:true here if you want to publish datachannels as well
      media: {
        audioRecv: true,
        videoRecv: true,
        audioSend: true,
        videoSend: false
      }, // Publishers are sendonly
      forced: true,
      success: jsep => {
        Janus.log("[VideoRoom][Own] Got publisher SDP!", jsep);
        const publish = {
          request: "configure",
          audio: true,
          video: false
          //bitrate: 12800,
        };
        this.videoRoom.send({ message: publish, jsep });
      },
      error: error => {
        Janus.error("[VideoRoom][Own] WebRTC error:", error);
        // if (useAudio) {
        //   //this.publishOwnFeed(false);
        // } else {
        //   Janus.error('[VideoRoom][Own] webRtc error', error);
        // }
      }
    });
  };

  leaveRoom = () => {
    if (this.videoRoom) {
      //mqtt.publishLeave(this.userId, this.roomId)
      this.videoRoom.hangup();
      this.videoRoom.send({
        message: {
          request: "destroy",
          room: this.roomId
        }
      });
      // this.videoRoom.detach()
      this.userId = null;
      this.joined = false;
    }
  };

  onRoomCleanup() {
    //mqtt.publishLeave(this.userId, this.roomId)
    //this.videoRoom.detach();
    this.robotStream = null;
    this.userId = null;
    this.connecting = false;
  }

  subscribeToFeed(id, display, audio, video) {
    let remoteFeed = null;
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    this.robotStream = null;
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        Janus.log(
          `[VideoRoom][Remote] Plugin attached! (${remoteFeed.getPlugin()}, id=${remoteFeed.getId()})`
        );
        Janus.log("[VideoRoom][Remote] -- This is a subscriber");
        // We wait for the plugin to send us an offer
        const subscribe = {
          request: "join",
          room: this.roomId,
          ptype: "subscriber",
          feed: id
          //private_id: mypvtid,
        };
        // In case you don't want to receive audio, video or data, even if the
        // publisher is sending them, set the 'offer_audio', 'offer_video' or
        // 'offer_data' properties to false (they're true by default), e.g.:
        // subscribe["offer_video"] = false;
        // For example, if the publisher is VP8 and this is Safari, let's avoid video
        if (
          Janus.webRTCAdapter.browserDetails.browser === "safari" &&
          (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
        ) {
          if (video) {
            video = video.toUpperCase();
          }
          // toastr.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
          subscribe.offer_video = false;
        }
        remoteFeed.videoCodec = video;
        Janus.log("[VideoRoom][Remote] sending", subscribe);
        remoteFeed.send({ message: subscribe });
      },
      error: error => {
        Janus.error("[VideoRoom][Remote]  -- Error attaching plugin...", error);
        // bootbox.alert("Error attaching plugin... " + error);
      },
      onmessage: (msg, jsep) => {
        const event = msg.videoroom;
        Janus.log(
          "[VideoRoom][Remote] ::: Got a message (publisher) :::",
          msg,
          event
        );
        if (msg.error && msg.error !== null) {
          Janus.log("[VideoRoom][Remote][ERROR]", msg.error);
        } else if (event && event !== null) {
          if (event === "attached") {
            // Subscriber created and attached
            Janus.log(
              `[VideoRoom][Remote] Successfully attached to feed ${
                remoteFeed.rfid
              } (${remoteFeed.rfdisplay}) in room ${msg.room}`
            );
          }
        }
        if (jsep !== undefined && jsep !== null) {
          Janus.debug("[VideoRoom][Remote] Handling SDP as well...");
          Janus.debug(jsep);
          // Answer and attach
          remoteFeed.createAnswer({
            jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { audioSend: true, videoSend: false }, // We want recvonly audio/video
            success: jsep => {
              Janus.debug("[VideoRoom][Remote] Got SDP!");
              Janus.debug(`[VideoRoom][Remote] ${jsep}`);
              const body = { request: "start", room: this.roomId };
              remoteFeed.send({ message: body, jsep });
            },
            error: error => {
              Janus.error("[VideoRoom][Remote] WebRTC error:", error);
            }
          });
        }
      },
      webrtcState: on => {
        Janus.log(
          `[VideoRoom][Remote] says this WebRTC PeerConnection (feed #' ${
            remoteFeed.rfindex
          } ') is '${on ? "up" : "down"}' now')`
        );
      },
      onlocalstream: stream => {
        // The subscriber stream is recvonly, we don't expect anything here
        Janus.log("[VideoRoom][Remote] === local stream === ", stream);
      },
      onremotestream: stream => {
        Janus.log(`[VideoRoom][Remote] Remote feed #${remoteFeed.rfindex}`);
        // var videoTracks = stream.getVideoTracks();
        // if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
        //   // No remote video
        // } else {
        // }
        //remoteList[id] = stream;
        this.robotStream = stream;
        //this.callbacks.onremotestream(remoteList);
      },
      oncleanup: () => {
        Janus.log(
          `[VideoRoom][Remote] ::: Got a cleanup notification (remote feed ${id}) :::`
        );
      }
    });
  }

  publishCommand(command, value) {
    if (this.userId) {
      mqtt.publish(this.userId, {
        type: "robot",
        body: { command, value }
      });
    }
  }

  cancelLastCommand = ()=>{

    this.publishCommand(this.command, "stop");

    this.command = null;
    this.commandValue = null

    if (this.commandTimeout) clearTimeout(this.commandTimeout);
    if (this.commandInterval) clearInterval(this.commandInterval);
  }

  publishIntervalCommand(command, value) {

    if (this.command != command && this.commandValue != value) {
      
      if (this.commandInterval) clearInterval(this.commandInterval);
      if (this.commandTimeout) clearTimeout(this.commandTimeout);

      // cancel last command
      //this.publishCommand(this.command, "stop");

      this.command = command;
      this.commandValue = value;


      this.commandInterval = setInterval(() => {
        this.publishCommand(command, value);
        if (this.commandTimeout) clearTimeout(this.commandTimeout);
        this.commandTimeout = setTimeout(this.cancelLastCommand, 2000);
      }, 500);

    }
  }


  // handleCommand(key){
  //   switch (key) {
  //     case "up":
  //       robot.linearForward();
  //       break;
  //     case "down":
  //       robot.linearBackward();
  //       break;
  //     case "left":
  //       robot.angularLeft();
  //       break;
  //     case "right":
  //       robot.angularRight();
  //       break;
  //     case "+":
  //       robot.verinUp();
  //       break;
  //     case "-":
  //       robot.verinDown();
  //       break;          
  //   }
  // }

  linearForward() {
    this.publishCommand("linear", "forward");
  }

  linearBackward() {
    this.publishCommand("linear", "backward");
  }

  linearStop() {
    this.publishCommand("linear", "stop");
  }

  angularLeft() {
    this.publishCommand("angular", "left");
  }

  angularRight() {
    this.publishCommand("angular", "right");
  }

  angularStop() {
    this.publishCommand("angular", "stop");
  }

  verinUp() {
    this.publishCommand("verin", "up");
  }

  verinDown() {
    this.publishCommand("verin", "down");
  }

  verinStop() {
    this.cancelLastCommand("verin")
  }

  ledOn() {
    this.publishCommand("led", "on");
  }

  ledOff() {
    this.publishCommand("led", "off");
  }

  ledBlink() {
    this.publishCommand("led", "blink");
  }

  onDestroyed = () => {
    this.janus = null;
  };

  disconnect() {
    this.janus.destroy();
  }
}

export default Robot;
