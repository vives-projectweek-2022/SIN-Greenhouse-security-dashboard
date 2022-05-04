var ip = "172.16.240.99";
var port = "9001";
var usessl = false;
var message, client;
var connected = false;

var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

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

function showData() {

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

    client.subscribe('message', (topic, message, packet) => {
        console.log('topic is ' + topic)

        const buffer = message;

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
        document.div.innerHTML = "<div>Heater status: " + heaterstatus + "</div>"
        console.log(heaterStatus)


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
        

    }) 

   
  
    // console.log(convertedValue + ' was clicked'); 
    // var message = new Paho.MQTT.Message(convertedValue);
    // message.destinationName = "payload";
    // client.send(message);			
  }

  document.addEventListener("DOMContentLoaded", function() {
    showData();
  });