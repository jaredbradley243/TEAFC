// <!-- /_includes/partials/program-card.js -->
document.addEventListener("DOMContentLoaded", function () {
  const hiddenTexts = document.querySelectorAll(".program-card-hidden-text");

  hiddenTexts.forEach((hiddenText) => {
    const readMoreButton = hiddenText.nextElementSibling;
    const readMoreButtonArrow = readMoreButton.querySelector("svg");

    readMoreButton.addEventListener("click", () => {
      readMoreButtonArrow.classList.toggle("rotate-180");
      if (hiddenText.classList.contains("hidden")) {
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
});
