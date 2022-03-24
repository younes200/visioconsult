const i2c =
  process.env.NODE_ENV !== "production"
    ? require("./fake-i2c")
    : require("i2c-bus");
const pigpio =
  process.env.NODE_ENV !== "production"
    ? require("pigpio-mock")
    : require("pigpio");
const logger = require("winston");
const EventEmitter = require("events");

const { isEqual } = require("lodash");

const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");

const LED_ON = 2;
const LED_BLINK = 1;
const LED_OFF = 0;
const NOVBOARD_ADDR = 10;
const SENSOR_ADDR = 0x09;
const CTRL_MOTOR_ADDR = 12;
const CMD_VERIN = 0x0a;
const CMD_SPEED = 0x0b;

const i2c3 = i2c.openSync(3);
const Vmax = 0.3;
const Amax = 1;
const LED_PIN = 17;

const SERIAL_PORT = "/dev/ttyUSB0";
const SERIAL_BAUDERATE = 9600;

class Robot extends EventEmitter {
  constructor() {
    super();
    this.ERROR_FLAG = false;

    this.clientTimeout = null;

    this.ledTimer = null;
    this.commandTimer = null;

    this.cmd = {
      linear: 0,
      angular: 0,
      verin: 0,
      led: 2
    };

    this.state = {
      verinStep: 0,
      Slinear: 0,
      Sangular: 0,
      Vbat: 0
    };

    this.sensorData = new Buffer.alloc(4);
    this.sensor = null;

    this.dutyCycle = 0;
    this.factor = 1;
  }

  init() {
    this.port = new SerialPort(
      SERIAL_PORT,
      { baudeRate: SERIAL_BAUDERATE },
      err => {
        if (err) {
          return logger.error("Error: ", err.message);
        }
      }
    );

    const parser = this.port.pipe(new Delimiter({ delimiter: [0xff] }));
    parser.on("data", data => {
      this.parseSerial(data);
    });

    this.ledGpio = new pigpio.Gpio(LED_PIN, { mode: pigpio.Gpio.OUTPUT });

    this.port.on("open", () => {
      logger.info("port Opened");
      this.port.flush();
    });

    this.port.on("close", () => {
      logger.info("port : Reopening");
      setTimeout(() => {
        this.port.open(err => {
          logger.debug(err);
        });
      }, 1000);
    });

    this.ledTimer = setInterval(this.ledInterval.bind(this), 100);
    this.commandTimer = setInterval(this.commandInterval.bind(this), 200);
  }

  parseSerial(data) {
    try {
      this.state.Slinear = data.readFloatLE(0);
      this.state.Sangular = data.readFloatLE(4);
      this.state.Vbat = data.readUInt8(8) / 10;

      return;
    } catch (err) {
      logger.error(
        "Error during processing serial data: " + JSON.stringify(data)
      );
    }
  }

  ledInterval() {
    if (this.ERROR_FLAG) {
      this.ledGpio.digitalWrite(this.ledGpio.digitalRead() ^ 1);
      return;
    } else if (this.cmd.led == LED_BLINK) {
      if (this.dutyCycle >= 255) {
        this.dutyCycle = 255;
      } else if (this.dutyCycle <= 0) {
        this.dutyCycle = 0;
      }
      this.ledGpio.pwmWrite(this.dutyCycle);
      this.dutyCycle += 5 * this.factor;

      if (this.dutyCycle >= 255 || this.dutyCycle <= 0) {
        this.factor = -this.factor;
      }
    } else if (this.cmd.led == LED_ON) {
      this.factor = 1;
      this.ledGpio.pwmWrite(this.dutyCycle);
      this.dutyCycle += 5 * this.factor;

      if (this.dutyCycle >= 255) {
        this.dutyCycle = 255;
      }
    } else {
      this.factor = -1;
      this.ledGpio.pwmWrite(this.dutyCycle);
      this.dutyCycle += 5 * this.factor;

      if (this.dutyCycle <= 0) {
        this.dutyCycle = 0;
      }
    }
  }

  commandInterval() {
    var bufferOut = new Buffer.alloc(3);
    //Envoi du state pour le verin
    bufferOut[0] = 0xff;
    bufferOut[1] = CMD_VERIN;
    bufferOut[2] = this.cmd.verin;

    try {
      i2c3.i2cWriteSync(NOVBOARD_ADDR, 3, bufferOut);
    } catch (e) {
      console.error(e);
    }

    var data = new Buffer.alloc(4);
    //Lecture de la position du vérin
    i2c3.i2cReadSync(NOVBOARD_ADDR, 4, data);

    if (data[0] == 0xff && data[1] == 0x0c) {
      this.state.verinStep = data.readUInt8(2);
      //console.log(data.readUInt8(3));
    }

    //Lecture de la carte capteur (4x Télémetre utlrason)
    i2c3.i2cReadSync(SENSOR_ADDR, 4, this.sensorData);

    bufferOut = new Buffer.alloc(10, 0);

    bufferOut[0] = 0xff;
    bufferOut.writeFloatLE(this.cmd.linear, 1);
    bufferOut.writeFloatLE(this.cmd.angular, 5);
    bufferOut[9] = 0xfe;

    this.port.write(bufferOut);

    this.sensor = [
      this.sensorData.readUInt8(0),
      this.sensorData.readUInt8(1),
      this.sensorData.readUInt8(2),
      this.sensorData.readUInt8(3)
    ];

    const newState = {
      Ultrason: this.sensor,
      verinStep: this.state.verinStep,
      linear: this.state.Slinear,
      angular: this.state.Sangular,
      Vbat: this.state.Vbat
    };

    if (!isEqual(newState, this.state)) {
      this.state = newState;
      this.emit("stateChanged", this.state);
    }
  }

  clearClientTimout() {
    if (this.clientTimeout) clearTimeout(this.clientTimeout);
    this.clientTimeout = setTimeout(() => this.onClearClientTimeout(), 500);
  }

  onClearClientTimeout() {
    if (this.clientTimeout) clearTimeout(this.clientTimeout);
    this.cmd.linear = 0;
    this.cmd.angular = 0;
    this.cmd.verin = 0x00;
    // this.cmd.led = LED_BLINK;
  }

  linearForward() {
    this.cmd.linear = Vmax;
    this.clearClientTimout();
  }

  linearBackward() {
    this.cmd.linear = -Vmax;
    this.clearClientTimout();
  }

  linearStop() {
    this.cmd.linear = 0;
  }

  angularLeft() {
    this.cmd.angular = Amax;
    this.clearClientTimout();
  }

  angularRight() {
    this.cmd.angular = -Amax;
    this.clearClientTimout();
  }

  angularStop() {
    this.cmd.angular = 0;
  }

  verinUp() {
    this.cmd.verin = 0x01;
    this.clearClientTimout();
  }

  verinDown() {
    this.cmd.verin = 0x02;
    this.clearClientTimout();
  }

  verinStop() {
    this.cmd.verin = 0x00;
  }

  ledBlink() {
    this.cmd.led = LED_BLINK;
  }

  ledOn() {
    this.cmd.led = LED_ON;
  }

  ledOff() {
    this.cmd.led = 0;
  }

  shutdown() {
    i2c3.closeSync();

    clearInterval(this.ledTimer);
    if (this.ledGpio) {
      this.ledGpio.digitalWrite(0);
    }

    clearInterval(this.commandTimer);

    this.onClearClientTimeout();
    pigpio.terminate();

    this.port = null;
  }
}

module.exports = new Robot();
