// <!-- /_includes/partials/program-card.js -->
document.addEventListener("DOMContentLoaded", function () {
  const programCards = document.querySelectorAll(".program-card-main");
  programCards.forEach((card) => {
  const hiddenText = card.querySelector(".program-card-hidden-text");
    const programImg = card.querySelector(".program-card-img")
    const readMoreButton = hiddenText.nextElementSibling;
    const readMoreButtonArrow = readMoreButton.querySelector("svg");

    readMoreButton.addEventListener("click", () => {
      readMoreButtonArrow.classList.toggle("rotate-180");
      if (hiddenText.classList.contains("hidden")) {
        hiddenText.classList.toggle("hidden");
        hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
        programImg.classList.toggle("lg:aspect-square");
        readMoreButton.setAttribute("aria-expanded", "true");
      } else {
        hiddenText.style.maxHeight = "0px";
        programImg.classList.toggle("lg:aspect-square");
        readMoreButton.setAttribute("aria-expanded", "false");
        setTimeout(() => {
          hiddenText.classList.add("hidden");
        }, 256);
      }
    });
  });
});
