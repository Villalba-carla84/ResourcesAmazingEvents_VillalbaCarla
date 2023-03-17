let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

fetchData(urlApi)
async function fetchData(urlApi) {
    try {
        let response = await fetch(urlApi)
        let data = await response.json()
        let event = data.events
        const eventsTable = document.getElementById("eventsTable")

       table1(event,eventsTable)

        const upComingEventsTable = document.getElementById("upComingEventsTable")
        const pastEventsTable = document.getElementById("pastEventsTable")
        
        revenuesForCategory(event.filter(element => element.assistance),upComingEventsTable)
        revenuesForCategory(event.filter(element => element.estimate),upComingEventsTable)

        table2(event.filter(element => element.estimate),upComingEventsTable)
        table2(event.filter(element => element.assistance),pastEventsTable)

    }
    catch{
      (error => console.log(error))}}

function table1(array, contendor) {

    let moreCapacity = array.reduce((a, b) => {
        if (a.capacity > b.capacity) return a
        return b
    })
    console.log(moreCapacity)

    let morepercentage = array.filter(element => element.assistance).reduce((a, b) => {
        if ((a.assistance / a.capacity) > (b.assistance / b.capacity)) return a
        return b
    })
    console.log(morepercentage)

    let lowestpercentage = array.filter(element => element.assistance).reduce((a, b) => {
        if ((a.assistance / a.capacity) < (b.assistance / b.capacity)) return a
        return b
    })
    console.log(lowestpercentage)

    let trContenedor = document.createElement('tr')
    trContenedor.innerHTML = `
        <td>${morepercentage.name}: ${morepercentage.assistance/morepercentage.capacity*100}%</td>
        <td>${lowestpercentage.name}: ${lowestpercentage.assistance/lowestpercentage.capacity*100}%</td>
        <td>${moreCapacity.name}: ${moreCapacity.capacity}</td>`
        contendor.appendChild(trContenedor)
}

function revenuesForCategory (array,nameCategory){

    let arrayFiltrado = array.filter(element => element.category == nameCategory).reduce((total,evento) =>{
        if(evento.assistance != undefined)
        return total += evento.price * evento.assistance
        return total += evento.price * evento.estimate
    },0)
    return arrayFiltrado
}

function table2(array,contenedor){

    let categorias = [... new Set(array.map(element => element.category))]

    let fragmento = document.createDocumentFragment()

    for(let categoria of categorias){
        let trContenedor = document.createElement('tr')
        trContenedor.innerHTML = `<td>${categoria}</td>
        <td>${revenuesForCategory(array,categoria)}</td>
        <td>${PorcentageOfAttendance(array,categoria)}%</td>`
        fragmento.appendChild(trContenedor)
    }
    contenedor.appendChild(fragmento)

}

function PorcentageOfAttendance (array,nameCategory){

    let arrayFiltrado = array.filter(element => element.category == nameCategory).reduce((total,evento) =>{
        if(evento.assistance != undefined) return total += evento.assistance / evento.capacity 
        return total += evento.estimate / evento.capacity
    },0)
    return (arrayFiltrado * 100 /array.filter(element => element.category == nameCategory).length).toFixed(2)
}