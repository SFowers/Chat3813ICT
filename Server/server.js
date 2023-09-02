const express = require('express');
const app = express();
const http = require('http').Server(app);

const cors = require('cors');

const PORT = 3000;
const path = require('path');
var fs = require('fs');

app.use(cors());
app.use(express.json());

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

//const sockets = require('./sockets.js');

let server = http.listen(PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log("Server listening on: " + host + " port: " + port + "\nStarted at: " + n + ':' + m);
});

require('./routes/api-login.js')(app, path, fs);
require('./routes/api-signup.js')(app, path, fs);

//sockets.connect(io, PORT);

