import { Platform, NativeModules, Image } from "react-native";
import ImagePicker from "react-native-image-picker";

const launchImageLibrary = () =>
  new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, response => {
      // Same code as in above section!
      if (!response.didCancel) {
        const filePath =
          Platform.OS === "ios"
            ? response.uri.replace("file://", "")
            : response.path;

        NativeModules.WebPEncoder.imageToThumbnailWebP(filePath, 150, 0, 3)
          .then(result => {
            resolve({
              file: filePath,
              thumbnail: `data:image/webp;base64,${result}`,
              data: response.data,
              uri: response.uri,
              width: response.width,
              height: response.height,
              fileSize: response.fileSize
            });
          })
          .catch(e => {
            reject(e);
          });
      } else {
        reject(new Error("CANCELED"));
      }
    });
  });

const showImagePicker = customButtons =>
  new Promise((resolve, reject) => {
    const options = {
      title: "Select Photo",
      takePhotoButtonTitle: "Take Photo...",
      chooseFromLibraryButtonTitle: "Choose from Library",
      mediaType: "photo",
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    options.customButtons = customButtons;

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel) {
        resolve(response);
      }
    });
  });

export default { launchImageLibrary, showImagePicker };
