import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  NativeModules,
  BackHandler,
  Image,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { Divider, Card } from "./components";

import { Container } from "native-base";
import { observer, inject } from "mobx-react";
import { Screen } from "components";

// @connectDialog
@inject("springboard", "session")
@observer
export default class Discover extends Component {
  sallApps;
  componentWillMount() {
    // console.log("All packages", JSON.parse(NativeModules.InstalledApps.getApps));
    allApps = JSON.parse(NativeModules.InstalledApps.getApps);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", function() {
      return true;
    });
  }
  handleOnPress = app => {
    NativeModules.InstalledApps.launchApplication(app.name);
  };

  render() {
    return (
      <Screen>
        <ScrollView style={styles.container} vertical>
          {allApps.map((app, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => this.handleOnPress(app)}
                style={styles.appListItem}
              >
                <Image
                  style={styles.icon}
                  resizeMode={"contain"}
                  source={{ uri: "data:image/png;base64," + app.icon }}
                />
                <Text style={styles.text}>{app.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Screen>
    );
  }
}
