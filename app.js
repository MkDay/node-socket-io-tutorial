// https://www.youtube.com/watch?v=FvArk8-qgCk&list=PL-tV1f9Asb4giyEr2-LlLrsEHTkf0Geyr&index=5

const express = require('express');
const socketIO = require('socket.io');

const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

// static files
app.use(express.static('public'));

// setup socket.io connection
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('socket connection has made', socket.id);

    socket.on('chat', (data) => {
        io.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    }); 

});