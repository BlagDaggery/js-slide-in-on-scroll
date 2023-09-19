// David Walsh debounce function from davidwalshblog
// comments for my own understanding
function debounce(finalFunction, waitTime = 20, immediate = true) {
    
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) {
                finalFunction.apply(context, args);
            }
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        // this invokes setTimeout
        // even though we're assigning it to a variable
        // setTimeout is invoked nonetheless
        // in the end, all that's stored in the variable is the timeout ID returned by setTimeout
        timeout = setTimeout(later, waitTime);

        if (callNow) {
            finalFunction.apply(context, args);
        }
    };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));
