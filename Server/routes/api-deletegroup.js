module.exports = function (app, fs) {
    
    app.post("/api/deletegroup", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/groups.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                groups = JSON.parse(data);
                
                for(let i = 0; i < groups.length; i++) {
                    if(groups[i].id == req.body.group.id) {
                        groups.splice(i, 1);
                    }
                }

                fs.writeFile("data/groups.json", JSON.stringify(groups), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("Group deleted successfully\n");
                        res.send("Group Deleted");
                    }
                })
            }catch(err){
              console.log("Error parsing the user data on account update" + err);
            }
        })
    })
}