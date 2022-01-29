const btnUp = document.querySelector('.up')
const btnDown = document.querySelector('.down')
const slideContainer = document.querySelector(".slides")
const leftSlide = document.querySelector('.left-slides')
const rightSlide = document.querySelector('.right-slides')
const slidesLength = document.querySelectorAll('.right-slides div').length

let activeSlide = 0

btnDown.addEventListener("click", () => changeSlide("up"))
btnUp.addEventListener("click", () => changeSlide("down"))

leftSlide.style.top = `-${(slidesLength-1)*100}vh`

const changeSlide = (direction) => {
    const h = slideContainer.clientHeight
    if(direction === "up") {
        activeSlide++
        if(activeSlide > slidesLength-1) {
            activeSlide = 0
        }
    }
    if(direction === "down") {
        activeSlide--
        if(activeSlide < 0) {
            activeSlide = slidesLength-1
        }
    }
    rightSlide.style.transform = `translateY(-${activeSlide * h}px)`
    leftSlide.style.transform = `translateY(${activeSlide * h}px)`
}