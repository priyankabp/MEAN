var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/mean',function(err){
    if(err){
        console.log('Not connected to MongoDB '+err);
    }else{
        console.log('Successfully Connected..');
    }
});

app.listen(port, function(){
    console.log("Running the server on port " + port);
});

