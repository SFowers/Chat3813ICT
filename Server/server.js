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

const sockets = require('./sockets.js');
const server = require('./listen.js');

require('./routes/api-login.js')(app, path, fs);
require('./routes/api-signup.js')(app, path, fs);
require('./routes/api-updateuser.js')(app, path, fs);
require('./routes/api-creategroup.js')(app, path, fs);
require('./routes/api-getgroups.js')(app, fs);
require('./routes/api-deleteuser.js')(app, fs);
require('./routes/api-adminapplication.js')(app, fs);
require('./routes/api-updategroup.js')(app, fs);

sockets.connect(io, PORT);
server.listen(http, PORT)

