console.log(data);
///--------------------------CARD SIN FUNCTION---------------------//
/*  let contenedor = document.getElementById(`cards-container`);
 let fragment = document.createDocumentFragment();

 const fechaActual = new Date(data.currentDate)
 

for (let recorrido of data.events ) {
 
    if (fechaActual < Date.parse(recorrido.date)) {
    let card = document.createElement("div");
    card.classList.add("cards-container", "cards" ,"content");
    card.innerHTML +=
    ` <div class="card">
    <img src="${recorrido.image}" >
              <h2>${recorrido.name}</h2>
              <div class= "content">
              <p>${recorrido.description}</p>
              <a href="" class="btn btn-outline-info">price: ${recorrido.price}</a>
              <a href="./details.html" class="btn btn-outline-info">details</a>
</div>
  </div>
  `
  fragment.appendChild(card);
  }
}
contenedor.appendChild(fragment)
 */
///--------------------------CARD CON FUNCTION---------------------//

/* let container = document.getElementById(`cards-container`);[0]

let upcomingEvents = data.events.filter(cadaevent => cadaevent.date > data.currentDate)

function imprimirEventosFuturos(contenedor, array) {
  contenedor.innerHTML = ""
  array.forEach((recorrido) => {
    contenedor.innerHTML +=
    ` <div class="card">
    <img src="${recorrido.image}" >
              <h2>${recorrido.name}</h2>
              <div class= "content">
              <p>${recorrido.description}</p>
              <a href="" class="btn btn-outline-info">price: ${recorrido.price}</a>
              <a href="./details.html?_id=${recorrido._id}" class="btn btn-outline-info">details</a>
</div>
  </div>
  `
  })
}

imprimirEventosFuturos(container, upcomingEvents) */


let template = (image, name, description, price,_id)=>{ 
  return  `
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
      
      const hoy = data.currentDate

      for (let reuniones of events){
          if ( hoy < reuniones.date){
            console.log(reuniones)
            template()
            templates.push(template(reuniones.image, reuniones.name, reuniones.description, reuniones.price, reuniones._id))
          }
  

         }
         
      console.log(templates)
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
 