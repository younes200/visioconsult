import { action, observable, computed } from "mobx";
import RNFetchBlob from "react-native-fetch-blob";
import Config from "react-native-config";
import { getLocation } from "utils/Geolocation";
import { userPatchAttributes, userDestroyPicture } from "Agent";

import { session } from "@stores";

class EditProfile {
  @observable
  user;

  @observable
  picture = null;

  @observable
  uploading = false;

  @observable
  localizing = false;

  @observable
  birthday;

  @observable
  presentation;

  @observable
  progress;

  @action
  setBirthday(birthday) {
    this.birthday = birthday;
  }

  @action
  setPresentation(presentation) {
    this.presentation = presentation;
  }

  @action
  async refresh() {
    await session.refresh();
    this.picture = session.user.picture ? session.user.picture.thumbnail : null;
  }

  onFocus() {
    this.user = session.user;
  }

  @action
  save() {}

  @action
  async updateLocation() {
    try {
      this.localizing = true;
      const result = await getLocation();
      await userPatchAttributes(result);
      await this.refresh();
      this.localizing = false;
    } catch (e) {
      debug.log(e);
      this.localizing = false;
    }
  }

  @action
  async deletePhoto() {
    const { data } = await userDestroyPicture(session.user.picture.id);
    await this.refresh();
  }

  @action
  uploadPhoto(file) {
    this.uploading = true;

    const moderated = Config.ENV === "production";
    const params = {
      file,
      tags: `${session.user.id}, ${session.user.username}`,
      options: {
        type: "avatar",
        moderated
      }
    };

    this.picture = file.uri;

    // TODO: change to user pictureSignature from Agent
    // return new Promise((resolve, reject) => {
    //   this.agent
    //     .upload(params, progress => {
    //       this.progress = progress;
    //     })
    //     .then(async result => {
    //       if (
    //         moderated &&
    //         (!result.moderation ||
    //           result.moderation.length === 0 ||
    //           !result.moderation[0] ||
    //           !result.moderation[0].response ||
    //           result.moderation[0].response.status === "rejected")
    //       ) {
    //         this.uploading = false;
    //         return reject(new Error("REJECTED"));
    //       }

    //       await this.refresh();
    //       this.uploading = false;
    //       return resolve();
    //     });
    // });
  }
}

export default EditProfile;
