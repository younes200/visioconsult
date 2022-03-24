import React from "react";
import Video from "./Video";
import { withStyles } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import { observer, inject } from "mobx-react";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import CallEndIcon from "@material-ui/icons/CallEnd";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Joystick } from "react-joystick-component";
import KeyboardEventHandler from "react-keyboard-event-handler";

const styles = () => ({
  videoWrapperOuter: {
    display: "table",
    position: "absolute",
    zIndex: 10000
  },
  videoWrapperInner: {
    backgroundColor: "#000000",
    boxShadow: "1px 1px 2px #000",
    borderRadius: "5px",
    height: "640px",
    width: "480px",
    overflow: "hidden"
  },
  video: {
    display: "block",
    transformOrigin: "top left",
    transform: "rotate(-90deg) translate(-100%)"
  },
  controls: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
  icon: {
    color: "#fff"
  },
  root: {
    flexGrow: 1,
    paddingVertical: 40,
    position: "absolute",
    bottom: 8
  },
  cancel: {
    position: "absolute",
    top: 10,
    right: 10
  }
});

@withStyles(styles)
@inject("session", "robot")
@observer
class Robot extends React.Component {
  pressedKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    "+": false,
    "-": false
  };

  keyPressInterval = null;

  handleJoystick = event => {
    const { robot } = this.props;
    switch (event.direction) {
      case "FORWARD":
        robot.linearForward();
        break;
      case "BACKWARD":
        robot.linearBackward();
        break;
      case "LEFT":
        robot.angularLeft();
        break;
      case "RIGHT":
        robot.angularRight();
        break;
    }
  };

  handleKeyUpEvent = key => {
    const { robot } = this.props;
    this.pressedKeys[key] = false;
    if (this.pressedKeyList().length == 0) {
      if (this.keyPressInterval) {
        clearInterval(this.keyPressInterval);
        this.keyPressInterval = null;
      }
    }
    switch (key) {
      case "up":
      case "down":
        robot.linearStop();
        break;
      case "left":
      case "right":
        robot.angularStop();
        break;
      case "+":
      case "-":
        robot.verinStop();
        break;
    }
  };

  pressedKeyList = () => {
    const pressed = [];
    for (let [k, v] of Object.entries(this.pressedKeys)) {
      if (v) pressed.push(k);
    }
    return pressed;
  };
  handleKeyPressEvent = () => {
    const { robot } = this.props;
    const list  = this.pressedKeyList()
    list.map(k => {
      switch (k) {
        case "up":
          robot.linearForward();
          break;
        case "down":
          robot.linearBackward();
          break;
        case "left":
          robot.angularLeft();
          break;
        case "right":
          robot.angularRight();
          break;
        case "+":
          robot.verinUp();
          break;
        case "-":
          robot.verinDown();
          break;
      }
    });
  };

  handleKeyDownEvent = key => {
    const { robot } = this.props;
    this.pressedKeys[key] = true;
    if(!this.keyPressInterval){
      this.keyPressInterval = setInterval(this.handleKeyPressEvent, 300)
    }
  };

  render() {
    const { classes, robot } = this.props;
    return (
      <React.Fragment>
        {robot.robotStream ? (
          <Draggable
            axis="both"
            defaultPosition={{ x: 100, y: 100 }}
            bounds="parent"
            handle=".handler"
            scale={1}
          >
            <div className={classes.videoWrapperOuter}>
              <KeyboardEventHandler
                handleKeys={["up", "down", "left", "right", "+", "-"]}
                handleEventType="keyup"
                onKeyEvent={this.handleKeyUpEvent}
              />
              <KeyboardEventHandler
                handleKeys={["up", "down", "left", "right", "+", "-"]}
                handleEventType="keydown"
                onKeyEvent={this.handleKeyDownEvent}
              />
              <div className={classes.videoWrapperInner}>
                <div className="handler">
                  <Video
                    className={classes.video}
                    source={robot.robotStream}
                    autoPlay
                  />
                </div>
                <div className={classes.controls}>
                  <Joystick
                    size={100}
                    baseColor="#ffffff"
                    stickColor="#000000"
                    move={this.handleJoystick}
                  />
                </div>
                <IconButton
                  color="inherit"
                  onClick={() => robot.closeRobotFeed()}
                  className={classes.cancel}
                >
                  <ClearIcon className={classes.icon} />
                </IconButton>
              </div>
            </div>
          </Draggable>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Robot;
