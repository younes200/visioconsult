import React from "react";
import I18n from "I18n";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { observer, inject } from "mobx-react";
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Button,
  Icon
} from "native-base";
import ImagePicker from "components/ImagePicker";
import Spinner from "components/Spinner";

import Config from "react-native-config";

const styles = StyleSheet.create({
  username: {
    fontSize: 30,
    fontWeight: "bold"
  },
  lightWeight: {
    fontWeight: "100"
  },
  boldWeight: {
    fontWeight: "bold",
    fontSize: 18
  },
  note: {
    fontWeight: "200",
    fontSize: 14,
    color: "#697079"
  },
  genderSign: {
    fontSize: 20,
    color: "#697079"
  },
  ageAndLocation: {
    fontSize: 15,
    color: "#697079"
  },
  list: {
    marginTop: 30
  },
  listItem: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    height: 80,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 10
  },
  highlightItem: {
    backgroundColor: "#DADEE6"
  },
  listItemRight: {
    flex: 0,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  itemLeftIcon: {
    color: "#393f49",
    fontSize: 20
  },
  container: {
    backgroundColor: "#F5F5F5"
  },
  content: {},
  divider: {
    backgroundColor: "#ffffff"
  }
});

@connectActionSheet
@inject("editProfile", "session")
@observer
export default class MyProfile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentWillMount() {
    this.props.editProfile.refresh();
  }

  openImagePicker = async () => {
    let customButtons = null;
    if (this.props.editProfile.picture) {
      customButtons = [{ name: "delete", title: "Delete Photo" }];
    }

    const response = await ImagePicker.showImagePicker(customButtons);
    if (response.customButton) {
      this.props.showAlertDialog(
        `Are you sure ?`,
        [
          {
            text: "OK",
            onPress: () => {
              this.props.editProfile.deletePhoto();
              this.props.dismissDialog();
            }
          }
        ],
        {
          cancelable: true
        }
      );
    } else {
      try {
        await this.props.editProfile.uploadPhoto(response);
      } catch (e) {
        debug.log("error ", e);
        this.props.showAlertDialog(
          `Upload photo failed`,
          [{ text: "OK", onPress: () => this.props.dismissDialog() }],
          {
            cancelable: true
          }
        );
      }
    }
  };

  updateLocation = async () => {
    try {
      const result = await getLocation();
      debug.log(result);
    } catch (e) {
      debug.log(e);
    }
  };

  render() {
    const { user } = this.props.session;
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                overflow: "hidden",
                backgroundColor: this.props.session.user.color
              }}
              onPress={this.openImagePicker}
              disabled={this.props.editProfile.uploading}
            >
              <Image
                resizeMode="cover"
                style={{
                  flex: 1,
                  width: 150,
                  height: 150
                }}
                source={
                  this.props.editProfile.picture
                    ? { uri: this.props.editProfile.picture }
                    : this.props.session.user.thumbnail
                }
              />

              <Spinner
                size={30}
                overlay
                visible={this.props.editProfile.uploading}
                progress={this.props.editProfile.progress}
              />
            </TouchableOpacity>
            <Text style={styles.username}>
              {user.username}
              <Text style={styles.genderSign}>
                {I18n.t(`gender-sign-${user.gender}`)}
              </Text>
            </Text>
            <Text style={styles.ageAndLocation}>
              <Text>
                <Icon name="map-pin" style={styles.ageAndLocation} />{" "}
                {user.city} {user.countryEmoji}{" "}
              </Text>
              <Icon name="calendar" style={styles.ageAndLocation} />{" "}
              <Text>{I18n.t("age", { age: user.age })}</Text>
            </Text>
          </View>
          <List style={styles.list}>
            <ListItem
              icon
              noBorder
              style={styles.listItem}
              disabled={this.props.editProfile.localizing}
              onPress={() => this.props.editProfile.updateLocation()}
            >
              <Left>
                <Icon type="Feather" name="map" style={styles.itemLeftIcon} />
              </Left>
              <Body>
                <Text style={styles.boldWeight}>{user.city}</Text>
                <Text style={styles.note}>Update your current location ?</Text>
              </Body>
              <Right style={styles.listItemRight}>
                {this.props.editProfile.localizing ? (
                  <Spinner color="gray" />
                ) : (
                  <Icon name="navigation" style={{ color: "gray" }} />
                )}
              </Right>
            </ListItem>

            <ListItem icon noBorder style={styles.listItem}>
              <Left>
                <Icon type="Feather" name="phone" style={styles.itemLeftIcon} />
              </Left>
              <Body>
                <Text style={styles.boldWeight}>Verify your phone number</Text>
                <Text style={styles.note}>This allow to be more populare</Text>
              </Body>
              <Right style={styles.listItemRight}>
                <Icon
                  type="Feather"
                  name="alert-triangle"
                  style={{ color: "red" }}
                />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
