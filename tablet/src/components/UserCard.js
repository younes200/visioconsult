import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Right,
  Text,
  Left,
  Icon,
  Button,
  Body,
  Thumbnail
} from "native-base";

const UserCard = ({ onPress, id, username }) => (
  <TouchableOpacity onPress={onPress}>
    <Card
      transparent
      style={{
        borderRadius: 8
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowRadius: 2,
        // shadowOpacity: 0.24,
      }}
    >
      <CardItem style={{ borderRadius: 8 }}>
        <Body>
          <Thumbnail
            large
            source={{ uri: "https://randomuser.me/api/portraits/men/83.jpg" }}
          />
          <Text>{username}, 41 ans</Text>
        </Body>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({});

export default UserCard;
