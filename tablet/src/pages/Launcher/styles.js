import EStyleSheet from "react-native-extended-stylesheet";

export default (styles = EStyleSheet.create({
  container: {
    padding: "$containerPadding"
  },
  text: {
    color: "$textColor",
    fontSize: "$titleFontSize"
  },
  icon: {
    marginRight: 16,
    width: 100,
    height: 100
  },
  appListItem: {
    padding: 10,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center"
  }
}));
