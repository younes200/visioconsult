import { action, observable, computed } from "mobx";
import { userFindById } from "Agent";

import { User, Message } from "@models";
import { session } from "@stores";

class Profile {
  @observable
  user;

  async fetch(id) {
    const { data } = await userFindById({ id });
    this.user = new User(data);
  }

  onFocus() {}

  @action
  save() {}
}

export default Profile;
