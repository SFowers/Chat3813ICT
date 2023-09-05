module.exports = function (app, fs) {
    
    app.post("/api/adminapplication", function (req, res) {
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
                //console.log("Add to applications");
                applications = JSON.parse(data);
                
                for(let i = 0; i < applications.length; i++) {
                    if(applications[i].username == req.body.username && 
                        applications[i].permission == req.body.permission) {
                            console.log("User has already applied for this permission");
                            return res.send({m:"User has already applied for " + req.body.permission});
                        }
                }
                applications.push({"username": req.body.username, 
                                    "permission": req.body.permission});

                fs.writeFile("data/applications.json", JSON.stringify(applications), (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    } else {
                        console.log("Application File written successfully\n");
                        res.send({m:"Application Made"});
                    }
                })
            }catch(err){
              console.log("Error parsing on user applications" + err);
            }
        })
    });
}