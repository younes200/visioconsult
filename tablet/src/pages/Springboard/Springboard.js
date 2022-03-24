import React, { Component } from "react";
import I18n from "I18n";
import {
  View,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  // Modal,
  Keyboard,
  DeviceEventEmitter
} from "react-native";
import { Text, Icon, Button, Thumbnail, Fab } from "native-base";
import { observer, inject } from "mobx-react";
import { withNavigationFocus } from "react-navigation";
import Modal from "react-native-modal";
import Spinner from "components/Spinner";
import BackButton from "components/BackButton";
import Image from "react-native-fast-image";
import KeyEvent from "react-native-keyevent";
import styles from "./styles";
import Card from "./Card";
import { Screen } from "components";
import moment from "moment";
import images from "@assets/images";
import LinearGradient from "react-native-linear-gradient";
import VerticalMarquee from "./VerticalMarquee";
import HorizontalMarquee from "./HorizontalMarquee";
import SystemSetting from "react-native-system-setting";
import { Immersive } from "react-native-immersive";

const iOS = Platform.OS === "ios";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const CARD_WIDTH = WINDOW_WIDTH / 5;
const HEIGHT = Dimensions.get("window").height / 3;
const WIDTH = Dimensions.get("window").width;
const VOLUME_TYPE = [
  "music",
  "system",
  "call",
  "ring",
  "alarm",
  "notification"
];

@withNavigationFocus
@inject("springboard", "session", "gateway", "robot")
@observer
export default class Springboard extends Component {
  state = {
    day: moment().format("DD"),
    month: moment().format("MM"),
    currentTime: moment().format("HH:mm"),
    currentDate: moment()
      .format("dddd Do MMMM")
      .toUpperCase(),
    weather: null,
    volIndex: 2,
    volume: 0,
    volType: VOLUME_TYPE[2]
  };

  async componentDidMount() {
    setInterval(async () => {
      this.setState({
        day: moment().format("D"),
        month: moment().format("M"),
        currentTime: moment().format("HH:mm"),
        currentDate: moment()
          .format("dddd Do MMMM")
          .toUpperCase()
      });
      // console.log(this.state)
      await this.props.springboard.getWeather();
    }, 1000);

    DeviceEventEmitter.addListener("ON_HOME_BUTTON_PRESSED", () =>
      this.props.springboard.init()
    );
    this.props.springboard.setPage("Home");
    this.props.springboard.applyEvents();
  }

