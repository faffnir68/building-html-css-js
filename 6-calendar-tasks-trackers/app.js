const date = new Date()
let startYear = date.getFullYear()
let startMonth = date.getMonth()+1
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
let daysOfTheMonth = document.querySelectorAll(".day")

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
        daysOfTheMonth = document.querySelectorAll(".day")
        selectDay(daysOfTheMonth)
        hasTask(daysOfTheMonth)
    })
})

/*
Overline current day
*/
const selectDay = (daysMonth) => {
    daysMonth.forEach(day => {
        day.addEventListener('click', (e) => {
            e.preventDefault()
            daysMonth.forEach(d => {
                if(d.classList.contains('current')){
                    d.classList.remove('current')
                }
            })
            day.classList.add('current')
            document.querySelector(".tasks").innerText = ""
            displayTask()
        })
    })
}
selectDay(daysOfTheMonth)

// currentMonth.innerText = date.toLocaleDateString('en-US', {month: 'long'})

let tasks = [];
let taskContent = document.getElementById("task-content")
let taskRemain = document.getElementById("task-remaining")

const displayTask = () => {
    let tasksStored = localStorage.getItem("tasks")
    let tasks = JSON.parse(tasksStored)
    const curDay = document.querySelector('.day.current').innerText
    const curMonth = document.querySelector('.current-month').innerText
    const curYear = document.querySelector('.current-year').innerText

    tasks.forEach(task => {
        if(task.date === new Date(`${curYear}-${curMonth}-${curDay}`).toLocaleDateString()) {
            const tasksContentdivMain = document.createElement("section")
            const tasksContentdiv = document.createElement("li")
            const tasksRemaindiv = document.createElement("li")
            const tasksDatediv = document.createElement("li")
            
            tasksContentdivMain.classList.add('task-ctn')
            tasksContentdiv.classList.add('task-content')
            tasksRemaindiv.classList.add('task-remaining')
            tasksDatediv.classList.add('mb-3')
    
            tasksContentdiv.innerText = task.content
            tasksRemaindiv.innerText = task.remaining
            tasksDatediv.innerText = task.date
            
            document.querySelector('.tasks').appendChild(tasksContentdivMain)
            tasksContentdivMain.appendChild(tasksContentdiv)
            tasksContentdivMain.appendChild(tasksRemaindiv)
            tasksContentdivMain.appendChild(tasksDatediv)
            // document.querySelector('.tasks').appendChild(tasksContentdiv)
            // document.querySelector('.tasks').appendChild(tasksRemaindiv)
            // document.querySelector('.tasks').appendChild(tasksDatediv)
        }
    })
}
if(tasks.length !== 0) {
    displayTask()
}

const addTask = (e) => {
    e.preventDefault()
    const curDay = document.querySelector('.day.current')
    const curMonth = document.querySelector('.current-month').innerText
    const curYear = document.querySelector('.current-year').innerText
    curDay.classList.add('has-task')
    tasks.push({
        'id': tasks.length,
        'content': taskContent.value,
        'remaining': taskRemain.checked,
        'date': new Date(`${curYear}-${curMonth}-${curDay.innerText}`).toLocaleDateString()
    })
    document.querySelector('.tasks').innerHTML = ""
    let obj = JSON.stringify(tasks)
    localStorage.setItem("tasks", obj)
    displayTask()
}
document.getElementById('add-task').addEventListener("click", e => {
    e.preventDefault()
    addTask(e)
})

const hasTask = () => {
    let tasksStored = localStorage.getItem("tasks")
    let tasks = JSON.parse(tasksStored)
    const curMonth = document.querySelector('.current-month').innerText
    const curYear = document.querySelector('.current-year').innerText
    const remain = tasks.filter(task => task.remaining === true)
    // && task.date === new Date(`${curYear}-${curMonth}-${day.innertext}`).toLocaleDateString()
    if(remain) {
        tasks.forEach(task => {
            console.log(task.date)
        })
    }

}
hasTask()
