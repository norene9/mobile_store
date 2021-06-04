var express = require('express');
var router = express.Router();

var express  = require('express');
    
var passport=require("./passport")
    module.exports = function (passport) {
        
        router.post('/login' , passport.authenticate('local',{
                    failureRedirect :"/login",
                                successRedirect :"/index",
                                        }));
                                            return router;
                                            }