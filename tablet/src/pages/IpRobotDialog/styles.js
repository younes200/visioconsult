import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "50%",
    // height: 300,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 10
  },
  modal: {
    alignContent: "center",
    alignItems: "center"
  },
  button: {
    marginHorizontal: 8
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 20
  },
  userInfos: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  input: {
    paddingHorizontal: 10,
    width: "70%"
  },
  textContainer: {
    paddingVertical: 15,
    // paddingLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 20
  }
});

export default styles;
