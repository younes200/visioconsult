import React from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { withNavigation } from "react-navigation";

@withNavigation
export default class Page extends React.Component {
  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
