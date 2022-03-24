import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Button,
  Menu,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

const WithStateAndPush = connect(null, {
  push,
})(WithState)


export default ({items}) => {
  return (
    <WithStateAndPush>
      {({ anchorEl, updateAnchorEl, push, classes}) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };
        const handleSupport = () => {
          push(`/support/${record.id}`)
        }

        const handleView = () => {
          push(`/users/${record.id}/show`)
        }

        const handleEdit = () => {
          push(`/users/${record.id}`)
        }
        return (
          <React.Fragment>
            <IconButton
              aria-owns={open ? 'render-props-menu' : null}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
               <MoreVertIcon />
            </IconButton>
            <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
            style: {
              width: 200,
            },
          }}>
          {items.map(item => <MenuItem onClick={()=> item.onClick != null ? item.onClick(item) : push(item.path)}>{item.name}</MenuItem> )}
            </Menu>
          </React.Fragment>
        );
      }}
    </WithStateAndPush>
  );
}
