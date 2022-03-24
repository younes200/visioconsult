import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native";

const ANIMATION_DURATION = 500;

class AnimatedListRow extends Component {
  constructor(props) {
    super(props);

    this._animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION
    }).start();
  }

  render() {
    const rowStyles = [{ opacity: this._animated }];

    return (
      <Animated.View style={rowStyles}>{this.props.children}</Animated.View>
    );
  }
}

export default AnimatedListRow;
