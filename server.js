const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected',() => {
    console.log('Connected to database' + config.database);
});

// On Error
mongoose.connection.on('error',(err) => {
    console.log('Not Connected to database' + err);
});

const app = express();

const users = require("./routes/users");

//PORT Number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Set static Folder
app.use(express.static(path.join(__dirname,'public')));

app.use(morgan('dev'));
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

//Start Server
app.listen(port, function(){
    console.log("Running the server on port " + port);
});

