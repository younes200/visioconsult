// @flow
import { action, observable, computed } from "mobx";
import { userFindById } from "Agent";
import { User, Message } from "@models";

import moment from "moment";
import RNFS from "react-native-fs";

import { session, realm } from "@stores";
import rocket from "@rocket";

// @Dependencies(Session, Agent, Rocket, Realm)
export default class Chat {
  id: string; // chat id is the recipient id

  // messages list
  @observable
  messages: IObservableArray<IMessage>;

  // sender is session user, this will replaced by a global reference instead of a copy here
  @observable
  sender: User;

  //
  @observable
  recipient: User;

  // will be used with realm to retrive old messages
  @observable
  loadEarlier: boolean = false;

  // same as loadEarlier
  @observable
  isLoadingEarlier: boolean = false;

  // try
  @observable
  typingText: string;

  @observable
  active: boolean;

  @observable
  hasFocus: boolean = false;

  @observable
  paired: boolean;

  @observable
  pairing: boolean;

  peer: any;

  static Schema = {
    name: "Chat",
    primaryKey: "id",
    properties: {
      id: "string",
      recipient: { type: "User" },
      messages: { type: "list", objectType: "Message", default: [] }
    }
  };

  constructor() {
    this.messages = [];
  }

  async initialize({ id }, messages: any[]) {
    if (!id) {
      throw new Error("id required");
    }

    console.log("Chat initialize", id);
    this.id = id;
    this.messages = [];

    // TODO: resolve recipient from realm and refrench use after
    const { data } = await userFindById({ id });

    this.sender = session.user;
    this.recipient = new User(data);

    if (messages && messages.length > 0) {
      const appended = messages.map(m => {
        const user = m.from === this.sender.id ? this.sender : this.recipient;
        return new Message({ ...m, user });
      });

      this.messages.unshift(...appended);
    }

    const instance = realm.instance
      .objects(Chat.Schema.name)
      .filtered("id = $0", this.id);

    if (instance.length === 0) {
      try {
        realm.instance.write(() => {
          realm.instance.create(Chat.Schema.name, this.toJSON(), true);
        });
      } catch (e) {
        debug.error("failed to save instance on initialization", e);
      }
    } else {
      debug.info(`chat instance already saved`);
    }

    rocket.roster.on("changed", this.onRosterUpdated.bind(this));
    rocket.joinPresence(this.id);

    // rocket.join(this.id).catch(e => {
    //   this.addSystemMessage('Last seen ' + moment(this.lastSeenAt).fromNow());
    // });

    return this;
  }

  @action
  onRosterUpdated(peer) {
    if (peer && peer.user && this.id === peer.user.id) {
      this.peer = peer;
      this.paired = peer.paired;
      this.pairing = peer.pairing;
    }
  }

  @action
  pair() {
    if (this.paired === false && this.peer != null && this.pairing === false) {
      rocket.roster.pair(this.peer.id);
    }
  }

  @computed
  get senderToJson() {
    return {
      id: session.user.id,
      username: session.user.username,
      avatar: session.user.avatar
    };
  }

  @computed
  get latest() {
    const messages = this.messages.filter(m => !m.system);
    return messages.length > 0 ? messages[0] : null;
  }

  @computed
  get myLatest() {
    const messages = this.messages.filter(
      m => !m.system && m.from !== this.sender.id
    );
    return messages.length > 0 ? messages[0] : null;
  }

  @computed
  get myLatestAt() {
    return this.myLatest ? this.myLatest.createdAt : null;
  }

  @computed
  get latestAt() {
    return this.latest ? this.latest.createdAt : null;
  }

  @computed
  get latestAtFromNow() {
    return this.latestAt ? moment(this.latestAt).fromNow() : "";
  }

  /**
   * Message that current user not read yet
   */
  @computed
  get unread() {
    return this.messages.filter(
      m => !m.system && m.from === this.recipient.id && !m.seen
    );
  }

  /**
   * Message that other user doesn't see yet
   */
  @computed
  get unseen() {
    return this.messages.filter(
      m => !m.system && m.from !== this.sender.id && !m.seen
    );
  }

  /**
   * Message that other user doesn't received yet
   */

  @computed
  get reception() {
    return this.messages.filter(m => !m.system && m.from === this.sender.id);
  }

