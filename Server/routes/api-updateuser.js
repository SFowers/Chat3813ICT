module.exports = function (app, path, fs) {
    
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
                
                for(let i = 0; i < users.people.length; i++) {
                    if(users.people[i].username == req.body.username && users.people[i].pwd == req.body.pwd) {
                        users.people[i].username = req.body.username;
                        users.people[i].email = req.body.email;
                        users.people[i].pwd = req.body.pwd;
                    }
                }

                fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                    }
                })
            }catch(err){
              console.log("Error parsing the user data on account update" + err);
            }
        })
    });
}