document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slideLeftButton = document.querySelectorAll(".slide-left-container");
  const slideRightButton = document.querySelectorAll(".slide-right-container");

  slideRightButton.forEach((element) => {
    element.addEventListener("click", () => slider.scrollBy(15, 0));
  });

  slideLeftButton.forEach((element) => {
    element.addEventListener("click", () => slider.scrollBy(-15, 0));
  });
});
