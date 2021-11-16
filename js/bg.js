// play buttons
$(document).ready(function () {
  $("#button").click(function () {
    $("#button").toggleClass("fas fa-volume-up fa-2x fas fa-volume-mute fa-2x");
  });
});

// play audio
const button = document.getElementById("button");
const audio = document.getElementById("player");

button.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

const audioFile = audio;
audioFile.addEventListener("timeupdate", function () {
  let buffer = 0.13;
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 0;
    this.play();
  }
});
