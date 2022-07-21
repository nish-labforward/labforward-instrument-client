var io = require('socket.io-client');
var socket = io.connect("http://localhost:3000/", {
    reconnection: true
});
var crypto = require('crypto')

crypto.getHashes() // [ 'dsa', 'dsa-sha', ..., 'md5', ... ]

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

//sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  
socket.on("connect_error", (err) => {
    console.log(`Server Not Connected..`);
  });

socket.on('connect', function () {

    console.log('Connected to the Driver !!\n');
    socket.on('clientEvent',(data, checksum_value_of_data) => {
        verify_checksum_of_data = checksum(data)

        if (checksum_value_of_data === verify_checksum_of_data){
            const buf = Buffer.from(data, 'ascii');
            console.log('Received[0x' + buf.toString('hex') + ']' + ' ' +'is' + ' ' + data);
            sleep(3000).then(() => {
                socket.emit('serverEvent', "Hey! Command received at the Instrument:'" + data + "'");
            });
        }
    });

    socket.on("disconnect", (reason) => {
        console.log('Connection closed from server')
      });

});

