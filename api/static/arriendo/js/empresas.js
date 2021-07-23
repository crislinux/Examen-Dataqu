var url = "http://127.0.0.1:8000/api/empresas/";
fetch(url)
.then(response => response.json())
.then(datos => carga(datos))
.catch(error => console.log(error))

const carga = (datos) => {
    var contenido = document.querySelector('#contenido');
    contenido.innerHTML = '<thead><tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Acciones</th></tr></thead><tbody>';
     for(let valor of datos) {
       contenido.innerHTML += '<tr><th scope="row">'+valor.id+'</th><td>'+valor.name+'</td><td><div><button type="button" onclick="actualizar('+valor.id+',\''+valor.name+'\')" style="margin-right:1rem;" class="btn btn-warning">Editar</button><button onclick="empresadelete('+valor.id+')" type="button" class="btn btn-danger">Eliminar</button></div></td></tr>';
    }
    contenido.innerHTML += '</tbody>';
}

const postempresas = () => {
nombre = document.getElementById("nombre").value;
if(nombre == '') {
    alert("EXISTEN CAMPOS VACIOS");
    return false;
}
  fetch('http://127.0.0.1:8000/api/empresas/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({name:nombre})
  }).then(function(response) {
       nombre.value = "";
      location.reload();
  }).then(function(data) {
  });
}

const empresadelete = (id) => {
    if(id != "") {
        fetch('http://127.0.0.1:8000/api/empresas/'+id+'/', {
        method: 'DELETE'
     }).then(function(response) {
      location.reload();
  }).then(function(data) {
  });
}
}

const actualizar = (id,name) => {
    if( document.getElementById("btn_actualizar").style.display !="block") {
        document.getElementById("btn_registrar").style.display = "none";
        document.getElementById("btn_actualizar").style.display = "block";
        document.getElementById("nombre").value = name;
        var contenidobtn = document.querySelector("#btn_actualizar");
        contenidobtn.innerHTML += '<button  type="button" onclick="putcliente('+id+');"class="btn btn-primary">Actualizar</button>';
    }
}

const putcliente = (id) => {
    nombre = document.getElementById("nombre");
    fetch('http://127.0.0.1:8000/api/empresas/'+id+'/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({name:nombre.value})
  }).then(function(response) {
      nombre.value = "";
      location.reload();
  }).then(function(data) {
  });
}