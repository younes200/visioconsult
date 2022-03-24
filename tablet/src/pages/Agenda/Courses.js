import React, { Component } from "react";
import I18n from "I18n";
import { View, Dimensions } from "react-native";
import { observer, inject } from "mobx-react";
import KeyEvent from "react-native-keyevent";

// @connectDialog
@inject("springboard", "session", "gateway", "app")
@observer
export default class Courses extends Component {
  componentWillMount() {
    this.props.app.setEventsConfiguration();
    KeyEvent.onKeyUpListener(keyEvent => {
      this.props.app.events.run(
        this.props.app.events[keyEvent.keyCode],
        keyEvent.keyCode
      );
    });
    this.props.springboard.setPage("Courses");
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
