import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { CircleSnail } from "react-native-progress";
import AnimatedHideView from "components/AnimatedHideView";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    ...StyleSheet.absoluteFillObject
  }
});

const Spinner = props => (
  <AnimatedHideView
    visible={props.visible}
    style={props.overlay ? [styles.overlay, props.style] : props.style}
  >
    <CircleSnail
      size={props.size}
      indeterminate={props.percent === 0}
      progress={props.percent > 0 ? props.percent / 100 : 0}
      useNativeDriver
      thickness={props.size / 10}
      color={props.color}
    />

    {/* {props.label ? (
      <Text style={{ color: props.color }}>{props.label}</Text>
    ) : null} */}
  </AnimatedHideView>
);

Spinner.defaultProps = {
  size: 30,
  percent: 0,
  color: "#ffffff",
  backgroundColor: "rgba(0,0,0,0.5)",
  visible: true,
  overlay: false
};

Spinner.propTypes = {
  size: PropTypes.number,
  percent: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  visible: PropTypes.bool,
  overlay: PropTypes.bool
};

export default Spinner;
