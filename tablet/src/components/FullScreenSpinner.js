import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Modal } from "react-native";
import Spinner from "components/Spinner";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  textContent: {
    top: 40,
    height: 50,
    fontSize: 20,
    color: "#fff"
  }
});

const SIZES = ["small", "normal", "large"];

class FullScreenSpinner extends Component {
  constructor(props) {
    super(props);

    const { visible, textContent } = this.props;
    this.state = {
      visible,
      textContent
    };
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  close() {
    this.setState({ visible: false });
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    } else {
      return null;
    }
  }

  _renderDefaultContent() {
    return (
      <View style={style.background}>
        <Spinner size={50} white />
        <View style={style.textContainer}>
          <Text style={[style.textContent, this.props.textStyle]}>
            {this.state.textContent}
          </Text>
        </View>
      </View>
    );
  }

  _renderFullScreenSpinner() {
    const { visible } = this.state;

    if (!visible) {
      return <View display="none" />;
    }

    const spinner = (
      <View
        style={[style.container, { backgroundColor: this.props.overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={["landscape", "portrait"]}
        transparent
        visible={visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderFullScreenSpinner();
  }
}

FullScreenSpinner.propTypes = {
  visible: PropTypes.bool,
  cancelable: PropTypes.bool,
  textContent: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  overlayColor: PropTypes.string
};

FullScreenSpinner.defaultProps = {
  visible: false,
  cancelable: false,
  textContent: "",
  color: "#fff",
  size: "large", // 'normal',
  overlayColor: "rgba(0, 0, 0, 0.25)"
};

export default FullScreenSpinner;
