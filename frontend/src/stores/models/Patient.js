import { action, observable, computed } from "mobx";
import Picture from "../Picture"
class Patient {
  @observable
  id;

  @observable
  username;

  @observable
  roles = []

  @observable
  online = false;

  @observable
  patientSheet

  @observable
  patientContact = []


  @observable
  robotState = "off"

  @observable
  photo 



  constructor(data) {
    if (data) {
      this.fromJSON(data);
    }
  }



  @action
  setOnline(value){
    this.online = value
  }
  

  fromJSON(data) {
    this.id = data.id;
    this.username = data.username;
    this.roles = data.roles;
    this.online = data.online;
    this.patientSheet = data.patientSheet
    this.patientContact = data.patientContact
    this.photo = new Picture(data.photo)
  }
}

export default Patient;
