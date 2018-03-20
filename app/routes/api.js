var User = require('../models/user');

module.exports = function(router) {
    //http://localhost:8080/users
    router.post('/users', function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if(res.body.username == null ||res.body.username == ''||res.body.password == null||res.body.password == ''||res.body.email == null || res.body.email == ''){
            res.send('Insure username, email, password were provided');
        }else{
            user.save(function(err){
                if(err){
                    res.send("Username or email already exits");
                }else{
                    res.send('User Created');
                }
            });
        }
    });
    
    return router;
}