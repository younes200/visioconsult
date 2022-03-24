// @flow

import { action, reaction, observable, computed, autorun } from "mobx";
import moment from "moment";
import User from "./User";

export interface IMessage {
  id: string;
  text: string;
  location: Array<number>;
  image: string;
  imageWidth: number;
  imageHeight: number;
  audio: string;
  createdAt: Date;
  user: User;
  from: string;
  sent: boolean;
  sentAt: Date;
  seen: boolean;
  seenAt: Date;
  received: boolean;
  receivedAt: Date;
  system: boolean;
  percent: number;
  preview: any;

  markSent(at: Date): IMessage;
  markSeen(at: Date): IMessage;
  markReceived(at: Date): IMessage;
  setProgress(value: number): void;
  setImage(value: string): void;
  setAudio(value: string): void;
  toJSON(): any;
}
export default class Message implements IMessage {
  @observable
  id: string;

  @observable
  text: string;

  @observable
  createdAt: Date;

  @observable
  user: User;

  @observable
  from: string;

  @observable
  system: boolean = false;

  // sytem message for local notification
  @observable
  sent: boolean = false;

  // message are sent by the system
  @observable
  sentAt: Date;

  @observable
  seen: boolean = false;

  // message seen by receiver
  @observable
  seenAt: Date;

  @observable
  received: boolean = false;

  @observable
  receivedAt: Date;

  @observable
  location: Array<number>;

  @observable
  image: string;

  @observable
  imageWidth: number;

  @observable
  imageHeight: number;

  @observable
  audio: string;

  @observable
  meta: any;

  @observable
  percent: number = 0;

  @observable
  loaded: boolean = true;

  @observable
  quickReplies = null;

  static Schema = {
    name: "Message",
    primaryKey: "id",
    properties: {
      id: "string",
      text: { type: "string", optional: true },
      location: { type: "double[]", optional: true },
      image: { type: "string", optional: true },
      imageWidth: { type: "double", optional: true },
      imageHeight: { type: "double", optional: true },

      audio: { type: "string", optional: true },
      createdAt: "date",
      sent: { type: "bool", optional: true, default: false },
      sentAt: { type: "date", optional: true },
      received: { type: "bool", optional: true },
      receivedAt: { type: "date", optional: true },
      seen: { type: "bool", optional: true, default: false },
      seenAt: { type: "date", optional: true },
      from: { type: "string" }
    }
  };

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.text = data.text;
      this.createdAt = data.createdAt;
      this.from = data.from;
      this.user = data.user;
      this.system = data.system;

      this.received = data.received != null ? data.received : false;
      this.receivedAt = data.receivedAt;

      this.seen = data.seen != null ? data.seen : false;
      this.seenAt = data.seenAt;

      this.sent = data.sent != null ? data.sent : false;
      this.sentAt = data.sentAt;
      this.location = data.location;
      this.image = data.image;
      this.audio = data.audio;

      this.imageWidth = data.imageWidth;
      this.imageHeight = data.imageHeight;

      this.loaded = data.loaded;
      this.quickReplies = data.quickReplies;
    }
  }

  @action
  markSent(at: Date): IMessage {
    this.sent = true;
    this.sentAt = at;
    return this;
  }

  @action
  markSeen(at: Date): IMessage {
    this.seen = true;
    this.seenAt = at;
    return this;
  }

  @action
  markReceived(at: Date): IMessage {
    this.received = true;
    this.receivedAt = at;
    return this;
  }

  @action
  setProgress(value) {
    this.percent = value;
    if (value >= 1) {
      this.loaded = true;
    }
  }

  @action
  setImage(value: string): IMessage {
    this.image = value;
    this.percent = 100;
    this.loaded = true;
    return this;
  }

  @action
  setAudio(value: string): IMessage {
    this.audio = value;
    this.percent = 100;
    this.loaded = true;
    return this;
  }

  toJSON(): any {
    return {
      id: this.id,
      text: this.text,
      image: this.image,
      imageWidth: this.imageWidth,
      imageHeight: this.imageHeight,
      audio: this.audio,
      location: this.location || [],
      createdAt: this.createdAt,
      received: this.received,
      receivedAt: this.receivedAt,
      seen: this.seen,
      seenAt: this.seenAt,
      sent: this.sent,
      sentAt: this.sentAt,
      from: this.from
    };
  }
}
