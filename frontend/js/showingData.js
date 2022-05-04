var ip = "172.16.240.99";
var port = "9001";
var usessl = false;
var message, client;
var connected = false;


client = new Paho.MQTT.Client(ip, Number(port), id);

client.connect({
  useSSL: usessl,
  onSuccess: onConnect,
  reconnect: true
});

// see if mqtt is connected
function onConnect() {
  console.log("connected");
}

function showData() {

    var convertedValue = '';
    var payload = '0x01,0x00,0x00,0x42,0x78,0x00,0x00,0x42,0x7f,0x00,0x00';
    var inputArray = payload.split(",");
    for(var i=0;i<inputArray.length;i++) 
    {
      var intVal = parseInt(inputArray[i],parseInt(16));
      if(Number.isNaN(intVal)) {
        CommonActions.showMessageToUser({message:'Invalid payload. Payload data should match Payload Type.'});
        return;
      }
      else 
      {
        convertedValue += String.fromCharCode(intVal);
      }
    }
  
    console.log(convertedValue + ' was clicked'); 
    var message = new Paho.MQTT.Message(convertedValue);
    message.destinationName = "payload";
    client.send(message);			
  }