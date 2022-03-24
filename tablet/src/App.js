// import boot from './src/boot/index';
import React from "react";
import { Sentry } from "react-native-sentry";
import CodePush from "react-native-code-push";
import { Provider } from "mobx-react/native";
import { StyleProvider } from "native-base";
import Config from "react-native-config";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Immersive } from "react-native-immersive";
import timer from "react-native-timer";
import { setBaseURL } from "Agent";
import EStyleSheet from "react-native-extended-stylesheet";
import defaultTheme from "./theme/default";
import getTheme from "~/theme/components";
import variables from "~/theme/variables/commonColor";
import stores from "./stores";
import { NetworkProvider } from "react-native-offline";
import Scenes from "./Scenes";

EStyleSheet.build(defaultTheme);

setBaseURL(Config.API_URL);

console.disableYellowBox = true;

if (Config.ENV !== "dev") {
  Sentry.config(Config.SENTRY_DSN, {
    deactivateStacktraceMerging: true
  });
exit
  Sentry.install();

  Sentry.setTagsContext({
    environment: Config.ENV,
    react: true
  });
}

const App = () => (
  <StyleProvider style={getTheme(variables)}>
    <Provider {...stores}>
      <NetworkProvider>
        <ActionSheetProvider>
          <Scenes />
        </ActionSheetProvider>
      </NetworkProvider>
    </Provider>
  </StyleProvider>
);

Immersive.on();
Immersive.setImmersive(true);

const restoreImmersive = () => {
  Immersive.on();
};
Immersive.addImmersiveListener(restoreImmersive);
Immersive.removeImmersiveListener(restoreImmersive);

export default CodePush({
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE
})(App);
