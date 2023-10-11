module.exports = function (app, db, ObjectId) {
    app.post("/api/updategroup", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        const group = req.body.group;
        var _id = new ObjectId(group.id);

        const collection = db.collection('groups');
        let g = await collection.findOne({'_id': _id});
        if(g) {
            collection.updateOne({'_id': _id}, 
            {$set:{groupname: group.groupname, admins: group.admins, 
                users: group.users, channels: group.channels, applied: group.applied}});

            let result = await collection.findOne({'_id': _id});
            result.id = result._id;
            res.send(result);
        } else {
            res.sendStatus(200);
        }
    })
}

/* OLD
app.post('/api/updategroup', function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/groups.json', 'utf8', (err, data)=>{
            if (err) {
                console.error(err);
                return
            }
            try {
                console.log("Update Groups");
                chatgroups = JSON.parse(data);

                group = {};
                
                for(let i = 0; i < chatgroups.length; i++) {
                    if(chatgroups[i].id == req.body.group.id) {
                        chatgroups[i].groupname = req.body.group.groupname;
                        chatgroups[i].admins = req.body.group.admins;
                        chatgroups[i].users = req.body.group.users;
                        chatgroups[i].channels = req.body.group.channels;
                        chatgroups[i].applied = req.body.group.applied;
                        group = chatgroups[i];
                    }
                }

                fs.writeFile("data/groups.json", JSON.stringify(chatgroups), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send({group});
                    }
                })
            } catch (err) {
                console.log("Error getting list of groups");
            }
        })
    });

*/