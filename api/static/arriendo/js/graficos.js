const xlabels = [];
const xdata = [];
const xlabels2 = [];
const xdata2 = [];

var url = "http://127.0.0.1:8000/api/empresas/get_grafico_arriendos/";
fetch(url)
.then(response => response.json())
.then(datos => cargar(datos,1))
.catch(error => console.log(error))

 var url2 = "http://127.0.0.1:8000/api/clientes/get_client_last_name/";
fetch(url2)
.then(response => response.json())
.then(datos => cargar(datos,2))
.catch(error => console.log(error))

 let canvas = document.getElementById("grafico").getContext("2d");
 let canvas2 = document.getElementById("grafico_2").getContext("2d");
 async function chartit(opcion) {
 if(opcion == 1) {
  var chart = new Chart(canvas,{
          type:"pie",
          data:{
                labels: xlabels,
               datasets:[
                {
                  label:"Ganancias por Empresas",
                  data: xdata,
                  backgroundColor:"rgb(7, 60, 130)"
                }
            ]
          },
          options: {
                    responsive: true,
                    maintainAspectRatio: false,
            }
   });
   } else {
   var chart = new Chart(canvas2,{
          type:"bar",
          data:{
                labels: xlabels2,
               datasets:[
                {
                  label:"Ingresos por Cliente",
                  data: xdata2,
                  backgroundColor:"rgb(80, 20, 100)"
                }
            ]
          },
          options: {
                    responsive: true,
                    maintainAspectRatio: false,
            }

   });
   }
 }

const cargar = (datos,opcion)=>{
datos.forEach(element => {
    if(opcion == 1) {
        xlabels.push(element.name)
        xdata.push(element.suma)
    } else {
        xlabels2.push(element.name)
        xdata2.push(element.suma)
    }
});
chartit(opcion);
}


var url = "http://127.0.0.1:8000/api/arriendos/";
fetch(url)
.then(response => response.json())
.then(datos => cargaindicadores(datos))
.catch(error => console.log(error))

const cargaindicadores = (datos)=>{

let numarr = document.getElementById("numarr");
numarr.innerHTML = datos.length;
datos.forEach(element => {

});
}