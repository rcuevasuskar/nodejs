var server_url = 'http://127.0.0.1:8080/'
var request;
        
var x;
x = $(document);
x.ready(initEvents);

function initEvents()
{
    $("#crearContador").click(crear);
    $("#verContador").click(ver);
}        

function crear() {
    request = new XMLHttpRequest();
    request.open('PUT', server_url + 'crear/' + $('#nombreContador').val(), true);
    request.onreadystatechange= mostrar_contador;
    request.send();
}

function mostrar_contador(){
    if ( request.readyState == 4 && request.status == 200 ) {
        
        var json;
        eval ( 'json = '+ request.responseText );
        $('#contadores').append(crearContadorHtml(json.creado, json.valor));
        animate(json.creado);
        
        $('#sumar-' + json.creado).click(function(){
              sumar(json.creado)
        });
        
        $('#borrar-' + json.creado).click(function(){
              borrar(json.creado)
        });
    }
}

function sumar(nombre) {
    request = new XMLHttpRequest();
    request.open('POST', server_url + 'sumar/' + nombre, true);
    
    request.onreadystatechange= function(){
                    actualizar_contador(nombre);
                };
    
    request.send();
}

function actualizar_contador(nombre){
    if ( request.readyState == 4 && request.status == 200 ) {
            var json;
            eval ( 'json = '+ request.responseText );
            $('#valor-' + nombre).html(json[nombre]);  
    }
}

function borrar(nombre)
{
    request = new XMLHttpRequest();
    request.open('POST', server_url + 'borrar/' + nombre, true);
    
    request.onreadystatechange= function(){
                    actualizar_contador(nombre);
                };
    
    request.send();
}

function ver() {
    request = new XMLHttpRequest();
    request.open('GET', server_url + 'contador/' + $('#nombreContador').val(), true);
    
    request.onreadystatechange= mostrar_informacion;
    
    request.send();
}

function mostrar_informacion()
{
    if ( request.readyState == 4 && request.status == 200 ) {
        var json;
        eval ( 'json = '+ request.responseText );
        console.log(json);
        $('#informacion').html(request.responseText);  
        animate('informacion');
    }
}

function animate(id) {		
    $("#" + id).animate({
        'font-size': '30'
        }, 1000 );
}	

function crearContadorHtml(nombre, valor) {
    return '<div id="' + nombre + '" style="font-size: 10px;">' + nombre + 
        ': <span id="valor-' + nombre + '">' + valor + '</span></div>' + 
        '<input type="button" id="sumar-' + nombre + '" value="Sumar">' +
        '<input type="button" id="borrar-' + nombre + '" value="Borrar">';
}
