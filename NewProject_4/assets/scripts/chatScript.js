const io = require('socket.io-client');

cc.Class({
    extends: cc.Component,

    onLoad() {
        // Kết nối với máy chủ Socket.IO
        this.socket = io('http://localhost:8080');
    
    
        // Bắt sự kiện khi kết nối thành công
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
    },
    sendDataUsername(username){
        //socket.emit('userData',username);
        cc.log('this')
    }
});


