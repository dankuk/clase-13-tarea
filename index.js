const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require("socket.io");

app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
})
const io = SocketIO(server);

io.on("connection", (socket) => {
    console.log("nueva conexion");
    console.log("id conexion: " + socket.id);
    socket.on('chat:nuevoMensaje', (mensaje) => {
        console.log(mensaje);
        io.sockets.emit('chat:MensajeParaTodos', mensaje);
    })

    socket.on('chat:escribiendo', (email) => {
        socket.broadcast.emit('chat:escribiendo', email);
    })
})