const card = document.querySelector('.card')
const bgOn = document.querySelector('.bgOn')

setTimeout(getData, 2200)

async function getData() {
    const api = await fetch('https://randomuser.me/api/?results=1')
    const { results } = await api.json()
    console.log(results[0])
    card.innerHTML=""
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="card-img">
            <img src="${results[0].picture.large}" alt="${results[0].name.first} ${results[0].name.last}"" srcset="">
        </div>
        <div class="card-text">
            <h3>Lorem, ipsum dolor.</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, iste?</p>
        </div>
        <div class="card-user">
            <img src="${results[0].picture.thumbnail}" alt="" srcset="">
            <div>
                <h4>${results[0].name.first}</h4>
                <p>${results[0].dob.date}</p>
            </div>
        </div>
    `;
    card.appendChild(div) 
    card.classList.remove("bgOn")
}
// getData()