import "es6-symbol/implement";
import { AppRegistry } from "react-native";
import { Sentry } from "react-native-sentry";
import App from "./src/App";

Sentry.config(
  "https://e2f1d223c0984e029818cd39f4878394:aae0fe386c8b4ce1a3312ba8fb8b95a1@sentry.io/1366043"
).install();

AppRegistry.registerComponent("VisioConsult", () => App);
