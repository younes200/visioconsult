
import { action, observable, computed } from 'mobx'
import {
  setAccessToken,
  userLogin,
  userMe,
  userFind,
  userFindById
} from '../Agent'
import { Patient } from './models'
import mqtt from '../utils/mqtt'
import { gateway, patients, robot} from '.'

class Session {
 
  @observable
  user

  @observable
  accessToken

  @observable
  authenticated = false

  @observable
  authenticating = false

  @observable
  notifications = []

  @observable
  roleMessage

  constructor(){
    this.init()
  }

  reset() {
    this.user = null
    this.users = []
    this.isOperator = false
    this.isAdmin = false
    this.onlineUsers = []
    this.offlineUsers = []
    this.remoteList = []
    this.videoCall = false
    this.localStream = null
    this.accessToken = null
    this.user = null
    this.authenticated = false
  }

  async init() {
    try {
      const accessToken = await this.restore()
      if (accessToken) {
        this.authenticating = true
        const { data: user } = await userMe({ accessToken: accessToken })
        await this.onAuthenticate(user, accessToken)
      } else {
        throw new Error('SESSION_EXIPRED')
      }
    } catch (e) {
      this.authenticating = false
      this.authenticated = false
    }
  }


  @action
  async logInWithEmail({username, password}) {
    this.roleMessage = null
    this.isNotOperator = false 
    try {
      this.authenticating = true
      const { data: accessToken, status } = await userLogin({
        credentials: { username, password }
      })
      if (status !== 200) {
        this.authenticating = false
        this.authenticated = false
        throw new Error('FAILED')
      } 
      const { data: user } = await userMe({ accessToken: accessToken.id })
      if(user.roles.length > 0) {        
        this.isAdmin =  user.roles.find(function(role) {
          return role.name == "admin"
        }) ? true : false;
        this.isOperator = user.roles.find(function(role) {
          return role.name == "operator"
        }) ? true : false;
      }
      if (this.isOperator || this.isAdmin) {
        this.save(accessToken)
        this.onAuthenticate(user, accessToken)     
      } else { 
        this.authenticating = false
        // this.authenticated = false
        this.roleMessage = "Vous n'avez pas les doits d'accès"
        this.isNotOperator = true
      }
      // this.authenticated = true
      return true
    } catch (e) {
      this.authenticating = false
      this.roleMessage = "Erreur: email ou mot de passe est incorrect"
        this.isNotOperator = true
      // this.authenticated = false
      
    }
  }
 
  @action
  async onAuthenticate(user, accessToken) {
    this.user = user
    setAccessToken(accessToken)
    this.authenticated = true
    this.authenticating = false
    this.onConnected()
    return true
  }

 


  async onConnected(){
    patients.init()
    gateway.connect()
    robot.connect()
  }
 
  save(accessToken) {
    this.accessToken = accessToken
    window.localStorage.setItem('accessToken', accessToken.id);
    setAccessToken(accessToken.id)
  }

  restore() {
    return window.localStorage.getItem('accessToken');
  }

  resetToken() {
    window.localStorage.removeItem('accessToken');
  }


  notify(message){
    this.notifications.push({
      message,
      options: {
        variant: 'success',
          autoHideDuration: 5000
      }
    })
  }

  removeSnackbar(key){
    this.notifications =  this.notifications.filter(notification => notification.key !== key)
  }

  async getUserById(id) {
    try {
     const {data} = await userFindById({id});
     this.selectedUser = data; 
    } catch (error) {
      console.log(error);
    }
  }


  @action
  logOut() {  
    this.resetToken()
    //socket.logout()
    this.reset()
    gateway.disconnect()    
    robot.disconnect()
  }
}

export default Session
