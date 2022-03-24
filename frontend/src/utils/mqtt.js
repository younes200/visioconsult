import MQTT from "async-mqtt";
import mitt from "mitt";
import moment from "moment";

const MESSAGE_EXPIRATION = 60 // 30 seconds

class MqttClient {
  mqtt;

  constructor() {
    const emitter = mitt();
    Object.keys(emitter).forEach(method => {
      this[method] = emitter[method];
    });
  }

  connect() {
    this.mqtt = MQTT.connect(process.env.REACT_APP_MQTT_URL, {
      keepalive: 0
    });
    this.mqtt.on("connect", this.onConnect.bind(this));
    this.mqtt.on("message", this.onMessage.bind(this));
  }

  onConnect() {
    console.log("MQTT connected");
    this.mqtt.subscribe("/vc/+/state");
  }

  publish(to, payload) {
    if (!this.mqtt) throw new Error("MQTT not connected");
    this.mqtt.publish(
      `/vc/${to}/command`,
      JSON.stringify({ ...payload, timestamp: moment().unix() }),
      { retain: false, qos: 0 }
    );
  }

  publishJoin(to, room) {
    this.publish(to, { type: "join", body: { room } });
  }

  publishLeave(to, room) {
    this.publish(to, { type: "leave", body: { room } });
  }


  onMessage(topic, payload) {
    const userId = topic.split("/")[2];
    // message is Buffer
    var parsed;
    try {
      parsed = JSON.parse(payload.toString());

      if (!parsed.timestamp) {
        console.log("Timestamp missing, skip message");
      }

      var expired = moment
        .unix(parsed.timestamp)
        .utc()
        .isBefore(moment().subtract(MESSAGE_EXPIRATION, "seconds"));


      if (!expired) {
        this.emit("state", { userId, payload: parsed });
      }else{
        console.log(`mqtt state expired: ${parsed.timestamp}`)
        this.emit("expired", { userId, payload: parsed });
      }
      
    } catch (e) {
      console.log(`Failed to parse json message ${e.message}`, {
        topic,
        payload: payload.toString()
      });
      return;
    }
  }
}

export default new MqttClient();
