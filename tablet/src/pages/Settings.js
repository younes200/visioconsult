import React from "react";
import { StyleSheet, Linking } from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { observer, inject } from "mobx-react";
import {
  Container,
  List,
  Icon,
  ListItem,
  Content,
  Left,
  Body,
  Text,
  Right
} from "native-base";
@connectActionSheet
@inject("app", "session")
@observer
export default class Settings extends React.Component {
  static navigationOptions = {
    header: null
  };

  _onOpenInviteActionSheet = () => {
    const options = ["Email", "Message", "Twitter", "Facebook", "Cancel"];
    const cancelButtonIndex = 4;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        let social = "";
        switch (buttonIndex) {
          case 0:
            social = "mail";
            break;
          case 1:
            social = "whatsapp";
            break;
          case 2:
            social = "twitter";
            break;
          case 3:
            social = "facebook";
            break;
          case 4:
        }
        // Share.shareSingle(
        //   Object.assign(this.shareOptions, {
        //     social
        //   })
        // );
      }
    );
  };

  _doLogout() {
    this.props.dismissDialog();
    this.props.session.logout();
    this.props.navigation.navigate("Landing");
  }

  _logOut = async () => {
    this.props.showAlertDialog(
      "Are you sure ?",
      [
        {
          text: "Disconnect",
          onPress: () => this._doLogout(),
          buttonProps: { danger: true }
        },
        {
          text: "Cancel",
          onPress: () => this.props.dismissDialog(),
          buttonProps: { transparent: true, dark: true }
        }
      ],
      {
        cancelable: true
      }
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <List>
            <ListItem
              icon
              onPress={() => Linking.openURL("app-settings://notifications")}
            >
              <Left>
                <Icon type="Feather" name="bell" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Notification</Text>
              </Body>
              <Right>
                <Icon
                  type="Feather"
                  name="chevron-right"
                  style={styles.itemIcon}
                />
              </Right>
            </ListItem>

            <ListItem itemDivider style={styles.divider} />
            <ListItem icon onPress={() => this._onOpenInviteActionSheet()}>
              <Left>
                <Icon type="Feather" name="share" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Invite a friend</Text>
              </Body>
              <Right />
            </ListItem>

            <ListItem icon last>
              <Left>
                <Icon type="Feather" name="mail" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Feedback</Text>
              </Body>
              <Right />
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon
                  type="Feather"
                  name="help-circle"
                  style={styles.itemIcon}
                />
              </Left>
              <Body>
                <Text>Help</Text>
              </Body>
              <Right />
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon type="Feather" name="award" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Terms of services</Text>
              </Body>
            </ListItem>

            <ListItem icon last>
              <Left>
                <Icon type="Feather" name="shield" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Privacy Policy</Text>
              </Body>
            </ListItem>

            <ListItem
              icon
              onPress={() => this.props.navigation.navigate("Dev")}
            >
              <Left>
                <Icon type="Feather" name="code" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Dev</Text>
              </Body>
              <Right>
                <Icon
                  type="Feather"
                  name="chevron-right"
                  style={styles.itemIcon}
                />
              </Right>
            </ListItem>

            <ListItem icon onPress={this._logOut}>
              <Body>
                <Text>Logout</Text>
              </Body>
              <Right>
                <Icon
                  type="Feather"
                  name="chevron-right"
                  style={styles.itemIcon}
                />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  itemIcon: {
    color: "#AFADAD",
    fontSize: 19
  },
  container: {
    backgroundColor: "#F5F5F5"
  },
  content: {},
  divider: {
    backgroundColor: "#F5F5F5"
  },
  logoutButton: {},
  footer: {
    backgroundColor: "white",
    paddingBottom: 60
  }
});
