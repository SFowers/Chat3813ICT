module.exports = function (app, db) {
    app.post("/api/creategroup", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        console.log(req.body);
        const group = req.body;
        //{"groupname":"supergroup","admins":["super"],"users":["super","sean"],"channels":["chan1","chan2","cool channel","fourth chan","test","a","b","c","d"],"applied":[],"id":1}

        const collection = db.collection('groups');
        let g = await collection.findOne({'groupname': group.groupname});
        if(!g) { //if g doesn't already exist
            try {
                newgroup = {}
                newgroup.groupname = group.groupname;
                newgroup.admins = [group.username];
                newgroup.users = [group.username];
                newgroup.channels = [];
                newgroup.applied = [];
                collection.insertOne(newgroup);
                console.log('Group Successfully Created.');
                let ng = await collection.findOne({'groupname': group.groupname})
                //console.log('ng:',ng);
                ng.id = ng._id;
                return res.send({group: ng});
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        } else {
            res.send({id: 0, groupname: "duplicate group", admins:[], users:[], channels:[], applied:[]});
        }
    })
}

/* OLD
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
*/