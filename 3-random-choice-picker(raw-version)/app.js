const container = document.querySelector(".container")
const textarea = document.querySelector("textarea")

let currentChoice = ""
let choiceIndex = 0
let choices = []

const span = document.createElement('span')
span.style.display = "none"
const addEntry = (e) => {
    span.style.display = "inline-block"
    if(e.key !== ',' || e.keyCode !== 13) {
        currentChoice += e.key
        choices[choiceIndex] = currentChoice
        span.innerText = currentChoice
        container.appendChild(span)
    }
    if(e.key === ',') {
        span.style.display = "none"
        choices.push(currentChoice)
        choices.forEach((choice, index) => {
            if(index == choiceIndex) {
                const span = document.createElement('span')
                span.innerText = choice
                container.appendChild(span)
            }
        })
        choiceIndex++
        currentChoice = ""
        span.innerText = ""
    }
    if(e.keyCode === 13) {
    
            let randomInterval = () => {
                const spans = document.querySelectorAll("span")
                const len = spans.length
                const random = Math.floor(Math.random()*len)
                    spans.forEach(span => {
                        span.style.backgroundColor = "orange"
                    })
                    spans[random].style.backgroundColor = "blue"
            }

            let inter = setInterval(() => {
                randomInterval()  
            }, 200);  
            setTimeout(() => {
                clearInterval(inter)
            }, 1400);

    }
}
