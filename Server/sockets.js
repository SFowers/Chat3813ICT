module.exports = {
    connect: function (io, PORT) {
        let rooms = [];
        const users = {};
        //const chat = io.of('/chat');
        io.on('connect', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id);
            io.emit('userid', socket.id);
            io.to(socket.id).emit('ownid', socket.id);

            socket.on('roomList', () => {
                io.emit('roomList', JSON.stringify(rooms));
            })

            socket.on('userCount', (room) => {
                users[socket.id] = {room};
                io.emit('userCount', );
            })

            socket.on('message', (message) => {
                console.log(JSON.stringify(message));
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
                    socket.to(room).emit('message', {message:"A New User has joined " + room, date: new Date(), id:1, username:'', avatar:''});
                    socket.emit('message', {message:"Welcome to " + room, date: new Date(), id:1, username:'', avatar:''});
                } else {
                    rooms.push(room);
                    users[socket.id] = {room};
                    socket.join(room);
                    socket.to(room).emit('message', {message:"A New User has joined " + room, date: new Date(), id:1, username:'', avatar:''});
                    socket.emit('message', {message:"Welcome to " + room, date: new Date(), id:1, username:'', avatar:''});
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