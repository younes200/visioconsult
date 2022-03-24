// @flow
import React from "react";
import { inject, observer } from "mobx-react";
import Modal from "react-native-modal";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { NetworkConsumer } from "react-native-offline";
import KeepAwake from "react-native-keep-awake";
import { fromTop } from "react-navigation-transitions";
import { StatusBar, View, Text } from "react-native";
import KeyEvent from "react-native-keyevent";
import { Root } from "native-base";
import AuthLoading from "pages/AuthLoading";
import Landing from "pages/Landing";
import EditProfile from "pages/EditProfile";

import Settings from "pages/Settings";

import Login from "pages/Login";
import Springboard from "pages/Springboard";
import MyProfile from "pages/MyProfile";
import WebPage from "pages/WebPage";
import Robot from "pages/Robot";
import VideoCall from "pages/VideoCall";

import Courses from "pages/Agenda/Courses";
import InfoMaire from "pages/Agenda/InfoMaire";
import Programme from "pages/Agenda/Programme";
import Taches from "pages/Agenda/Taches";

import Forme from "pages/BienEtre/Forme";
import Nutrition from "pages/BienEtre/Nutrition";
import Planete from "pages/BienEtre/Planete";
import Soins from "pages/BienEtre/Soins";
import Medecin from "pages/BienEtre/Medecin";

import Activite from "pages/BienEtre/Mesures/Activite";
import Saturation from "pages/BienEtre/Mesures/Saturation";
import Temperature from "pages/BienEtre/Mesures/Temperature";
import Tension from "pages/BienEtre/Mesures/Tension";

import Commande from "pages/BienEtre/Pharmacie/Commande";
import PharmaCatalogue from "pages/BienEtre/Pharmacie/PharmaCatalogue";
import PharmaPermanence from "pages/BienEtre/Pharmacie/PharmaPermanence";
import PharmaPlans from "pages/BienEtre/Pharmacie/PharmaPlans";
import PharmaWeb from "pages/BienEtre/Pharmacie/PharmaWeb";
import VisioConseil from "pages/BienEtre/Pharmacie/VisioConseil";
import VisioETP from "pages/BienEtre/Pharmacie/VisioETP";

import TraitementCoucher from "pages/BienEtre/Traitement/TraitementCoucher";
import TraitementMatin from "pages/BienEtre/Traitement/TraitementMatin";
import TraitementMidi from "pages/BienEtre/Traitement/TraitementMidi";
import TraitementSoir from "pages/BienEtre/Traitement/TraitementSoir";

import AppelBureau from "pages/Contacts/AppelBureau";
import AppelDomicile from "pages/Contacts/AppelDomicile";
import AppelMobile from "pages/Contacts/AppelMobile";
import AppelVideo from "pages/Contacts/AppelVideo";
import Messagerie from "pages/Contacts/Messagerie";

import Alarme from "pages/Domotique/Alarme";
import Capteurs from "pages/Domotique/Capteurs";
import Chauffage from "pages/Domotique/Chauffage";
import Eclairage from "pages/Domotique/Eclairage";
import VisioDOM from "pages/Domotique/VisioDOM";
import Volets from "pages/Domotique/Volets";

import Galerie from "pages/Loisirs/Galerie";
import Kine from "pages/Loisirs/Kine";
import Photos from "pages/Loisirs/Photos";
import Vod from "pages/Loisirs/Vod";
import Presse from "pages/Loisirs/Presse";

import Karaoke from "pages/Loisirs/Audio/Karaoke";
import Musiques from "pages/Loisirs/Audio/Musiques";
import Radio from "pages/Loisirs/Audio/Radio";
import LivreAudio from "pages/Loisirs/Audio/LivreAudio";

import Echecs from "pages/Loisirs/Jeux/Echecs";
import Memo from "pages/Loisirs/Jeux/Memo";
import Scrabble from "pages/Loisirs/Jeux/Scrabble";
import Solitaitre from "pages/Loisirs/Jeux/Solitaire";

import Launcher from "pages/Launcher";
import CallDialog from "pages/CallDialog";
import IpRobotDialog from "pages/IpRobotDialog";

