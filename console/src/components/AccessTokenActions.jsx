import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { push } from 'react-router-redux'
import axios from 'axios'
import {showNotification } from 'react-admin'
import { withStyles } from '@material-ui/core/styles'
import storage from '../storage'
import { fetchJson, fetch } from '../fetch'
import { authClient } from '../authClient'


const styles = theme => ({
    inputWrapper: {
        marginTop: 15,
        marginBottom: 15
      }    
})

@withStyles(styles)
class AccessTokenActions extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 
  CreateToken = async () => {
   
    const { push,showNotification,record } = this.props
    const data= {
      ttl: -1,
      userId: record.id
    }
        fetchJson(`${process.env.API_URL}/accessToken`, { method: 'POST',body: JSON.stringify(data) })
    .then(response => {
        showNotification('La creation a été effectuée ')
        push(`/users/${record.id}`)
    })
    .catch(e => {
      console.log(e)
    }) 

  }
  render() {
    const { record,classes } = this.props
    return (
      <React.Fragment>
           <Button className={classes.inputWrapper}   variant="contained" onClick={this.CreateToken.bind(this)} color="primary" >Create token</Button>   
                
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
)(AccessTokenActions)
