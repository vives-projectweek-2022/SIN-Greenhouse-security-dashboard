// Creation of API
const express = require('express')

const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
// End of creation

// MQTT client
const mqtt = require('mqtt')
const host = 'mqtt://172.16.240.99:1883' // Change ip address into the one of the mqtt broker
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000
  // Auth
  // clientId: '',
  // username: '',
  // password: ''
}

// Establishes connection to MQTT broker
const client = mqtt.connect(host, options)

convertedValue = '';

// Handles connection and subscribes to wished topics
client.on('connect', () => {
  console.log('Connected')

  var payload =  '0x01,0x00,0x00,0x42,0x78,0x00,0x00,0x42,0x7f,0x00,0x00';
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

