// @flow
import { observable, computed } from "mobx";
import { Platform } from "react-native";
import Config from "react-native-config";
import OneSignal from "react-native-onesignal";
import Permissions from "react-native-permissions";

import { app, session } from "@stores";

const isIOS = Platform.OS === "ios";

export default class Notification {
  @observable
  permission;

  @observable
  enabled = false;

  @observable
  hasPrompted = false;

  @observable
  last = null;

  @observable
  subscriptionState = null;

  constructor() {
    OneSignal.init(Config.ONESIGNAL_APP_ID);

    // OneSignal.inFocusDisplaying(isIOS ? 0 : 2)
    OneSignal.inFocusDisplaying(0);
    OneSignal.addEventListener(
      "received",
      this.onNotificationReceived.bind(this)
    );
    OneSignal.addEventListener("opened", this.onNotificationOpened.bind(this));

    OneSignal.configure();
    OneSignal.getPermissionSubscriptionState(this.onPermissionState.bind(this));
    OneSignal.enableVibrate(false);
    OneSignal.enableSound(true);
  }

  configure() {
    OneSignal.sendTags({
      userId: session.user.id,
      env: Config.ENV,
      firstname: session.user.firstname
    });
  }

  onPermissionState(state) {
    this.enabled = state.notificationsEnabled;
    this.hasPrompted = state.hasPrompted;
    // userSubscriptionEnabled: "true", subscriptionEnabled: "false", notificationsEnabled: "true"
  }

  onNotificationReceived(notification) {
    this.last = notification.payload.additionalData;
  }

  onNotificationOpened(openResult) {
    const data = openResult.notification.payload.additionalData;
    if (data) {
    }
  }
}
