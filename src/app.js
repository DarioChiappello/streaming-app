const express = require('express');
const app = express();


// crear servidor http
const http = require('http').Server(app);

//generar comunicacion con socket.io
const io = require('socket.io')(http);

//routes
app.use(require('./routes/streaming-app.routes'));

//donde carga htmls
app.use(express.static(__dirname + "/public"));


//generar canal de conexion
io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        //emitir evento a todos los sockets conectados
        socket.broadcast.emit('stream', image);
    })
})

module.exports = http;