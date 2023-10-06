module.exports = {
    connect: function (io, PORT) {
        let rooms = ['room1', 'room2', 'room3'];
        const users = {};
        //const chat = io.of('/chat');
        io.on('connect', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);
            io.emit('userid', socket.id);
            io.to(socket.id).emit('ownid', socket.id);

            socket.on('roomList', () => {
                io.emit('roomList', JSON.stringify(rooms));
            })

            socket.on('message', (message) => {
                //console.log('message recieved');
                const user = users[socket.id];
                if(user) {
                    io.to(user.room).emit('message', message)
                }
                //io.emit('message', message);
            });

            socket.on('peerID', (message) => {
                io.emit('peerID', message);
                console.log('peerID', message);
            })

            socket.on('disconnect', () => {
                //io.emit("disconnect1");
                const user = users[socket.id];
                if(user) {
                    delete users[socket.id];
                }
                console.log("Client Disconnected");
            });

            socket.on("joinRoom", (room) => {
                if(rooms.includes(room)) {
                    users[socket.id] = {room};
                    socket.join(room);
                    socket.to(room).emit('message', "A new user has joined the room");
                    socket.emit('message', "Welcome to the chat room");
                }
            });

            socket.on('leaveRoom', (room) => {
                socket.leave(room);
                delete users[socket.id];
                socket.to(room).emit('message', "A user has left the room");
            })

        });
    }
}