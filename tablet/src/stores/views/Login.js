import { action, reaction, observable, observe, computed, autorun } from "mobx";
import storage from "utils/storage";
import { ERROR_CODES } from "Agent";
import validate from "validate.js";

import { session } from "@stores";

// const constraints = {
//   username: {
//     presence: {
//       message: "signup.username.errors.missing"
//     },
//     length: {
//       minimum: 5,
//       message: "signup.username.errors.min"
//     }
//   },
//   password: {
//     presence: {
//       message: "signup.password.errors.missing"
//     },
//     length: {
//       minimum: 5,
//       message: "signup.password.errors.min"
//     }
//   }
// };

class Login {
  @observable
  username;

  @observable
  password;

  @observable
  error;

  @observable
  authenticating = false;

  @observable
  authenticated = false;

  constructor() {
    this.reset();
  }

  @action
  async signin(accessTocken) {
    this.authenticating = true;
    try {
      const user = await session.login(accessTocken);
      this.username.value = user.username;
      this.saveUsername();
      this.authenticating = false;
      this.authenticated = true;
      this.reset();
    } catch (e) {
      this.authenticating = false;
      this.authenticated = false;
      let message = "";
      console.log("e.statusCode", e);

      switch (e.statusCode) {
        case ERROR_CODES.OFFLINE:
          message = "login.errors.offline";
          break;
        case ERROR_CODES.SERVER_NOT_RESPONDING:
          message = "login.errors.serverError";
          break;
        case "UNAUTHORIZED":
          message = "login.errors.unauthorized";
          break;
        default:
          message = "login.errors.serverError";
      }
      this.error = message;
    }
  }

  saveUsername() {
    try {
      storage.save({
        key: "username",
        data: this.username.value
      });
    } catch (e) {
      // swalow error before is not needed
    }
  }

  async loadUsername() {
    try {
      this.username.value = await storage.load({
        key: "username"
      });
    } catch (e) {
      // swalow error before is not needed
    }
  }

  @action
  reset() {
    this.username = {
      value: "",
      error: null,
      failed: false,
      valid: false,
      checked: false,
      checking: false,
      max: 15
    };
    this.password = {
      value: "",
      error: null,
      failed: false,
      valid: false,
      checked: false,
      checking: false
    };
    this.error = null;
    this.loadUsername();
  }
}

export default Login;
