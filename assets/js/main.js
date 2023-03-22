//  console.log(data);
let form = document.forms
let cardsContainer = document.getElementById("cards-container")

let inputText = document.querySelector('input[type="search"]')

let url = 'https://mindhub-xj03.onrender.com/api/amazing'


async function fetchData(urlApi) {
    try {
        let response = await fetch(urlApi)
        let data = await response.json()
        categories(data.events)
        createTemplate(data.events)
        filters(data.events)
    } catch (err) {
      console.log('surgio un error')
        console.log(err)
    }
}
fetchData(url)

//*****checkbox*****///////
function categories(arrayEvents){
  let selector = document.querySelector(`#check_bar`)
  let categories = []
  arrayEvents.forEach(event => {
    if (!categories.includes(event.category)) {
        categories.push(event.category)
    }
})
categories.forEach(category => {
  let div = document.createElement('div')
 div.innerHTML = `
<input class="checks" type="checkbox" name="${category}" id="${category}" value="${category}"> 
<label class="label-text" for="${category}">${category}</label>`


selector.appendChild(div)

})
}
///****FILTRO CRUZADO***

console.log(form)
 function filtrarCategoriasCheckeadas(arrayEventos) {
  let nodeListCheckbox = document.querySelectorAll('input[type="checkbox"]')
  let checkboxes = Array.from(nodeListCheckbox).filter(checkbox => checkbox.checked).map(check => check.value)
  console.log(checkboxes)
  if (checkboxes.length > 0) {
      let arrayEventosFiltradosPorCategorias = arrayEventos.filter(evento => checkboxes.includes(evento.category))
      return arrayEventosFiltradosPorCategorias
  }
  return arrayEventos
}
function searchText(textoABuscar, arrayEventosDondeVoyABuscar) {
  let arrayEventosFiltradosSearch = arrayEventosDondeVoyABuscar.filter(evento => evento.name.toLowerCase().includes(textoABuscar.toLowerCase()))
  return arrayEventosFiltradosSearch
}
function filters(events) {
 
  form[0].addEventListener('change', () => {
      createTemplate(filtrarCategoriasCheckeadas(searchText(inputText.value, events)))
  })

 
  inputText.addEventListener('keyup', () => {
      createTemplate(filtrarCategoriasCheckeadas(searchText(inputText.value, events)))
  })
}
///*******CARD******//////

function message() {
  let message = document.createElement('p')
  message.textContent= "We are sorry!,It seems your search has been unsuccessful.";
  let imgSearch = document.createElement('img')
  imgSearch.src="./assets/img/notfound.png"
  cardsContainer.append(message, imgSearch)
      
}


function createTemplate(arrayEventsFiltereds) {
  cardsContainer.innerHTML = ""
  arrayEventsFiltereds.forEach(element => {
    let card = document.createElement('div')
    card.className =  'cards' 
    card.innerHTML = `  
      <div class="card">
      <img src="${element.image}" >
                <h2>${element.name}</h2>
                <div class= "content">
                <p>${element.description}</p>
                <a href="" class="btn btn-outline-info">price: ${element.price}</a>
                <a href="./details.html?_id=${element._id}" class="btn btn-outline-info">details</a>
    </div>
    </div>
        `
      cardsContainer.appendChild(card)
  })
  if (arrayEventsFiltereds.length === 0) {
      message()
  }
}


