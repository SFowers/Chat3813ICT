module.exports = function (app, db, ObjectId) {
    app.post("/api/deletegroup", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        const group = req.body.group;
        var _id = new ObjectId(group.id);

        const collection = db.collection('groups');
        let g = await collection.findOne({'_id': _id});
        if(g) {
            collection.deleteOne({'_id': _id}, (err, docs) => {
                if(err) {
                    res.sendStatus(err);
                } else {
                    console.log("Group deleted successfully\n");
                    res.send("Group deleted successfully");
                }
            })
        } else {
            res.sendStatus(200);
        }
    })
}

/* OLD
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

*/