function showData() {
    fetch("http://localhost:4000/Post/json")
    
    .then(responds => responds.text())
    .then(data => {
        payload = JSON.parse(data)
        console.log(payload)

        //status door
        if (payload.door == false) {
            const divElement = document.createElement("div");
            divElement.innerHTML = "The door is closed.";
            document.getElementById("door").appendChild(divElement);

        }
        if (payload.door === true) {
            const divElement = document.createElement("div");
            divElement.innerHTML = "The is the door is open.";
            document.getElementById("door").appendChild(divElement);
        }

        // status heater
        if (payload.heater == false) {
            const divElement = document.createElement("div");
            divElement.innerHTML = "The heater is turned off.";
            document.getElementById("heater").appendChild(divElement);
        }
        if (payload.heater === true) {
            const divElement = document.createElement("div");
            divElement.innerHTML = "The is heater is turned on.";
            document.getElementById("heater").appendChild(divElement);
        }

        // status ventilator
        if (payload.ventilator == false) {
            const divElement = document.createElement("div");
            divElement.innerHTML = "The ventilator is turned off.";
            document.getElementById("ventilator").appendChild(divElement);
        }
        if (payload.ventilator === true) {
            const divElement = document.createElement("div");
            divElement.innerHTML = "The is ventilator is turned on.";
            document.getElementById("ventilator").appendChild(divElement);
        }

        const insideTempDiv = document.createElement("div");
        insideTempDiv.innerHTML = "The inside temperature of the greenhouse is: " + payload.inside;
        document.getElementById("insideTemp").appendChild(insideTempDiv);

        const outsideTempDiv = document.createElement("div");
        outsideTempDiv.innerHTML = "The outside temperature of the greenhouse is: " + payload.outside;
        document.getElementById("outsideTemp").appendChild(outsideTempDiv);
    });

        var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:4000/Post/json", true);
            xhttp.send();
}

document.addEventListener("DOMContentLoaded", function() {
    showData();
});