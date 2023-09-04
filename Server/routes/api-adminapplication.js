module.exports = function (app, path, fs) {
    
    app.post("/api/adminapplication", function (req, res) {
        console.log("at appl");
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
                console.log("Add to applications");
                applications = JSON.parse(data);
                
                applications.push(req.body.permission, req.body.username);

                fs.writeFile("data/applications.json", JSON.stringify(applications), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("File written successfully\n");
                        res.send({id: applications.length});
                    }
                })
            }catch(err){
              console.log("Error parsing on user applications" + err);
            }
        })
    });
}