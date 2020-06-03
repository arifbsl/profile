const TypeWriter = function (txtElement, words, wait = 300) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type method
TypeWriter.prototype.type = function () {
  //   Current Index of words
  const i = this.wordIndex % this.words.length;

  const fullText = this.words[i];

  //   Check if isDeleting
  if (this.isDeleting) {
    //      remove Char
    this.txt = fullText.substring(0, this.txt.length - 1);
  } else {
    //     Add Char
    this.txt = fullText.substring(0, this.txt.length + 1);
  }

  //   Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //   Init TypeSpeed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //   if Word is complate
  if (!this.isDeleting && this.txt === fullText) {
    //     Make Pose at end
    typeSpeed = this.wait;

    //     Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //     move to next word
    this.wordIndex++;
    //     Pouse before start typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};
// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const textElement = document.querySelector(".txt-type");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = textElement.getAttribute("data-wait");

  //   Init TypeWriter
  new TypeWriter(textElement, words, wait);
}
