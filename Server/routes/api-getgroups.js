module.exports = function (app, fs) {
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
}