const multer=require('multer');
const express=require('express');
const router=express.Router();
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json())
//tables
const{mobile}=require('../sequlize')
const{User}=require('../sequlize')
//set storage engine
const storage=multer.diskStorage({
    destination:'/uploads',
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
})
//Init upload
//-----------upload resturant's images----------------//
const upload=multer({
    storage:storage
}).single('image');

router.get('/index',async function(req,res,next){
   try{
    var mobiles=await mobile.findAll(); 
    res.render('visiteur/index',{mobiles})
   }catch(err){
    next(err)
   }
}

)
router.get('/login',async function(req,res,next){
    try{
     
     res.render('login')
    }catch(err){
     next(err)
    }
 }
 
 )
 router.get('/sign_in',async function(req,res,next){
    try{
     
     res.render('sign_in')
    }catch(err){
     next(err)
    }
 }
 
 );
 ////----------Acheter--------------------------//
 router.get('/buy',async function(req,res,next){
    try{
     
     res.render('user/buy')
    }catch(err){
     next(err)
    }
 }
 
 )
 //-------------------Sign_Up-----------//
 router.post('/Signin',urlencodedParser,async function(req,res,next){
     try{
         var password=req.body.password
         var email=req.body.email
         var Nom=req.body.nom
         var Prenom=req.body.prenom
         var adress=req.body.adress
         var phone=req.body.phone
        
         user=await User.create({Nom:Nom,Prenom:Prenom,Email:email,adress:adress,
            password:password,phone:phone,TypeUserId:2});
        res.redirect('login')

        }catch(err){
            next(err)
        }

     
 }  )

module.exports=router;