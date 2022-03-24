import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const BODY_HEIGHT = (HEIGHT * 50) / 100;
const CARD_WIDTH = Dimensions.get("window").width / 5;
const CONTACT_IMAGE_HEIGHT = ((HEIGHT / 4) * 60) / 100;

const styles = EStyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row"
  },
  headerLeftContainer: {
    flex: 0.25,
    // justifyContent: "center",

    paddingHorizontal: HEIGHT / 25,
    paddingVertical: HEIGHT / 25
    // alignContent: "center",
    // alignItems: "center"
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  fabContainerStyle: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  titleContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  headerCenterContainer: {
    flex: 0.5,
    paddingTop: 10,
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center"
  },
  headerRightContainer: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: HEIGHT / 25,
    paddingVertical: HEIGHT / 25
    // alignContent: "center",
    // alignItems: "center"
  },
  headerRightContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
    // alignContent: "center"
  },
  imgOperatorBorder: {
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 30
  },
  imgOperatorBackground: {
    backgroundColor: "white",
    borderRadius: 30
  },
  imgOperatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: null
  },
  imgOperator: {
    width: WIDTH / 18,
    height: WIDTH / 18,
    marginHorizontal: 14,
    marginVertical: 14
  },
  imgWeather: {
    width: WIDTH / 18,
    height: WIDTH / 18,
    marginHorizontal: 22,
    marginVertical: 22
  },
  imgOpMargin: {
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  headerLabel: {
    fontSize: 33,
    color: "white"
  },
  listContainer: {
    // height: "40%", // '50%'
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    // justifyContent: 'flex-end',
    alignContent: "center",
    alignItems: "center"
    // paddingTop: BODY_HEIGHT / 7
  },
  contactImage: {
    width: CONTACT_IMAGE_HEIGHT,
    height: CONTACT_IMAGE_HEIGHT,
    borderRadius: 35,
    borderColor: "red",
    borderWidth: 3
  },
  listItemImage: {
    width: "50%",
    height: "50%"
  },
  listContent: {
    width: WIDTH,
    // height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  serviceButton: {
    width: (18 * HEIGHT) / 100,
    height: (18 * HEIGHT) / 100,
    borderRadius: 200,
    borderColor: "#ffffff",
    borderWidth: 5,
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  selectedCard: {
    borderColor: "#B71C1C"
    // borderWidth: 3
  },
  picture: {
    height: "100%",
    width: "100%",
    borderRadius: 200
  },
  footerContainer: {
    height: "25%",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  },
  imageLogo: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 120,
    height: 44
  },
  timer: {
    color: "#ffffff",
    // fontWeight: "200",
    fontSize: 170,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  currentDate: {
    color: "red",
    fontWeight: "200",
    fontSize: 35
  },
  backContent: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  backContainer: {
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 40,
    marginHorizontal: 15
  },
  backContentSelected: {
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 30
  },
  backContainerSelected: {
    backgroundColor: "white",
    borderRadius: 30
  },
  imgBack: {
    width: WIDTH / 12,
    height: WIDTH / 12,
    marginHorizontal: 14
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    backgroundColor: "#25485D",
    paddingVertical: 10,
    marginTop: 10
  },
  logoContent: {
    flexDirection: "row",
    width: WIDTH / 3
  },
  logoIcons: {
    width: 30,
    height: 30,
    // marginHorizontal: 10
    marginRight: 5,
    marginLeft: 40
  },
  logoText: {
    color: "#8e8e8e",
    fontSize: 30,
    fontWeight: "300"
  },
  logoTextContent: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH / 3
  },
  infosContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "100%"
  },
  infoWeather: {
    // width: "100%",
    marginVertical: 10,
    // paddingVertical: 10,
    backgroundColor: "#25485D",
    height: 60
  }
});

export default styles;
