document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("banner");
  const closeButton = document.getElementById("banner-close-button");

  banner.classList.add("transition", "ease-out", "duration-100");

  closeButton.addEventListener("click", (event) => {
    setTimeout(() => {
      banner.style.display = "none";
    }, 100); // Match the duration of the transition});
  });
});
