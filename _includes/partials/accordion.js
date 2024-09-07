document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((accordionHeader, index) => {
    const accordionBody = accordionHeader.previousElementSibling || accordionHeader.nextElementSibling;

    const accordionID = index + 1;
    accordionHeader.setAttribute("id", `accordion-header-${accordionID}`);
    accordionHeader.setAttribute("name", `accordion-header-${accordionID}`);
    accordionHeader.setAttribute("aria-controls", `accordion-body-${accordionID}`)
    accordionBody.setAttribute("id", `accordion-body-${accordionID}`);
    accordionBody.setAttribute("aria-labelledby", `accordion-header-${accordionID}`);

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
