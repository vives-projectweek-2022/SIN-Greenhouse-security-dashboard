// MQTT client
const mqtt = require('mqtt')
const host = 'mqtt://172.16.240.99:1883' // Change ip address into the one of the mqtt broker
const options = {
  clean: true,
  connectTimeout: 4000
}

// Establishes connection to MQTT broker
const client = mqtt.connect(host, options)

convertedValue = '';

// Handles connection and subscribes to wished topics
client.on('connect', () => {
  console.log('Connected')
  client.subscribe('payload', { qos: 0 }, function (err) {
    if (!err) {
      console.log("Subscription successful")
    }
  })

  var payload =  '0x00,0x00,0x00,0x42,0x78,0x00,0x00,0x42,0x7f,0x00,0x00';
  var inputArray = payload.split(",");
  for(var i=0;i<inputArray.length;i++) {
    var intVal = parseInt(inputArray[i],parseInt(16));
    if(Number.isNaN(intVal)) {
        CommonActions.showMessageToUser({message:'Invalid payload. Payload data should match Payload Type.'});
        return;
    }
    else 
    {
      convertedValue += String.fromCharCode(intVal);
      client.subscribe('payload', { qos: 0 }, function (err) {
        if (!err) 
        {
          client.publish('payload', convertedValue)
        }
      })
    }
  }
})


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
var payload = {
  inside: '',
  outside: '',
  heater: false,
  ventilator: false,
  door: false
}

// Handles incoming messages
client.on('message', (topic, message, packet) => {
  console.log('topic is ' + topic)
  // console.log('packet is ' + packet)

  const buffer = message;

  let tempInside = '';
  let convertedTempInside = '';
  let tempOutside = '';
  let convertedTempOutside ='';
  let heaterStatus = false;
  let ventilatorStatus = false;
  let doorStatus = false;

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
  console.log(convertedTempOutside)
  
  
  payload = {
    inside: convertedTempInside,
    outside: convertedTempOutside,
    heater: heaterStatus,
    ventilator: ventilatorStatus,
    door: doorStatus
  }
  module.exports = {payload}
})
