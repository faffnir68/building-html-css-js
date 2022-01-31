const input = document.querySelector('input')
const userList = document.querySelector('.user-list')
let listItems = []

input.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=20')
    const data = await res.json()
    
    userList.innerHTML = ""
    
    data.results.forEach(user => {
        const li = document.createElement('li')
        li.classList.add('user-item')
        listItems.push(li)
        li.innerHTML = `
        <div class="picture">
        <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last}" srcset="">
        </div>
        <div class="text">
        <p class="name">${user.name.first} ${user.name.last}</p>
        <p class="location">${user.location.city}, ${user.location.country}</p>
        </div>
        `;
    })
    listItems.forEach(item => {
        userList.appendChild(item)
    })
}
getData()

function filterData(search) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(search.toLowerCase())) {
            item.classList.remove('hide')
        }
        else {
            item.classList.add('hide')
        }
    })
}