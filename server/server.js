// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('setUsername', (username) => {
        console.log(`User ${username} connected`);
    });

    socket.on('chatMessage', (data) => {
        console.log(`Received message from ${data.username}: ${data.message}`);
        io.emit('chatMessage', { username: data.username, message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7456'); // Thay thế URL của máy chủ Cocos Creator của bạn
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
