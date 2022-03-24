import React, { Component } from "react";
import I18n from "I18n";
import {
  View,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Linking
} from "react-native";
import {
  Container,
  Text,
  Right,
  Body,
  Button,
  Thumbnail,
  Fab,
  Left,
  Icon,
  Title
} from "native-base";
import { Observer, observer, inject } from "mobx-react";
import { NavigationScreenProp } from "react-navigation";
import KeyEvent from "react-native-keyevent";

// @connectDialog
@inject("springboard", "session", "gateway", "app")
@observer
export default class Discover extends Component<NavigationScreenProp> {
  componentWillMount() {
    this.props.app.setEventsConfiguration();
    KeyEvent.onKeyUpListener(keyEvent => {
      this.props.app.events.run(
        this.props.app.events[keyEvent.keyCode],
        keyEvent.keyCode
      );
    });
  }

  componentWillUnmount() {
    // if you are listening to keyUp
    KeyEvent.removeKeyUpListener();
    this.props.springboard.applyEvents();
  }

  render() {
    const { height, width } = Dimensions.get("window");
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }
}
