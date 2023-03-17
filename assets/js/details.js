let url = 'https://mindhub-xj03.onrender.com/api/amazing'
async function fetchData(urlApi) {
    try {
        let response = await fetch(urlApi)
        let data = await response.json()
        console.log(data)
        let dataEvents = data.events
        console.log(dataEvents)
        details(dataEvents)
                                                           
    } catch (err) {
        console.log(err)
    }
}
 fetchData(url)

function details(events) {
    const params = new URLSearchParams(location.search)
    console.log(params)
    const id = params.get('_id')
    console.log(id)
    let detailEvent = events.find(event => event._id == id)
    console.log(detailEvent)
    let cardDetail = document.querySelector('#cards-container')
    console.log(cardDetail)
    cardDetail.innerHTML =  `
            <div class="details-container">
                <img src="${detailEvent.image}" alt="${detailEvent.name}">
           <div>
             <h2>${detailEvent.name}</h2>
             <p>Date: ${detailEvent.date}</p>
             <p>Category: ${detailEvent.category}</p>
             <p>Description: ${detailEvent.description}</p>
             <p>Place: ${detailEvent.place}</p>
             <p>Capacity: ${detailEvent.capacity}</p>
             <p>Assistance or stimate: ${detailEvent.estimate ||detailEvent.assistance}</p>
             <a  class="btn btn-outline-info" href="">price: $${detailEvent.price}</a>
             <a class="btn btn-outline-info" href="javascript:history.back(-1);" role="button">Back</a>
          
           </div>
           </div>

            `
          
}
