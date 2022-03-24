import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Animated, StyleSheet } from "react-native";

class HideableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(this.props.visible ? 1 : 0)
    };
  }

  animate(show) {
    const duration = this.props.duration ? parseInt(this.props.duration) : 500;
    Animated.timing(this.state.opacity, {
      toValue: show ? 1 : 0,
      duration: !this.props.noAnimation ? duration : 0
    }).start();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.visible !== nextProps.visible;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.visible !== nextProps.visible) {
      this.animate(nextProps.visible);
    }
  }

  render() {
    if (this.props.removeWhenHidden && !this.props.visible) {
      return null;
    }

    return (
      <Animated.View
        style={[
          this.props.style,
          this.props.absolute ? styles.absoluteView : null,
          { opacity: this.state.opacity }
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

HideableView.defaultProps = {
  removeWhenHidden: true,
  noAnimation: false,
  absolute: false
};

HideableView.propTypes = {
  visible: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  removeWhenHidden: PropTypes.bool,
  noAnimation: PropTypes.bool,
  absolute: PropTypes.bool
};

const styles = StyleSheet.create({
  absoluteView: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%"
  }
});

export default HideableView;
