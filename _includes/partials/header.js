document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('button[aria-expanded="false"]');

  buttons.forEach((button) => {
    const menu = button.nextElementSibling;
    const icon = button.querySelector("svg");

    // Ensure menus are hidden by default with transition classes
    menu.classList.add(
      "transition",
      "ease-out",
      "duration-200",
      "opacity-0",
      "translate-y-1"
    );

    // Toggle menu visibility
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !expanded);

      // Toggle menu visibility and transitions
      if (expanded) {
        menu.classList.add("opacity-0", "translate-y-1");
        menu.classList.remove("opacity-100", "translate-y-0");
        setTimeout(() => {
          menu.style.display = "none";
        }, 200); // Match the duration of the transition
      } else {
        menu.style.display = "block";
        setTimeout(() => {
          menu.classList.remove("opacity-0", "translate-y-1");
          menu.classList.add("opacity-100", "translate-y-0");
        }, 0);
      }

      // Toggle icon rotation
      icon.classList.toggle("rotate-180");

      // Close other menus
      buttons.forEach((otherButton) => {
        if (otherButton !== button) {
          const otherMenu = otherButton.nextElementSibling;
          const otherIcon = otherButton.querySelector("svg");

          otherButton.setAttribute("aria-expanded", "false");
          otherMenu.classList.add("opacity-0", "translate-y-1");
          otherMenu.classList.remove("opacity-100", "translate-y-0");
          setTimeout(() => {
            otherMenu.style.display = "none";
          }, 200); // Match the duration of the transition
          otherIcon.classList.remove("rotate-180");
        }
      });
    });
  });
});
