module.exports = {
    listen: function(app, PORT){
        app.listen(PORT, () => {
            //let host = server.address().address;
            var d = new Date();
            var n = d.getHours();
            var m = d.getMinutes();
            console.log("Server started on port: " + PORT + 
                        "\nStarted at: " + n + ':' + m);
        });
        
    }
}