const express = require('express');
const app = express();
const { PeerServer } = require('peer');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const formidable = require('formidable');

const PORT = 3000;
const PORT2 = 3001;
const ANGULAR_URL = "http://localhost:4200";
const MONGODB_URL = "mongodb://127.0.0.1:27017";

const path = require('path');
var fs = require('fs');

app.use(cors());
app.use(express.json());

const sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const http = require('http').Server(sslOptions, app);
//const http = require('http').Server(app);

app.use('/images',express.static(path.join(__dirname, './userimages')));

const io = require('socket.io')(http, {
    cors: {
        origin: ANGULAR_URL,
        methods: ["GET", "POST"],
    }
});

const sockets = require('./sockets.js');
const server = require('./listen.js');

const uri = MONGODB_URL;
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        let db = client.db("Chat3813");
        console.log("DB Connected");
        //users = await db.collection("users").find({}).toArray();
        //users = await db.collection("users");
        //users.insertOne({user: "Sean", groups: ['g1']});

    } catch(e) {
        console.log(e);
    }
}main().catch(console.error);

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
require('./routes/api-upload.js')(app, formidable, path, fs);

sockets.connect(io, PORT);
server.listen(http, PORT);

PeerServer({
    port: PORT2,
    path: '/',
    ssl: sslOptions
});
console.log(`Starting SSL PeerServer at: ${PORT}`);

/*
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
*/