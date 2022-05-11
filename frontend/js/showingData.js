// var ip = "172.16.240.99";
// var port = "9001";
// var usessl = false;
// var message, client;
// var connected = false;

// const { get } = require("express/lib/response");



// // var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);


// function fillingProgressBar() {
//     var elem = document.getElementById('progress-bar')
//     var width = 1
//     var id = setInterval(frame, 10)
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id)
//       } else {
//         width++
//         elem.style.width = width + '%'
//       }
//     }
// }

// client.connect({
//     client = new Paho.MQTT.Client(ip, Number(port), id);
//     useSSL: usessl,
//     onSuccess: onConnect,
//     reconnect: true
// });
// // function fillingProgressBar() {
// //     var elem = document.getElementById('progress-bar')
// //     var width = 1
// //     var id = setInterval(frame, 10)
// //     function frame() {
// //       if (width >= 100) {
// //         clearInterval(id)
// //       } else {
// //         width++
// //         elem.style.width = width + '%'
// //       }
// //     }
// // }
// //   client = new Paho.MQTT.Client(ip, Number(port), id);

// //   client.connect({
// //     useSSL: usessl,
// //     onSuccess: onConnect,
// //     reconnect: true
// //   });
  
// //   // see if mqtt is connected
// //   function onConnect() {
// //     console.log("connected");
// //   }

// see if mqtt is connected
// function onConnect() {
// console.log("connected");
// }

// function onMessageArrived(message) {

//         console.log("Recieved Message from server");
//         var value = message.payloadString;
//         var datastream = message.destinationName;
//         console.log("datastream: " + datastream + ", value: " + value);
// }

// Object.keys(widgetRepository).forEach(function(datastream,index) {
//     client.subscribe(datastream, {
//         qos: 0
//     });
// });

//     const buffer = datastream;
// //   client.subscribe('message', (topic, message) => {

// //     console.log(topic);
// //     const buffer = message;

// //     let tempInside = '';
// //     let convertedTempInside = '';
// //     let tempOutside = '';
// //     let convertedTempOutside ='';
// //     let heaterStatus = false;
// //     let ventilatorStatus = false;
// //     let doorStatus = false;

// //     console.log('Heater status: ')

// //     if (buffer[0] ===  1) {
// //         heaterStatus = true
// //     }
// //     console.log(heaterStatus)


// //     console.log('Ventilator status: ')
// //     if (buffer[1] ===  1) {
// //     ventilatorStatus = true
// //     }
// //     console.log(ventilatorStatus)

// //     // Prints the variable doorStatus to the terminal
// //     console.log('Door status: ')
// //     if (buffer[1] ===  1) {
// //     doorStatus = true
// //     }
// //     console.log(doorStatus)

// //     // Prints the variable convertedTempInside to the terminal
// //     console.log('Binnen Temperatuur')
// //     for (let i = 3; i < 7; i++) {
// //         if (isNaN(buffer[i])) {
// //         console.log('Not a number')
// //         }
// //         else {
// //         tempInside += buffer[i].toString(16)
// //         convertedTempInside = HexToFloat32(tempInside).toFixed(3);
// //         }
// //     }
// //     console.log(convertedTempInside)
    
// //     // Prints the variable convertedTempOutside to the terminal
// //     console.log('Buiten Temperatuur')
// //     for (let i = 7; i < 11; i++) {
// //         if (isNaN(buffer[i])) {
// //         console.log('Not a number')
// //         }
// //         else {
// //         tempOutside += buffer[i].toString(16)
// //         convertedTempOutside = HexToFloat32(tempOutside).toFixed(3);
// //         }
// //     }
// //     console.log(convertedTempOutside)

// //       // payload = {
// //       //     inside: convertedTempInside,
// //       //     outside: convertedTempOutside,
// //       //     heater: heaterStatus,
// //       //     ventilator: ventilatorStatus,
// //       //     door: doorStatus
// //       // }


      
// //       console.log(payload)
// //       let html = ''
// //       payload.forEach(sensor => {
// //         const htmlSegment = `<div class="grid-item">
// //                               <p>${sensor.inside}</p>
// //                             </div>
// //                             <div class="grid-item">
// //                               <p>${sensor.outside}</p>
// //                             </div>
// //                             <div class="grid-item">
// //                               <p>${sensor.heaterStatus}</p>
// //                             </div>
// //                             <div class="grid-item">
// //                               <p>${sensor.ventilatorStatus}</p>
// //                             </div>
// //                             <div class="grid-item">
// //                               <p>${sensor.doorStatus}</p>
// //                             </div>`
    
// //         html += htmlSegment
// //       })
// //       const container = document.querySelector('.grid-container')
// //       container.innerHTML = html
// //   })
        


  
  
//     // console.log(convertedValue + ' was clicked'); 
//     // var message = new Paho.MQTT.Message(convertedValue);
//     // message.destinationName = "payload";
//     // client.send(message);			



// // function httpGet(theUrl)
// // {
// //     var xmlHttp = new XMLHttpRequest();
// //     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
// //     xmlHttp.send( null );
// //     return xmlHttp.responseText;
// // }

// fetch('http://localhost:4000/Post/json')
//   .then(response => response.json())
//   .then(data => console.log(data));

// const express = require('express');
// const app = express();

// app.use(express.json());



// app.get('/Post/json', (req,res) => {
//     res.send(payload)
// })


// let url = 'http://localhost:4000/Post/json';

// fetch(url , { mode: 'no-cors'})
// .then(res => res.json())
// .then(payload =>
//   console.log('Checkout this JSON! ', payload))

function showData() {
    fetch("http://localhost:4000/Post/json")
    
    .then(responds => responds.text())
    .then(data => {
        test = JSON.parse(data)
        console.log(test)

        //status door
        if (test.door == false) {
            const listElement = document.createElement("li");
            listElement.innerHTML = "The door is closed.";
            document.getElementById("price").appendChild(listElement);

        }
        if (test.door === true) {
            const listElement = document.createElement("li");
            listElement.innerHTML = "The is the door is open.";
            document.getElementById("price").appendChild(listElement);
        }

        // status heater
        if (test.heater == false) {
            const listElement = document.createElement("li");
            listElement.innerHTML = "The heater is turned off.";
            document.getElementById("price").appendChild(listElement);

        }
        if (test.heater === true) {
            const listElement = document.createElement("li");
            listElement.innerHTML = "The is heater is turned on.";
            document.getElementById("price").appendChild(listElement);
        }
        // status ventilator
        if (test.ventilator == false) {
            const listElement = document.createElement("li");
            listElement.innerHTML = "The ventilator is turned off.";
            document.getElementById("price").appendChild(listElement);

        }
        if (test.ventilator === true) {
            const listElement = document.createElement("li");
            listElement.innerHTML = "The is ventilator is turned on.";
            document.getElementById("price").appendChild(listElement);
        }


        const insideTempList = document.createElement("li");
        insideTempList.innerHTML = "The inside temperature of the serre is: " + test.inside;
        document.getElementById("price").appendChild(insideTempList);

        const outsideTempList = document.createElement("li");
        outsideTempList.innerHTML = "The outside temperature of the serre is: " + test.outside;
        document.getElementById("price").appendChild(outsideTempList);
                
       
    });
  
        var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:4000/Post/json", true);
            xhttp.send();
}
    
  

  
document.addEventListener("DOMContentLoaded", function() {
    showData();
});