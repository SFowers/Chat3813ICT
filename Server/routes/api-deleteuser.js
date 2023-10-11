module.exports = function (app, db, ObjectId) {
    app.post("/api/deleteuser", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        const user = req.body.user;
        var _id = new ObjectId(user.id);

        //console.log('_ID: ',_id);

        const collection = db.collection('users');
        let u = await collection.findOne({'_id': _id});
        if(u) {
            console.log('user found');
            let result = await collection.deleteOne({'_id': _id});
            //console.log(result);
            if(result.deletedCount === 1) {
                console.log("User deleted successfully\n");
                return res.send({msg: "User deleted successfully"});
            } else {
                res.sendStatus(500);
            }
        } else {
            console.log('User Not Found');
            res.sendStatus(404);
        }
    })
    
}

/*
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

*/