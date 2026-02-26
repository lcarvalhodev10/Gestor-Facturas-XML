const cabecera = document.querySelector('header'); 
const main = document.querySelector('main');
const datos = document.getElementById('datos');

async function cargarFactura() {
    const respuesta = await fetch('facturas/factura.xml'); 
    const textoXML = await respuesta.text(); 
    const parser = new DOMParser(); 
    const xml = parser.parseFromString(textoXML, 'application/xml'); 
    const emisor = xml.querySelector('emisor');
    const cliente = xml.querySelector('cliente');  
     
    const sec_emisor = document.createElement('section');
    const sec_cliente = document.createElement('section'); 

    sec_emisor.innerHTML = `<h2>${emisor.children[0].textContent}</h2>
    <p>${emisor.children[1].textContent}</p><p>${emisor.children[2].textContent}</p>`; 

    sec_cliente.innerHTML = `<h2>${cliente.children[0].textContent}</h2>
    <p>${cliente.children[1].textContent}</p><p>${cliente.children[2].textContent}</p>`

    cabecera.append(sec_emisor, sec_cliente); 

    const lineas = xml.getElementsByTagName('linea');

    const sec_lineas = document.createElement('tr');

    for(let linea of lineas){
        datos.innerHTML += `
        <tr>
            <td>${linea.children[0].textContent}</td>
            <td>${linea.children[1].textContent}</td>
            <td>${linea.children[2].textContent}</td>
            <td>${linea.children[3].textContent}</td>
        </tr>
        `
    }
    
    console.log(lineas); 

}

cargarFactura()

document.addEventListener('click', function(){
    window.print(); 
});

