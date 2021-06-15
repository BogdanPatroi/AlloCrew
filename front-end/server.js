const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

io.on('connection', (socket) => {
  socket.on('change-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send-message', (data) => {
    io.in(data.roomId).emit('display-message', data);
  });
});
