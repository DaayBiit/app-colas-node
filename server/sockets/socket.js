const { io } = require('../server');
const { TicketControl } = require('../classes/ticketControl');

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Escuchar el cliente
    client.on('siguienteTickect', (data, callback) => {

        let siguienteTicket = ticketControl.siguienteTurno();

        console.log('Cual es el siguiente Ticket: ', siguienteTicket);
        callback(siguienteTicket);

    });

    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTurno()
    })

    client.on('atenderTicket', (data,callback)=>{
        if(!data.escritorio){
            return callback({
                err: false,
                mensaje: 'El escritorio es necesario'
            })
        }
    
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);
    })

    // Actualizar/notificar cambios en los 4 Ultimos

});