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

        // Bắt sự kiện khi nhận được dữ liệu từ máy chủ
        this.socket.on('data', (data) => {
            console.log('Received data:', data);
        });

        // Gửi dữ liệu lên máy chủ
        this.socket.emit('clientData', { message: 'Hello server!' });
    },

    // Các phương thức khác của Cocos Creator
});
