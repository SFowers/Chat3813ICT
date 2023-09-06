module.exports = function (app, path, fs) {
    
    app.post("/api/auth", function (req, res) {
        if(!req.body) {
            return res.sendStatus(400);
        }
        fs.readFile('data/users.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }
            try{
                console.log(req.body);
                //console.log(data);
                let users = JSON.parse(data);
                //console.log(users);
                //users = users.people;
              
                var customer = {};
                customer.id=0;
                customer.email = '';
                customer.username = '';
                customer.permission = '';
    
                for (let i = 0; i < users.length; i++) {
                    console.log(users[i].email);
                    if ((req.body.email == users[i].email || req.body.email == users[i].username) && req.body.pwd == users[i].pwd) {
                        console.log(users[i].username);
                        customer.id = users[i].id;
                        customer.email = users[i].email;
                        customer.username = users[i].username;
                        customer.pwd = "";
                        customer.permission = users[i].permission;
                        //res.send(customer);
                    }
                }
                res.send(customer);
            }catch(err){
              console.log("Error parsing the userdata at login. " + err);
            }
        })
    });
}