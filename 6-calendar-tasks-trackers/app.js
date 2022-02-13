const date = new Date()
let startYear = date.getFullYear()
let startMonth = date.getMonth()
let startDay = date.getDay()
const months = ["", "January","February","March","April","May","June","July","August","September","October","November","December"];


console.log(date.toLocaleDateString('en-US', {month: 'long'}))
const daysCtn = document.querySelector('.days-container')


/*
* Year buttons list
*/
const yearMonthBtns = []
const prevYearBtn = document.querySelector('.left-year')
const nextYearBtn = document.querySelector('.right-year')
const prevMonthBtn = document.querySelector('.left-month')
const nextMonthBtn = document.querySelector('.right-month')
yearMonthBtns.push(nextYearBtn, prevYearBtn, prevMonthBtn, nextMonthBtn)

/*
* Initialize year, month and days
*/
let currentMonth = document.querySelector('.current-month')
let currentYear = document.querySelector('.current-year')
currentYear.innerText = startYear
currentMonth.innerText = months[startMonth]

/**
 * Get all days for a given month of a given year
 * @param {int} year 
 * @param {int} month 
 * @returns 
 */
 const daysInMonth = (year, month) => {
    return new Date(parseInt(year), month, 0).getDate()
}

const setDays = (year, month) => {
    const totalDays = daysInMonth(year, month)
    daysCtn.innerHTML = ""
    for(let i = 0; i < totalDays+1; i++) {
        if(i > 0) {
            if(i % 5 === 1) {
                let row = document.createElement('div')
                row.classList.add('row')
                daysCtn.appendChild(row)
            }
            let div = document.createElement('div')
            div.classList.add('day')
            div.innerText = i
            const rows = document.querySelectorAll('.row')
            rows.forEach(row => {
                row.appendChild(div)
            })
        }
    }
}
setDays(startYear, startMonth)

/*
* Functions launch after the clicks on left and right buttons for month and year
*/
const changeYearMonth = (currentYear, currentMonth, e) => {
    if(e.target.classList.contains("left-year")) {
        currentYear.innerText = parseInt(currentYear.innerText) - 1
    }
    if(e.target.classList.contains("right-year")) {
        currentYear.innerText = parseInt(currentYear.innerText) + 1
    }
    if(e.target.classList.contains("right-month")) {
        goNextMonth(currentMonth)
    }
    if(e.target.classList.contains("left-month")) {
        goPrevMonth(currentMonth)
    }
    setDays(currentYear, currentMonth)
}

const goPrevMonth = (currentMonth) => {
    if(currentMonth.innerText < 2) {
        currentMonth.innerText = 12
        currentYear.innerText = parseInt(currentYear.innerText) - 1
    }
    else {
        currentMonth.innerText = parseInt(currentMonth.innerText) - 1
    }
}
const goNextMonth = (currentMonth) => {
    if(currentMonth.innerText > 11) {
        currentMonth.innerText = 01
        currentYear.innerText = parseInt(currentYear.innerText) + 1
    }
    else {
        currentMonth.innerText = parseInt(currentMonth.innerText) + 1
    }
}

/**
* Click on left and right buttons
*/
yearMonthBtns.forEach(yearMonthBtn => {
    yearMonthBtn.addEventListener('click', (e) => {
        e.preventDefault()
        currentMonth.innerText = months.indexOf(currentMonth.innerText)
        changeYearMonth(currentYear, currentMonth, e)
        setDays(currentYear.innerText, currentMonth.innerText)
        currentMonth.innerText = months[currentMonth.innerText]
    })
})


/*
Overline current day
*/
const days = document.querySelectorAll(".day")
const selectDay = (days) => {
    days.forEach(day => {
        day.addEventListener('click', () => {
            days.forEach(d => {
                if(d.classList.contains('current'))
                d.classList.remove('current')
            })
            day.classList.add('current')
        })
    })
}
selectDay(days)

// currentMonth.innerText = date.toLocaleDateString('en-US', {month: 'long'})

let taskContent = "";