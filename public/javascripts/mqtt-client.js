// It is possible to secure this with SSL
// http://www.steves-internet-guide.com/using-node-mqtt-client/
// Momentarily to run: node ../network-server/public/javascripts/mqtt-client.js

const mqtt = require('mqtt');
const host = "mqtt://172.16.108.54:1883";
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  // clientId: '',
  // username: '',
  // password: '',
};

// Establishes connection
const client  = mqtt.connect(host, options);

// Handles connection and subscribes to wished topics
client.on("connect", () => {	
  console.log("Connected");
  // client.subscribe("sensor", { qos: 0 });
  client.subscribe('sensor', { qos: 0 }, function (err) {
    if (!err) {
      client.publish('sensor', 'Hello mqtt')
    }
  })
});

// Handles failed connection
client.on("error", (error) => {
  console.log("Connection error: " + error);
  client.end();
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

// Handles incoming messages
client.on("message", (topic, message, packet) => {
  console.log("packet is "+ packet);
	console.log("message is "+ message);
	console.log("topic is "+ topic);
});
