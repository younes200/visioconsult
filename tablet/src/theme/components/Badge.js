import variable from "./../variables/platform";

export default (variables = variable) => {
  const badgeTheme = {
    ".primary": {
      backgroundColor: variables.btnPrimaryBg
    },
    ".warning": {
      backgroundColor: variables.btnWarningBg
    },
    ".info": {
      backgroundColor: variables.btnInfoBg
    },
    ".success": {
      backgroundColor: variables.btnSuccessBg
    },
    ".danger": {
      backgroundColor: "#e74949"
    },
    ".topLeft": {
      position: "absolute",
      top: 2,
      left: "52%"
    },
    ".small": {
      height: 14,
      width: 14,
      minWidth: 10,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: "white"
    },
    ".medium": {
      height: 20,
      width: 20,
      flex: 0,
      padding: 4,
      paddingHorizontal: 2,
      borderRadius: 10,
      "NativeBase.Text": {
        color: variables.badgeColor,
        fontSize: variables.fontSizeBase,
        lineHeight: 15,
        textAlign: "center",
        paddingHorizontal: 3
      }
    },
    ".shadow": {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 1
    },
    "NativeBase.Text": {
      color: variables.badgeColor,
      fontSize: variables.fontSizeBase,
      lineHeight: variables.lineHeight - 1,
      textAlign: "center",
      paddingHorizontal: 3
    },
    backgroundColor: variables.badgeBg,
    padding: variables.badgePadding,
    paddingHorizontal: 6,
    alignSelf: "flex-start",
    borderRadius: 13.5,
    height: 27
  };
  return badgeTheme;
};
