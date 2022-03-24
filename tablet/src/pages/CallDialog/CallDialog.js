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
  ActivityIndicator
} from "react-native";
import { Container, Text, Button, Icon, Thumbnail } from "native-base";
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

@inject("gateway", "springboard")
@observer
export default class CallDialog extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  async componentWillMount() {
    await this.props.springboard.initCallDialogEvent();
    KeyEvent.onKeyUpListener(keyEvent => {
      this.props.springboard.callEvents.run(
        this.props.springboard.callEvents[keyEvent.keyCode],
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

  ValueView = () => (
    <View
      style={{
        position: "absolute",
        top: 10,
        width: WIDTH / 3,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
    >
      <VolumeControlSlider
        value={this.props.springboard.volume}
        onVolumeChange={value => this.props.springboard.changeVol(value)}
        iconName={"volume_up"}
        iconType={"MaterialIcons"}
        title={"Volume"}
      />
      {/* <View style={styles.card}>
        <Text style={styles.title}>Volume d'appel en cours</Text>

        <View style={{flexDirection: 'row'}}>
          <Icon type='FontAwesome' name='phone-alt' style={{ color: '#81D4FA', marginHorizontal: 8,}} />
          <Slider
          // ref={refFunc}
          thumbTintColor='#81D4FA'
          value={this.props.videoCall.volume}
          style={{ width: "100%", marginVertical: 10, color: '#81D4FA' }}
          onValueChange={value => this.props.videoCall.changeVol(value)}
        />
        </View>
        
      </View> */}
    </View>
  );

  render() {
    const { operator, operatorName } = this.props.gateway;
    const { showVolSlider } = this.props.springboard;
    return (
      <Modal
        isVisible={this.props.gateway.callDialog}
        animationOut="fadeOut"
        animationIn="fadeIn"
        hasBackdrop
        useNativeDriver
        hideModalContentWhileAnimating
        style={styles.modal}
      >
        {/* {showVolSlider ? this.ValueView() : null}       */}
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Nouveau Appel</Text>
            <Text>{`Répondre à`}</Text>
            <View style={styles.userInfos}>
              <Thumbnail
                large
                source={
                  operator && operator.photo && operator.photo.url
                    ? { uri: operator.photo.url }
                    : images.avatar
                }
              />
              <Text>{operator ? operator.firstname : operatorName}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              large
              primary
              rounded
              style={[
                styles.button,
                this.props.springboard.callSelected == 0
                  ? { borderColor: "#E74C3C", borderWidth: 4 }
                  : null
              ]}
              onPress={() => this.props.gateway.answer()}
            >
              <Text>Répondre</Text>
            </Button>
            <Button
              large
              danger
              rounded
              style={[
                styles.button,
                this.props.springboard.callSelected == 1
                  ? { borderColor: "#0033CC", borderWidth: 4 }
                  : null
              ]}
              onPress={() => this.props.gateway.hangup()}
            >
              <Text>Decliné</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
