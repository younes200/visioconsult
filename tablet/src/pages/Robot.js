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
import {
  Container,
  List,
  Icon,
  ListItem,
  Content,
  Left,
  Body,
  Text,
  Thumbnail
} from "native-base";

import SafeAreaView from "react-native-safe-area-view";

@inject("robot")
@observer
export default class WebPage extends React.Component {
  // static navigationOptions =({navigation}) => ({
  //   headerMode: "screen",
  //   headerLeft: ()=> (<Button transparent onPress={() => navigation.goBack()}>
  //   <Icon
  //     type="Feather"
  //     name="chevron-left"
  //     style={{ color: "#000000" }}
  //   />
  // </Button>)
  // });

  componentDidMount() {
    this.props.robot.init();
  }

  renderWebView = () => (
    <WebView
      source={{ uri: this.props.robot.url }}
      style={styles.webview}
      renderLoading={() => <ActivityIndicator />}
    />
  );

  render() {
    return (
      <Container style={styles.container}>
        {this.props.robot.scanning ? (
          <View style={styles.spinner}>
            <View>
              <ActivityIndicator size="large" />
              <Text>Scanning...</Text>
            </View>
          </View>
        ) : (
          this.renderWebView()
        )}
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
    backgroundColor: "#ffffff"
  },
  content: {
    flex: 1
  },
  webView: {
    marginTop: 40,
    flex: 1
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 10
  }
});
