// @flow
import { observable, computed, action } from "mobx";
import { AppState, NetInfo, Platform, AsyncStorage } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Config from "react-native-config";
import DeviceInfo from "react-native-device-info";
import CodePush from "react-native-code-push";
import { Sentry } from "react-native-sentry";
import OneSignal from "react-native-onesignal";
import KeyEvent from "react-native-keyevent";

import { userDeviceUpsert, userPatchAttributes } from "Agent";

import { session, gateway, springboard, navigation } from "@stores";

const RUN_PREFIX = "firstTime:";

class App {
  @observable
  isReady = false;

  @observable
  online = true;

  @observable
  isNative = true;

  @observable
  active = true;

  @observable
  state = "";

  @observable
  events;

  @observable
  bundleLabel;

  firstRun = false;

  runCount = 0;

  constructor() {
    AppState.addEventListener("change", this.onAppStateChange.bind(this));
    NetInfo.getConnectionInfo().then(this.onNetChange.bind(this));
    NetInfo.addEventListener("connectionChange", this.onNetChange.bind(this));

    CodePush.getUpdateMetadata().then(update => {
      if (update) {
        Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
        this.bundleLabel = update.label;
      }
    });

    this.locale = DeviceInfo.getDeviceLocale();
    this.timezone = DeviceInfo.getTimezone();

    this.checkFirstRun();
  }

  @action
  setEventsConfiguration() {
    // KeyEvent.removeKeyUpListener();
    // events configuration
    this.events = {
      24: () => gateway.volUp(),
      25: () => gateway.volDown(),
      5: () => this.call(),
      // 3: () => this.init(),
      111: () => navigation.goBack(),
      100: () => gateway.hangup(),
      none: () => null,
      run: (fn, keyCode) =>
        Object.keys(this.events).find(key => key == keyCode) ? fn() : null
    };
  }

  @action
  call() {
    if (gateway.callDialog) {
      gateway.answer();
    } else {
      gateway.callService();
    }
  }

  async sendDeviceInfo() {
    const uid = DeviceInfo.getUniqueID();
    const model = DeviceInfo.getModel();
    const manufacturer = DeviceInfo.getManufacturer();
    const name = DeviceInfo.getDeviceName();
    const carrier = DeviceInfo.getCarrier();
    const buildNumber = DeviceInfo.getBuildNumber();
    const brand = DeviceInfo.getBrand();
    const apiLevel = DeviceInfo.getAPILevel();
    const appVersion = DeviceInfo.getReadableVersion();
    const systemVersion = DeviceInfo.getSystemVersion();
    const data = {
      uid,
      model,
      manufacturer,
      locale: this.locale,
      name,
      carrier,
      buildNumber,
      systemVersion,
      brand,
      apiLevel,
      timezone: this.timezone,
      appVersion,
      userId: session.user.id,
      bundleLabel: this.bundleLabel,
      os: Platform.OS
    };

    try {
      await userDeviceUpsert({
        id: session.user.id,
        fk: data.uid,
        data
      });

      userPatchAttributes({
        id: session.user.id,
        data: { locale: this.locale }
      });
    } catch (e) {
      console.log("sendDeviceInfo failed", e);
    }
  }

  @computed
  get version() {
    return `${DeviceInfo.getReadableVersion()}${
      this.bundleLabel ? `-${this.bundleLabel}` : ""
    }#${Config.ENV}`;
  }

  onNetChange(connectionInfo: any) {
    this.online = connectionInfo.type !== "none";
    if (this.online == true) {
      session.reconnect();
    } else {
      session.logout(false);
    }
  }

  onAppStateChange(nextAppState: any) {
    if (this.state.match(/inactive|background/) && nextAppState === "active") {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  async checkFirstRun() {
    const storageKey = RUN_PREFIX + DeviceInfo.getUniqueID();
    try {
      const count = await AsyncStorage.getItem(storageKey);
      this.firstRun = false;
      this.runCount = parseInt(count, 10);
    } catch (e) {
      this.firstRun = true;
    } finally {
      AsyncStorage.removeItem(storageKey);
      // AsyncStorage.setItem(storageKey, this.runCount.toString())
    }
  }
}

export default App;
