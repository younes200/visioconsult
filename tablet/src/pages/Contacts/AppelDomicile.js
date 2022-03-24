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
@inject("springboard", "session", "gateway")
@observer
export default class Discover extends Component<NavigationScreenProp> {
  componentDidMount() {
    KeyEvent.onKeyUpListener(keyEvent => {
      if (keyEvent.keyCode == 24) {
        this.props.gateway.volUp();
      }

      if (keyEvent.keyCode == 25) {
        this.props.gateway.volDown();
      }
    });
  }
  render() {
    const { height, width } = Dimensions.get("window");
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }
}
