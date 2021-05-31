var express=require("express");
var path=require("path");
var session=require('express-session');
const router = require("./routes/router");
var sequelize=require('./sequlize')
var app=express();
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/uploads'));
var generalRouter=require('./routes/general')

var MySQlStore=require('express-mysql-session')(session);
var options={
    host:'localhost',
    user:'root',
    password:'root',
    database:'mobile',
   
  }
  var sessionStore=new MySQlStore(options);
app.use(session({
  secret:'session_cookie_secret',
  store:sessionStore,
  resave:false,
  saveUninitialized:true
}))
app.set('view engine', 'ejs')
app.use('/',generalRouter)
app.get("/index",function(req,res){
    res.sendFile(path.join(__dirname,'views/index.html'));
    
    console.log("aidfdj");
})

app.listen(8080);
module.exports=app;