
//Comando para establece la conexion Socket
var socket = io();

var label =$('#lblNuevoTicket');

//ON : para escuchar
socket.on('connect', function () {
    console.log('Conectado al servidor por Socket')
})

socket.on('disconnect', function () {
    console.log("Se perdio la conexion con el servidor")
})


socket.on('estadoActual', function (resp) {
    console.log('Estado actual: ', resp);
    label.text(resp.actual);
})

$('button').on('click', function(){

    socket.emit('siguienteTickect', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });

});