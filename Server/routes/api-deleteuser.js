module.exports = function (app, fs) {
    
    app.post("/api/deleteuser", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/users.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                users = JSON.parse(data);
                
                for(let i = 0; i < users.length; i++) {
                    if(users[i].id == req.body.user.id) {
                        users.splice(i, 1);
                    }
                }

                fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("User deleted successfully\n");
                        res.send("User deleted successfully");
                    }
                })
            }catch(err){
              console.log("Error parsing the user data on account update" + err);
            }
        })
    })
}