const logger = require("winston");
const MQTT = require("async-mqtt");
const moment = require("moment");
const EventEmitter = require("events");

const MQTT_SERVER = process.env.MQTT_SERVER || "wss://mqtt.visioconsult.care";

// delay in seconds to consider a message expired
const MESSAGE_EXPIRATION = 6

class MqttClient extends EventEmitter {
  constructor() {
    super();
    this.connected = false;
  }

  connect(user) {
    this.user = user;
    this.topic = `/vc/${user.id}/command`;
    this.stateTopic = `/vc/${user.id}/state`;

    this.mqtt = MQTT.connect(MQTT_SERVER, {
      keepalive: 300,
      clientId: `robot_${user.id}`
      // will: {
      //   topic: this.stateTopic,
      //   payload:
      // }
    });
    this.mqtt.on("error", e => {
      logger.error(e);
    });
    this.mqtt.on("connect", () => {
      logger.info(`MQTT connected`);

      this.mqtt.subscribe(this.topic);
      logger.info(`MQTT subscribed to ${this.topic}`);
      this.connected = true;
    });

    this.mqtt.on("reconnect", () => {
      logger.debug("MQTT reconnected");
    });

    this.mqtt.on("offline", () => {
      logger.error("MQTT offline");
    });

    this.mqtt.on("message", this.onMessage.bind(this));
  }

  publishState(value) {
    if (this.connected) {
      this.mqtt.publish(
        this.stateTopic,
        JSON.stringify({ ...value, timestamp: moment().unix() }),
        { retain: true, qos: 0 }
      );
    }
  }

  onMessage(topic, payload) {
    // message is Buffer
    if (topic == this.topic) {
      var parsed;
      try {
        parsed = JSON.parse(payload.toString());
      } catch (e) {
        logger.error(`Failed to parse json message ${e.message}`, {
          topic,
          payload: payload.toString()
        });
        return;
      }

      const { type, body, timestamp } = parsed;

      if (!timestamp) {
        logger.debug("Timestamp missing");
      }

      var expired = moment
        .unix(timestamp)
        .isBefore(moment().subtract(MESSAGE_EXPIRATION, "seconds"));

      if (!expired) {
        switch (type) {
          case "join":
            this.emit("room:join", body);
            break;
          case "leave":
            this.emit("room:leave");
            break;
          case "robot":
            this.handleRobotCommands(body, timestamp);
            break;
        }
      } else {
        logger.debug("Message expired", parsed);
      }
    }
  }

  handleRobotCommands(body, timestamp) {
    const { command, value } = body;

    logger.debug("handleRobotCommands:"+JSON.stringify(body))
    switch (command) {
      case "linear":
        this.emit("command:linear", value);
        break;
      case "angular":
        this.emit("command:angular", value);
        break;
      case "verin":
        this.emit("command:verin", value);
        break;
      case "led":
        this.emit("command:led", value);
        break;
    }
  }

  close(){
    if(this.mqtt && this.mqtt.connected){
      return this.mqtt.end()
    }
    return;
  }
}

module.exports = new MqttClient();
