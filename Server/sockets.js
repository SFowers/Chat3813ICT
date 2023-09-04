module.exports = {
    connect: function (io, PORT) {
        io.on('connect', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);

            socket.on('message', (message) => {
                console.log('message recieved');
                io.emit('message', message);
            });
            socket.on('disconnect', () => {
                io.emit("disconnect1");
                console.log("Client Disconnected");
            });
        });
    }
}