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

// Creates div-elements with inside the values of the sensor
async function renderSensorValues () {
  const payload = await getSensorValues()
  let html = ''
  payload.forEach(sensor => {
    const htmlSegment = `<div class="grid-item">
                          <p>${sensor.heaterstatus}</p>
                        </div>
                        <div class="grid-item">
                          <p>${sensor.ventilatorstatus}</p>
                        </div>
                        <div class="grid-item">
                          <p>${sensor.doorstatus}</p>
                        </div>
                        <div class="grid-item">
                          <p>${sensor.temp_inside}</p>
                        </div>
                        <div class="grid-item">
                          <p>${sensor.temp_outside}</p>
                        </div>`

    html += htmlSegment
  })

  const container = document.querySelector('.grid-container')
  container.innerHTML = html
}
