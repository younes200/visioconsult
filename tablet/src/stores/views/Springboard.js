import { action, reaction, observable, observe, computed, autorun } from "mobx";
import { User } from "@models";
import uuid from "uuid";
import { userFind } from "Agent";
import { session, navigation as navigator, app, gateway, robot } from "@stores";
import { SpringboardMenu, st } from "./SpringboardMenu";
import KeyEvent from "react-native-keyevent";
import images from "@assets/images";
import Geolocation from "react-native-geolocation-service";
import Permissions from "react-native-permissions";
import axios from "axios";
import { union, findKey, isString } from "lodash";
import publicIP from "react-native-public-ip";
import SystemSetting from "react-native-system-setting";
import InCallManager from "react-native-incall-manager";

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Springboard {
  @observable
  list = SpringboardMenu;

  @observable
  stJour = st;

  @observable
  page;

  @observable
  refreshing = false;

  @observable
  loading = false;

  @observable
  listOfLists = [];

  @observable
  selected = null;

  @observable
  callSelected = null;

  @observable
  callActions;

  @observable
  callEvents;

  @observable
  eventDisabled = false;

  @observable
  levels;

  @observable
  headerComponents = ["call"];
  // headerComponents = ["back", "call"];

  @observable
  headerEvents;

  @observable
  actions;

  @observable
  events;

  @observable
  callDialogEvents;

  @observable
  callDialogActions;

  @observable
  callDialogSelected = null;

  @observable
  robotIpEvents;

  @observable
  robotIpActions;

  @observable
  robotIpSelected = null;

  @observable
  robotIpFocus = false;

  @observable
  currentParentTitle;

  @observable
  humidity;

  @observable
  city;

  @observable
  infos = [];

  // level 0 for menu
  // level 1 for header
  @observable
  level = null;

  @observable
  navigationCases;

  @observable
  listContacts = [];

  @observable
  tempC = "";

  @observable
  volume;

  @observable
  showVolSlider = false;

  @action
  async reset() {
    // this.listOfLists = [];
    // this.list = SpringboardMenu;
    // await this.getInfos
    this.setListContacts();
    this.loading = false;
    this.level = null;
    this.selected = null;
    this.levels = [
      { name: "list", value: this.list },
      { name: "header", value: this.headerComponents }
    ];
    this.defineNavigationCases();
    this.setEventsConfiguration();
  }

  @action
  setVolume(volume) {
    if (this.volume == 0 && volume > 0 && gateway.callDialog) {
      InCallManager.startRingtone();
    }
    this.volume = volume;
  }

  @action
  async initCallDialogEvent() {
    // if (this.level != null) {
    //   this.selected = 0;
    // }
    // this.selected

    this.callActions = {
      0: () => gateway.answer(),
      1: () => gateway.hangup(),
      none: () => null,
      run: fn => fn()
    };

    this.callEvents = {
      135: () => this.callDialogEvent(), // KEYCODE_F5 : return to principal menu
      20: () => this.callDialogEvent(), // KEYCODE_DPAD_DOWN: navigate between levels
      19: () => this.callDialogEvent(), // KEYBOARD_DPAD_UP
      22: () => this.callDialogEvent(), // KEYBOARD_DPAD_RIGHT: move between the level components on right direction
      5: () => this.call(),
      100: () => gateway.hangup(),
      21: () => this.callDialogEvent(), //  KEYCODE_DPAD_LEFT:  move between the level components on right direction
      66: () =>
        this.callSelected == null
          ? this.setCallSelected()
          : this.callActions[this.callSelected](), // KEYCODE_ENTER: apply "onPress" action of the current component
      none: () => null,
      run: (fn, keyCode) =>
        Object.keys(this.callEvents).find(key => key == keyCode) ? fn() : null
    };
  }

  @action
  async initRobotIpDialogEvent() {
    // if (this.level != null) {
    //   this.selected = 0;
    // }
    // this.selected

    this.robotIpActions = {
      0: () => this.robotIpDialogEvent(),
      1: () => robot.connect(),
      none: () => null,
      run: fn => fn()
    };

    this.robotIpEvents = {
      135: () => this.robotIpDialogEvent(), // KEYCODE_F5 : return to principal menu
      20: () => this.robotIpDialogEvent(), // KEYCODE_DPAD_DOWN: navigate between levels
      19: () => this.robotIpDialogEvent(), // KEYBOARD_DPAD_UP
      22: () => this.robotIpDialogEvent(), // KEYBOARD_DPAD_RIGHT: move between the level components on right direction
      21: () => this.robotIpDialogEvent(), //  KEYCODE_DPAD_LEFT:  move between the level components on right direction
      66: () =>
        this.robotIpSelected == null
          ? this.setRobotIpSelected()
          : this.robotIpActions[this.robotIpSelected](), // KEYCODE_ENTER: apply "onPress" action of the current component
      none: () => null,
      run: (fn, keyCode) =>
        Object.keys(this.robotIpEvents).find(key => key == keyCode)
          ? fn()
          : null
    };
  }

  @action
  setSelected() {
    this.selected = 0;
  }

  @action
  setCallSelected() {
    this.callSelected = 0;
  }

  @action
  setRobotIpSelected() {
    this.robotIpSelected = 0;
  }

  @action
  callDialogEvent() {
    this.callSelected = this.callSelected == 0 ? 1 : 0;
  }

  @action
  robotIpDialogEvent() {
    this.robotIpSelected = this.robotIpSelected == 0 ? 1 : 0;
  }

  @action
  async init() {
    this.listOfLists = [];
    this.list = SpringboardMenu;
    // await this.getInfos
    await this.reset();
  }

  @action
  async getInfos() {
    try {
      const { data } = await axios.get(
        `https://visio.noveup.fr/news.php?from=1`
      );
      this.infos = data.channel.item.filter(
        info => info && isString(info.title)
      );
    } catch (error) {
      this.infos = [];
      console.log(error);
    }
  }

  getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      const getPosition = () =>
        Geolocation.getCurrentPosition(
          ({ coords }) => {
            resolve(coords);
          },
          error => {
            console.log("getCurrentPosition failed", error);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            showLocationDialog: false,
            timeout: 15000,
            maximumAge: 10000
          }
        );

      Permissions.check("location").then(permissions => {
        if (permissions === "undetermined") {
          Permissions.request("location")
            .then(response => {
              getPosition();
            })
            .catch(e => {
              reject(e);
            });
        } else {
          getPosition();
        }
      });
    });
  };

  @action
  async getWeather() {
    try {
      this.city =
        session.user.patientSheet && session.user.patientSheet.adresseCity
          ? session.user.patientSheet.adresseCity
          : this.city;
      if (!this.city) {
        const ip = await publicIP();
        const { data } = await axios.get(
          `http://api.ipstack.com/` +
            ip +
            `?access_key=6a8875aef8656792fe32e83dbec14f88&format=1`
        );
        this.city = data.city;
      }
      await this.temperature(this.city);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  async temperature(city) {
    try {
      const { data } = await axios.get(
        "http://api.apixu.com/v1/forecast.json?key=32df9829b4c84bfc994230724170803&q=" +
          city
      );
      this.tempC = data.current.temp_c;
      this.humidity = data.current.humidity;
    } catch (error) {
      console.log(error);
    }
  }

  @action
  setListContacts() {
    this.list.navigation.value.find(
      elt => elt.title == "CONTACTS"
    ).navigation.value = [];
    session.user.patientContact.map(contact =>
      this.list.navigation.value
        .find(elt => elt.title == "CONTACTS")
        .navigation.value.push({
          title: contact.firstname,
          value: contact,
          navigation: {
            type: "children",
            value: [
              {
                title: "VIDÉO",
                image: images.videoCall,
                imageSelected: images.videoCallSelected,
                navigation: {
                  type: "idScreen",
                  value: { screen: "AppelBureau", id: contact.id }
                }
              },
              {
                title: "MOBILE",
                image: images.smartphone,
                imageSelected: images.smartphoneSelected,
                navigation: {
                  type: "idScreen",
                  value: { screen: "AppelMobile", id: contact.id }
                }
              },
              {
                title: "DOMICILE",
                image: images.homePhone,
                imageSelected: images.homePhoneSelected,
                navigation: {
                  type: "idScreen",
                  value: { screen: "AppelDomicile", id: contact.id }
                }
              },
              {
                title: "BUREAU",
                image: images.telephone,
                imageSelected: images.telephoneSelected,
                navigation: {
                  type: "idScreen",
                  value: { screen: "AppelBureau", id: contact.id }
                }
              },
              {
                title: "MESSAGERIE",
                image: images.chat,
                imageSelected: images.chatSelected,
                navigation: {
                  type: "idScreen",
                  value: { screen: "Messsagerie", id: contact.id }
                }
              }
            ]
          }
        })
    );
  }

  @computed
  get count() {
    return this.list.length;
  }

  @action
  defineNavigationCases() {
    this.navigationCases = {
      screen: input => {
        KeyEvent.removeKeyUpListener();
        navigator.navigate(input.navigation.value);
      },
      idScreen: input =>
        navigator.navigate(input.navigation.value.screen, {
          id: input.navigation.value.id
        }),
      url: input =>
        navigator.navigate("WebPage", { url: input.navigation.value }),
      children: input => this.navigateToChildren(input),
      none: () => null,
      run: (fn, input) => fn(input)
    };
  }

  @action
  navigateToChildren(childrenList) {
    this.loading = true;
    this.listOfLists.push(this.list);
    this.listOfLists.replace(this.listOfLists);
    this.list = childrenList;
    this.loading = false;
  }

  @action
  applyEvents() {
    this.reset();
    KeyEvent.onKeyUpListener(keyEvent => {
      if (!gateway.callDialog && !robot.robotIpDialog) {
        this.events.run(this.events[keyEvent.keyCode], keyEvent.keyCode);
      } else if (gateway.callDialog) {
        this.callEvents.run(
          this.callEvents[keyEvent.keyCode],
          keyEvent.keyCode
        );
      } else if (robot.robotIpDialog) {
        this.robotIpEvents.run(
          this.robotIpEvents[keyEvent.keyCode],
          keyEvent.keyCode
        );
      }
    });
  }

  @action
  goBack() {
    if (this.listOfLists.length > 0) {
      this.loading = true;
      this.list = this.listOfLists[this.listOfLists.length - 1];
      this.listOfLists.pop();
      this.listOfLists.replace(this.listOfLists);
    }
    this.refreshLevelsList();
    this.initSelectedElement();
    this.loading = false;
  }

  @action
  navigateTo(elt) {
    this.initSelectedElement();
    // this.navigationCases.run(
    //   this.navigationCases[navigation.type],
    //   navigation.value
    // );
    this.navigationCases.run(this.navigationCases[elt.navigation.type], elt);
    this.refreshLevelsList();
  }

  // Configuration
  @action
  setEventsConfiguration() {
    // events configuration
    this.events = {
      24: () => gateway.volUp(),
      25: () => gateway.volDown(),
      135: () => this.reset(), // KEYCODE_F5 : return to principal menu
      20: () => this.downEvent(), // KEYCODE_DPAD_DOWN: navigate between levels
      19: () => this.upEvent(), // KEYBOARD_DPAD_UP
      22: () => this.rightEvent(), // KEYBOARD_DPAD_RIGHT: move between the level components on right direction
      5: () => this.call(),
      // 3: () => this.init(),
      111: () => this.goBack(),
      100: () => gateway.hangup(),
      21: () => this.leftEvent(), //  KEYCODE_DPAD_LEFT:  move between the level components on right direction
      66: () =>
        this.level != null && this.selected != null
          ? this.actions.run(this.actions[this.level])
          : this.initNavigationEvents(), // KEYCODE_ENTER: apply "onPress" action of the current component
      none: () => null,
      run: (fn, keyCode) =>
        Object.keys(this.events).find(key => key == keyCode) ? fn() : null
    };

    // 0:  action of level 0 (Menu)
    // 1! action of level 1 (Header --> call or go back)
    this.actions = {
      0: () =>
        this.list.navigation.value[this.selected].navigation.value
          ? this.navigateTo(this.list.navigation.value[this.selected])
          : null,
      1: () => {
        this.headerEvents.run(
          this.headerEvents[this.levels[this.level].value[this.selected]]
        );
      },
      none: () => null,
      run: fn => fn()
    };
    // actions of header level
    this.headerEvents = {
      // back: () => (this.page === "Home" ? this.goBack() : app.goBack(null)),
      back: () => this.goBack(),
      call: () => gateway.callService(),
      home: () => this.init(),
      run: fn => fn()
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

  @action
  initSelectedElement() {
    this.selected = null;
    this.level = null;
  }

  @action
  initNavigationEvents() {
    this.selected = 0;
    this.level = 0;
    this.emptyList();
  }

  @action
  refreshLevelsList() {
    if (this.levels.length > 0) {
      this.levels[1].value =
        this.listOfLists.length === 0 ? ["call"] : ["back"];
      this.levels[0].value = this.list;
      this.levels.replace(this.levels);
    }
  }

  @action
  upEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    } else {
      this.selected = 0;
      this.level = this.level === this.levels.length - 1 ? 0 : this.level + 1;
      this.emptyList();
    }
  }

  @action
  rightEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    } else {
      const list = this.levels[this.level].value;
      if (this.level == 0) {
        this.selected =
          this.selected === list.navigation.value.length - 1
            ? 0
            : this.selected + 1;
      } else {
        this.level = list.length == 1 ? 0 : this.level;
        this.selected =
          this.selected === list.length - 1 ? 0 : this.selected + 1;
      }
      this.emptyList();
    }
  }

  @action
  downEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    } else {
      this.selected = 0;
      this.level = this.level === 0 ? this.levels.length - 1 : this.level - 1;
      this.emptyList();
    }
  }

  emptyList() {
    if (this.level == 0 && this.list.navigation.value.length == 0) {
      this.selected = 0;
      this.level = 1;
    }
  }

  @action
  leftEvent() {
    if (this.selected == null || this.level == null) {
      this.initNavigationEvents();
    } else {
      const list = this.levels[this.level].value;
      if (this.level == 0) {
        this.selected =
          this.selected === 0
            ? list.navigation.value.length - 1
            : this.selected - 1;
      } else if (this.level == 1 && list.length == 1) {
        this.level = 0;
        this.selected = 0;
      }
      this.emptyList();
    }
  }

  @action
  setPage(pageName) {
    this.page = pageName;
  }
}

export default Springboard;
