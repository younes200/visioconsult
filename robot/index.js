#!/usr/bin/env node

const logger = require("winston");
const express = require("express");
const prettyjson = require("prettyjson");
const bodyParser = require("body-parser");
const bonjour = require("bonjour")();
var zeroconf = require('zeroconf')()

const si = require("systeminformation");
const axios = require("axios");
const app = express();
const moment = require("moment");
const gateway = require("./lib/gateway");
const api = require("./lib/api");
const mqtt = require("./lib/mqtt");
const robot = require("./lib/robot");
const { isObject } = require("lodash");

const INACTIVITY_TIMEOUT = 50000; // 50 second
var inactivityTimeoutHandler =null

// authenticated user
var user;

logger.level = process.env.LOG_LEVEL || "info";
logger.exitOnError = true;

const logFormat = logger.format.printf(({ level, message, ...others }) => {
  const prettier = isObject(others) ? `\n${prettyjson.render(others)}` : "";
  return `[${level}]: ${message} ${prettier}`;
});

logger.add(
  new logger.transports.Console({
    format: logger.format.combine(
      logger.format.colorize(),
      logFormat
      //logger.format.simple()
    ),
    handleExceptions: true
  })
);

app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 7000;
const ZEROCONF_NAME = "VisioConsultRobot";

var state = {
  authenticated: false,
  gateway: {
    status: "off"
  },
  robot: robot.state,
  userId: null,
  error: null
};

const setState = newValues => {
  state = { ...state, ...newValues };
  //logger.debug("state", state);
  mqtt.publishState(state);
};

app.get("/status", async (req, res) => { 
  console.log("******** get status ********"); 
  res.send(state);
});

app.post("/authenticate", async (req, res) => { 
  if (!req.body.token) {
    return res.send(500).send({ ok: false, error: "FIELD_MISSING" });
  }
  try {
    const user = await api.authenticate(req.body.token.id);
    console.log(user)
    return res.send({ ok: true });
  } catch (e) { 
    return res
      .status(401)
      .send({ ok: false, error: "AUTHENTIFICATION_FAILED" });
  }
});

app.post("/logout", (req, res) => { 
  // console.log('*************** logout ***************')
  api.logout();
  setState({ authenticated: false, userId: null })
  res.send({ ok: true });
});

app.get("/*", async (req, res, next) => { 
  res.send("Robot controller running");
});

app.listen(port, () => {
  logger.info(`HTTP server listening on port ${port}`);

  bonjour.publish({ type: "http", port, name: ZEROCONF_NAME });  
  
  bonjour.find({ type: 'http' }, function (service) {
    console.log('Found an HTTP server:', service)
  })  

  logger.info(`Publish zeroconf with name ${ZEROCONF_NAME}`);
  api.init();
});

api.on("authenticated", user => {
  logger.info(`API Authenticated user.id=${user.id}`);
  setState({ authenticated: true, userId: user.id }); 

  gateway.connect(user); 
  // start mqtt
  mqtt.connect(user); 
  robot.init();
});

mqtt.on("room:join", (body, timestamp) => {
  gateway.publish(body.room);
});

mqtt.on("room:leave", (body, timestamp) => {
  gateway.unpublish();
});

mqtt.on("command:linear", value => {
  //"forward"/"stop"/"backward"
  if (value == "forward") {
    robot.linearForward();
  } else if (value == "backward") {
    robot.linearBackward();
  } else {
    robot.linearStop();
  }
  inactivityReset();
});

mqtt.on("command:angular", value => {
  //"left"/"stop"/"right"
  if (value == "left") {
    robot.angularLeft();
  } else if (value == "right") {
    robot.angularRight();
  } else {
    robot.angularStop();
  }

  inactivityReset();
});

mqtt.on("command:verin", value => {
  //"up"/"stop"/"down"
  if (value == "up") {
    robot.verinUp();
  } else if (value == "down") {
    robot.verinDown();
  } else {
    robot.verinStop();
  }
  inactivityReset();
});

mqtt.on("command:led", value => {
  //"on/off/blink"

  if (value == "on") {
    robot.ledOn();
  } else if (value == "blink") {
    robot.ledBlink();
  } else {
    robot.ledOff();
  }
  inactivityReset();
});

gateway.on("stateChanged", data => {
  setState({ gateway: data });
});

robot.on("stateChanged", data => {
  setState({ robot: data });
});

gateway.on("unpublished", () => {
  if (inactivityTimeoutHandler) {
    clearTimeout(inactivityTimeoutHandler);
  }
});

gateway.on("error", e => {
  logger.error("Gateway error", e);
  setState({ error: e.message });
});

const inactivityReset = () => {
  if(inactivityTimeoutHandler) clearTimeout(inactivityTimeoutHandler);
  inactivityTimeoutHandler = setTimeout(() => {
    // unpublish if the timeout occured
    if (gateway.publishing) {
      logger.debug("unpublish after inactivity")
      gateway.unpublish();
    }
  }, INACTIVITY_TIMEOUT);
};


const shutdown = async () => {
  await mqtt.close();
  await gateway.destroy();
  robot.shutdown();
  process.exit(0);
};

process.once("unhandledRejection", (err, p) => {
  logger.error(`UnhandledRejection: ${err.stack}`);
});


// process.on("SIGHUP", shutdown);
// process.on("SIGINT", shutdown);
// process.on("SIGCONT", shutdown);
process.on("SIGTERM", shutdown);
