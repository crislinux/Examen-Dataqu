var url = "http://127.0.0.1:8000/api/clientes/";
fetch(url)
.then(response => response.json())
.then(datos => carga(datos))
.catch(error => console.log(error))

const carga = (datos) => {
    var contenido = document.querySelector('#contenido');
    contenido.innerHTML = '<thead><tr><th scope="col">#</th><th scope="col">Rut</th><th scope="col">Nombre</th><th scope="col">Acciones</th></tr></thead><tbody>';
     for(let valor of datos) {
       contenido.innerHTML += '<tr><th scope="row">'+valor.id+'</th><td>'+valor.rut+'</td><td>'+valor.name+'</td><td><div><button type="button" onclick="actualizar('+valor.id+',\''+valor.rut+'\',\''+valor.name+'\')" style="margin-right:1rem;" class="btn btn-warning">Editar</button><button onclick="clientedelete('+valor.id+')" type="button" class="btn btn-danger">Eliminar</button></div></td></tr>';
    }
    contenido.innerHTML += '</tbody>';
}

const postcliente = () => {
rut = document.getElementById("rut");
nombre = document.getElementById("nombre");
if(rut.value == '' || nombre.value == '') {
    alert("EXISTEN CAMPOS VACIOS");
    return false;
}
resp = (Fn.validaRut(rut.value) ? true : false);
if(!resp) {
    alert("Rut Invalido");
    return false;
}

fetch('http://127.0.0.1:8000/api/clientes/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({rut:rut.value,name:nombre.value})
  }).then(function(response) {
      rut.value = "";
      nombre.value = "";
      location.reload();
  }).then(function(data) {
  });
}

const clientedelete = (id) => {
    if(id != "") {
        fetch('http://127.0.0.1:8000/api/clientes/'+id+'/', {
        method: 'DELETE'
         }).then(function(response) {
          location.reload();
        }).then(function(data) {
      });
    }
}

const actualizar = (id,rut,name) => {
    if( document.getElementById("btn_actualizar").style.display !="block") {
        document.getElementById("btn_registrar").style.display = "none";
        document.getElementById("btn_actualizar").style.display = "block";
        document.getElementById("rut").value = rut;
        document.getElementById("nombre").value = name;
        var contenidobtn = document.querySelector("#btn_actualizar");
        contenidobtn.innerHTML += '<button  type="button" onclick="putcliente('+id+');"class="btn btn-primary">Actualizar</button>';
    }
}

const putcliente = (id) => {
    rut = document.getElementById("rut");
    resp = (Fn.validaRut(rut) ? true : false);
    nombre = document.getElementById("nombre");
    if(rut.value == '' || nombre.value == '') {
        alert("EXISTEN CAMPOS VACIOS");
        return false;
    }
    resp = (Fn.validaRut(rut.value) ? true : false);
    if(!resp) {
        alert("Rut Invalido");
        return false;
    }
    fetch('http://127.0.0.1:8000/api/clientes/'+id+'/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({rut:rut.value,name:nombre.value})
  }).then(function(response) {
      rut.value = "";
      nombre.value = "";
      location.reload();
  }).then(function(data) {
  });
}