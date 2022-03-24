import { NetInfo } from "react-native";

export function onNetworkChange(onNetChange) {
  NetInfo.getConnectionInfo().done(reach => {
    onNetChange(reach);
    NetInfo.addEventListener("connectionChange", onNetChange);
  });
}
