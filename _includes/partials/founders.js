// <!-- /_includes/partials/founders.js -->
document.addEventListener("DOMContentLoaded", function () {
  const hiddenText = document.getElementById("founders-hidden-text");
  const readMoreButton = document.getElementById("founders-read-more-button");
  const readMoreButtonArrow = readMoreButton.querySelector("svg");
  readMoreButton.addEventListener("click", () => {
    hiddenText.classList.toggle("hidden");
    readMoreButtonArrow.classList.toggle("rotate-180");
  });
});
