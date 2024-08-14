// <!-- /_includes/partials/founders.js -->
document.addEventListener("DOMContentLoaded", function () {
  const hiddenText = document.getElementById("founders-hidden-text");
  const readMoreButton = document.getElementById("founders-read-more-button");
  const readMoreButtonArrow = readMoreButton.querySelector("svg");
  readMoreButton.addEventListener("click", () => {
    
    readMoreButtonArrow.classList.toggle("rotate-180");
    if (hiddenText.classList.contains('hidden')) {
      hiddenText.classList.toggle("hidden");
      hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
      readMoreButton.setAttribute("aria-expanded", "true");
    } else {
      hiddenText.style.maxHeight = "0px";
      readMoreButton.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        hiddenText.classList.add("hidden");
      }, 256);
    }
  });
});
