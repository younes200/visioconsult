import EventEmitter from "eventemitter3";
import { AppState, Platform } from "react-native";
import OneSignal from "react-native-onesignal";
import Config from "react-native-config";
import Permissions from "react-native-permissions";

class Notification extends EventEmitter {
  constructor() {
    super();
    OneSignal.init(Config.ONESIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: false
    });
    OneSignal.addEventListener("received", this._onReceived.bind(this));
    OneSignal.addEventListener("opened", this._onOpened.bind(this));
    OneSignal.inFocusDisplaying(2);

    OneSignal.getPermissionSubscriptionState(
      this._onSubscriptionState.bind(this)
    );
  }

  configure(user) {
    OneSignal.configure();
    // Register tag
    OneSignal.sendTags({ userId: user.id, env: Config.ENV });
    this.prompt();
  }

  prompt() {
    // if (Platform.OS === 'ios') {
    OneSignal.registerForPushNotifications();
    // }

    OneSignal.checkPermissions(permissions => {
      // console.log('[OneSignal] permissions', permissions);
    });
  }

  postNotification(to) {
    const data = {}; // some array as payload
    const contents = {
      en: "You got notification from user"
    };
    const parameters = {
      tags: [{ field: "tag", key: "userId", relation: "=", value: to }]
    };
    OneSignal.postNotification(contents, data, null, parameters);
  }

  _onReceived(notification) {
    console.log("[OneSignal] Notification received: ", notification);
  }

  _onOpened(openResult) {
    console.log("[OneSignal] Message: ", openResult.notification.payload.body);
    console.log(
      "[OneSignal] Data: ",
      openResult.notification.payload.additionalData
    );
    console.log("[OneSignal] isActive: ", openResult.notification.isAppInFocus);
    console.log("[OneSignal] openResult: ", openResult);
  }

  _onSubscriptionState(response) {
    console.log(
      "[OneSignal] Received permission subscription state: ",
      response
    );
    if (response) {
      this.emit("subscription", response);
    }
  }
}

export default Notification;