  @computed
  get emission() {
    return this.messages.filter(m => !m.system && m.from !== this.sender.id);
  }

  @computed
  get unreceived() {
    return this.messages.filter(
      m => !m.system && m.text && m.from === this.sender.id && !m.received
    );
  }

  @computed
  get unsent() {
    return this.messages.filter(
      m => !m.system && m.from === this.sender.id && !m.sent
    );
  }

  /**
   * Totla message except system
   */
  @computed
  get count() {
    return this.messages.filter(m => !m.system).length;
  }

  @action
  clearSystemMessage() {
    const nonSystemMessages = this.messages.filter(m => !m.system);
    this.messages.replace(nonSystemMessages);
  }

  @action
  clearQuickReplies() {
    this.messages.replace(this.messages.filter(m => !m.quickReplies));
  }

  @action
  addSystemMessage(message: string) {
    this.clearSystemMessage();

    this.messages.unshift(
      new Message({
        id: this.sender.id,
        text: message,
        createdAt: new Date(),
        system: true
      })
    );
  }

  @action
  addQuickReply() {
    this.clearQuickReplies();

    this.messages.unshift(
      new Message({
        id: this.sender.id,
        createdAt: new Date(),
        system: true,
        quickReplies: [
          {
            id: Math.round(Math.random() * 1000000),
            contentType: "text",
            title: "😋 Yes"
          },
          {
            id: Math.round(Math.random() * 1000000),
            contentType: "text",
            title: "😞 Nope"
          }
        ]
      })
    );
  }

  @action
  async onLoadEarlier() {}

  @action
  onFocus(value) {
    this.hasFocus = value;
    if (value === true) {
      this.markRead();
      this.pair();
    }
  }

  @action
  async refresh() {
    return true;
  }

  @action
  markSent(messages: string[]) {
    const results = [];
    const ids = messages.map(m => m.id);
    const filtred = this.messages.filter(x => ids.includes(x.id));
    filtred.forEach(message => {
      const marked = message.markSent(new Date(Date.now()));
      results.push(marked.toJSON());
    });

    try {
      realm.instance.write(() => {
        results.forEach(m => {
          realm.instance.create(Message.Schema.name, m, true);
        });
      });
      debug.info("message sent saved", results);
    } catch (e) {
      debug.error(e);
    }
    return results;
  }

  @action
  markSeen() {
    const results = [];
    this.unseen.forEach(message => {
      const marked = message.markSeen(new Date(Date.now()));
      results.push(marked.toJSON());
    });

    try {
      realm.instance.write(() => {
        results.forEach(m => {
          realm.instance.create(Message.Schema.name, m, true);
        });
      });
      debug.info("message seen saved", results);
    } catch (e) {
      debug.error(e);
    }
  }

  @action
  markReceived({ messages, receivedAt }: any) {
    const results = [];
    this.unreceived.filter(e => messages.includes(e.id)).forEach(message => {
      message = message.markReceived(receivedAt);
      results.push(message.toJSON());
    });

    try {
      realm.instance.write(() => {
        results.forEach(m => {
          realm.instance.create(Message.Schema.name, m, true);
        });
      });
      debug.info("message received saved", results);
    } catch (e) {
      console.error(e);
    }

    return results;
  }

  @action
  markRead() {
    const results = [];
    this.unread.forEach(message => {
      message.markSeen(new Date(Date.now()));
      results.push(message.toJSON());
    });

    try {
      realm.instance.write(() => {
        results.forEach(m => {
          realm.instance.create(Message.Schema.name, m, true);
        });
      });
    } catch (e) {
      console.warn(e);
    }
  }

  @action
  append(messages) {
    if (messages && messages.length > 0) {
      this.clearSystemMessage();
      const ids = this.messages.map(m => m.id);

      let appended = messages.filter(e => !ids.includes(e.id)).map(m => {
        if (m.user === undefined) {
          m.user = m.from === session.user.id ? session.user : this.recipient;
        }
        return new Message(m);
      });

      this.messages.unshift(...appended);

      appended = appended.map(a => a.toJSON());

      try {
        realm.instance.write(() => {
          const instance = realm.instance
            .objects(Chat.Schema.name)
            .filtered("id = $0", this.id);
          if (instance && instance.length > 0) {
            instance[0].messages.push(...appended);
          }
        });
      } catch (e) {
        debug.log("failed to persiste messages on append", e);
      }

      return appended;
    }
    return [];
  }

