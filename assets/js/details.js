let datos = data.events;
let query = location.search
console.log(query)
let params = new URLSearchParams(query)
let id_query = params.get(`_id`)

function defineDetail(dato) {
  return `
            <div class="details-container">
                <img src="${dato.image}" alt="${dato.name}">
           <div>
             <h2>${dato.name}</h2>
             <p>Category: ${dato.category}</p>
             <p>Place: ${dato.place}</p>
             <p>Capacity: ${dato.capacity}</p>
             <p>Assistance or stimate: ${dato.estimate || dato.assistance}</p>
             <a  class="btn btn-outline-info" href="">price: $${dato.price}</a>
             <a class="btn btn-outline-info" href="javascript:history.back(-1);" role="button">Back</a>
          
           </div>
           </div>

            `
}



function printDetail(id, dato, array_data) {
  let container = document.querySelector(id)
  let dat = array_data.find(each => each._id == dato)
  let details = defineDetail(dat)
  container.innerHTML = details
}

printDetail(`#cards-container`, id_query, datos)