module.exports = function (app, path, fs) {
    
    app.post("/api/signup", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/users.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
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
                                    "role": "user",
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
              console.log("Error parsing the user data on sign up");
            }
        })
    });
}