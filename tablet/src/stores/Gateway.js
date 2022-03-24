import { action, observable } from "mobx";
import { Alert } from "react-native";
import Janus from "@utils/janus.js";
import Config from "react-native-config";
import Snackbar from "react-native-snackbar";
import { session, navigation, app, springboard, robot } from "@stores";
import { isNil } from "lodash";
import InCallManager from "react-native-incall-manager";
import KeyEvent from "react-native-keyevent";
import { userFindById } from "../Agent";
import SystemSetting from "react-native-system-setting";

const notify = message =>
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_LONG
  });

class Gateway {
  opaqueId = "videocall-";

  videocall = null;

  janus = null;

  @observable
  callDialog = false;

  @observable
  compteur = 0;

  @observable
  inCall = false;

  @observable
  waitCall = false;

  @observable
  acceptedCall = false;

  @observable
  localStream;

  @observable
  remoteStream;

  @observable
  audioMuted = false;

  @observable
  videoMuted = false;

  @observable
  operatorName;

  @observable
  gatewayIsAvailable = true;

  @observable
  online = true;

  @observable
  operator;

  incomingcallerJsep = null;

  @observable
  operators = [];

  @observable
  volume = 0;

  constructor() {
    Janus.init({ debug: true });
  }

  async connect() {
    this.janus = new Janus({
      server: Config.GATEWAY_URL,
      success: () => this.onSuccess(),
      error: error => this.onError(error),
      destroyed: () => this.onDestroyed()
    });
    await robot.init();
  }

  @action
  async volUp() {
    let volume = await SystemSetting.getVolume("system");

    console.log("volume up : " + volume);
    volume = volume + 0.15;
    await SystemSetting.setVolume(volume, {
      type: "system",
      playSound: true,
      showUI: true
    });
    this.volume = await SystemSetting.getVolume("system");
    console.log("volume up : " + this.volume);
  }

  @action
  async volDown() {
    let volume = await SystemSetting.getVolume("system");
    volume = volume - 0.15;
    console.log("volume down : " + volume);
    await SystemSetting.setVolume(volume, {
      type: "system",
      playSound: true,
      showUI: true
    });
    this.volume = await SystemSetting.getVolume("system");
  }

  reconnect() {
    if (!this.janus) {
      this.connect();
    }
  }

