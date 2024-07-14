document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('button[aria-expanded="false"]');
  const mobileMenu = document.querySelector('div[role="dialog"]');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function() {
      const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true" || false;
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu
    const closeMenuButton = mobileMenu.querySelector('button[aria-label="Close menu"]');
    if (closeMenuButton) {
      closeMenuButton.addEventListener("click", function() {
        mobileMenuButton.setAttribute("aria-expanded", false);
        mobileMenu.classList.add("hidden");
      });
    }
  }

  // Dropdown menus toggle
  const dropdownButtons = document.querySelectorAll('button[aria-controls]');

  dropdownButtons.forEach(button => {
    const dropdownMenu = document.getElementById(button.getAttribute("aria-controls"));

    if (dropdownMenu) {
      button.addEventListener("click", function() {
        const isExpanded = button.getAttribute("aria-expanded") === "true" || false;
        button.setAttribute("aria-expanded", !isExpanded);
        dropdownMenu.classList.toggle("hidden");
      });
    }
  });
});
