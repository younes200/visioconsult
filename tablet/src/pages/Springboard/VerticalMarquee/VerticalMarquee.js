import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { View, Animated, Easing } from "react-native";
import { Text } from "native-base";
import { withNavigationFocus } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import styles from "./style";

const CONTENT_HEIGHT = 60;

@withNavigationFocus
@inject("springboard", "session", "gateway")
@observer
export default class VerticalMarquee extends Component {
  constructor(props) {
    super(props);
    this.animatedTransformY = new Animated.Value(0);
    this.state = {
      height: -CONTENT_HEIGHT
    };
  }

  componentDidMount() {
    this.props.springboard.getInfos();
    this._moveAnimation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.height !== this.state.height) {
      this._moveAnimation();
    }
  }

  _moveAnimation = () => {
    setTimeout(() => {
      Animated.timing(this.animatedTransformY, {
        toValue: this.state.height,
        duration: 2000,
        easing: Easing.linear
      }).start(() => {
        if (
          this.state.height ==
          -CONTENT_HEIGHT * (this.props.springboard.infos.length - 1)
        ) {
          this.animatedTransformY.setValue(0);
          this.setState({ height: -CONTENT_HEIGHT });
        } else {
          this.setState({ height: this.state.height - CONTENT_HEIGHT });
        }
      });
    }, 1500);
  };

  render() {
    const { infos } = this.props.springboard;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [{ translateY: this.animatedTransformY }]
          }}
        >
          {infos
            ? infos.map(info => (
                <View style={styles.content}>
                  <Text numberOfLines={1} style={styles.text}>
                    {info && info.title ? info.title : null}
                  </Text>
                </View>
              ))
            : null}
        </Animated.View>
      </View>
    );
  }
}