  onSuccess = () => {
    notify("Connected");
    this.gatewayIsAvailable = true;
    if (!this.janus) {
      this.connect();
    }
    this.online = app.online;
    this.janus.attach({
      plugin: "janus.plugin.videocall",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        this.videocall = pluginHandle;
        const register = { request: "register", username: session.user.id };
        this.videocall.send({ message: register });
      },
      onmessage: this.onVideoCallMessage,
      onlocalstream: stream => {
        let tracks = stream.getTracks();
        if (tracks.length > 0) {
          tracks.forEach((element, index, array) => {
            if (element.kind === "audio") {
              element.muted = true;
            }
          });
          // InCallManager.setMicrophoneMute(true)
        }
        this.localStream = stream.toURL();
      },
      onremotestream: stream => {
        this.remoteStream = stream.toURL();
      },
      ondataopen: () => {
        Janus.log("The DataChannel is available!");
      },
      ondata: data => {
        Janus.debug(`We got data from the DataChannel! ${data}`);
      },
      oncleanup: () => {
        Janus.log(" ::: Got a cleanup notification :::");
        // this.janus = null;
        this.operators = [];
      }
    });
  };

  @action
  checkGatewayServerIsAvailable() {
    return fetch(Config.GATEWAY_URL)
      .then(async response => {
        if (app.online && (!this.gatewayIsAvailable || !this.online)) {
          this.online = true;
          await session.init();
          // await this.connect();
        } else if (!app.online) {
          this.online = false;
        }
        this.gatewayIsAvailable = true;
      })
      .catch(async error => {
        this.gatewayIsAvailable = false;
        await session.logout(false);
      });
  }

  @action
  async isAvailable() {
    if (app.online && this.online === false) {
      await this.disconnect();
      await this.connect();
      await session.init();
      this.online = true;
    } else if (!app.online) {
      this.online = false;
    }
  }

  refreshAccount = async () => {
    this.refreshTimerAccount = setInterval(async () => {
      await this.isAvailable();
    }, 3000);
    await this.isAvailable();
  };

  onIncomingCall = async (from, jsep) => {
    const { data } = await userFindById({ id: from });
    this.operator = data;
    InCallManager.startRingtone();
    this.operatorName = from;
    this.incomingcallerJsep = jsep;
    springboard.initCallDialogEvent();
    this.callDialog = true;
  };

  onVideoCallMessage = async (body, jsep) => {
    const { result } = body;

    // let isSame = compare(this.operators, result.list)
    if (!isNil(result)) {
      if (!isNil(result.list)) {
        const { list } = result;
        this.onListing(list);
      } else if (!isNil(result.event)) {
        const { event } = result;
        if (event === "registered") {
          this.refreshList();
          // this.refreshAccount();
          // this.isAvailable()
        } else if (event === "calling") {
          Janus.log("Waiting for the peer to answer...");
          // TODO Any ringtone?
          notify("Waiting for the peer to answer...");
        } else if (event === "incomingcall") {
          const { username: userId } = result;
          //InCallManager.startRingtone({ media: "audio", ringback: "_DTMF_" });
          this.onIncomingCall(userId, jsep);
          setTimeout(() => {
            this.callDialog ? this.hangup() : null;
          }, 20000);
        } else if (event === "accepted") {
          const { username: userId } = result;
          if (isNil(userId)) {
            Janus.log("Call started!");
            InCallManager.stopRingtone();
          } else {
            Janus.log(`${userId} accepted the call!`);
            InCallManager.stopRingback();
          }
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
          InCallManager.stop();
          InCallManager.stopRingtone();
          this.videocall.hangup();
          this.callDialog = false;
          this.acceptedCall = false;
          navigation.goBack();
          //TODO: change spinner state
        }
      }
    } else {
      // FIXME Error?
      const { error } = body;
      Janus.debug(error);
      if (error.indexOf("already taken") > 0) {
        // alert("Access already used by another patient");
        console.log("******** error: id already taken **********");
        console.log(error);
        // this.compteur+=1
        // console.log(this.compteur)
        setTimeout(async () => {
          await session.logout(false);
          await session.init();
        }, 10000);
      }
      // TODO Reset status
      this.videocall.hangup();
      //TODO: stop spinner
    }
  };

  onError = error => {
    // Alert.alert("Janus Error", error);
    // setTimeout(function() {
    //   janus.reconnect({
    //     success: () => this.onSuccess(),
    //     error: error => this.onError(error)
    //   });
    // }, 2000);
  };

  onDestroyed = () => {
    if (this.janus) {
      this.janus.destroy();
    }
  };

  onListing = async list => {
    const filtred = list.filter(p => p !== session.user.id);

    let operators = [];
    for (let id of filtred) {
      const { data } = await userFindById({ id });
      if (data.roles.filter(e => e.name === "operator").length == 1) {
        operators.push(data);
      }
    }
    if (this.operators.length == operators.length) {
      for (let i = 0; i < this.operators.length; i++) {
        if (!operators.find(id => id == this.operators[i].id)) {
          this.operators = operators;
          i = this.operators.length;
        }
      }
    } else {
      this.operators = operators;
    }
  };

  refreshList = () => {
    this.refreshTimer = setInterval(() => {
      if (this.videocall) {
        this.videocall.send({ message: { request: "list" } });
      }
    }, 3000);
    if (this.videocall) {
      this.videocall.send({ message: { request: "list" } });
    }
  };

  // @action
  answer() {
    this.callDialog = false;
    InCallManager.stopRingtone();
    InCallManager.start();

    navigation.navigate("VideoCall");
    this.inCall = true;

    this.videocall.createAnswer({
      jsep: this.incomingcallerJsep,
      media: {
        data: false,
        videoSend: true,
        audioSend: true
      }, // Let's negotiate data channels as well
      simulcast: false,
      success: newJsep => {
        Janus.debug("Got SDP!");
        const body = { request: "accept" };
        this.videocall.send({ message: body, jsep: newJsep });
        this.incomingcallerJsep = null;
      },
      error: error => {
        Janus.error("WebRTC error:", error);
      }
    });
  }

  async callService() {
    if (this.operators.length > 0) {
      InCallManager.start({ media: "audio", ringback: "_DTMF_" });
      navigation.navigate("VideoCall");

      const id = this.operators[0].id;
      this.videocall.createOffer({
        // By default, it's sendrecv for audio and video...
        media: { data: false },
        // media: {
        //   audioSend: false,
        //   videoSend: false
        // }, // ... let's negotiate data channels as well
        // If you want to test simulcasting (Chrome and Firefox only), then
        // pass a ?simulcast=true when opening this demo page: it will turn
        // the following 'simulcast' property to pass to janus.js to true
        simulcast: false,
        success: jsep => {
          Janus.debug("Got SDP!");
          var body = { request: "call", username: id };
          this.videocall.send({ message: body, jsep });
          this.inCall = true;
        },
        error: error => {
          Janus.error("WebRTC error...", error);
          this.inCall = false;
        }
      });
    } else {
      Alert.alert(
        "Aucun operator n'est disponible. Merci de réessayer plutard"
      );
    }
  }

  toggleAudioMute() {
    const muted = this.videocall.isAudioMuted();
    if (muted) {
      this.videocall.unmuteAudio();
      this.audioMuted = false;
    } else {
      this.videocall.muteAudio();
      this.audioMuted = true;
    }
  }

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

  hangup = () => {
    InCallManager.stopRingtone();
    InCallManager.stop();
    this.inCall = false;
    this.callDialog = false;
    this.acceptedCall = false;
    this.audioMuted = false;
    this.videoMuted = false;
    springboard.reset();
    // Hangup a call
    if (this.videocall) {
      this.videocall.send({ message: { request: "hangup" } });
      this.videocall.hangup();
    }
    navigation.navigate("Springboard");
  };

  disconnect() {
    if (this.janus) {
      if (this.videocall) {
        this.videocall = null;
        this.hangup();
      }
      this.janus.destroy();
    }

    if (this.refreshTimer) {
      // this.refreshTimer.clear();
      this.refreshTimer = null;
    }

    if (this.refreshTimerAccount) {
      // this.refreshTimerAccount.clear();
      this.refreshTimerAccount = null;
    }
  }
}

export default Gateway;
