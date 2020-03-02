// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let date = new Date()
let time = date.getTime()
let counter = time

const createTask = (name, price, url) => {
  counter++
  let products = {
    id: counter,
    name: name,
    price: price,
    url: url
  }
  let db = firebase.database().ref(`Lista/Morochas/${counter}`)
  db.set(products)
}

const readProducts = () => {
  let products = firebase.database().ref('Lista/Morochas')
  products.on('child_added', (data) => {
    let productsValue = data.val()
    //console.log(productsValue)
    document.getElementById('cardSection1').innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title" style="text-align:center;font-weight:600">Producto: ${productsValue.nombre}</h5>
          <div style="display:flex; flex-direction:column; align-items:center;">
            <p class="card-text">Precio: ${productsValue.precio}</p>
            <img src="${productsValue.url}" class="img-product" style="display:block; text-align:center; justify-content:center; width:150px; height:150px" alt="">
          </div>
        </div>
      </div>
    `
    document.getElementById('table1').innerHTML += `
      <tr class="text-center">
        <th scope="row">${productsValue.id}</th>
        <td>${productsValue.nombre}</td>
        <td>${productsValue.precio}</td>
      </tr>
    `
    counterGraphic(arrayCounter, arrayDays, 'counterChart1', 'rgba(218, 196, 153, 1)')
    circleGraphic(arrayCounter, arrayData, 'circleGraphic1', 'rgba(218, 196, 153, 1)')
  })
  let microfonos = firebase.database().ref('Lista/Microfono')
  microfonos.on('child_added', (data) => {
    let microValue = data.val()
    //console.log(microValue)
    document.getElementById('cardSection2').innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title" style="text-align:center;font-weight:600">Producto: ${microValue.nombre}</h5>
          <div style="display:flex; flex-direction:column; align-items:center;">
            <p class="card-text">Precio: ${microValue.precio}</p>
            <img src="${microValue.url}" class="img-product" style="display:block; text-align:center; justify-content:center; width:150px; height:150px" alt="">
          </div>
        </div>
      </div>
    `
    document.getElementById('table2').innerHTML += `
      <tr class="text-center">
        <th scope="row">${microValue.id}</th>
        <td>${microValue.nombre}</td>
        <td>${microValue.precio}</td>
      </tr>
    `
    counterGraphic(arrayMicrofono, arrayDays, 'counterChart2', 'rgba(196, 172, 124, 1)')
    circleGraphic(arrayMicrofono, arrayData, 'circleGraphic2', 'rgba(196, 172, 124, 1)')
  })
  let aguaCielo = firebase.database().ref('Lista/Cielo')
  aguaCielo.on('child_added', (data) => {
    let aguaValue = data.val()
    //console.log(aguaValue)
    document.getElementById('cardSection3').innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title" style="text-align:center;font-weight:600">Producto: ${aguaValue.nombre}</h5>
          <div style="display:flex; flex-direction:column; align-items:center;">
            <p class="card-text">Precio: ${aguaValue.precio}</p>
            <img src="${aguaValue.url}" class="img-product" style="display:block; text-align:center; justify-content:center; width:150px; height:150px" alt="">
          </div>
        </div>
      </div>
    `
    document.getElementById('table3').innerHTML += `
      <tr class="text-center">
        <th scope="row">${aguaValue.id}</th>
        <td>${aguaValue.nombre}</td>
        <td>${aguaValue.precio}</td>
      </tr>
    `
    counterGraphic(arrayCielo, arrayDays, 'counterChart3', 'rgba(38, 76, 116, 1)')
    circleGraphic(arrayCielo, arrayData, 'circleGraphic3', 'rgba(38, 76, 116, 1)')
  })
  let gaseosa7up = firebase.database().ref('Lista/7up')
  gaseosa7up.on('child_added', (data) => {
    let gaseosaValue = data.val()
    console.log(gaseosaValue)
    document.getElementById('cardSection4').innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title" style="text-align:center;font-weight:600">Producto: ${gaseosaValue.nombre}</h5>
          <div style="display:flex; flex-direction:column; align-items:center;">
            <p class="card-text">Precio: ${gaseosaValue.precio}</p>
            <img src="${gaseosaValue.url}" class="img-product" style="display:block; text-align:center; justify-content:center; width:150px; height:150px" alt="">
          </div>
        </div>
      </div>
    `
    document.getElementById('table4').innerHTML += `
      <tr class="text-center">
        <th scope="row">${gaseosaValue.id}</th>
        <td>${gaseosaValue.nombre}</td>
        <td>${gaseosaValue.precio}</td>
      </tr>
    `
    counterGraphic(arrayGaseosa, arrayDays, 'counterChart4', '#545454')
    circleGraphic(arrayGaseosa, arrayData, 'circleGraphic4', '#545454')
  })
}

//Arreglos para el microfono
arrayMicrofono = [43,25,10,16,31,29]
//Arreglos para el agua cielo
arrayCielo = [45,23,13,19,29,33]
//Arreglos para la gaseosa 7up
arrayGaseosa = [17,24,32,41,28,15]

// Array donde se almacena el valor de los contadores
let arrayCounter = []
// Metodo para obtener los contadores
const readCounter = () => {
  let counterProducts = firebase.database().ref(`Contador/`)
  counterProducts.on('child_added', (data) => {
    let counterValue = data.val()
    console.log(counterValue)
    arrayCounter.push(counterValue.cantidad)
  })
}
console.log(arrayCounter)

//Metodo para crear grafico de las visitas a un producto
let arrayDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
const counterGraphic = (arrayCounter, arrayDays, location, color) =>{
  let ctx = document.getElementById(location).getContext('2d')
  let data = []
  let counterChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayDays,
      datasets: [{
        label: 'Número de visitas',
        data: arrayCounter,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
            ticks: {
              beginAtZero: false,
                suggestedMin: 0,
                suggestedMax: 40
            }
        }]
    }
    }
  })
}

let arrayData = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado']
let arrayColor = ['#c4ac7c', '#36586d', '#04a39c', '#848484', '#e3edeb', '#7ad7d2', '#76ccd4']
const circleGraphic = (arrayCounter, arrayData, location, color) =>{
  let ctx = document.getElementById(location).getContext('2d')
  let data = []
  let counterChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: arrayData,
      datasets: [{
        label: 'Días con más ventas',
        data: arrayCounter,
        backgroundColor: arrayColor,
        borderColor: arrayColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
            ticks: {
              beginAtZero: false,
                suggestedMin: 0,
                suggestedMax: 40
            }
        }]
    }
    }
  })
}

// Declarando metodo para obtener el valor de los contadores
readCounter()
