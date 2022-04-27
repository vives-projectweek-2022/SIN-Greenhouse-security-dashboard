// It is possible to secure this with SSL
// http://www.steves-internet-guide.com/using-node-mqtt-client/

// Node.js server


const http = require('http')

const hostname = '127.0.0.1'
const port = 3001

const server = http.createServer((req, res) => {
  res.render('index');

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// MQTT client
const mqtt = require('mqtt')
const host = 'mqtt://172.16.240.99:1883'
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000
  // Auth
  // clientId: '',
  // username: '',
  // password: ''
}

// Establishes connection
const client = mqtt.connect(host, options)

// Handles connection and subscribes to wished topics
client.on('connect', () => {
  console.log('Connected')
  client.subscribe('payload', { qos: 0 }, function (err) {
    if (!err) {
      // client.publish('payload', [1,0,0,65,179,42,172,65,180,164,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    }
  })
})

// Handles failed connection
client.on('error', (error) => {
  console.log('Connection error: ' + error)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

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

// Handles incoming messages
client.on('message', (topic, message, packet) => {
  const buffer = message;
  console.log('packet is ' + packet)
  //Temperatuur binnen

  let tempInside = '';
  let convertedTempInside = '';
  let tempOutside = '';
  let convertedTempOutside ='';
  let heaterStatus = false;
  let ventilatorStatus = false;
  let doorStatus = false;

console.log('Heater status: ')
if (buffer[0] ===  1) {
  heaterStatus = true
}
console.log(heaterStatus)

console.log('Ventilator status: ')
if (buffer[1] ===  1) {
  ventilatorStatus = true
}
console.log(ventilatorStatus)

console.log('Door status: ')
if (buffer[1] ===  1) {
  doorStatus = true
}
console.log(doorStatus)
    
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
console.log(tempInside)
console.log(convertedTempInside)
  
//Temperatuur buiten
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
  console.log(tempOutside)
  console.log(convertedTempOutside)
  
  console.log('topic is ' + topic)
  
var jsonObj = {
  payload: 
          {
            inside: convertedTempInside,
            outside: convertedTempOutside,
            heater: heaterStatus,
            ventilator: ventilatorStatus,
            door: doorStatus
      }
}

})
