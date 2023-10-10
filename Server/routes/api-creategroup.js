module.exports = function (app, fs) {
    
    app.post("/api/creategroup", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/groups.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                console.log("Create Groups");
                chatgroups = JSON.parse(data);
                
                for(let i = 0; i < chatgroups.length; i++) {
                    if(chatgroups[i].groupname == req.body.groupname) {
                        console.log("Group Name already exists");
                        return res.sendStatus(400);
                    }
                }

                newgroup = {}
                newgroup.groupname = req.body.groupname;
                newgroup.admins = [req.body.username];
                newgroup.users = [req.body.username];
                newgroup.channels = [];
                newgroup.applied = [];
                newgroup.id = chatgroups.length + 1;

                chatgroups.push(newgroup);

                fs.writeFile("data/groups.json", JSON.stringify(chatgroups), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send({group: newgroup});
                    }
                })
            }catch(err){
              console.log("Error parsing on group creation" + err);
            }
        })
    });
}