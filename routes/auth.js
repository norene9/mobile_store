var express = require('express');
var router = express.Router();
const { User } = require('../sequlize');

var express  = require('express'),
    Recaptcha = require('recaptcha-v2').Recaptcha;

var PUBLIC_KEY  = '6Lcu0u4ZAAAAAFjeC9NDOb4qpSBSEiEIVf-BPpSr',
    PRIVATE_KEY = '6Lcu0u4ZAAAAADQ4ZUZxrLdZ2az6r6cg9b_Yo2j6';
    router.get('/login', function(req, res) {
      var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
  
      res.render('login', {
          layout: false,
          locals: {
              recaptcha_form: recaptcha.toHTML()
          }
      });
  });
  module.exports=function(passport){
    router.post('/login', function(req, res,next) {
      var data = {
      remoteip:  req.connection.remoteAddress,
      response:  req.param("g-recaptcha-response"),
      secret: PRIVATE_KEY
      };
      var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);
  
      recaptcha.verify(function(success, error_code) {
          if (success) {
          return next()
          }
          else {
              // Redisplay the form.
              res.render('/login', {
                  layout: false,
                  locals: {
                      recaptcha_form: recaptcha.toHTML()
                  }
              });
          }
      });
  },passport.authenticate('local',{
    failureRedirect :"/login",
                successRedirect :"/user",
                        }));
    return router; 
  }