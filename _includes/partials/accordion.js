const accordionHeader = document.querySelectorAll('.accordion-header')

accordionHeader.forEach(accordionHeader => {
    accordionHeader.addEventListener("click", event => {
        accordionHeader.classList.toggle("active")
        const accordionBody = accordionHeader.nextElementSibling
        const expanded = accordionHeader.getAttribute('aria-expanded') === 'true';
        if(!expanded) {
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px"
        }
        else {
            accordionBody.style.maxHeight = '0px'
        }
    })
    const accordionBody = accordionHeader.nextElementSibling;
        accordionBody.addEventListener('transitionend', () => {
            if (accordionHeader.getAttribute('aria-expanded') === 'false') {
                accordionBody.style.maxHeight = '';
            } else {
                accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
            }
        })
})