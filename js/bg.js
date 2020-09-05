// play buttons
$(document).ready(function () {
  $('i').click(function () {
    $('i').toggleClass('fas fa-volume-up fa-2x fas fa-volume-mute fa-2x');
  });
});

// play audio


const button = document.getElementById('button');
const audio = document.getElementById('player');

button.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

const audioFile = audio;
audioFile.addEventListener('timeupdate', function () {
  let buffer = .13
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 0
    this.play()
  }
});

// typer
const TypeWriter = function (txtElement) {
  this.txtElement = txtElement;
  this.txt = '';
  this.type();
};

// typer method
TypeWriter.prototype.type = function () {
  setTimeout(() => this.type(), 500);
};

// init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
  const txtElement = document.querySelector('.typer-txt');

  // init typer
  new TypeWriter(txtElement);
}
