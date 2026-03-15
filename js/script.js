const header = document.querySelector('header');
const main = document.querySelector('main');
const datos = document.getElementById('datos'); 
const footer = document.querySelector('footer')

async function cargarFactura() {
    try{
        const respuesta = await fetch('./facturas/factura.xml'); 
        if(!respuesta.ok) throw new Error("Error de petición"); 

        const textoXML = await respuesta.text(); 
        const parse = new DOMParser(); 
        const xml = parse.parseFromString(textoXML, 'application/xml');

        const emisor = xml.querySelector('emisor'); 
        const cliente = xml.querySelector('cliente'); 

        const sec_emisor = document.createElement('section'); 
        const sec_cliente = document.createElement('section'); 

        const h2_emisor = document.createElement('h2'); 
        h2_emisor.textContent = emisor.children[0].textContent; 
        const p_emisor = document.createElement('p'); 
        p_emisor.textContent = emisor.children[1].textContent; 
        const p2_emisor = document.createElement('p'); 
        p2_emisor.textContent = emisor.children[2].textContent; 

        const h2_cliente = document.createElement('h2'); 
        h2_cliente.textContent = cliente.children[0].textContent; 
        const p_cliente = document.createElement('p'); 
        p_cliente.textContent = cliente.children[1].textContent; 
        const p2_cliente = document.createElement('p'); 
        p2_cliente.textContent = cliente.children[2].textContent; 

        sec_emisor.append(h2_emisor, p_emisor, p2_emisor); 
        sec_cliente.append(h2_cliente, p_cliente, p2_cliente); 

        main.prepend(sec_emisor, sec_cliente); 

        const lineas = xml.querySelectorAll('linea'); 

        lineas.forEach(linea => {
            const tr = document.createElement('tr'); 
            const td_descripcion = document.createElement('td'); 
            const td_cantidad = document.createElement('td');
            const td_precioUnitario = document.createElement('td');
            const td_subtotal = document.createElement('td');

            td_descripcion.textContent = linea.querySelector('descripcion').textContent; 
            td_cantidad.textContent = linea.querySelector('cantidad').textContent; 
            td_precioUnitario.textContent = linea.querySelector('precioUnitario').textContent; 
            td_subtotal.textContent = linea.querySelector('subtotal').textContent; 

            tr.append(td_descripcion, td_cantidad, td_precioUnitario, td_subtotal); 
            datos.append(tr); 
        });

        const total = xml.querySelector('total'); 
        const sec_total = document.createElement('section');
        const h2_total = document.createElement('h2'); 
        h2_total.textContent = "Total: "; 
        const p_total = document.createElement('p'); 
        p_total.textContent = total.textContent; 

        sec_total.append(h2_total, p_total); 

        footer.append(sec_total); 

        const sec_cabeza = document.createElement('section'); 
        const numero = xml.querySelector('factura').getAttribute('numero'); 
        const fecha = xml.querySelector('factura').getAttribute('fecha'); 
        const p_numero = document.createElement('p'); 
        const p_fecha = document.createElement('p'); 
        p_numero.textContent = "Factura Nº: " + numero; 
        p_fecha.textContent = "Fecha: " + fecha;

        sec_cabeza.append(p_numero, p_fecha); 
        header.append(sec_cabeza); 

        
        console.log(lineas); 

    } catch(e){
        console.error(e); 
        document.body.textContent = e; 
    }
}

cargarFactura(); 

document.addEventListener('click', function(){
    window.print(); 
})