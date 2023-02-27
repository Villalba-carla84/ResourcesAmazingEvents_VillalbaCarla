 console.log(data);

  let contenedor = document.getElementById(`cards-container`);
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

  contenedor.appendChild(fragment);

