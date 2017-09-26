var express = require('express');
var app = express();

//For authentication
var passport = require('passport');
var session = require('express-session');

var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//For body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//For passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());

var env = require('dotenv').load();
var cors = require('./cors.js');
app.use(cors.permission);
var models = require("./app/models");
console.log(models.user)
require("./auth.js")(passport)
var routes = require('./app/routes/auth.js')(app, models.user, models.user_role)

models.sequelize.sync().then(function(){
    console.log("database connected!!!!!!!!!!")
}).catch(function(err){
    console.log(err+" Something went wrong.")
});

app.get('/', function(req, res){
    res.send("Welcome");
});

app.listen(5000, function(err){
     if(!err){
        console.log("server is running");
     } else {
         console.log(err);
     }
});
