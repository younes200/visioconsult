import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import UserContent from "./UserContent";

import { observer, inject } from "mobx-react";

import Notifier from "./components/Notifier";
import VideoCall from "./components/VideoCall";
import Robot from "./components/Robot";

import _ from 'lodash'

// import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import deepOrange from "@material-ui/core/colors/deepOrange";
import VideocamIcon from "@material-ui/icons/Videocam";
import green from "@material-ui/core/colors/green";
import { Route } from "react-router-dom";
import KeyboardEventHandler from "react-keyboard-event-handler";

var Sound = require("react-sound").default;

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  },
  shape: {
    borderRadius: 8
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c"
      }
    },
    MuiButton: {
      label: {
        textTransform: "initial"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        margin: "0 16px",
        minWidth: 0,
        [theme.breakpoints.up("md")]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

const drawerWidth = 256;

const styles = () => ({
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px 0",
    background: "#eaeff1"
  },
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  avatar: {
    margin: 0,
    marginTop: 10,
    color: "#fff",
    backgroundColor: deepOrange[500],
    width: 40,
    height: 40
  },
  menu: {
    marginTop: 40
  },
  bigAvatar: {
    margin: 10,
    marginTop: 40,
    width: 80,
    height: 80,
    color: "#fff",
    backgroundColor: green[500]
  },
  iconButtonAvatar: { 
    margin: 0,
    marginTop: 0,
    marginBottom: 0  
  },
  operatorName: {
    margin: 0,
  },
  iconButton: { 
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  dialogText: {
    margin: "auto"
  },
  actionsContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: "auto",
    width: 500
  },
  subTitle: {
    color: "#000",
    marginBottom: 20
  },
  patientname: {
    fontSize: 17,
    fontWeight: "500"
  }
});

@withStyles(styles)
@inject("session", "gateway")
@observer
class Home extends React.Component {
  static isPrivate = true;

  state = {
    mobileOpen: false,
    anchorEl: null
  };  

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  logout = async () => {
    await this.props.gateway.hangup();
    await this.props.session.logOut();
    this.handleClose();
  };

  audioCall = () => {
    if (this.props.gateway.incomingcall) {
      return (
        <audio autoPlay loop>
          <source
            src="http://s1download-universal-soundbank.com/mp3/sounds/10828.mp3"
            // src='../assets/alertSound.mp3'
            type="audio/mp3"
          />
        </audio>
      );
    }
    return null;
  };

  pressedKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    "+": false,
    "-": false
  };


  keyPressInterval = null

  handleKeyUpEvent = key => {
    this.pressedKeys[key] = false
    // switch (key) {
    //   case "up":
    //   case "down":
    //     robot.linearStop();
    //     break;
    //   case "left":
    //   case "right":
    //     robot.angularStop();
    //     break;
    //   case "+":
    //   case "-":
    //     robot.verinStop();
    //     break;
    // }

    if(this.pressedKeyList().length == 0){
      if(this.keyPressInterval){
        clearInterval(this.keyPressInterval)
        this.keyPressInterval = null
      }
    }
  };

  pressedKeyList = () => {
    const pressed = []
    for (let [k, v] of Object.entries(this.pressedKeys)) {
      if(v) pressed.push(k)
    }
    return pressed
  }
  handleKeyPressEvent = ()=> {
    console.log(this.pressedKeyList())
  }

  handleKeyDownEvent = key => {
    this.pressedKeys[key] = true
    if(!this.keyPressInterval){
      this.keyPressInterval = setInterval(this.handleKeyPressEvent, 300)
    }
  };

  render() {
    const { classes, onDrawerToggle, session, gateway } = this.props;
    const { user } = session
    return (
      <div className={classes.root}>
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

        {this.audioCall()}
        <Notifier />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.appContent}>
          <AppBar color="primary" position="sticky" elevation={0}>
            <Toolbar>
              <Grid container spacing={8} alignItems="center">
                <Hidden smUp>
                  <Grid item>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={onDrawerToggle}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                </Hidden>
                <Grid item xs />
                <Grid item>
                  {gateway.localStream ? (
                    <IconButton
                      color="inherit"
                      onClick={() => gateway.toggleLocalStream()}
                    >
                      <VideocamIcon />
                    </IconButton>
                  ) : null}
                </Grid>
                <Grid item>
                  <Tooltip title="Alerts • No Alerts">
                    <IconButton color="inherit">
                      <NotificationsIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item className={classes.iconButton}>
                {/* <div className={classes.iconButton}> */}
                <IconButton
                    color="inherit"
                    className={classes.iconButtonAvatar}
                    onClick={this.handleClick}
                  >
                    {user.photo ? <Avatar className={classes.avatar} src={user.photo.url}></Avatar> :  <Avatar className={classes.avatar}>{user.username[0].toUpperCase()}</Avatar>}
                  </IconButton>
                  <IconButton
                    color="inherit"
                    className={classes.iconButtonAvatar}
                    onClick={this.handleClick}
                  >
                  <h6 className={classes.operatorName}>{user.username}</h6>
                  </IconButton>
                {/* </div> */}
                 
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Paramétres</MenuItem>
                    <MenuItem onClick={this.logout}>Se Déconnecter</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Route
            exact
            path={`${this.props.match.url}:id`}
            component={UserContent}
          />
          <Route
            path={`${this.props.match.url}:id/:tab`}
            component={UserContent}
          />
        </div>

        <VideoCall />
        <Robot />
        <Dialog
          open={gateway.incomingcall}
          keepMounted
          disableBackdropClick
          disableEscapeKeyDown
          onClose={() => {
            gateway.hangup();
          }}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
        >
          <DialogTitle
            className={classes.dialogText}
            id="alert-dialog-slide-title"
          >
            {`Nouveau appel`}
          </DialogTitle>
          {gateway.incomingcaller ? (
            <DialogContent className={classes.dialogContent}>
              {/* {gateway.incomingcaller ? <DialogContentText id="alert-dialog-slide-description">
            {`Accepter le nouveau appel  de ${gateway.incomingcaller.username} ?`}
            </DialogContentText> : null} */}
              <DialogContentText
                className={[classes.dialogText, classes.subTitle]}
                id="alert-dialog-slide-description"
              >
                {`Répondre à`}
              </DialogContentText>
              <Avatar
                alt={gateway.incomingcaller.firstname}
                src={
                  gateway.incomingcaller.photo
                    ? gateway.incomingcaller.photo.url
                    : null
                }
                className={[classes.bigAvatar, classes.dialogText]}
              >
                {/*gateway.incomingcaller.firstname[0].toUpperCase()*/}
              </Avatar>
              <DialogContentText
                className={[classes.dialogText, classes.patientname]}
                id="alert-dialog-slide-description"
              >
                {`${gateway.incomingcaller.firstname}`}
              </DialogContentText>
            </DialogContent>
          ) : null}
          <DialogContent className={classes.actionsContent}>
            <Button
              onClick={() => {
                gateway.hangup();
              }}
              color="secondary"
            >
              Decliner
            </Button>
            <Button
              onClick={() => {
                gateway.answer();
              }}
              color="primary"
            >
              Accepter
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog
          open={gateway.calling}
          keepMounted
          disableBackdropClick
          disableEscapeKeyDown
          onClose={() => {
            gateway.hangup();
          }}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{`Appel...`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Appel en cours ....`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                gateway.hangup();
              }}
              color="secondary"
            >
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Home;
