import React from "react";
import I18n from "I18n";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import { Button, Text, Container } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import images from "@assets/images";

export default class Landing extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden />
        <Grid style={styles.content}>
          <Row size={1}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={images.logo}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
          </Row>
          <Row
            size={1}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              <Button
                style={styles.button}
                rounded
                light
                large
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Text>{I18n.t("landing.buttons.login")}</Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002058",
    flex: 1
  },
  content: {
    padding: 30
  },
  logo: {
    width: 500
  },
  button: {
    marginBottom: 10,
    alignSelf: "center"
  },
  alreadyRegistred: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center"
  },
  baseText: {
    fontFamily: "Maax",
    fontSize: 16,
    backgroundColor: "transparent",
    color: "white"
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slideTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  slideTexte: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 15,
    textAlign: "center"
  }
});
