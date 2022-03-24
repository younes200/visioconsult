import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false
});

export default storage;
