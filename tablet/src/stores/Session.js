import { action, reaction, observable, observe, computed, autorun } from "mobx";
import { userMe, setAccessToken, userFindByIdAceessTokens } from "Agent";
import * as Keychain from "react-native-keychain";

import { User } from "@models";
import { app, gateway, navigation, springboard, robot } from "@stores";

class Session {
  // current user instance
  @observable
  user;

  // current authenticated state
  @observable
  authenticated = false;

  // state the authenticating process
  @observable
  authenticating = true;

  async init() {
    this.authenticating = true;
    try {
      const accessToken = await this.restore();
      if (accessToken) {
        const { data: user } = await userMe({ accessToken: accessToken.id });
        setAccessToken(accessToken.id);
        this.save(accessToken);
        await this.onAuthenticate(user);
      } else {
        throw new Error("SESSION_EXPIRED");
      }
    } catch (e) {
      this.authenticating = false;
      this.authenticated = false;
    }
  }

  @action
  async reconnect() {
    if (!this.authenticated) {
      if (!this.authenticating) {
        await this.init();
        if (this.authenticated) {
          await gateway.reconnect();
        }
      }
    } else {
      await gateway.reconnect();
    }
  }

  @action
  async loginWithToken(accessTokenId) {
    if (!app.online) {
      throw new Error("OFFLINE");
    }
    this.authenticating = true;
    try {
      setAccessToken(accessTokenId);
      const { data: user } = await userMe({ accessToken: accessTokenId });
      const { data: accessToken } = await userFindByIdAceessTokens({
        id: user.id,
        fk: accessTokenId
      });
      this.save(accessToken);
      this.onAuthenticate(user);
      return user;
    } catch (e) {
      console.log("login error", e);
      this.authenticating = false;
      throw e;
    }
  }

  async refresh() {
    try {
      const { data, status } = await userMe();
      if (status === 200) {
        this.user.fromJSON(data);
      }
    } catch (e) {
      console.log("refresh error", e);
    }
  }

  async onAuthenticate(user) {
    // skip if already authenticated
    if (!this.authenticated) {
      this.user = new User(user);

      this.authenticated = true;
      setTimeout(() => {
        gateway.connect();
      }, 10000);
      await springboard.init();
      navigation.navigate("Home");
    }
    return true;
  }

  async save(accessToken) {
    this.accessToken = accessToken;
    try {
      await Keychain.setGenericPassword(accessToken.userId, accessToken.id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async restore() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return { userId: credentials.username, id: credentials.password };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async reset() {
    try {
      //await Keychain.resetGenericPassword();
      return true;
    } catch (error) {
      return null;
    }
  }

  @action
  logout(online = true) {
    this.authenticated = false;
    this.user = null;
    // this.reset();
    // gateway.hangup();
    gateway.disconnect();
    if (online) {
      navigation.navigate("Landing");
    }
    robot.logout();
  }
}

export default Session;
