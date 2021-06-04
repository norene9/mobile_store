const multer=require('multer');
const express=require('express');
const bcrypt=require('bcrypt');
const bcryptSalt = 10;
const router=express.Router();

var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json())
//tables
const{Mobile, Marque,User}=require('../sequlize')

//set storage engine
const storage=multer.diskStorage({
    destination:'/uploads',
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
})
//call login route

//Init upload
//-----------upload resturant's images----------------//
const upload=multer({
    storage:storage
}).single('image');

router.get('/index',async function(req,res,next){
   try{
    var mobiles=await Mobile.findAll(); 
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
         var Nom=req.body.Nom
         var Prenom=req.body.Prenom
         var adress=req.body.adress
         var phone=req.body.phone
         const salt = bcrypt.genSaltSync(bcryptSalt);
         const hashPass = bcrypt.hashSync(password, salt)
         user=await User.create({Nom:Nom,Prenom:Prenom,Email:email,adress:adress,
            password:hashPass,phone:phone,TypeUserId:2});
        res.redirect('login')

        }catch(err){
            next(err)
        }

     
 }  )
 //Admin routes
 router.get("/add-product",async(req,res)=>{
    var marques= await Marque.findAll()
     res.render("Admin/add-product",{marques});
 })
 router.post("Ajouter",async function(req,res,next){
    
     var mobiles=req.body.produit;
     var prix=req.body.prix;
     var filepath=req.body.filepath;
     var marque=req.body.marque;
     var quantitiy=req.body.quantity;
     ///trouver les marque
     var marque_trouve= await Marque.findOne({where:{id:marque}})
     //create product
     await mobile.create({mobile:mobiles,prix:prix,filepath:filepath,marqueId:marque.id,quantitiy:quantitiy})
res.redirect("Ajouter")
 })

router.get('/products',async function(req,res,next){
    try{
        var mobiles= await Mobile.findAll();
        var marques= await Marque.findAll()
        res.render("Admin/products",{marques,mobiles})
    }catch(err){
     next(err)
    }
 }
 
 )
module.exports=router;