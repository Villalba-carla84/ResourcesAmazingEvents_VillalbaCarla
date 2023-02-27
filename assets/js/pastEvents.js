console.log(data);

 let contenedor = document.getElementById(`cards-container`);
 let fragment = document.createDocumentFragment();

 const fechaActual = new Date(data.currentDate)
 

for (let recorrido of data.events ) {
 
    if (fechaActual > Date.parse(recorrido.date)) {
    let card = document.createElement("div");
    card.classList.add("cards-container", "cards" ,"content");
    card.innerHTML +=
    ` <div class="card">
    <img src="${recorrido.image}" >
              <h2>${recorrido.name}</h2>
              <div class= "content">
              <p>${recorrido.description}.</p>
              <a href="" class="btn btn-outline-info">price: ${recorrido.price}</a>
              <a href="./details.html" class="btn btn-outline-info">details</a>
</div>
  </div>`
  fragment.appendChild(card);
  }
}
contenedor.appendChild(fragment)
