#!/usr/bin/env node
var socketConf ={}


if(process.env.NODE_ENV == 'production'){
  socketConf = {"origins": "127.0.0.1"};
}

const io = require('socket.io')(socketConf);
const i2c = require('i2c-bus');
const pigpio = require('pigpio');

const SerialPort = require("serialport");
const Delimiter = require('@serialport/parser-delimiter')


const LED_ON = 2
const LED_BLINK = 1
const LED_OFF = 0
const NOVBOARD_ADDR = 10;
const SENSOR_ADDR = 0x09;
const CTRL_MOTOR_ADDR = 12;
const CMD_VERIN = 0x0A;
const CMD_SPEED = 0x0B;
const i2c3 = i2c.openSync(3);
const Vmax = 0.3;
const Amax = 1;
const LED_PIN = 17;

var ERROR_FLAG = false;

var clientTimeout;
var cmd = {
			"linear": 0,
			"angular" : 0,
			"verin" : 0,
			"led" : 1
		}

var robotState = {
	"verinStep" : 0,
  "Slinear" : 0,
  "Sangular" : 0,
  "Vbat" : 0

}

const port = new SerialPort('/dev/ttyUSB0',{baudeRate:9600},(err)=>{if(err){return console.log('Error: ', err.message)}})
const parser = port.pipe(new Delimiter({ delimiter: [0xff] }))

const led = new pigpio.Gpio(LED_PIN, {mode: pigpio.Gpio.OUTPUT});



var data = new Buffer.alloc(5);
var bufferOut = new Buffer.alloc(3);
var sensorData = new Buffer.alloc(4);
var sensor;
bufferOut[0]= 0xff;
bufferOut[1]= 0x00;
bufferOut[2]= 0x00;

var dutyCycle = 0;
var factor = 1

port.on('open',function(){

  console.log("port Open")
  port.flush();

});

port.on('close', () =>{
  console.log('port1 : closed');
  console.log('port1 : Reopening');
  setTimeout(()=>{
    port.open((err)=> {log.debug(err)});
  },1000);

})

parser.on('data', function (data) {

  parseSerial(data);

});

let spinnerI2C = setInterval(()=>{

  //Envoi du state pour le verin
	bufferOut[1] = CMD_VERIN;
	bufferOut[2] = cmd.verin;

  try{
	i2c3.i2cWriteSync(NOVBOARD_ADDR,3,bufferOut);
  }
  catch(e){
    console.error(e);
  }
  //Lecture de la position du vérin
	i2c3.i2cReadSync(NOVBOARD_ADDR,5,data);

  robotState.verinStep = data.readUInt16LE(2);
  
  //Lecture de la carte capteur (4x Télémetre utlrason)
  i2c3.i2cReadSync(SENSOR_ADDR,4,sensorData);

},200);


let spinnerSensor = setInterval(()=>{


  sensor = [sensorData.readUInt8(0),sensorData.readUInt8(1),sensorData.readUInt8(2),sensorData.readUInt8(3)]

  io.emit("info",{"Ultrason": sensor,"verinStep": robotState.verinStep,"linear":robotState.Slinear,"angular":robotState.Sangular,"Vbat":robotState.Vbat})

},500);



let spinnerLed = setInterval(()=>{

  if(ERROR_FLAG){
    led.digitalWrite(led.digitalRead() ^ 1);
    return
  }else if(cmd.led == LED_BLINK){
    if(dutyCycle >=255){
      dutyCycle = 255
    }else if(dutyCycle<=0 ){
      dutyCycle =0;
    }
    led.pwmWrite(dutyCycle);
    dutyCycle += 5*factor;

    if (dutyCycle >= 255 || dutyCycle <=0) {
      factor = - factor;
    }
  }
    else if (cmd.led == LED_ON){
      factor = 1;
      led.pwmWrite(dutyCycle);
    dutyCycle += 5*factor;

    if (dutyCycle >= 255) {
      dutyCycle= 255;
     }

  }else{
   factor =-1;
      led.pwmWrite(dutyCycle);
    dutyCycle += 5*factor;

    if (dutyCycle <= 0) {
      dutyCycle= 0;
     }

  }


},100)

let spinnerMotor = setInterval(()=>{


    let bufferOut = new Buffer.alloc(10,0);

    bufferOut[0] = 0xff;
    bufferOut.writeFloatLE(cmd.linear,1);
    bufferOut.writeFloatLE(cmd.angular,5);
    bufferOut[9]= 0xfe;

    port.write(bufferOut);

},500);

var  parseSerial = data =>{


    try{
      robotState.Slinear = data.readFloatLE(0);
      robotState.Sangular = data.readFloatLE(4);
      robotState.Vbat = data.readUInt8(8)/10;

      return
    }
    catch(err){
      console.error(err);
      console.error("Error during processing serial data: "+ JSON.stringify(data));

    }


  return 0
}

io.on('connection', client => {

      cmd.led = LED_ON
      console.log('client connected')

      client.on('data',data =>{
       /* try{
         data = JSON.parse(data);

        }
        catch(e){
          console.error(e);
          return
        }*/

        console.log(data)
      	if(data.linear == "forward")
      	{
          console.log("en avant");
      		cmd.linear = Vmax;
      	}
      	else if (data.linear == "backward")
      	{
      		cmd.linear = -Vmax;
      	}
      	else
       	{
       		cmd.linear = 0;
       	}

     	if(data.angular== "left")
      	{
      		cmd.angular = Amax;
      	}
      	else if (data.angular == "right")
      	{
      		cmd.angular = -Amax;
      	}
      	else
     	{
     		cmd.angular = 0;
     	}

     	if(data.verin== "up")
      	{
          console.log("up")
      		cmd.verin = 0x01;
      	}
      	else if (data.verin == "down")
      	{
          console.log("down")
      		cmd.verin = 0x02;
      	}
      	else
     	{
        console.log("stop")
     		cmd.verin = 0x00;
     	}
      if(data.led == LED_BLINK){
        cmd.led = LED_BLINK
      }else if(data.led== LED_ON)
        cmd.led=LED_ON
      else{
        cmd.led = 0
      }
     	clearTimeout(clientTimeout)
     	 clientTimeout = setTimeout(()=>{cmd.linear =0;cmd.angular=0;cmd.verin=0x00},500);
      });

     client.on('disconnect',()=>{
        console.log("Client Disconnected");
        clientLost();

    })
     client.on('error',()=>{console.log("Error" ) ;clientLost()});
});

function clientLost(){
        clearTimeout(clearTimeout)
        cmd.linear =0;
        cmd.angular=0;
        cmd.verin=0x00;
        cmd.led = LED_BLINK
}



io.listen(3000);

process.on('SIGHUP', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGCONT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown(){

  console.log("Caught interrupt signal");


  i2c3.closeSync();

  clearInterval(spinnerLed)
  led.digitalWrite(0);
  clearInterval(spinnerI2C)
  clearTimeout(clientTimeout)
  pigpio.terminate();
  io.close()
  process.exit(0);

};
