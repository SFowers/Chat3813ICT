const express = require('express');
const app = express();
const http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
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

const mongoURL = 'mongodb://127.0.0.1:27017/';
const dbName = 'mydb';

MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB server');

    const db = client.db(dbName);

    //require('./routes/add.js')(app, db);
    //require('./routes/read.js')(app, db);
    //require('./routes/update.js')(app, db, ObjectID);
    //require('./routes/remove.js')(app, db, ObjectID);

    app.listen(port, () => {
        console.log('App is listening on port ' + port);
    });
});


require('./routes/api-login.js')(app, path, fs);
require('./routes/api-signup.js')(app, path, fs);
require('./routes/api-updateuser.js')(app, path, fs);
require('./routes/api-creategroup.js')(app, path, fs);
require('./routes/api-getgroups.js')(app, fs);
require('./routes/api-deletegroup.js')(app, fs);
require('./routes/api-deleteuser.js')(app, fs);
require('./routes/api-adminapplication.js')(app, fs);
require('./routes/api-getapplications.js')(app, fs);
require('./routes/api-updategroup.js')(app, fs);
require('./routes/api-getusers.js')(app, fs);

sockets.connect(io, PORT);
server.listen(http, PORT)

