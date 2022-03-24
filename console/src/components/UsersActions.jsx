import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { push } from 'react-router-redux'
import axios from 'axios'
import {showNotification } from 'react-admin'


import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import storage from '../storage'
import { fetchJson, fetch } from '../fetch'
import { authClient } from '../authClient'


const styles = theme => ({
 
})

@withStyles(styles)
class UsersActions extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 
  DeleteAccessToken = async () => {
    const { push,showNotification,record } = this.props
    fetchJson(`${process.env.API_URL}/accessToken/${record.id}`, { method: 'DELETE' })
    .then(response => {
        showNotification('La suppression a été effectuée ')
        push(`/users/${record.userId}`)
    })
    .catch(e => {
      console.log(e)
    }) 
   
  }

  render() {
    const { record } = this.props
    return (
      <React.Fragment>
          <Button   variant="contained" color="primary" onClick={this.DeleteAccessToken.bind(this)}>Delete</Button>
      </React.Fragment>
    )
  }
}

export default connect(
    null,
    {
    showNotification,
    push
    }
)(UsersActions)
