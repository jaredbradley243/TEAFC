// <!-- /_includes/partials/founders.js -->

document.addEventListener('DOMContentLoaded', function () {
  const hiddenText = document.getElementById("founders-hidden-text");
  const readMoreButton = document.getElementById("founders-read-more-button");

  readMoreButton.addEventListener("click", () => {
    hiddenText.classList.toggle("hidden");
  });
});
