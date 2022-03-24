import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { StyleSheet, View, Slider, Text, Dimensions } from "react-native";
import { Icon } from "native-base";
import Modal from "react-native-modal";
const WIDTH = Dimensions.get("window").width;

export default class VolumeControlSlider extends Component {
  render() {
    const {
      title,
      iconName,
      iconType,
      onVolumeChange,
      value,
      isVisible
    } = this.props;
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <Icon type={iconType} name={iconName} style={styles.icon} />
          </View>
          <Slider
            value={value}
            style={styles.slider}
            onValueChange={value => onVolumeChange(value)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    // padding: 8,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 40
  },
  row: {
    flexDirection: "row"
    //  justifyContent: 'flex-start'
  },
  title: {
    fontSize: 22,
    marginBottom: 10

    // color: "#6F6F6F",
  },
  icon: {
    color: "#138D75",
    justifyContent: "center"
  },
  slider: {
    width: "100%",
    marginVertical: 20
  }
});
