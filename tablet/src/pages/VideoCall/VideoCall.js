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
  Slider,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Container, Text, Icon } from "native-base";
import { observer, inject } from "mobx-react";
import BackButton from "components/BackButton";
import KeyEvent from "react-native-keyevent";
import AnimatedListRow from "components/AnimatedListRow";
import GlobalStyles from "components/Styles";
import Config from "react-native-config";
import images from "@assets/images";
import SystemSetting from "react-native-system-setting";
import VolumeControlSlider from "components/VolumeControlSlider";
import { RTCView } from "react-native-webrtc";
import styles from "./styles";

const VOLUME_TYPE = [
  "music",
  "system",
  "call",
  "ring",
  "alarm",
  "notification"
];
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

@inject("gateway", "videoCall")
@observer
export default class VideoCall extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    // micMuted: false,
  };

  componentDidMount() {
    this.props.videoCall.applyEvents();

    this.volumeListener = SystemSetting.addVolumeListener(data => {
      this.props.videoCall.setVolume(data["call"]);
    });
  }

  componentDidUpdate() {
    this.props.gateway.checkGatewayServerIsAvailable();
  }

  ValueView = () => (
    <View
      style={{
        width: WIDTH / 3,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
    >
      <VolumeControlSlider
        value={this.props.videoCall.volume}
        onVolumeChange={value => this.props.videoCall.changeVol(value)}
        iconName={"call"}
        iconType={"Ionicons"}
        title={"Volume d'appel en cours"}
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

  componentWillUnmount() {
    this.props.gateway.hangup();

    // if you are listening to keyUp
    KeyEvent.removeKeyUpListener();

    // Volume
    // SystemSetting.removeListener(this.volumeListener);
  }

  // setMicrophoneMute() {
  //   this.setState({ micMuted: !this.state.micMuted });
  //   this.props.gateway.setMicrophoneMute(this.state.micMuted);
  // }

  renderCallOptions = () => {
    const { selected, level, levels } = this.props.videoCall;
    return (
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => this.props.gateway.toggleVideoMute()}
          >
            <View style={[styles.option]}>
              {this.props.gateway.videoMuted ? (
                <Icon
                  name="videocam"
                  type="Ionicons"
                  style={styles.iconOption}
                />
              ) : (
                <Icon
                  name="camcorder-off"
                  type="MaterialCommunityIcons"
                  style={styles.iconOption}
                />
              )}
              <Text
                style={[
                  styles.label,
                  level == 0 && selected == 0 ? styles.selectedText : null
                ]}
              >
                Camera
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.gateway.toggleAudioMute()}
          >
            <View style={[styles.option]}>
              {!this.props.gateway.audioMuted ? (
                <Icon
                  name="mic-off"
                  type="Ionicons"
                  style={styles.iconOption}
                />
              ) : (
                <Icon name="mic" type="Ionicons" style={styles.iconOption} />
              )}
              <Text
                style={[
                  styles.label,
                  level == 0 && selected == 1 ? styles.selectedText : null
                ]}
              >
                Microphone
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.gateway.hangup()}>
            <View style={[styles.option]}>
              <Icon
                name="phone-hangup"
                type="MaterialCommunityIcons"
                style={[styles.iconOption, { color: "red" }]}
              />
              <Text
                style={[
                  styles.label,
                  level == 0 && selected == 2 ? styles.selectedText : null
                ]}
              >
                Terminer
              </Text>
            </View>
          </TouchableOpacity>
          {/* <View style={styles.option}>
          <Icon name="call" type="MaterialIcons" style={[styles.iconOption, {color: "green"}]} />
          <Text style={styles.label}>Appeler</Text>
        </View> */}
        </View>
      </View>
    );
  };

  renderHeaderGoBack() {
    const { selected, level, levels } = this.props.videoCall;

    return (
      <View style={[styles.header, { width: WIDTH / 3 }]}>
        <BackButton
          selected={level == 1 && selected == 0 ? styles.selected : null}
          onPress={() => this.props.gateway.hangup()}
        />
      </View>
    );
  }

  render() {
    const { showVolSlider } = this.props.videoCall;
    return (
      <Container style={styles.container}>
        <View style={styles.remoteStreamContainer}>
          {this.props.gateway.remoteStream ? (
            <RTCView
              objectFit="cover"
              streamURL={this.props.gateway.remoteStream}
              style={styles.remoteStream}
              zOrder={0}
            />
          ) : (
            <View style={styles.busyContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>

        <View style={styles.localStreamContainer}>
          {this.props.gateway.videoMuted ? null : this.props.gateway
            .localStream ? (
            <RTCView
              objectFit="cover"
              streamURL={this.props.gateway.localStream}
              style={styles.localStream}
              zOrder={1}
            />
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
        </View>

        <View style={styles.content}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            {this.renderHeaderGoBack()}
            {/* {showVolSlider ? this.ValueView() : null} */}
          </View>

          {this.renderCallOptions()}
        </View>
      </Container>
    );
  }
}
