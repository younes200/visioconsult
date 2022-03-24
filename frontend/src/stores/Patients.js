
import { action, observable, computed } from 'mobx'
import {
  setAccessToken,
  userLogin,
  userMe,
  userFind,
  userFindById,
  userCreateComment
} from '../Agent'
import { Patient } from './models'
import { isNil, intersectionWith, differenceWith, find } from "lodash";
import mqtt from '../utils/mqtt'
import { gateway, session } from '.'
import moment from 'moment'

class Patients {
 
  @observable
  current

  @observable
  list = []

  @observable
  msgComment

  @observable
  loadingComment = false

  @observable
  dateComment = moment().format('YYYY-MM-DDTHH:mm')

  @observable
  disabled = true

  constructor(){
    mqtt.on("state", this.onRobotState.bind(this))
  }

  async init(){   
    const { data } = await userFind({})
    const filtred = data.filter(user => user.roles.filter(role => role.name == "patient").length > 0).map((item)=>new Patient(item))
    this.list.replace(filtred)
  }

  async select(id) {

    const user = find(this.list, (p)=> p.id == id)
    if(user){
      this.current = user
    }else{
      try {
        const {data} = await userFindById({id});
        this.current = new Patient(data); 
       } catch (error) {
         console.log(error);
       }
    }

  }

  // onNetChange(connectionInfo: any) {
  //   this.online = connectionInfo.type !== "none";
  //   console.log("**** onNetChange *************************");

  //   if (this.online == true) {
  //     session.reconnect();
  //   } else {
  //     session.logout(false);
  //   }
  // }

  @action
  onPresence(newList){
    intersectionWith(this.list, newList, (p, id)=>p.id === id).map((p)=> p.setOnline(true))
    differenceWith(this.list, newList, (p, id)=>p.id === id).map((p)=> p.setOnline(false))
  }

  @action
  onRobotState({userId, payload}) {
    const user = find(this.list, (p)=> p.id == userId)
    if(user){
      user.robotState = payload.gateway
    }
  }

  @action
  doCall(){
    gateway.call(this.current.id)
  }

  @action
  setCommentDate(date) {
    this.dateComment = date 
    this.setDisabled()
  }

  setDisabled() {
    if(this.msgComment && this.dateComment) {
      this.disabled = false
    } else {
      this.disabled = true
    }
  }
  
  @action
  setCommentMsg(msg) {
    this.msgComment = msg
    this.setDisabled()
  }
  
  @action
  cancelComment() {
    this.msgComment = null
    this.dateComment = moment().format('YYYY-MM-DDTHH:mm')
  }

  @action
  async userCreateComment() {
    
    const query = {
      id: session.user.id,
      data: {
        message: this.msgComment,
        date: this.dateComment,
        patientId: this.current.id,
        operatorId: session.user.id
      }
    }
    try {
      var {data} = await userCreateComment(query)
      if(data) {
        this.loadingComment = true
        data.operator = session.user
        this.current.patientSheet.comments.push(data)
        this.current.patientSheet.comments.replace(this.current.patientSheet.comments)
        this.loadingComment = false
      }
    } catch (error) {
      console.log(error)    }
  }

}

export default Patients
