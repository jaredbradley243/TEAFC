// <!-- /_includes/partials/event-card.js -->
document.addEventListener("DOMContentLoaded", function () {
  const hiddenTexts = document.querySelectorAll(".event-card-hidden-text");

  hiddenTexts.forEach((hiddenText) => {
    const eventImg =
      hiddenText.parentNode.parentNode.parentNode.previousSibling.previousSibling.querySelector(
        "img",
      );
    console.log(eventImg);
    const readMoreButton = hiddenText.nextElementSibling;
    const readMoreButtonArrow = readMoreButton.querySelector("svg");

    readMoreButton.addEventListener("click", () => {
      readMoreButtonArrow.classList.toggle("rotate-180");
      if (hiddenText.classList.contains("hidden")) {
        hiddenText.classList.toggle("hidden");
        hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
        eventImg.classList.toggle("lg:aspect-square");
        readMoreButton.setAttribute("aria-expanded", "true");
      } else {
        hiddenText.style.maxHeight = "0px";
        eventImg.classList.toggle("lg:aspect-square");
        readMoreButton.setAttribute("aria-expanded", "false");
        setTimeout(() => {
          hiddenText.classList.add("hidden");
        }, 256);
      }
    });
  });
});
