//Comando para establece la conexion Socket
var socket = io();


var searchParams = new URLSearchParams(window.location.search);

var lable = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        console.log(resp);

        if(resp === 'No hay tickets'){
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero)
    })
})