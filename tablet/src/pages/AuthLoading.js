import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator
} from "react-native";
import { inject, observer } from "mobx-react/native";
import SplashScreen from "react-native-splash-screen";

@inject("session")
@observer
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // TODO: handle timeout
    try {
      await this.props.session.init();
    } catch (e) {
      // muted error
    }

    this.props.navigation.navigate(
      this.props.session.authenticated ? "Home" : "Landing"
    );
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002058",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
