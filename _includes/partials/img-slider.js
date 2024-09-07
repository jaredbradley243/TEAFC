document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slideLeftButton = document.querySelectorAll(".slide-left", "left-arrow");
  const slideRightButton = document.querySelectorAll(".slide-right", "right-arrow");

  slideRightButton.forEach((element) => {
    element.addEventListener("click", () => slider.scrollBy(5, 0));
  });

  slideLeftButton.forEach((element) => {
    element.addEventListener("click", () => slider.scrollBy(-5, 0));
  });
});
