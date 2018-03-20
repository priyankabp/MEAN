var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/test_mean',function(err){
    if(err){
        console.log('Not connected to MongoDB '+err);
    }else{
        console.log('Successfully Connected..');
    }
});

//http://localhost:8080/users
app.post('/users', function(req,res){
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

app.listen(port, function(){
    console.log("Running the server on port " + port);
});

