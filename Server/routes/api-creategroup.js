module.exports = function (app, path, fs) {
    
    app.post("/api/creategroup", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/groups.json','utf8',(err,groups)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                console.log("Create Groups");
                chatgroups = JSON.parse(groups);
                
                for(let i = 0; i < chatgroups.groups.length; i++) {
                    if(chatgroups.groups[i].groupname == req.body.username) {
                        console.log("Group Name already exists");
                        return res.sendStatus(400);
                    }
                }

                chatgroups.groups.push({"groupname": req.body.groupname, 
                                    "admins": [req.body.admin],
                                    "users": [req.body.admin],
                                    "applied": [],
                                    "id": chatgroups.groups.length + 1});

                fs.writeFile("data/groups.json", JSON.stringify(chatgroups), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send({id: chatgroups.groups.length});
                    }
                })
            }catch(err){
              console.log("Error parsing on group creation" + err);
            }
        })
    });
}