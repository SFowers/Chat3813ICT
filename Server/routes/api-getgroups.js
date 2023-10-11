module.exports = function (app, db) {
    app.get("/api/getgroups", async (req, res) => {
        if(!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('groups');
        let groups = await collection.find({}).toArray();
        for(let i = 0; i < groups.length; i++) {
            groups[i].id = groups[i]._id;
        }
        res.send(groups);
    })
}

/* OLD
app.get('/api/getgroups', function (req, res) {
        fs.readFile('data/groups.json', 'utf8', (err, data)=>{
            if (err) {
                console.error(err);
                return
            }
            try {
                //console.log("Get Groups" + JSON.stringify(data));
                res.send(JSON.stringify(data));
            } catch (err) {
                console.log("Error getting list of groups");
            }
        })
    });
*/