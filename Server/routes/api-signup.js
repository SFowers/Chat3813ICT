module.exports = function (app, path, fs) {
    
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
                
                for(let i = 0; i < users.people.length; i++) {
                    if(users.people[i].username == req.body.username) {
                        console.log("Username already exists");
                        return res.sendStatus(400);
                    }
                }

                users.people.push({"username": req.body.username,
                                    "email": req.body.email, 
                                    "password": req.body.password,
                                    "permission": "user",
                                    "roles": [],
                                    "groups": [],
                                    "id": users.people.length + 1});

                fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send({id: users.people.length});
                    }
                })
            }catch(err){
              console.log("Error parsing the user data on sign up" + err);
            }
        })
    });
}