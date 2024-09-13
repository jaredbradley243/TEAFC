document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    '#mobile-menu button[aria-expanded="false"], #nav-links button[aria-expanded="false"]',
  );
  const mobileMenu = document.getElementById("mobile-menu");
  const clickableArea = document.querySelector(".clickable-area");
  const mobileMenuCloseButton = document.getElementById(
    "mobile-menu-close-button",
  );
  const mobileMenuOpenButton = document.getElementById(
    "mobile-menu-open-button",
  );
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll("#nav-links > a");

  let isAnimating = false;

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active-nav-link");
    }
  });

  const fadeBackgroundOut = () => {
    const fader = document.querySelector(".fader");
    if (fader) {
      fader.classList.remove("bg-fade-in");
      setTimeout(() => {
        fader.remove();
      }, 250);
    }
  };

  const fadeBackgroundIn = () => {
    const fragment = document.createElement("div");
    fragment.className = "fader";
    document.body.appendChild(fragment);
    const fader = document.querySelector(".fader");
    setTimeout(() => {
      fader.classList.add("bg-fade-in");
    }, 10);
  };

  const openMenu = () => {
    if (isAnimating) return;
    isAnimating = true;

    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.classList.add("open");
      isAnimating = false;
    }, 10);
    fadeBackgroundIn();
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (isAnimating) return;
    isAnimating = true;
    fadeBackgroundOut();
    document.body.style.overflow = "auto";
    mobileMenu.classList.remove("open");
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
      isAnimating = false;
    }, 125);
  };

  mobileMenuOpenButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openMenu();
  });

  mobileMenuCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeMenu();
  });

  buttons.forEach((button) => {
    const menu = button.nextElementSibling;
    const icon = button.querySelector("svg");

    // Ensure menus are hidden by default with transition classes
    menu.classList.add(
      "transition",
      "ease-out",
      "duration-50",
      "opacity-0",
      "translate-y-1",
    );

    // Toggle menu visibility
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !expanded);

      // Toggle menu visibility and transitions
      if (expanded) {
        menu.classList.add("opacity-0", "translate-y-1");
        menu.classList.remove("opacity-100", "translate-y-0");
        setTimeout(() => {
          menu.style.display = "none";
        }, 50); // Match the duration of the transition
      } else {
        menu.style.display = "block";
        setTimeout(() => {
          menu.classList.remove("opacity-0", "translate-y-1");
          menu.classList.add("opacity-100", "translate-y-0");
        }, 0);
      }

      // Toggle icon rotation
      icon.classList.toggle("rotate-180");

      // Close other menus if desktop
      if (window.innerWidth >= 1024) {
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
      }
    });

    // Prevent clicks inside the menu from closing it
    menu.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  // Close menu if clicked away if on desktop
  if (window.innerWidth >= 1024) {
    document.addEventListener("click", (event) => {
      buttons.forEach((button) => {
        const menu = button.nextElementSibling;
        const icon = button.querySelector("svg");
        if (button.getAttribute("aria-expanded") === "true") {
          button.setAttribute("aria-expanded", "false");
          menu.style.display = "none";
          icon.classList.remove("rotate-180");
        }
      });
    });
  }

  // Close menu if clicked away if on mobile
  mobileMenu.addEventListener("click", (event) => {
    if (window.innerWidth <= 1024 && event.target !== clickableArea) {
      closeMenu();
    }
  });

  // Prevent closing the menu when clicking inside it
  clickableArea.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  //Fallback in case fader is activated
  document.addEventListener("click", (event) => {
    if (
      event.target !== mobileMenuOpenButton &&
      !mobileMenu.contains(event.target)
    ) {
      closeMenu();
    }
  });
});
