// Sends a http request to the MQTT client and returns the values of the sensors
async function getSensorValues () {
  const url = 'http://localhost:3001'
  try {
    const res = await fetch(url)
    return await res.json() // Other option is .text()
  } catch (error) {
    console.log(error)
  }
}

// Creates div-elements with inside the values of the senso
function renderSensorValues () {
  const payload = await getSensorValues()
  let html = ''
  payload.forEach(sensor => {
    const htmlSegment = `<div class="grid-item">
                          <p>hallo</p>
                        </div>
                        <div class="grid-item">
                          <p>${inside.convertedTempInside}</p>
                        </div>
                        <div class="grid-item">
                          <p>${outside.convertedTempOutside}</p>
                        </div>
                        <div class="grid-item">
                          <p>${heater.heaterStatus}</p>
                        </div>
                        <div class="grid-item">
                          <p>${ventilator.ventilatorStatus}</p>
                        </div>
                        <div class="grid-item">
                          <p>${door.doorStatus}</p>
                        </div>`

    html += htmlSegment
  })



  const container = document.querySelector('.grid-container')
  container.innerHTML = html
}
