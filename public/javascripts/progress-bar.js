/* Dumb function that fills a progress bar */
function fillingProgressBar() {
  var elem = document.getElementById("progress-bar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

function hackMQTT() {
  console.log("Successful");
}