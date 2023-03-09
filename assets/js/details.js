/* let containerDetails = document.getElementsByClassName('container-cards-details')[0]
let totalEventos = data.events

let id = location.search
let param = new URLSearchParams(id)
let idParametro = parseInt(param.get("id"))

let eve = totalEventos.find(element => element._id === idParametro)

containerDetails.innerHTML =
    `
        <div class="card-details">
                    <div class="img-card">
                        <img src="${eve.image}" alt="${eve.name}">
                    </div>
                  <div class="titulo-card-details">
                    <h3>${eve.name}</h3>
                    <p>Category: ${eve.category}</p>
                    <p>Place: ${eve.place}</p>
                    <p>Capacity: ${eve.capacity}</p>
                    <p>Assistance: ${eve.assistance}</p>
                    <p>Estimate: ${eve.estimate}</p>
                    <p>Price: $${eve.price}</p>
                    </div>
                </div>
        ` */


        let datos = data.events;
        let query = location.search
        console.log(query)
        let params = new URLSearchParams(query)
        let id_query = params.get(`_id`) 
        
        function defineDetail(dato){ 
            return`
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
        
       
        
        function printDetail(id, dato, array_data){
          let container = document.querySelector(id)
          let dat = array_data.find(each => each._id == dato)
          let details = defineDetail(dat)
          container.innerHTML = details
        }
        
        printDetail(`#cards-container` , id_query, datos)