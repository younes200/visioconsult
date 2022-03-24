import { StyleSheet, Dimensions, Platform } from "react-native";

const CONTENT_HEIGHT = 60;

export default StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    height: CONTENT_HEIGHT,
    overflow: "hidden",
    backgroundColor: "#143D57"
  },
  content: {
    width: "100%",
    height: CONTENT_HEIGHT,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "300"
  }
});
