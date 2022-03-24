import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ViewMoreText from "react-native-view-more-text";

export default class ViewMoreTextWrapper extends Component {
  renderViewMore(onPress) {
    return <Text onPress={onPress}>View more</Text>;
  }

  renderViewLess(onPress) {
    return <Text onPress={onPress}>View less</Text>;
  }

  render() {
    return (
      <ViewMoreText
        numberOfLines={this.props.numberOfLines}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        textStyle={this.props.textStyle}
      >
        {this.props.children}
      </ViewMoreText>
    );
  }
}

ViewMoreTextWrapper.defaultProps = {
  numberOfLines: 2
};

ViewMoreTextWrapper.propTypes = {
  numberOfLines: PropTypes.number
};
