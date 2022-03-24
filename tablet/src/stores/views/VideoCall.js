import { action, reaction, observable, observe, computed, autorun } from "mobx";
import { session, navigation as navigator, app, gateway } from "@stores";
import SystemSetting from "react-native-system-setting";
import KeyEvent from "react-native-keyevent";

class VideoCall {
  @observable
  events;

  @observable
  actions;

  @observable
  headerEvents;

  @observable
  selected;

  @observable
  level;

  @observable
  levels;

  @observable
  callButtonsEvents;

  @observable
  volume;

  @observable
  showVolSlider = false;

  @action
  async reset() {
    KeyEvent.removeKeyUpListener();
    // this.loading = false;
    this.level = null;
    this.selected = null;
    this.levels = [["video", "audio", "hangup"], ["back"]];
    this.setEventsConfiguration();
    this.volume = await SystemSetting.getVolume("call");
  }

  @action
  async volUp() {
    // this.showVolSlider = true;
    const volume = this.volume + 0.2;
    await SystemSetting.setVolume(volume, {
      type: "call",
      playSound: true,
      showUI: true
    });
    this.volume = await SystemSetting.getVolume("call");
    // setTimeout(() => {
    //   this.showVolSlider = false;
    // }, 10000);
  }

  @action
  async volDown() {
    // this.showVolSlider = true;
    const volume = this.volume - 0.2;
    await SystemSetting.setVolume(volume, {
      type: "call",
      playSound: true,
      showUI: true
    });
    this.volume = await SystemSetting.getVolume("call");
    // setTimeout(() => {
    //   this.showVolSlider = false;
    // }, 10000);
  }

  @action
  async changeVol(value) {
    // this.showVolSlider = true;
    await SystemSetting.setVolume(value, {
      type: "call",
      playSound: false,
      showUI: true
    });
    this.volume = await SystemSetting.getVolume("call");
    // setTimeout(() => {
    //   this.showVolSlider = false;
    // }, 10000);
  }

  @action
  setVolume(volume) {
    this.volume = volume;
  }

  @action
  initSelectedElement() {
    this.selected = null;
    this.level = null;
  }

  @action
  initNavigationEvents() {
    this.selected = 0;
    this.level = 0;
  }

  // Configuration
  @action
  setEventsConfiguration() {
    // events configuration
    this.events = {
      135: () => this.reset(), // KEYCODE_F5 : return to principal menu,
      100: () => gateway.hangup(),
      20: () => this.downEvent(), // KEYCODE_DPAD_DOWN: navigate between levels
      19: () => this.upEvent(), // KEYBOARD_DPAD_UP
      22: () => this.rightEvent(), // KEYBOARD_DPAD_RIGHT: move between the level components on right direction
      21: () => this.leftEvent(), //  KEYCODE_DPAD_LEFT:  move between the level components on right direction
      111: () => gateway.hangup(),
      24: () => this.volUp(),
      25: () => this.volDown(),
      66: () =>
        this.selected == null || this.level == null
          ? this.initNavigationEvents()
          : this.actions[this.level](), // KEYCODE_ENTER: apply "onPress" action of the current component
      run: (fn, keyCode) => {
        Object.keys(this.events).find(key => key == keyCode) ? fn() : null;
      }
    };

    // 0:  action of level 0 (Menu)
    // 1! action of level 1 (Header --> call or go back)
    this.actions = {
      0: () => this.callButtonsEvents[this.levels[0][this.selected]](),
      1: () => this.headerEvents[this.levels[1][this.selected]](),
      none: () => null,
      run: fn => fn()
    };
    // actions of header level
    this.headerEvents = {
      back: () => gateway.hangup(),
      run: fn => fn()
    };

    this.callButtonsEvents = {
      audio: () => gateway.toggleAudioMute(),
      video: () => gateway.toggleVideoMute(),
      hangup: () => gateway.hangup(),
      run: fn => fn()
    };
  }

  @action
  hangup() {
    gateway.hangup();
  }

  @action
  async applyEvents() {
    await this.reset();
    KeyEvent.onKeyUpListener(keyEvent => {
      this.events.run(this.events[keyEvent.keyCode], keyEvent.keyCode);
    });
  }

  @action
  upEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    }
    this.selected = 0;
    this.level = this.level === this.levels.length - 1 ? 0 : this.level + 1;
  }

  @action
  rightEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    }
    if (this.level == 0) {
      this.selected =
        this.selected === this.levels[this.level].length - 1
          ? 0
          : this.selected + 1;
    } else if (this.level == 1 && this.levels[1].length == 1) {
      this.level = 0;
      this.selected = 0;
    }
  }

  @action
  downEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    }
    this.selected = 0;
    this.level = this.level === 0 ? this.levels.length - 1 : this.level - 1;
  }

  @action
  leftEvent(list) {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    }
    if (this.level == 0) {
      this.selected =
        this.selected === 0
          ? this.levels[this.level].length - 1
          : this.selected - 1;
    } else if (this.level == 1 && this.levels[1].length == 1) {
      this.level = 0;
      this.selected = 0;
    }
  }
}

export default VideoCall;
