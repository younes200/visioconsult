// @flow
import { observable, computed, action } from "mobx";
import Zeroconf from "react-native-zeroconf";
import axios from "axios";
import { session, springboard } from "@stores";

const zeroconf = new Zeroconf();

const SCAN_TIMEOUT = 30000;
const ZEROCONF_NAME = "VisioConsultRobot";

class Robot {
  @observable
  localUrl = 0;

  serviceFoundSub;

  serviceLostSub;

  @observable
  scanning = false;

  @observable
  scanning = false;

  @observable
  services = [];

  timeout;

  @observable
  host;

  @observable
  port = 7000;

  @observable
  error = false;

  @observable
  robotIpDialog = false;

  constructor() {}

  @action
  scan() {
    if (this.scanning) {
      return;
    }

    this.services = [];

    zeroconf.scan("http", "tcp", "local.");

    // clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => {
    //   zeroconf.stop();
    // }, SCAN_TIMEOUT);
  }

  init() {
    this.scan();

    zeroconf.on("start", () => {
      console.log("scan started");
      this.scanning = true;
    });

    zeroconf.on("found", async service => {
      console.log("found ", service);
      console.log(zeroconf.getServices());
      const services = zeroconf.getServices();
      console.log("found => service : ", services[service]);

      if (service == ZEROCONF_NAME && !services[service].host && !this.host) {
        springboard.initRobotIpDialogEvent();
        this.robotIpDialog = true;
      } else if (service == ZEROCONF_NAME) {
        this.host = services[service].host || this.host;
        this.port = services[service].port || this.port;
        this.connect();
      }
    });

    zeroconf.on("stop", () => {
      console.log("scan stoped");
      this.scanning = false;
    });

    zeroconf.on("resolved", service => {
      console.log("[Resolve]", JSON.stringify(service, null, 2));

      if (service.name == ZEROCONF_NAME && !service.host && !this.host) {
        this.robotIpDialog = true;
      } else if (service.name == ZEROCONF_NAME) {
        console.log("service.host: ", service.host);
        console.log("service.port: ", service.port);
        this.host = service.host;
        this.port = service.port;
        this.connect();
        zeroconf.stop();
      }
    });

    zeroconf.on("update", service => {
      console.log("update ", service);
    });

    zeroconf.on("error", err => {
      console.log("scan err", err);
      this.scanning = false;
    });
  }

  @action
  setHost(host) {
    this.host = host;
  }

  @action
  async connect() {
    if (this.host) {
      try {
        const response = await axios.get(
          `http://${this.host}:${this.port}/status`
        );
        if (
          !response.data.authenticated ||
          response.data.userId != session.user.id
        ) {
          const res = await axios.post(
            `http://${this.host}:${this.port}/authenticate`,
            { token: session.accessToken },
            { headers: { Accept: "application/json" } }
          );
        }
      } catch (error) {
        console.log(error);
      }
      this.robotIpDialog = false;
      springboard.reset();
    } else if (this.robotIpDialog) {
      this.error = true;
    }
  }

  @action
  async logout() {
    try {
      if (this.host) {
        const res = await axios.post(`http://${this.host}:${this.port}/logout`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @computed
  get url() {
    return this.host && this.port ? `http://${this.host}:${this.port}/` : null;
  }
}

export default Robot;