const MyProfileStack = createStackNavigator(
  {
    MyProfile: { screen: MyProfile },
    EditProfile: { screen: EditProfile },
    Settings: { screen: Settings }
  },
  {
    mode: "card",
    headerMode: "none",
    initialRouteName: "MyProfile",
    cardStyle: { shadowColor: "transparent" }
  }
);

const HomeStack = createStackNavigator(
  {
    Index: { screen: Springboard }
  },
  {
    mode: "card",
    headerMode: "none",
    initialRouteName: "Index",
    navigationOptions: {
      animationEnabled: true
    },
    cardStyle: { shadowColor: "transparent", backgroundColor: "transparent" }
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: HomeStack },
    WebPage: { screen: WebPage },
    VideoCall: { screen: VideoCall },
    AppelVideo: { screen: AppelVideo },
    AppelMobile: { screen: AppelMobile },
    AppelDomicile: { screen: AppelDomicile },
    AppelBureau: { screen: AppelBureau },
    Messagerie: { screen: Messagerie },
    Presse: { screen: Presse },
    Radio: { screen: Radio },
    LivreAudio: { screen: LivreAudio },
    Programme: { screen: Programme },
    Courses: { screen: Courses },
    Taches: { screen: Taches },
    InfoMaire: { screen: InfoMaire },
    Galerie: { screen: Galerie },
    Kine: { screen: Kine },
    Vod: { screen: Vod },
    Echecs: { screen: Echecs },
    Memo: { screen: Memo },
    Solitaitre: { screen: Solitaitre },
    Scrabble: { screen: Scrabble },
    Musiques: { screen: Musiques },
    Karaoke: { screen: Karaoke },
    Photos: { screen: Photos },
    Planete: { screen: Planete },
    Soins: { screen: Soins },
    Saturation: { screen: Saturation },
    Temperature: { screen: Temperature },
    Activite: { screen: Activite },
    Tension: { screen: Tension },
    PharmaPlans: { screen: PharmaPlans },
    PharmaCatalogue: { screen: PharmaCatalogue },
    VisioConseil: { screen: VisioConseil },
    VisioETP: { screen: VisioETP },
    Commande: { screen: Commande },
    PharmaWeb: { screen: PharmaWeb },
    PharmaPermanence: { screen: PharmaPermanence },
    TraitementMatin: { screen: TraitementMatin },
    TraitementMidi: { screen: TraitementMidi },
    TraitementSoir: { screen: TraitementSoir },
    TraitementCoucher: { screen: TraitementCoucher },
    Medecin: { screen: Medecin },
    Forme: { screen: Forme },
    Nutrition: { screen: Nutrition },
    Chauffage: { screen: Chauffage },
    Eclairage: { screen: Eclairage },
    Volets: { screen: Volets },
    Alarme: { screen: Alarme },
    Capteurs: { screen: Capteurs },
    VisioDOM: { screen: VisioDOM },
    Launcher: Launcher
  },
  {
    initialRouteName: "Home",
    mode: "modal",
    headerMode: "none",
    cardStyle: { backgroundColor: "transparent" },
    transitionConfig: () => fromTop(1000)
  }
);

const AuthenticationNavigator = createStackNavigator(
  {
    Landing: { screen: Landing },
    Login: { screen: Login }
  },
  {
    headerMode: "none",
    gesturesEnabled: false
  }
);

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading,
    Auth: AuthenticationNavigator, // This screen renders a navigator!
    Home: HomeNavigator,
    Robot: Robot
  },
  {
    headerMode: "none",
    initialRouteName: "AuthLoading"
  }
);

@inject("navigation", "gateway")
@observer
class App extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Root>
        <StatusBar hidden />
        <RootNavigator ref={navigation.createRef} />
        <CallDialog />
        <IpRobotDialog />
        <KeepAwake />
        <NetworkConsumer>
          {({ isConnected }) =>
            !isConnected ? (
              <View style={{ padding: 10, backgroundColor: "#EC2049" }}>
                <Text style={{ color: "white" }}>
                  La tablette n'est pas connectée à Internet !
                </Text>
              </View>
            ) : null
          }
        </NetworkConsumer>
      </Root>
    );
  }
}

export default App;
