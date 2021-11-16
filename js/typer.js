// typer
const TypeWriter = function (txtElement) {
  this.txtElement = txtElement;
  this.txt = "";
  this.type();
};

// typer method
TypeWriter.prototype.type = function () {
  setTimeout(() => this.type(), 500);
};

// init on DOM load
document.addEventListener("DOMContentLoaded", init);

// init app
function init() {
  const txtElement = document.querySelector(".typer-txt");

  // init typer
  new TypeWriter(txtElement);
}
