// @flow
import { observable, computed, action } from "mobx";
import moment from "moment";
import images from "@assets/images";
import emojiFlags from "emoji-flags";
import variables from "theme/variables/commonColor";
import Picture from "./Picture";

class User {
  @observable
  id: string;

  @observable
  createdAt: Date;

  @observable
  gender: number;

  @observable
  username: string;

  @observable
  dating: any;

  @observable
  presentation: string;

  @observable
  birthday: Date;

  @observable
  online: boolean;

  @observable
  lastSeenAt: Date;

  @observable
  picture: any;

  @observable
  location: any;

  @observable
  countryCode: string;

  @observable
  regionCode: string;

  @observable
  regionName: string;

  @observable
  patientContact: array;

  @observable
  city: string;

  @observable
  zip: string;

  picture: string;

  static Schema = {
    name: "User",
    primaryKey: "id",
    properties: {
      id: "string",
      username: "string",
      email: { type: "string", optional: true },
      gender: { type: "string", optional: true },
      picture: { type: "Picture", optional: true },
      pictures: { type: "list", objectType: "Picture" }
    }
  };

  constructor(data: any) {
    if (data) {
      this.fromJSON(data);
    }
  }

  @computed
  get name(): string {
    return this.username;
  }

  @computed
  get avatarGender() {
    return this.gender === 0 ? images.avatarMale : images.avatarFemale;
  }

  get color() {
    return this.gender === 0
      ? variables.genderMaleColor
      : variables.genderFemaleColor;
  }

  @computed
  get avatar() {
    return this.picture ? this.picture.thumbnail : this.avatarGender;
  }

  @computed
  get thumbnail(): string {
    return this.picture ? { uri: this.picture.thumbnail } : this.avatarGender;
  }

  @computed
  get age(): number {
    return this.birthday ? moment().diff(this.birthday, "years") : 18;
  }

  get countryEmoji(): string {
    return this.countryCode
      ? emojiFlags.countryCode(this.countryCode).emoji
      : "";
  }

  @action
  fromJSON(data) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.gender = data.gender;
    this.username = data.username;
    this.dating = data.dating;
    this.presentation = data.presentation;
    this.online = data.online;
    this.picture = new Picture(data.photo);
    this.location = data.location;
    this.countryCode = data.countryCode;
    this.regionCode = data.regionCode;
    this.regionName = data.regionName;
    this.city = data.city;
    this.zip = data.zip;
    this.birthday = data.birthday
      ? data.birthday
      : moment()
          .subtract(18, "years")
          .toDate();
    this.patientContact = data.patientContact;
    this.patientSheet = data.patientSheet;
  }

  toJSON(): any {
    return {
      id: this.id,
      createdAt: this.createdAt,
      gender: this.gender,
      username: this.username,
      dating: this.dating,
      presentation: this.presentation,
      online: this.online,
      birthday: this.birthday,
      picture: this.picture ? this.picture.toJSON() : null
    };
  }

  toPresence(): any {
    return {
      id: this.id,
      gender: this.gender,
      username: this.username,
      dating: this.dating,
      presentation: this.presentation,
      birthday: this.birthday,
      picture: this.picture ? this.picture.toJSON() : null
    };
  }
}

export default User;
