const container = document.querySelector(".container")
const textarea = document.querySelector("textarea")
const tagsContainer = document.querySelector(".tags-container")

textarea.addEventListener('keydown', e => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        randomSelect()
    }
})

function createTags(input) {
    let tags = input.split(',')
        .filter(tag => tag.trim() !== '')
        .map(tag => tag.trim())

    tagsContainer.innerHTML = ""

    tags.forEach(tag => {
        const span = document.createElement("span")
        span.innerText = tag
        tagsContainer.appendChild(span)
    });
}

function randomSelect() {
    const interval = setInterval(() => {
        const randomTag = pickRandomTags()
        activate(randomTag)
        setTimeout(() => {
            unActivate(randomTag)
        }, 100)
    }, 100)
    setTimeout(() => {
        clearInterval(interval)
        setTimeout(() => {
            const randomTag = pickRandomTags()
            activate(randomTag)
        },100)
    }, 3000)
}

function pickRandomTags() {
    const spans = document.querySelectorAll('span')
    const randomNb = Math.floor(Math.random() * spans.length)
    return spans[randomNb]
}

function activate(tag) {
    tag.classList.add('active')
}
function unActivate(tag) {
    tag.classList.remove('active')
}