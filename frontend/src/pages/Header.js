import React from "react";
import PropTypes from "prop-types";
import { AppBar, Fab, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CallIcon from "@material-ui/icons/Call";
import VideoCamIcon from "@material-ui/icons/Videocam"
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import CircularProgress from '@material-ui/core/CircularProgress';


const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  },
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  progress: {
    marginRight: theme.spacing.unit,
    color: '#ffffff',
  },
});

// function Header(props) {

@withStyles(styles)
@inject("session", "patients", "gateway", "robot")
@observer
class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, onDrawerToggle, match, robot } = this.props;
    const { current } = this.props.patients;
    return (
      <React.Fragment>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item>
                <Avatar
                  alt={current.username}
                  src={current.photo.url}
                  className={classes.bigAvatar}
                >
                  {current.username[0].toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography color="inherit" variant="h5">
                  {current ? current.username : null}
                </Typography>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={!current.online || this.props.gateway.inCall}
                  color="secondary"
                  className={classes.margin}
                  onClick={() => this.props.patients.doCall()}
                >
                  <CallIcon className={classes.leftIcon} />
                  {`Appeler`}
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  disabled={current.robotState != "standby" || robot.connecting}
                  color="secondary"
                  className={classes.margin}
                  onClick={() => this.props.robot.startRobotFeed(current.id)}
                >
                {robot.connecting ?  <CircularProgress className={classes.progress} size={20} thickness={6} />: <VideoCamIcon className={classes.leftIcon} />}
                  {`Video Robot`} 
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs
            value={this.state.value}
            textColor="inherit"
            onChange={this.handleChange}
          >
            <Tab
              textColor="inherit"
              label="Appels"
              component={Link}
              to={`/${match.params.id}/call`}
            />
            <Tab
              textColor="inherit"
              label="Identité"
              component={Link}
              to={`/${match.params.id}/identity`}
            />
            {/* <Tab
              textColor="inherit"
              label="Contacts"
              component={Link}
              to={`/${match.params.id}/contacts`}
            /> */}
            <Tab
              textColor="inherit"
              label="Santé"
              component={Link}
              to={`/${match.params.id}/health`}
            />
            <Tab
              textColor="inherit"
              label="Entourage"
              component={Link}
              to={`/${match.params.id}/entourage`}
            />
            <Tab
              textColor="inherit"
              label="Domicile"
              component={Link}
              to={`/${match.params.id}/home`}
            />
            <Tab
              textColor="inherit"
              label="Plan"
              component={Link}
              to={`/${match.params.id}/plan`}
            />
          </Tabs>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  // classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

// export default withStyles(styles)(Header);
export default Header;
