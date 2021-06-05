var express=require("express");
var path=require("path");
let bodyParser = require('body-parser');
var session=require('express-session');
var sequelize=require('./sequlize')
var app=express();
var Passport=require('passport').Passport, passport=new Passport();
var userRouter=require('./routes/passport')
app.use('/passport',userRouter);

cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())
// Express and Passport Session
var session = require('express-session');
app.use(session({secret: "-- ENTER CUSTOM SESSION SECRET --"}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/upload'));
var generalRouter=require('./routes/general')
var authRoutes=require("./routes/auth")(passport)
require("./routes/passport")(passport)
app.use(express.urlencoded({ extended: true}))
app.use(passport.initialize())
app.use('/',authRoutes)
var userRouter=require('./routes/passport')
app.use('/passport',userRouter);

var MySQlStore=require('express-mysql-session')(session);
var options={
    host:'localhost',
    user:'root',
    password:'root',
    database:'mobile',
   
  }
 
app.set('view engine', 'ejs')
app.use('/',generalRouter)
app.get("/index",function(req,res){
    res.sendFile(path.join(__dirname,'views/index.html'));
    
    console.log("aidfdj");
})

app.listen(8080);
module.exports=app;