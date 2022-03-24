import React from "react";
import {
  Platform,
  View,
  WebView,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from "react-native";
import { observer, inject } from "mobx-react";
import Config from "react-native-config";
import { Container } from "native-base";
import BackButton from "components/BackButton";

import SafeAreaView from "react-native-safe-area-view";

@observer
export default class WebPage extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    url: null
  };

  componentDidMount() {
    const url = this.props.navigation.getParam("url");
    setTimeout(() => {
      this.setState({ url });
    }, 1000);
  }

  renderHeaderGoBack() {
    return (
      <View style={styles.backButton}>
        <BackButton onPress={() => this.props.navigation.goBack(null)} />
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.state.url ? (
          <WebView
            source={{ uri: this.state.url }}
            style={styles.webView}
            renderLoading={() => <ActivityIndicator color="#000000" />}
          />
        ) : (
          <View style={styles.content}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
        {this.renderHeaderGoBack()}
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
    flex: 1,
    backgroundColor: "#ffffff"
  },
  content: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  webView: {},
  backButton: {
    position: "absolute",
    left: 10,
    top: 10
  }
});
