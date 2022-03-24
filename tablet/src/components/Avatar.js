import React from "react";
import { Badge, Thumbnail } from "native-base";
import { Platform, StyleSheet, View } from "react-native";
import { observer } from "mobx-react";

// <Badge style={styles.badge} small success={props.user.online} danger={!props.user.online} />
const Avatar = props => (
  <View
    style={{
      backgroundColor: props.user.color,
      borderRadius: props.large ? 80 : props.small ? 18 : 28,
      overflow: "hidden"
    }}
  >
    <Thumbnail
      style={[styles.thumbnail, { backgroundColor: props.user.color }]}
      {...props}
      source={props.user.thumbnail}
    />
  </View>
);

const styles = StyleSheet.create({
  badge: {
    padding: 0,
    borderWidth: 2,
    borderColor: "white",
    ...StyleSheet.absoluteFillObject
  },
  thumbnail: {
    backgroundColor: "white"
  }
});

export default observer(Avatar);
