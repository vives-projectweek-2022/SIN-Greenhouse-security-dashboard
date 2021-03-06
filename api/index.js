// MQTT client
const express = require('express');
// import express from 'express';
const app = express();
const cors = require('cors');
// import cors from 'cors';
const mqtt = require('mqtt')
// import mqtt from 'mqtt';
const host = 'mqtt://172.16.240.99:1883'; // Change ip address into the one of the mqtt broker
const options = {
  clean: true,
  connectTimeout: 4000
}
let payload = '';

app.use(express.json());
app.use(cors());
// app.use(mqtt());

// Establishes connection to MQTT broker
const client = mqtt.connect(host, options)

// Handles failed connection
client.on('error', (error) => {
  console.log('Connection error: ' + error)
  client.end()
})

// Shows the user that the client is trying to reconnect
client.on('reconnect', () => {
  console.log('Reconnecting...')
})

// Function to later parse our message from Hex
const HexToFloat32 = (str) => {
  var int = parseInt(str, 16);
  if (int > 0 || int < 0) {
      var sign = (int >>> 31) ? -1 : 1;
      var exp = (int >>> 23 & 0xff) - 127;
      var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
      var float32 = 0
      for (i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
      return float32 * sign;
  } else return 0
}


// Global variable for the received MQTT data
let tempInside = '';
let convertedTempInside = '';
let tempOutside = '';
let convertedTempOutside ='';
let heaterStatus = false;
let ventilatorStatus = false;
let doorStatus = false;

payload = {
  inside: 21.12,
  outside: 19.72,
  heater: true,
  ventilator: false,
  door: false
}

// Handles incoming messages
client.on('message', (topic, message, packet) => {
  console.log('topic is ' + topic)
  // console.log('packet is ' + packet)

  const buffer = message;


  // Prints the variable heaterStatus to the terminal
  console.log('Heater status: ')
  if (buffer[0] ===  1) {
    heaterStatus = true
  }
  console.log(heaterStatus)

  // Prints the variable ventilatorStatus to the terminal
  console.log('Ventilator status: ')
  if (buffer[1] ===  1) {
    ventilatorStatus = true
  }
  console.log(ventilatorStatus)

  // Prints the variable doorStatus to the terminal
  console.log('Door status: ')
  if (buffer[1] ===  1) {
    doorStatus = true
  }
  console.log(doorStatus)

  // Prints the variable convertedTempInside to the terminal
  console.log('Binnen Temperatuur')
    for (let i = 3; i < 7; i++) {
      if (isNaN(buffer[i])) {
        console.log('Not a number')
      }
      else {
        tempInside += buffer[i].toString(16)
        convertedTempInside = HexToFloat32(tempInside).toFixed(3);
        
      }
  }
  console.log(convertedTempInside)
  
  // Prints the variable convertedTempOutside to the terminal
  console.log('Buiten Temperatuur')
    for (let i = 7; i < 11; i++) {
      if (isNaN(buffer[i])) {
        console.log('Not a number')
      }
      else {
        tempOutside += buffer[i].toString(16)
        convertedTempOutside = HexToFloat32(tempOutside).toFixed(3);
      }
    }
  console.log(convertedTempOutside);
  document.body.innerHTML(convertedTempInside);

//  var payload = 
//     [{
//   "inside": convertedTempInside,
//   "outside": convertedTempOutside,
//   "heater": heaterStatus,
//   "ventilator": ventilatorStatus,
//   "door": doorStatus
//     }];  

  // payload = '{ "payload" : [' +
  // '{ "inside":'+ concertedTempInside + ' },' +
  // '{ "firstName":' + convertedTempOutside + ' },' +
  // '{ "firstName":' + heaterStatus + ' },' +
  // '{ "firstName":' + ventilatorStatus + ' },' +
  // '{ "firstName":' + doorStatus + ' },' +']}';
     
    
})

// var test = JSON.parse(payload);

app.listen(4000);
console.log('App Server running at port 4000');
console.log(payload)

app.get('/Post/json', (req,res) => {
  res.send(payload)
})



for ( let i = 0; i < 10; i++) {
  app.post('/Post/json', function requestHandler(req, res) {
    res.status(200).send(payload)
  });  

}



