module.exports = function (app, db, ObjectId) {
    app.post("/api/updateuser", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        const user = req.body.user;
        var _id = new ObjectId(user.id);

        const collection = db.collection('users');
        let u = await collection.findOne({'_id': _id});
        if(u) {
            collection.updateOne({'_id': _id}, 
            {$set:{email: user.email, username: user.username, avatar: user.avatar}});

            let result = await collection.findOne({'_id': _id});
            result.pwd = '';
            result.id = result._id;
            res.send(result);
        } else {
            res.sendStatus(200);
        }
    })
}

/* OLD
app.post("/api/updateuser", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/users.json','utf8',(err,users)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                console.log(req.body.username);
                users = JSON.parse(users);

                user = {};
                user.id = 0;
                user.username = '';
                user.email = '';
                user.permission = '';
                user.pwd = '';
                user.avatar = '';
                
                for(let i = 0; i < users.length; i++) {
                    if(users[i].id == req.body.user.id) {
                        users[i].username = req.body.user.username;
                        users[i].email = req.body.user.email;
                        users[i].permission = req.body.user.permission;
                        users[i].avatar = req.body.user.avatar;

                        user.id = users[i].id;
                        user.username = users[i].username;
                        user.email = users[i].email;
                        user.permission = users[i].permission;
                        user.avatar = users[i].avatar;
                    }
                }

                fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send(user);
                    }
                })
            }catch(err){
              console.log("Error parsing the user data on account update" + err);
            }
        })
    });
*/