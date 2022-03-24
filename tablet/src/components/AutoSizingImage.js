import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import FastImage from "react-native-fast-image";

class AutoSizingImage extends Component {
  state = {
    height: 0,
    width: 0
  };

  onLoad = e => {
    const {
      nativeEvent: { width, height }
    } = e;

    if (width === 0 && height === 0) {
      this.setState({
        width: this.props.originalWidth,
        height: this.props.originalHeight
      });
    } else {
      this.setState({ width, height });
    }
    if (this.props.onLoad) this.props.onLoad(e);
  };

  getHeight = () => {
    if (!this.state.height) return this.props.defaultHeight;
    const ratio = this.state.height / this.state.width;
    const height = this.props.width * ratio;
    return height;
  };

  render() {
    const height = this.getHeight();
    return (
      <FastImage
        {...this.props}
        onLoad={this.onLoad}
        style={[{ width: this.state.width, height }, this.props.style]}
      >
        {this.props.children}
      </FastImage>
    );
  }
}

export default AutoSizingImage;
