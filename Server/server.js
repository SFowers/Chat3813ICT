const express = require('express');
const app = express();
const { PeerServer } = require('peer');
const { MongoClient, ObjectId } = require('mongodb');
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

//const http = require('http').Server(app);
const http = require('http').Server(sslOptions, app);

const https = require('https');


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

        // USER ROUTES
        require('./routes/api-signup.js')(app, db);
        require('./routes/api-login.js')(app, db);
        require('./routes/api-updateuser.js')(app, db, ObjectId);
        require('./routes/api-getusers.js')(app, db);
        require('./routes/api-deleteuser.js')(app, db, ObjectId);
        require('./routes/api-upload.js')(app, formidable, path, fs);

        // GROUP ROUTES
        require('./routes/api-creategroup.js')(app, db);
        require('./routes/api-getgroups.js')(app, db);
        require('./routes/api-deletegroup.js')(app, db, ObjectId);
        require('./routes/api-updategroup.js')(app, db, ObjectId);

    } catch(e) {
        console.log(e);
    }
}main().catch(console.error);

//require('./routes/api-adminapplication.js')(app, fs);
//require('./routes/api-getapplications.js')(app, fs);

sockets.connect(io, PORT);
server.listen(http, PORT);

PeerServer({
    port: PORT2,
    path: '/',
    ssl: sslOptions
});
console.log(`Starting SSL PeerServer at: ${PORT}`);

module.exports = {
    app: app,
    http: http
};