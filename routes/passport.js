var passport = require('passport');
const bcrypt=require('bcrypt')
var localStrategy = require('passport-local').Strategy;
const { User } = require('../sequlize');


module.exports = function (passport) {
     passport.serializeUser(function (user,done) {
        done(null,user);
     });
     passport.deserializeUser(function (user,done) {
         done(null,user);
     });
     passport.use(new localStrategy( async function (username,password,done) {
     console.log(username)
     console.log(password)
      const user = await User.findOne({where: {
              email:username 
          }});
          if (!bcrypt.compareSync(password, user.password)) {
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
