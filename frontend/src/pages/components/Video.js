/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import {observer, inject} from 'mobx-react';
import adapter from 'webrtc-adapter';
@observer
class Video extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      source: null
    };
  }

  componentDidMount() {
    const { source } = this.props;
    this.attachMedia(source)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.source != this.props.source){
      const { source } = this.props;
      this.attachMedia(source)
    }

  }


  attachMedia(stream){
    if(adapter.browserDetails.browser === 'chrome') {
      var chromever = adapter.browserDetails.version;
      if(chromever >= 52) {
        this.elem.srcObject = stream;
      } else if(typeof this.elem.src !== 'undefined') {
        this.elem.src = URL.createObjectURL(stream);
      } else {
        console.error("Error attaching stream to element");
      }
    } else {
      this.elem.srcObject = stream;
    }
  }
  render() {
    const { source, ...rest } = this.props;
    return (
      <video ref={(elem) => { this.elem = elem; }} {...rest} />
    );
  }
}

export default Video