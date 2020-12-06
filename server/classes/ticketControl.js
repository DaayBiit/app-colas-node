
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimoTicket = 0;
        this.hoy = new Date().getDate();
        this.pendientesTickets = [];
        this.ultimos4Tickets = [];

        let data = require('../data/data.json');

        console.log("informacion del data.json:::", data);

        if (data.hoy === this.hoy) {
            this.ultimoTicket = data.ultimoTicket;
            this.pendientesTickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTurno() {
        this.ultimoTicket += 1;

        let ticket = new Ticket(this.ultimoTicket, null);
        this.pendientesTickets.push(ticket)

        this.grabarArchivo();
        return `Ticket ${this.ultimoTicket}`;
    }

    getUltimoTurno() {
        
        return `Ticket ${this.ultimoTicket}`;
    }

    atenderTicket(escritorio){

        if(this.pendientesTickets.length === 0){
            return "No hay tickets"
        }
        let numeroTicket = this.pendientesTickets[0].numero;
        this.pendientesTickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4Tickets.unshift(atenderTicket);

        if (this.ultimos4Tickets.length > 4) {
            this.ultimos4Tickets.splice(-1,1);
        }
        console.log('Ultimos 4 tickets:::');
        console.log(this.ultimos4Tickets);

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimoTicket = 0;
        this.pendientesTickets = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimoTicket: this.ultimoTicket,
            hoy: this.hoy,
            tickets: this.pendientesTickets,
            ultimos4: this.ultimos4Tickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }



}

module.exports = { TicketControl }