  onReceive(messages: array) {
    const transformed = messages
      .filter(m => !m.audio && !m.image)
      .map(m => Object.assign(m, { loaded: false }));

    const appended = this.append(messages);
    if (appended.length > 0) {
      const ids = appended.map(m => m.id);
      this.sendReceived(ids);
      if (this.hasFocus) {
        this.markRead();
      }
    }
  }

  @action
  removeMessage(message: IMessage) {
    const filtred = this.messages.filter(i => i.id !== message.id);
    this.messages.replace(filtred);

    realm.instance.write(() => {
      const elm = realm.instance
        .objects(Message.Schema.name)
        .filtered("id = $0", message.id);
      realm.instance.delete(elm);
    });
  }

  onSendImage(message: any) {
    message.loaded = false;

    const appended = this.append([message]);
    const { data, thumbnail, ...thumbMessage } = message;

    thumbMessage.image = message.thumbnail;

    try {
      rocket.sendMessage({
        data: [thumbMessage],
        to: this.recipient.id,
        direct: true
      });
      this.markSent(appended);

      rocket.sendBlob(this.peer.id, message);
    } catch (e) {
      debug.log("cannot send messae", e);
    }
  }

  onSend(messages: Array<IMessage>) {
    const toAppend = messages.map(m =>
      Object.assign(m, { from: session.user.id })
    );
    const appended = this.append(toAppend);
    if (appended.length > 0) {
      try {
        rocket.sendMessage({
          data: appended,
          to: this.recipient.id,
          direct: true
        });
        this.markSent(appended);
      } catch (e) {
        console.log("not connected");
      }
    }

    // this.oneSignal.postNotification(chat.id);
    return appended;
  }

  sendSeen() {
    try {
      const ids = this.unseen.map(m => m.id);
      rocket.sendSeenEvent({
        data: { seenAt: new Date(), messages: ids },
        to: this.recipient.id
      });
      this.markSeen();
    } catch (e) {
      debug.error(e);
    }
  }

  sendReceived(ids) {
    try {
      rocket.sendReceivedEvent({
        data: { receivedAt: new Date(), messages: ids },
        to: this.recipient.id
      });
    } catch (e) {
      debug.error(e);
    }
  }

  onDataReceived(data) {
    const message = this.messages.find(i => i.id === data.id);
    if (message) {
      debug.log("message found", message);
      const ext = data.contentType === "image" ? "jpg" : "mp4";
      const file = `${RNFS.DocumentDirectoryPath}/test.${ext}`;
      RNFS.writeFile(file, data.content, "base64")
        .then(() => {
          const fileUri = `file://${file}`;
          let model;
          if (data.contentType === "image") {
            model = message.setImage(fileUri).toJSON();
          } else {
            model = message.setAudio(fileUri).toJSON();
          }
          // save file
          realm.instance.write(() => {
            realm.instance.create(Message.Schema.name, model, true);
          });
        })
        .catch(e => {
          debug.log("WriteFile", e);
        });
    } else {
      debug.log("message not found", data.id);
    }
  }

  tick() {
    this.resend();
  }

  resend() {
    if (this.unreceived.length > 0 && this.recipient.online) {
      const messages = this.unreceived.map(m => m.toJSON());
      try {
        rocket.sendMessage({
          data: messages,
          to: this.recipient.id,
          direct: true
        });
      } catch (e) {
        debug.error("not connected");
      }
    }
  }

  delete() {
    try {
      this.messages.clear();
      rocket.leavePresence(this.id);
      rocket.roster.off("changed", this.onRosterUpdated.bind(this));

      realm.instance.write(() => {
        const instance = realm.instance
          .objects(Chat.Schema.name)
          .filtered("id = $0", this.id);
        realm.instance.delete(instance);
        debug.log("instance deleted", instance);
      });
    } catch (e) {
      debug.error("failed to delete chat instance", e.message);
    }
  }

  toJSON() {
    return {
      id: this.id,
      messages:
        this.messages.length > 0 ? this.messages.map(m => m.toJSON()) : [],
      recipient: this.recipient.toJSON()
    };
  }
}
