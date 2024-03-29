import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";

export default class PhotoUpload extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    photoPickerTitle: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    format: PropTypes.string,
    quality: PropTypes.number,
    onPhotoSelect: PropTypes.func, // returns the base64 string of uploaded photo
    onError: PropTypes.func, // if any error occur with response
    onTapCustomButton: PropTypes.func, // on tap custom button
    onStart: PropTypes.func, // when user starts (useful for loading, etc)
    onCancel: PropTypes.func, // when user cancel
    onResponse: PropTypes.func, // on response exists!
    onRender: PropTypes.func, // after render
    onResizedImageUri: PropTypes.func // when image resized is ready
  };

  state = {
    height: this.props.height || 300,
    width: this.props.width || 300,
    format: this.props.format || "JPEG",
    quality: this.props.quality || 80,
    buttonDisabled: false
  };

  options = {
    title: this.props.pickerTitle || "Select Photo",
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };

  openImagePicker = () => {
    this.setState({ buttonDisabled: true });
    if (this.props.onStart) this.props.onStart();

    // get image from image picker
    ImagePicker.showImagePicker(this.options, async response => {
      this.setState({ buttonDisabled: false });
      let rotation = 0;
      const { originalRotation } = response;

      if (this.props.onResponse) this.props.onResponse(response);

      if (response.didCancel) {
        if (this.props.onCancel)
          this.props.onCancel("User cancelled image picker");
        return;
      }
      if (response.error) {
        if (this.props.onError) this.props.onError(response.error);
        return;
      }
      if (response.customButton) {
        if (this.props.onTapCustomButton)
          this.props.onTapCustomButton(response.customButton);
        return;
      }

      const { height, width, quality, format } = this.state;

      // Determining rotation param
      if (originalRotation === 90) {
        rotation = 90;
      } else if (originalRotation === 180) {
        // For a few images rotation is 180.
        rotation = -180;
      } else if (originalRotation === 270) {
        // When taking images with the front camera (selfie), the rotation is 270.
        rotation = -90;
      }
      // resize image
      // const resizedImageUri = await ImageResizer.createResizedImage(
      //   `data:image/jpeg;base64,${response.data}`,
      //   height,
      //   width,
      //   format,
      //   quality,
      //   rotation
      // );

      // if (this.props.onResizedImageUri)
      //   this.props.onResizedImageUri(resizedImageUri);

      // const filePath =
      //   Platform.OS === "android" && resizedImageUri.uri.replace
      //     ? resizedImageUri.uri.replace("file:/data", "/data")
      //     : resizedImageUri.uri;

      // // convert image back to base64 string
      // const photoData = await RNFS.readFile(filePath, "base64");

      const source = { uri: response.uri };
      this.setState({
        avatarSource: source
      });

      // handle photo in props functions as data string
      if (this.props.onPhotoSelect) this.props.onPhotoSelect(response);
    });
  };

  renderChildren = props =>
    React.Children.map(props.children, child => {
      if (child.type === Image && this.state.avatarSource) {
        return React.cloneElement(child, {
          source: this.state.avatarSource
        });
      }
      return child;
    });

  componentDidUpdate() {
    if (this.props.onAfterRender) this.props.onAfterRender(this.state);
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity
          onPress={this.openImagePicker}
          disabled={this.state.buttonDisabled}
        >
          {this.renderChildren(this.props)}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
