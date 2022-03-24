const logger = require("winston");
const axios = require("axios");
const moment = require("moment");
const EventEmitter = require("events");
const si = require("systeminformation");
const uuidv1 = require('uuid/v1');

const TICKET_INTERVAL = 1000

const gateway = axios.create({
  baseURL: "http://localhost:8090",
  timeout: 10000
});


class Gateway extends EventEmitter {

  

  constructor() {
    super();
    this.initialized = false;
    this.publishing = false
  }

  async connect(user) {
    this.user = user;
    try {
      await this.initialize()
      this.emit("stateChanged", "standby");
    } catch (e) {
      if (e.code == "ECONNRESET") {
        this.emit("error", { code: "UV4L_UNREACHABLE" });
      }
    }finally{
      setInterval(this.tick.bind(this), TICKET_INTERVAL);
    }
  }

  async initialize() {
      let { data } = await gateway.get("/api/janus/client");
      if (data.plugins.length > 0) {
        // destroy and create new session
        await this.destroy();
        logger.debug("last client session destroyed");
      }
      data = await this.createSession();
      logger.debug("Gateway initialiazed");
      this.initialized = true;
     
  }


  async tick() {
    if (this.initialized) {
      try {
        const {
          data: { transaction, ...res }
        } = await gateway.get("/api/janus/client/events");
        if (res.what != "keepalive") {
          
          logger.debug("Gateway Event", res)

          if (res.error) {
            if(res.error.code == 1020){
              // protocole error
              await this.destroy();
              await this.createSession();  
            }
            this.emit("error", res.error);
          } else if (res.what == "hangup") {
            logger.debug("Gateway hangup");
            // leave the room and reset the session
            await this.destroy();
            await this.createSession();
            this.emit("stateChanged", "standby");
          } else if (res.what == "event") {
            
            if(res.janus.leaving){
              logger.debug("Operator left the room, closing session")
              this.unpublish()
            }
          } else if (res.what == "media") {
            //logger.debug("Gateway Media Event", res)
          } else if (res.plugin.status == "attached") {
            if(res.janus && res.janus.publishers && res.janus.publishers.length > 0){
              this.listen(res.janus.publishers[0].id)
            }
            this.emit("stateChanged","busy");
          }
        }
      } catch (e) {
        if (e.code == "ECONNRESET") {
          this.emit("stateChanged", "off");
          this.emit("error", { code: "UV4L_UNREACHABLE" });
          this.initialized = false;
        } else if (e.response && e.response.status == 404) {
          logger.debug(`Gateway event pull not ready`);
        } else {
          this.emit("error", e);
        }
      }
    }else{
      try {
        await this.initialize()
      }catch(e){
        //catch exception
        logger.debug("uv4l not running")
      }
    }
  }

  async join(room) {
    const exists = await this.roomExists(room);
    if (!exists) {
      throw new Error("ROOM_NOT_EXISTS")
    }
    const { data } = await gateway.post("/api/janus/client/videoroom", {
      what: "join",
      transaction: uuidv1(),
      body: {
        room: room,
        username: this.user.id
      }
    });
    return data;
  }

  async publish(room) {
    await this.join(room);

    await gateway.post("/api/janus/client/videoroom", {
      what: "publish",
      transaction: uuidv1(),
      body: {
        audio: true,
        video: true,
        data: false,
        // adjust_max_bitrate_for_hardware_videocodec: true,
        // max_bitrate_bits: 0,
        // use_hardware_videocodec: false,
        // video_format_id: 60,
        record: false
      }
    });

    this.publishing= true

    
  }

  async listen(feed){
    await gateway.post("/api/janus/client/videoroom", {
      what: "listen",
      transaction: uuidv1(),
      body: {
        audio: true,
        feed,
        video: false,
        data: false
      }
    });
  }

  async unpublish() {
    const { data } = await gateway.post("/api/janus/client/videoroom", {
      what: "unpublish",
      transaction: uuidv1(),
    });
    this.publishing = false
    this.emit("unpublished")
    return data;
  }

  async createSession() {
    const { data } = await gateway.post("/api/janus/client", {
      what: "create",
      plugin: "videoroom",
      transaction: uuidv1(),
    });
    return data;
  }

  async destroy() {
    const { data } = await gateway.post("/api/janus/client", {
      what: "destroy",
      plugin: "videoroom",
      transaction: uuidv1(),
    });
    return data;
  }

  async createRoom(id) {
    const { data } = await gateway.post("/api/janus/client/videoroom", {
      what: "create",
      transaction: uuidv1(),
      body: {
        room: id,
        videocodec: "vp8",
        audiocodec: "opus",
        record: false,
        permanent: false,
        audiolevel_event: true,
        audio_level_average: 0,
        // max_publishers: 2
      }
    });
    return data;
  }

  async roomExists(id) {
    const { data } = await gateway.post("/api/janus/client/videoroom", {
      what: "exists",
      transaction: uuidv1(),
      body: {
        room: id
      }
    });
    return data.janus.exists;
  }
}

module.exports = new Gateway();
