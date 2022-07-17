var io = require('socket.io-client');
var socket = io.connect("http://localhost:3000/", {
    reconnection: true
});

socket.on('connect', function () {
    console.log('Connected to the Driver');
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data);
        const buf = Buffer.from(data, 'ascii');
        console.log('Received[0x' + buf.toString('hex') + ']' + ' ' +'is' + ' ' + data);
        socket.emit('serverEvent', "Command received at the Instrument:'" + data + "'");
    });
});