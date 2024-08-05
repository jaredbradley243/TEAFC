document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((accordionHeader) => {
    const accordionBody = accordionHeader.nextElementSibling;

    accordionHeader.addEventListener("click", (event) => {
      const isExpanded =
        accordionHeader.getAttribute("aria-expanded") === "true";

      if (!isExpanded) {
        accordionBody.classList.remove("hidden");
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
        accordionHeader.setAttribute("aria-expanded", "true");
      } else {
        accordionBody.style.maxHeight = "0px";
        accordionHeader.setAttribute("aria-expanded", "false");
        setTimeout(() => {
          accordionBody.classList.add("hidden");
        }, 256);
      }

      accordionHeader.classList.toggle("active");
    });
  });
});
