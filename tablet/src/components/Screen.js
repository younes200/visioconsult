import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Linking
} from "react-native";
import { Container } from "native-base";
import Image from "react-native-fast-image";
import { observer } from "mobx-react";
import images from "@assets/images";
import LinearGradient from "react-native-linear-gradient";

@observer
export default class Screen extends Component {
  render() {
    const { height, width } = Dimensions.get("screen");
    return (
      <Container>
        <LinearGradient
          colors={["#1F5273", "#162F3F", "#162F3F", "#1F5273"]}
          style={{ width, height }}
        >
          {this.props.children}
        </LinearGradient>
      </Container>
    );
  }
}
