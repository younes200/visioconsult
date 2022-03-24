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
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

const styles = () => ({
  videoWrapper: {
    width: "600px",
    height: "400px",
    backgroundColor: "#000000",
    position: "absolute",
    borderRadius: "5px",
    zIndex: 10000,
    boxShadow: "1px 1px 2px #000"
  },
  localVideoWrapper: {
    position: "absolute",
    backgroundColor: "#000000",
    position: "absolute",
    borderRadius: "5px",
    zIndex: 10000,
    boxShadow: "1px 1px 2px #000"
  },
  localVideo: {
    height: "200px"
  },
  remoteVideo: {
    width: "100%",
    height: "100%"
  },
  root: {
    flexGrow: 1,
    paddingVertical: 40,
    position: "absolute",
    bottom: 8
  },
  demo: {
    height: 40
  },
  cancel: {
    position: "absolute",
    top: 10,
    right: 10
  }
});

@withStyles(styles)
@inject("session", "gateway")
@observer
class VideoCall extends React.Component {
 
  render() {
    const { classes, gateway } = this.props;
    return (
      <React.Fragment>
        {gateway.remoteStream ? (
          <Draggable
            key={Math.floor(Math.random() * 1000)}
            axis="both"
            defaultPosition={{ x: 500, y: 200 }}
            bounds="parent"
            scale={1}
          >
            <div className={classes.videoWrapper}>
               <Video
                className={classes.remoteVideo}
                autoPlay
                source={gateway.remoteStream}
              /> 
               
              <Button color="secondary" className={classes.cancel} onClick={() => gateway.hangup()}>
                Arrêter l'appel
              </Button>

              <div className={{ paddingVertical: 20 }}>
                <Grid container className={classes.root}>
                  <Grid
                    container
                    spacing={16}
                    className={classes.demo}
                    alignItems="center"
                    direction="row"
                    justify="center"
                  >
                    <Grid item>
                      <IconButton
                        color="inherit"
                        onClick={() => gateway.toggleRemoteVideoMute()}
                      >
                        {gateway.remoteVideoMuted ? (
                          <VideocamIcon className={classes.icon} />
                        ) : (
                          <VideocamOffIcon className={classes.icon} />
                        )}
                      </IconButton>
                    </Grid>

                    <Grid item>
                      <IconButton
                        color="inherit"
                        onClick={() => gateway.toggleRemoteAudioMute()}
                      >
                        {gateway.remoteAudioMuted ? (
                          <VolumeUpIcon className={classes.icon} />
                        ) : (
                          <VolumeOffIcon className={classes.icon} />
                        )}
                      </IconButton>
                    </Grid>


                  </Grid>
                </Grid>
              </div>
               
            </div>
          </Draggable>
        ) : null}

        {gateway.localStream && gateway.localStreamVisible && (
          <Draggable
            axis="both"
            defaultPosition={{ x: 100, y: 100 }}
            bounds="parent"
            scale={1}
          >
            <div className={classes.localVideoWrapper}>
              <Video
                className={classes.localVideo}
                muted
                source={gateway.localStream}
                autoPlay
              />
              <IconButton
                color="inherit"
                onClick={() => gateway.toggleLocalStream()}
                className={classes.cancel}
              >
                <ClearIcon className={classes.icon} />
              </IconButton>

              <div className={{ paddingVertical: 20 }}>
                <Grid container className={classes.root}>
                  <Grid
                    container
                    spacing={16}
                    className={classes.demo}
                    alignItems="center"
                    direction="row"
                    justify="center"
                  >
                    <Grid item>
                      <IconButton
                        color="inherit"
                        onClick={() => gateway.toggleVideoMute()}
                      >
                        {gateway.videoMuted ? (
                          <VideocamIcon className={classes.icon} />
                        ) : (
                          <VideocamOffIcon className={classes.icon} />
                        )}
                      </IconButton>
                    </Grid>

                    <Grid item>
                      <IconButton
                        color="inherit"
                        onClick={() => gateway.toggleAudioMute()}
                      >
                        {gateway.audioMuted ? (
                          <MicIcon className={classes.icon} />
                        ) : (
                          <MicOffIcon className={classes.icon} />
                        )}
                      </IconButton>
                    </Grid>


                  </Grid>
                  {/* </Grid> */}
                </Grid>
              </div>
            </div>
          </Draggable>
        )}

        
      </React.Fragment>
    );
  }
}

export default VideoCall;
