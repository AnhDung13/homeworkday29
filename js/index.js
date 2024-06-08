var prevBtn = document.querySelector(".btn-prev");
var nextBtn = document.querySelector(".btn-next");
var slide = document.querySelector(".slide");
var images = document.querySelectorAll("img");

var width = images[0].offsetWidth;
var count = 0;

var handleNext = function () {
  if (count === images.length - 1) {
    slide.style.translate = `${width * -1 * (images.length - 1)}px`;
  } else {
    count++;
    slide.style.translate = `${width * -1 * count}px`;
  }
};
nextBtn.addEventListener("click", handleNext);
var handlePrev = function () {
  if (count === 0) {
    slide.style.translate = `0px`;
  } else {
    count--;
    slide.style.translate = `${width * -1 * count}px`;
  }
};
prevBtn.addEventListener("click", handlePrev);
