// @flow
import { observable, computed, action } from "mobx";
import moment from "moment";

class Picture {
  @observable
  id: string;

  @observable
  id: string;

  @observable
  url: string;

  @observable
  thumbnail: string;

  @observable
  width: number;

  @observable
  height: number;

  @observable
  hecreatedAtight: number;

  static Schema = {
    name: "Picture",
    primaryKey: "id",
    properties: {
      id: "string",
      pid: "string",
      url: "string",
      thumbnail: "string",
      width: "double",
      height: "double",
      createdAt: { type: "date", optional: true }
    }
  };

  constructor(data: any) {
    if (data) {
      this.fromJSON(data);
    }
  }

  @action
  fromJSON(data) {
    this.id = data.id;
    this.pid = data.pid;
    this.url = data.url;
    this.thumbnail = data.thumbnail;
    this.width = data.width;
    this.height = data.height;
  }

  toJSON(): any {
    return {
      id: this.id,
      pid: this.pid,
      url: this.url,
      thumbnail: this.thumbnail,
      width: this.width,
      height: this.height,
      createdAt: this.createdAt
    };
  }
}

export default Picture;
