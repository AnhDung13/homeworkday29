var prevBtn = document.querySelector(".btn-prev");
var nextBtn = document.querySelector(".btn-next");
var slide = document.querySelector(".slide");
var images = document.querySelectorAll("img");
var nav = document.querySelector(".navigation");
var count = 0;
var startX;
images.forEach(function (image) {
  image.draggable = false;
});

for (var i = 0; i < images.length; i++) {
  nav.innerHTML += `<div class="radio" id=${i}></div>`;
}

var radios = document.querySelectorAll(".radio");

radios[0].classList.add("active");

radios.forEach(function (radio) {
  radio.addEventListener("click", function () {
    radios.forEach(function (radio) {
      radio.classList.remove("active");
    });
    var width = images[0].offsetWidth;
    count = Number(radio.id);
    slide.style.translate = `${width * -1 * count}px`;
    radio.classList.add("active");
  });
});

var handleNext = function () {
  var width = images[0].offsetWidth;
  if (count === images.length - 1) {
    slide.style.translate = `${width * -1 * (images.length - 1)}px`;
  } else {
    count++;
    slide.style.translate = `${width * -1 * count}px`;
  }
  radios[0].classList.remove("active");
  radios.forEach(function (radio) {
    if (radio.id === `${count}`) {
      radio.previousElementSibling.classList.remove("active");
      radio.classList.add("active");
    }
  });
};

nextBtn.addEventListener("click", handleNext);

var handlePrev = function () {
  var width = images[0].offsetWidth;
  if (count === 0) {
    slide.style.translate = `0px`;
  } else {
    count--;
    slide.style.translate = `${width * -1 * count}px`;
  }
  radios.forEach(function (radio) {
    if (radio.id === `${count}`) {
      radio.nextElementSibling.classList.remove("active");
      radio.classList.add("active");
    }
  });
};
prevBtn.addEventListener("click", handlePrev);

slide.addEventListener("mousedown", function (e) {
  startX = e.clientX;
  console.log("mouse", startX);
  slide.style.cursor = "move";
  slide.addEventListener("mousemove", handleDrag);
});
document.addEventListener("mouseup", function () {
  slide.style.cursor = "default";
  slide.removeEventListener("mousemove", handleDrag);
});

var handleDrag = function (e) {
  var width = images[0].offsetWidth;
  var moveX = e.clientX - startX;
  console.log(moveX);
  slide.style.translate = `${moveX + width * -1 * count}px`;
  slide.style.transition = `none`;
  if (Math.abs(moveX) > width * 0.15) {
    if (moveX < 0 && count < images.length - 1) {
      count++;
    } else if (moveX > 0 && count > 0) {
      count--;
    }
    slide.style.translate = `${width * -1 * count}px`;
    slide.removeEventListener("mousemove", handleDrag);
    slide.style.transition = `.5s ease-in-out`;
    radios.forEach(function (radio) {
      radio.classList.remove("active");
      if (radio.id === `${count}`) {
        radio.classList.add("active");
      }
    });
  }
};
