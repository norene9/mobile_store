var passport = require('passport');
const bcrypt=require('bcrypt')
var localStrategy = require('passport-local').Strategy;
const { User } = require('../sequlize');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {
     passport.serializeUser(function (user,done) {
        done(null,user);
     });
     passport.deserializeUser(function (user,done) {
         done(null,user);
     });
     passport.use(new localStrategy( async function (email,password,done) {
     console.log(email)
     console.log(password)
      const user = await User.findOne({where: {
              email:email 
          }});
          if (!bcrypt.compareSync(password, user.password)) {
            console.log('incorrect pwd')
            return done(null, false, { message: "Incorrect password" });
          }
        
      else if(user) {
         console.log(user)
          done( null,user);
         
      } else {
        console.log('not found')
          done(null,false);
      }
     }));
};
