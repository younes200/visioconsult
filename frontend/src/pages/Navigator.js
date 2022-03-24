import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
// import HomeIcon from '@material-ui/icons/HomeBase';
import PeopleIcon from "@material-ui/icons/PermIdentity";
import OnlineIcon from "@material-ui/icons/FiberManualRecord";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import { observer, inject } from "mobx-react";
import { Link, Route } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { Redirect } from "react-router-dom";
import Auth from "./Auth";
import Content from "./Content";

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: "rgba(255, 255, 255, 0.7)"
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: 16,
    paddingBottom: 16
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white
  },
  itemActionable: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemSelectedItem: {
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  },
  itemPrimary: {
    color: "inherit",
    fontSize: theme.typography.fontSize,
    "&$textDense": {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  onlineIcon: {
    color: "#59C111"
  },
  offlineIcon: {
    color: "#ff0000"
  },
  avatar: {
    margin: 0,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
});

@withStyles(styles)
@inject("session", "patients")
@observer
class Navigator extends React.Component {
  render() {
    const { classes, ...other } = this.props;
    const { current, list } = this.props.patients;
    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
            className={classNames(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            VisioConsult
          </ListItem>
          <ListItem className={classNames(classes.item, classes.itemCategory)}>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary
              }}
            >
              Opérateur
            </ListItemText>
          </ListItem>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary
              }}
            >
              Patient
            </ListItemText>
            <ListItemSecondaryAction>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary
              }}
            >
              {list.length}
            </ListItemText>
            </ListItemSecondaryAction>
          </ListItem>

          {list.map(({ id, username, online, patientSheet,photo }) => {
            return(
              (
                <ListItem
                  button
                  component={Link}
                  to={`/${id}`}
                  dense
                  key={id}
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                    current && current.id === id && classes.itemSelectedItem
                  )}
                >
                  <ListItemIcon>
                    {photo.url ? (
                      <Avatar
                        src={photo.url}
                        className={classes.avatar}
                      />
                    ) : (
                      <Avatar className={classes.avatar}>
                        {username[0].toUpperCase()}
                      </Avatar>
                    )}
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense
                    }}
                  >
                    {username}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <DotIcon
                      className={online ? classes.onlineIcon : classes.offlineIcon}
                      style={{ fontSize: 15 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            )
          })}
        </List>
      </Drawer>
    );
  }
}

export default Navigator;
