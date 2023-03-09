/*  console.log(data);
///--------------------------CARD SIN FUNCTION---------------------///
/*   let contenedor = document.getElementById(`cards-container`);
  let fragment = document.createDocumentFragment();

   for (let evento of data.events) {
            let div=document.createElement("div");
             div.classList.add( "cards-container", "cards" ,"content")
            div.innerHTML +=`

           <div class="card">
            <img src="${evento.image}">
            <h2 >${evento.name}</h2>
           <div class= "content">
            <p ">${evento.description}</p>
            <a href="" class="btn btn-outline-info">price: ${evento.price}</a>
            <a href="./details.html" class="btn btn-outline-info">details</a>
           </div>
          </div> `
  fragment.appendChild(div);

   }

  contenedor.appendChild(fragment); */

///--------------------------CARD CON FUNCTION---------------------///

/* let events = data.events;

let container = document.getElementById(`cards-container`);

 function imprimir(arreglo) {
  for (i = 0; i < arreglo.length; i++) {
    container.innerHTML += ` 
    <div class="card">
    <img src="${arreglo[i].image}">
     <h2 >${arreglo[i].name}</h2>
    <div class= "content">
    <p ">${arreglo[i].description}</p>
    <a href="" class="btn btn-outline-info">price: ${arreglo[i].price}</a>
    <a href="./details.html?_id=${arreglo._id}" class="btn btn-outline-info">details</a>
    </div>
    </div>`
  }
}

imprimir(events)  */



let template = (image, name, description, price, _id)=>{ 
  return `
  <div class="card">
  <img src="${image}" >
            <h2>${name}</h2>
            <div class= "content">
            <p>${description}</p>
            <a href="" class="btn btn-outline-info">price: ${price}</a>
            <a href="./details.html?_id=${_id}" class="btn btn-outline-info">details</a>
</div>
</div>
    `
  }
  
  function createTemplate(){
  //almacena los events de data
      let events = data.events
  
      //almacena los datos en un array para renderizar las tarjetas
      let templates = []
      
      for (let reunion of events){
  /*         console.log(reunion)
   */        templates.push(template(reunion.image, reunion.name, reunion.description, reunion.price, reunion._id))
      }
  
    /*   console.log(templates) */
      let selector = document.getElementById(`cards-container`)
      selector.innerHTML = templates.join("")
  }
  
  createTemplate()

 ///check//
 let categories = []
data.events.forEach(each =>{
    if(!categories.includes(each.category)){
        categories.push(each.category)
    }
})
console.log(categories)

let templateChecks = (category)=>{
    return`
    <span>
          <input class="checks" type="checkbox" onclick='captureData("name", "checks", data.events)' name="category" id="${category}" value="${category}"> 
          <label class="label-text" for="${category}">${category}</label>
    </span>
    `
}

let printChecks = (id_html, categories) => {
    let selector = document.querySelector(`#${id_html}`)
    let templates = categories.map(templateChecks).join('')
    selector.innerHTML = templates
    //console.log(templates)
}

printChecks('checks_container', categories)
 
 //SELECCIONAR

let templateCard = (data)=>{ 
  return `

  <div class="card">
            <img src="${data.image} "  alt="">
              <h2>${data.name} </h2>
            <div  class= "content">
              <p >${data.description} </p>
              <a href="" class="btn btn-outline-info">Price: ${data.price} </a>
              <a href="./details.html?_id=${data._id} "  class="btn btn-outline-info">Details</a> 
            </div>
  </div>
    `
  }

  
let printEvents = (id_html, array_events) => {
  let selector = document.querySelector(`#${id_html}`)
  let templates = array_events.map(templateCard).join('')
  selector.innerHTML = templates
  //console.log(templates)
}


function templateNotFound(id_etiqueta) {
  let container = document.querySelector(id_etiqueta)
  container.innerHTML = `
  
  <div class="card">
     <img src="./assets/img/notfound.png" alt="">
    <h2>We're sorry! </h2>
    <div  class= "content">
    <p >It seems your search has been unsuccessful. </p>
    
  </div>
</div>
      `
    }


let captureData = (id_text, id_checks, array_events) => {
  let inputText = document.querySelector(`#${id_text}`).value
  let inputChecks = Array.from(document.querySelectorAll(`.${id_checks}:checked`)).map(each =>each.value)
  console.log(inputText)
  
  let eventFiltered = array_events.filter(each =>{
      return (( 
          each.name.toLowerCase().includes(inputText.toLowerCase().trim())
      )&&( 
          each.length === 0 || inputChecks.includes(each.category)
      ))
  })

      if (eventFiltered.length>0) {
        printEvents("cards-container", eventFiltered)
      } else {
        templateNotFound('#cards-container')
      }
  
}



document.querySelector("#name").addEventListener("keyup", ()=> captureData("name", "checks", data.events))
