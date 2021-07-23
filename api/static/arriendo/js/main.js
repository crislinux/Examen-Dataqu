
//function getcliente(opcion) {
const getcliente = async(opcion)=>{
    var ruta = '';
    if(opcion == '1') {
        ruta = 'http://127.0.0.1:8000/api/clientes/';
    }
    if(opcion == '2') {
        ruta = 'http://127.0.0.1:8000/api/clientes/?ordering=name';
    }
    if(opcion == '3') {
        ruta = 'http://127.0.0.1:8000/api/clientes/get_client_last_name/';
    }
    try {
        const respuesta = await fetch(ruta)
        const data = await respuesta.json()
        tabla(data,opcion)
    } catch(error) {
        console.log(error);
    }
}
const getempresa = async(opcion)=>{
    var ruta = '';
    if(opcion == '4') {
        ruta = 'http://127.0.0.1:8000/api/empresas/get_ruts_by_client/';
    }
    if(opcion == '6') {
        ruta = 'http://127.0.0.1:8000/api/empresas/get_company_sort_by_profits/';
    }
    try {
        const respuesta = await fetch(ruta)
        const data = await respuesta.json()
        tabla(data,opcion)
    } catch(error) {
        console.log(error);
    }
}

const tabla = (datos,opcion) => {
    var contenido = document.querySelector('#contenido');
    contenido.innerHTML = '';
    if(opcion == '1' || opcion == '2') {
        contenido.innerHTML = '<thead><tr><th scope="col">#</th><th scope="col">Rut</th><th scope="col">Nombre</th></tr></thead><tbody>';
    }
    if(opcion == '3'){
         contenido.innerHTML = '<thead><tr><th scope="col">Nombre</th></tr></thead><tbody>';
    }
    if(opcion == '6'){
        contenido.innerHTML ='<thead><tr><th scope="col">#</th><th scope="col">Nombre</th></tr></thead><tbody>';
    }

    if(opcion != '4') {
         for(let valor of datos) {
            if(opcion == '1' || opcion == '2') {
               contenido.innerHTML += '<tr><th scope="row">'+valor.id+'</th><td>'+valor.rut+'</td><td>'+valor.name+'</td></tr>';
            }
            if(opcion == '3') {
                contenido.innerHTML += '<tr><td>'+valor.name+'</td></tr>';
            }
            if(opcion == '6') {
                contenido.innerHTML += '<tr><td>'+valor.id+'</td><td>'+valor.name+'</td></tr>';
            }
        }
    }
    if(opcion == '4') {
        for (var [key, value] of Object.entries(datos)) {
            contenido.innerHTML += '<tr><th>'+key+'</th></tr>';
           for(let valor of value) {
             contenido.innerHTML += '<tr><td>'+valor+'</td></tr>';
           }

        }
    }
    contenido.innerHTML += '</tbody>';
}
