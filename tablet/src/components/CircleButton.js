import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text } from "native-base";
import variables from "theme/variables/commonColor";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },

  circleShape: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    color: variables.btnPrimaryColor
  },
  active: {
    backgroundColor: variables.btnPrimaryBg
  },
  labelStyle: {
    marginVertical: 10,
    fontWeight: "500"
  }
});

const CircleButton = ({
  label,
  active,
  onPress,
  children,
  size,
  labelStyle
}) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        flex: 0
      }}
    >
      <View
        style={[
          styles.circleShape,
          active ? styles.active : null,
          {
            width: size,
            height: size,
            borderRadius: size / 2
          }
        ]}
      >
        {children}
      </View>
      {label ? (
        <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
      ) : null}
    </View>
  </TouchableOpacity>
);

CircleButton.defaultProps = {
  size: 30
};

CircleButton.propTypes = {
  size: PropTypes.number
};

export default CircleButton;
