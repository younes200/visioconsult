import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "black"
  },
  remoteStreamContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  selected: {
    backgroundColor: "#B71C1C"
  },
  selectedText: {
    color: "#B71C1C",
    fontWeight: "500",
    fontSize: 17
  },
  localStreamContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 133,
    height: 100,
    backgroundColor: "black",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden"
  },
  localStream: {
    width: 133,
    height: 100
  },
  remoteStream: {
    width: "100%",
    height: "100%"
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    height: 100
  },
  optionsContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingVertical: 30
  },
  option: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },
  iconOption: {
    fontSize: 30
  },
  label: {
    fontSize: 10
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%"
  },
  logo: {
    width: 100,
    height: 23
  },
  LeftFooterContainer: {
    flexDirection: "column",
    position: "absolute",
    right: 20,
    bottom: 20
  },
  videoContainer: {
    backgroundColor: "black",
    borderRadius: 8,
    width: 600,
    height: 400,
    marginBottom: 10
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  busyContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    padding: 8,
    backgroundColor: "#fff",
    marginVertical: 4,
    width: "90%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8
  },
  title: {
    fontSize: 16,
    color: "#6F6F6F"
  }
});

export default styles;
