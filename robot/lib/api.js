const logger = require("winston");
const axios = require("axios");
const moment = require("moment");
const EventEmitter = require("events");
const ppath = require("persist-path");
const PPATH_FOLDER = "visioconsult/settings";
const pjson = require("persist-json")(PPATH_FOLDER);
const SESSION_FILE = "session";
const fs = require("fs");

const api = axios.create({
  baseURL: "https://api.visioconsult.care",
  //baseURL: "http://localhost:3000/",
  timeout: 10000,
  withCredentials: true
});

class API extends EventEmitter {
  constructor() {
    super();
  }

  async init() { 
    logger.info(`Reading session fril from ${SESSION_FILE}`)
    // await api.get("/status")
    // trying to load saved session
    const token = pjson.load(SESSION_FILE);
    logger.info(`token ${token}`)
    if (token) {
      logger.info(`Access token found ${token}`);
      try {
        const user = await this.authenticate(token);
      } catch (e) {
        logger.debug("Authentification failed with existing session", e);
      }
    } else {
      logger.debug("Session not found");
    }
  }

  async authenticate(token) {
    try {
      api.defaults.headers.common["Authorization"] = token; 
      const { data: user } = await api.get("/users/me"); 
      pjson.save(SESSION_FILE, token); 
      this.emit("authenticated", user);
      return user;
    } catch (e) { 
      api.defaults.headers.common["Authorization"] = null;
      this.emit("error", "AUTHENTICATED_FAILED");
    }
  }

  logout() { 
    try {
      fs.unlinkSync(ppath(PPATH_FOLDER, SESSION_FILE)); 
    }catch(e){
     
    }
    
  }
}

module.exports = new API();
