document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const sliderImageArray = [...slider.children]
    const slideLeftButton = document.querySelector('.slide-left');
    const slideRightButton = document.querySelector('.slide-right');

    slideRightButton.addEventListener('click', function () {
        const currentScrollPosition = slider.scrollLeft;
        for (let image = 0; image < sliderImageArray.length; image++) {
          if (sliderImageArray[image].offsetLeft > currentScrollPosition) {
            slider.scrollTo({
              left: sliderImageArray[image].offsetLeft,
              behavior: 'smooth'
            });
            setTimeout(() => {
              sliderImageArray[image].focus();
            }, 100); //timeout to prevent ARIA breaking animations
            break;
          }
        }
      }); 
      //loop will go through the scroller until the right edge of the img is greater than the currentScrollPosition
      //along the way, it saves the previous slide position
      //then it slides left and breaks
    slideLeftButton.addEventListener('click', function() {
        const currentScrollPosition = slider.scrollLeft; //how far slider is scrolled horizontally
        let previousSlideEnd = 0; //track end of previous slide
        for (let image = 0; image < sliderImageArray.length; image++) {
          if (sliderImageArray[image].offsetLeft >= currentScrollPosition) {
            slider.scrollTo({
              left: previousSlideEnd,
              behavior: 'smooth'
            });
            setTimeout(() => {
              if (image > 0) {
                  sliderImageArray[image - 1].focus(); // Focus on the previous image
              } else {
                  sliderImageArray[0].focus(); // Focus on the first image if we are at the start
              }
            }, 100);
            break;
          }
          previousSlideEnd = sliderImageArray[image].offsetLeft;
        }
    });
          
});

//offsetLeft is distance from left edge of the parent to that of the current image
//offsetWidth gives width of the current image
//adding them gives the position of the right edge of the current image
//if right edge value > current scroll position, then scroll to previous left edge and overwrite last left
//scrollTo takes X (left), Y (top), or both and scrolls to a specific position and
//also takes behavior mods like "smooth" 