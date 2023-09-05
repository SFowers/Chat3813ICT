module.exports = function (app, fs) {
    
    app.get("/api/getapplications", function (req, res) {
        if(!req.body) {
            console.log('error');
            return res.sendStatus(400);
        }
        fs.readFile('data/applications.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                res.send(JSON.stringify(data));
            }catch(err){
              console.log("Error parsing on user applications" + err);
            }
        })
    });
}