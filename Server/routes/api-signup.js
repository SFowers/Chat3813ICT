module.exports = function (app, db) {
    app.post("/api/signup", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log(req.body);
        const user = req.body;
        //{"username":"super","email":"super@admin.com","pwd":"123","permission":"super admin","id":1,"avatar":"bailey.jpg"}

        user.permission = "user";
        user.avatar = "";

        const collection = db.collection('users');
        let u = await collection.findOne({'username':user.username});
        if(!u) { //if u doesn't already exist
            try {
                collection.insertOne(user);
                res.send({success: true, err: null})
            } catch (e) {
                console.log(e);
                res.send({success: false, err:"unable to add user"});
            }
        } else {
            console.log('Duplicate User');
            res.send({success: false, err:"duplicate user"});
        }
    })
}

/* OLD
app.post("/api/signup", function (req, res) {
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
                
                for(let i = 0; i < users.length; i++) {
                    if(users[i].username == req.body.username) {
                        console.log("Username already exists");
                        return res.sendStatus(400);
                    }
                }

                users.push({"username": req.body.username,
                                    "email": req.body.email, 
                                    "pwd": req.body.pwd,
                                    "permission": "user",
                                    "avatar": "",
                                    "id": users.length + 1});

                fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send({id: users.length});
                    }
                })
            }catch(err){
              console.log("Error parsing the user data on sign up" + err);
            }
        })
    });

*/