const bg = document.querySelector('.bg');
const loadingText = document.querySelector('.loading-text');

let loadingNb = 0;
const ms = 30;
const blurVal = 30;

let intervalNb = setInterval(blurring, 30)

const scale = (num, input_min, input_max, output_min, output_max) => {
    return (num - input_min) * (output_max - output_min) / (input_max -input_min) + output_min
}

function blurring() {
    loadingNb++
    if(loadingNb > 99) {
        clearInterval(intervalNb)
    }
        loadingText.innerText = `${loadingNb}%`
        loadingText.style.opacity = scale(loadingNb, 0, 100, 1, 0)
        let bgDuration = scale(loadingNb, 0, 100, blurVal, 0)
        bg.style.animation = `unblur ${bgDuration}s forwards`
}


/**
 * Variation
 * 
 * bg.style.filter = `blur(${bgDuration})`; // Much easier
 * 
 */

