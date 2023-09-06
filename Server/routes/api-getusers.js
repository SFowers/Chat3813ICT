module.exports = function (app, fs) {
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
}