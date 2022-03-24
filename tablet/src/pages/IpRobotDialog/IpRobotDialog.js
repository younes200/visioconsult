import Modal from "react-native-modal";
import React from "react";
import {
  Platform,
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput
} from "react-native";
import {
  Container,
  Text,
  Button,
  Icon,
  Thumbnail,
  Item,
  Input
} from "native-base";
import { observer, inject } from "mobx-react";
import AnimatedListRow from "components/AnimatedListRow";
import GlobalStyles from "components/Styles";
import Config from "react-native-config";
import images from "@assets/images";
import KeyEvent from "react-native-keyevent";
import styles from "./styles";
import VolumeControlSlider from "components/VolumeControlSlider";
import SystemSetting from "react-native-system-setting";
const WIDTH = Dimensions.get("window").width;

@inject("gateway", "springboard", "robot")
@observer
export default class IpRobotDialog extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  async componentWillMount() {
    await this.props.springboard.initRobotIpDialogEvent();
    KeyEvent.onKeyUpListener(keyEvent => {
      this.props.springboard.robotIpEvents.run(
        this.props.springboard.robotIpEvents[keyEvent.keyCode],
        keyEvent.keyCode
      );
    });
    this.volumeListener = SystemSetting.addVolumeListener(data => {
      this.props.springboard.setVolume(data["notification"]);
    });
  }

  componentWillUnmount() {
    // if you are listening to keyUp
    KeyEvent.removeKeyUpListener();
  }

  componentDidUpdate() {
    if (this.props.springboard.robotIpSelected == 0) {
      this.textInput.focus();
    }
  }

  render() {
    const { robotIpDialog, error, host, robotIpFocus } = this.props.robot;
    const { robotIpSelected } = this.props.springboard;
    return (
      <Modal
        isVisible={robotIpDialog}
        animationOut="fadeOut"
        animationIn="fadeIn"
        hasBackdrop
        useNativeDriver
        hideModalContentWhileAnimating
        style={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Connecxion au robot</Text>
            <View style={styles.userInfos}>
              <Item
                rounded
                style={[
                  styles.inputItem,
                  error ? { borderColor: "red", border: 2 } : null
                ]}
              >
                <TextInput
                  ref={r => {
                    this.textInput = r;
                  }}
                  placeholder="Saisir l'adresse IP du Robot"
                  onChangeText={text => this.props.robot.setHost(text)}
                  defaultValue={host}
                  value={host}
                  style={styles.input}
                  autoFocus={robotIpSelected == 0}
                />
              </Item>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              large
              primary
              rounded
              style={[
                styles.button,
                robotIpSelected == 1
                  ? { borderColor: "#E74C3C", borderWidth: 4 }
                  : null
              ]}
              onPress={() => this.props.robot.connect()}
            >
              <Text>Valider</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
