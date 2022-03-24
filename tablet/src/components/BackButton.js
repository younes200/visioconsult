import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon } from "native-base";
import variables from "theme/variables/commonColor";
import { observer } from "mobx-react";

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
  },
  selectedButton: {
    backgroundColor: "#B71C1C"
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 40
  }
});

const BackButton = observer(({ onPress, selected }) => (
  <Button
    rounded
    dark={!selected}
    style={[selected ? styles.selectedButton : null, styles.button]}
    onPress={onPress}
  >
    <Icon
      name="chevron-left"
      type="MaterialCommunityIcons"
      style={{
        marginRight: 0,
        // paddingVertical: 40,
        fontSize: 40
        // marginVertical: 20
      }}
    />

    <Text
      style={{
        fontSize: 27,
        fontWeight: "500",
        paddingTop: 10
      }}
    >
      Retour
    </Text>
  </Button>
));

export default BackButton;
