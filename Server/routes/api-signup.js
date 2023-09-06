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
}