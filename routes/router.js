var express=require("express");

var router=express.Router();
router.get('/about',function(req,res){
    console.log('envoie des infos');
}) ;
module.exports = router;