import { StyleSheet, Dimensions, Platform } from "react-native";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "rgba(0, 0, 0, 0)",
  background2: "rgba(0, 0, 0, 0.1)"
};

const CARD_WIDTH = Dimensions.get("window").width / 5;
const CARD_HORIZONTAL_PADDING = Dimensions.get("window").height / 10;
const HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

export const itemHorizontalMargin = wp(1);
export const itemVerticalMargin = hp(1);

const entryBorderRadius = 8;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  slideInnerContainer: {
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: itemVerticalMargin, // needed for shadow
    overflow: "hidden"
  },
  cardContainer: {
    width: CARD_WIDTH,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontWeight: "300",
    fontSize: 34,
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  titleContainer: {
    backgroundColor: "#B71C1C",
    borderRadius: 40,
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  buttonContent: {
    width: (CARD_WIDTH * 50) / 100 - 8,
    height: (CARD_WIDTH * 50) / 100 - 8,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  button: {
    width: (CARD_WIDTH * 50) / 100,
    height: (CARD_WIDTH * 50) / 100,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8
    // paddingHorizontal: CARD_HORIZONTAL_PADDING,
    // borderRadius: 15,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 7
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,
    // backgroundColor: "#fff",
    // elevation: 15
  },
  selectedCard: {
    borderColor: "#B71C1C",
    borderWidth: 3,
    borderRadius: 35
  },
  selectedButton: {
    backgroundColor: "#fff",
    borderRadius: 30
  },
  selectedButtonContent: {
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 35
  },
  contactCard: {
    backgroundColor: "gray",
    borderRadius: 15
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: itemVerticalMargin,
    backgroundColor: "black", // needed
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: entryBorderRadius,
    justifyContent: "flex-end",
    overflow: "hidden"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: IS_IOS ? entryBorderRadius : 0
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: colors.black
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    left: 5,
    paddingBottom: 15,
    paddingHorizontal: 8
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5
  },
  age: {
    fontWeight: "200",
    color: "white",
    fontSize: 18
  },
  city: {
    marginTop: 3,
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: entryBorderRadius
  },
  emptyList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyListContent: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center"
  }
});
