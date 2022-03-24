import { action, observable, computed } from "mobx";

class Picture {
  @observable
  url

  @observable
  createdAt

  constructor(data) {
    if (data) {
      this.fromJSON(data)
    }
  }

fromJSON(data) {
    this.url = data.url
    this.createdAt = data.createdAt
  }

}

export default Picture;
