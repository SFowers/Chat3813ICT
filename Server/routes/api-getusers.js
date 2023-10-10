module.exports = function (app, db) {
    app.get("/api/getusers", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('users');
        let users = await collection.find({}).toArray();
        for(let i = 0; i < users.length; i++) {
            users[i].pwd = '';
            users[i].id = users[i]._id;
        }
        res.send(users);
    })
}

/* OLD
app.get('/api/getusers', function (req, res) {
        fs.readFile('data/users.json', 'utf8', (err, data)=>{
            if (err) {
                console.error(err);
                return
            }
            try {
                let users = JSON.parse(data);
                for(let i = 0; i < users.length; i++) {
                    users[i].password = '';
                }
                res.send(JSON.stringify(users));
            } catch (err) {
                console.log("Error getting list of users");
            }
        })
    });
*/