  wrapperOnLayout(e) {
    this.setState({
      height: Math.round(e.nativeEvent.layout.height)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      setInterval(async () => {
        this.setState({
          currentTime: moment().format("HH:mm"),
          currentDate: moment()
            .format("dddd Do MMMM")
            .toUpperCase()
        });
        await this.props.springboard.getWeather();
      }, 1000);
      this.props.springboard.setPage("Home");
      this.props.springboard.applyEvents();
    }
  }

  componentDidUpdate() {
    this.props.gateway.checkGatewayServerIsAvailable();
    Immersive.getImmersive().then(
      isImmersive => (isImmersive ? Immersive.on() : null)
    );
  }

  componentWillUnmount() {
    // // if you are listening to keyDown
    // KeyEvent.removeKeyDownListener();

    // if you are listening to keyUp
    KeyEvent.removeKeyUpListener();

    // // Volume
    SystemSetting.removeListener(this.volumeListener);

    // // if you are listening to keyMultiple
    // KeyEvent.removeKeyMultipleListener();
  }

  renderHeaderLeftContent = () => {
    const { listOfLists, selected, level, levels } = this.props.springboard;
    return (
      <View style={styles.headerLeftContainer}>
        {listOfLists.length <= 0 ? this.renderWeatherHeader() : null}
      </View>
    );
  };

  renderWeatherHeader = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={images.weather}
            style={styles.imgWeather}
            resizeMode="contain"
          />
          <Text style={styles.headerLabel}>{`${
            this.props.springboard.tempC
          } °C`}</Text>
        </View>
      </View>
    );
  };

  renderCallService = () => {
    const {
      level,
      selected,
      headerComponents,
      levels
    } = this.props.springboard;

    return (
      <View style={styles.headerRightContainer}>
        {this.props.springboard.listOfLists.length === 0 ? (
          <View style={styles.headerRightContent}>
            <TouchableOpacity onPress={() => this.props.gateway.callService()}>
              <View
                style={[
                  headerComponents[selected] === "call" && level == 1
                    ? styles.imgOperatorBackground
                    : null,
                  styles.imgOperatorContainer
                ]}
              >
                <View
                  style={[
                    headerComponents[selected] === "call" && level == 1
                      ? styles.imgOperatorBorder
                      : null,
                    styles.imgOpMargin
                  ]}
                >
                  <Image
                    source={
                      headerComponents[selected] === "call" && level == 1
                        ? images.operatorSelected
                        : images.operator
                    }
                    resizeMethod="auto"
                    style={[styles.imgOperator]}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.headerLabel}>SERVICE</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  renderHeaderMiddleContent = () => {
    const { listOfLists, list } = this.props.springboard;
    if (
      listOfLists.length > 0 &&
      listOfLists[listOfLists.length - 1].title == "CONTACTS" &&
      list.value
    ) {
      return this.renderContactHeader();
    }

    if (list.title === "Principal") {
      return this.renderTimerHeader();
    }

    return this.renderListItem();
  };
  renderTimerHeader = () => (
    <View style={[styles.headerCenterContainer]}>
      <Text style={styles.timer}>{this.state.currentTime}</Text>
      <Text style={styles.currentDate}>{this.state.currentDate}</Text>
    </View>
  );

  renderContactHeader = () => (
    <View style={styles.headerCenterContainer}>
      <Image
        style={styles.contactImage}
        // large
        // Square
        source={
          this.props.springboard.list.value.photo &&
          this.props.springboard.list.value.photo.url
            ? { uri: this.props.springboard.list.value.photo.url }
            : images.avatar
        }
        resizeMode="stretch"
      />
      <Text
        style={{
          fontSize: 27,
          fontWeight: "500",
          color: "#CCD1D1",
          marginTop: 15
        }}
      >
        {this.props.springboard.list.value.firstname}
      </Text>
    </View>
  );

  renderListItem = () => (
    <View style={styles.headerCenterContainer}>
      <Image
        style={styles.listItemImage}
        // large
        // Square
        source={this.props.springboard.list.image}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 50,
          fontWeight: "500",
          color: "#fff",
          marginTop: 15
        }}
      >
        {this.props.springboard.list.title}
      </Text>
    </View>
  );

  renderHeader = () => {
    const { listOfLists, list } = this.props.springboard;
    return (
      <View
        style={[
          listOfLists.length <= 0 ? { height: "35%" } : { height: "25%" },
          styles.header
        ]}
      >
        {this.renderHeaderLeftContent()}
        {this.renderHeaderMiddleContent()}
        {this.renderCallService()}
      </View>
    );
  };

  renderInfos = () => {
    const { tempC, humidity, city, stJour } = this.props.springboard;
    const { day, month } = this.state;
    return (
      <View style={styles.infosContainer}>
        <HorizontalMarquee
          text={`Aujourd'hui : St. ${
            stJour[month - 1][day - 1]
          }    --       Température ambiante : ${tempC}°C        --       Humidité : ${humidity} %`}
          textStyle={{ fontSize: 40, color: "#ffffff" }}
          containerStyle={styles.infoWeather}
        />

        <VerticalMarquee />

        <View style={styles.logoContainer}>
          <View style={[styles.logoContent, { justifyContent: "flex-start" }]}>
            <Image
              style={styles.logoIcons}
              source={images.envelope}
              resizeMode="contain"
            />
            <Image
              style={styles.logoIcons}
              source={images.cassette}
              resizeMode="contain"
            />
            <Image
              style={styles.logoIcons}
              source={images.aclock}
              resizeMode="contain"
            />
            <Image
              style={styles.logoIcons}
              source={images.pillSelected}
              resizeMode="contain"
            />
          </View>
          <View style={styles.logoTextContent}>
            <Text style={styles.logoText}>VisioConsult</Text>
          </View>
          <View style={[styles.logoContent, { justifyContent: "flex-end" }]}>
            <Image
              style={styles.logoIcons}
              source={images.wifiSelected}
              resizeMode="contain"
            />
            <Image
              style={styles.logoIcons}
              source={images.ethernet}
              resizeMode="contain"
            />
            <Image
              style={styles.logoIcons}
              source={images.cloudComputing}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
  };

  renderFooter = () => {
    const { listOfLists, selected, level, levels } = this.props.springboard;
    return (
      <View style={styles.footerContainer}>
        {listOfLists.length > 0 ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.props.springboard.goBack()}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={[
                    styles.backContainer,
                    levels[level] && levels[level].value[selected] === "back"
                      ? styles.backContainerSelected
                      : null
                  ]}
                >
                  <View
                    style={[
                      styles.backContent,
                      levels[level] && levels[level].value[selected] === "back"
                        ? styles.backContentSelected
                        : null
                    ]}
                  >
                    <Image
                      source={images.back}
                      resizeMethod="auto"
                      style={[styles.imgBack]}
                    />
                  </View>
                </View>
                <Text
                  style={{ color: "#ffffff", fontSize: 30, fontWeight: "500" }}
                >
                  Retour
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => this.props.springboard.init()}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={[
                    styles.backContainer,
                    levels[level] && levels[level].value[selected] === "home"
                      ? styles.backContainerSelected
                      : null
                  ]}
                >
                  <View
                    style={[
                      styles.backContent,
                      {
                        height: WIDTH / 12,
                        paddingHorizontal: 10,
                        paddingVertical: 10
                      },
                      levels[level] && levels[level].value[selected] === "home"
                        ? styles.backContentSelected
                        : null
                    ]}
                  >
                    <Icon
                      type="Feather"
                      name="home"
                      style={[{ color: "red", fontSize: 120 }]}
                    />
                  </View>
                </View>
                <Text
                  style={{ color: "#ffffff", fontSize: 30, fontWeight: "500" }}
                >
                  Accueil
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
        ) : (
          this.renderInfos()
        )}

        {/* <Image
          source={images.logo}
          resizeMethod="auto"
          style={styles.imageLogo}
        /> */}
      </View>
    );
  };

  renderBody = () => {
    const {
      list,
      selected,
      level,
      loading,
      listOfLists
    } = this.props.springboard;
    if (loading) {
      return <Spinner />;
    }
    return (
      <View
        style={[
          listOfLists.length <= 0 ? { height: "40%" } : { height: "50%" },
          styles.listContainer
        ]}
      >
        <LinearGradient
          colors={["#143D57", "#143D57", "#1F5273"]}
          style={styles.listContent}
        >
          {list.title == "CONTACTS" && list.navigation.value.length <= 0 ? (
            <View style={{ paddingVertical: 40 }}>
              <Text style={{ color: "#ffffff", fontSize: 45 }}>
                Aucun contact trouvé
              </Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={list.navigation.value}
              renderItem={({ item, index }) => (
                <Card
                  index={index}
                  title={item.title}
                  icon={item.icon}
                  content={item.value}
                  image={item.image}
                  imageSelected={item.imageSelected}
                  selected={selected === index && level === 0}
                  onPress={() => {
                    this.props.springboard.navigateTo(item);
                  }}
                />
              )}
            />
          )}
        </LinearGradient>
      </View>
    );
  };

  render() {
    return (
      <Screen>
        <View
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </View>
      </Screen>
    );
  }
}
