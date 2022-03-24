import React from "react";
import I18n from "I18n";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions
} from "react-native";
import {
  Title,
  Button,
  Text,
  Container,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { inject, observer } from "mobx-react/native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

@inject("app", "session")
@observer
export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  onSuccess = async ({ data }) => {
    try {
      await this.props.session.loginWithToken(data);
    } catch (e) {
      Alert.alert(
        "Authentification",
        "Authentification failed ",
        [
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate("Landing"),
            style: "cancel"
          },
          { text: "Retry", onPress: () => this.scanner.reactivate() }
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <QRCodeScanner
        ref={node => {
          this.scanner = node;
        }}
        cameraStyle={{ height: deviceHeight, width: deviceWidth }}
        onRead={this.onSuccess}
        // checkAndroid6Permissions
        showMarker
        reactivateTimeout={300}
        cameraProps={{ type: RNCamera.Constants.Type.front }}
        fadeIn={false}
      />
    );
  }
}
