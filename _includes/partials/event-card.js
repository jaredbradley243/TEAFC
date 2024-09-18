// <!-- /_includes/partials/event-card.js -->
document.addEventListener("DOMContentLoaded", function () {
  const eventCards = document.querySelectorAll(".event-card-main");
  eventCards.forEach((card) => {
    const hiddenText = card.querySelector(".event-card-hidden-text");
    const imgContainer = card.querySelector(".event-card-img-holder");
    const readMoreButton = hiddenText.nextElementSibling;
    const readMoreButtonArrow = readMoreButton.querySelector("svg");

    let isDesktopView = window.innerWidth >= 1024;

    const easeTransition = (newHeight) => {
      imgContainer.style.height = imgContainer.scrollHeight + "px";
      imgContainer.offsetHeight;
      imgContainer.style.height = newHeight + "px";
    };

    const expandContent = () => {
      const imgHeight = imgContainer.scrollHeight;
      readMoreButtonArrow.classList.add("rotate-180");
      hiddenText.classList.toggle("hidden");
      hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
      if (isDesktopView) {
        const newHeight = imgHeight + hiddenText.scrollHeight;
        easeTransition(newHeight);
      }
      readMoreButton.setAttribute("aria-expanded", "true");
    };

    const collapseContent = () => {
      if (isDesktopView) {
        const newHeight = imgContainer.scrollHeight - hiddenText.scrollHeight;
        easeTransition(newHeight);
      }
      hiddenText.style.maxHeight = "0px";
      readMoreButton.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        hiddenText.classList.add("hidden");
      }, 256);
      readMoreButtonArrow.classList.remove("rotate-180");
    };

    readMoreButton.addEventListener("click", () => {
      readMoreButtonArrow.classList.toggle("rotate-180");
      if (hiddenText.classList.contains("hidden")) {
        expandContent();
      } else {
        collapseContent();
      }
    });

    window.addEventListener("resize", () => {
      isDesktopView = window.innerWidth >= 1024;
      collapseContent();
      imgContainer.style.height = "";
    });
  });
});
