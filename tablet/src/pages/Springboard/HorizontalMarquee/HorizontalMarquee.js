import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { View, Animated, Easing, Dimensions, ScrollView } from "react-native";
import { Text } from "native-base";
import { withNavigationFocus } from "react-navigation";
import styles from "./style";

const WINDOW_WIDTH = Dimensions.get("window").width;

@withNavigationFocus
@inject("springboard", "session", "gateway")
@observer
export default class HorizontalMarquee extends Component {
  constructor(props) {
    super(props);
    this.animatedTransformX = new Animated.Value(0);
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    this._moveAnimation();
  }

  _moveAnimation = () => {
    this.animatedTransformX.setValue(0);
    Animated.timing(this.animatedTransformX, {
      toValue: -WINDOW_WIDTH - this.state.width,
      duration: 15000,
      easing: Easing.linear
    }).start(() => {
      this._moveAnimation();
    });
  };

  _onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };

  render() {
    const { text, textStyle, containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <Animated.Text
          numberOfLines={1}
          onLayout={event => this._onLayout(event)}
          style={[
            {
              left: WINDOW_WIDTH,
              width: null,
              transform: [{ translateX: this.animatedTransformX }]
            },
            textStyle
          ]}
        >
          {text}
        </Animated.Text>
      </View>
    );
  }
}
