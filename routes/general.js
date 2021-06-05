const multer=require('multer');

const path = require('path');
const express=require('express');
const bcrypt=require('bcrypt');
const bcryptSalt = 10;
const router=express.Router();

var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json())
//tables
const{Mobile, Marque,User,Command}=require('../sequlize')
//================login Function=================//
var loggedin=function(req,res,next){
    
    if(req.isAuthenticated()){
        console.log('fdghjkl;kjhgfghjkjhgfdghjhgfdghjhgfdghfdfghjgf')  
   next()
  
    }else{
        console.log('frghjyhtfrgdftgyhjhgfdrfghgfdfgfdfghjkjhftrghgj')
      res.redirect('/login')
    }
  }
 
//set storage engine
const storage=multer.diskStorage({
    destination:'./upload',
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
}) 
//call login route

//Init upload
//-----------upload resturant's images----------------//
const upload=multer({
    storage:storage
}).single('image')

router.get('/index',async function(req,res,next){
   try{
    var mobiles=await Mobile.findAll(); 
    res.render('visiteur/index',{mobiles})
   }catch(err){
    next(err)
   }
}

)
router.get('/user',function(req,res,next){
    try{
if(req.user.TypeUserId==1){
    res.redirect('add-product')
}else{
    res.redirect('/index')
}
    }catch(err){
        next(err)
    }
})

router.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/login');
  });
router.get('/login',async function(req,res,next){
    try{
        
     console.log(req.isAuthenticated())
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
 router.get('/buy',loggedin,async function(req,res,next){
    try{
        res.redirect('back')
    }catch(err){
     next(err)
    }
 }
 
 )
 router.post('/buy',loggedin,async function(req,res,next){
    try{
       
        console.log(req.user.id)
     var mobiles= await Mobile.findOne({where:{id:req.body.id}})
     res.render('user/buy',{mobiles})
    }catch(err){
     next(err)
    }
 }
 
 )
 router.post('/command',loggedin,async function(req,res,next){
    try{
        console.log(req.user.id)
     var mobiles= await Mobile.findOne({where:{id:req.body.id}});
     console.log(mobiles.id)
     var command=await Command.create({MobileId:mobiles.id,UserId:req.user.id,booking:req.body.date,quantity:req.body.quantity,Assurance:req.body.assurance})
     res.redirect('index')
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
 router.post("/search",async function(req,res,next){
     try{
        var mobiles=await Mobile.findAll({where:{mobile:req.body.search}})
        res.render("searched",{mobiles})
     }catch(err){
         next(err)
     }
     
 })
 //Admin routes
 router.get("/add-product",async(req,res)=>{
    var marques= await Marque.findAll()
   
     res.render("Admin/add-product",{marques});
 })
 router.get("/accounts",async(req,res)=>{
    var users= await User.findAll({where:{id:1}})
     res.render("Admin/accounts",{users});
 })

 router.post('/Ajouter',async (req,res,next)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.render('Admin/add-product', {
              msg: err
            });}else{
                console.log(req.file);
               
                try{ 
                    var mobiles=req.body.produit;
                    var prix=req.body.prix;
                    var filepath=req.file;
                    var marque=req.body.marque;
                    var quantitiy=req.body.quantity;
                    ///trouver les marque
                    var marque_trouve= await Marque.findOne({where:{Marque:marque}})
                    //create product
                    await Mobile.create({mobile:mobiles,prix:prix,filepath:filepath.filename,marqueId:marque.id,quantitiy:quantitiy,MarqueId:marque_trouve.id})
               res.redirect("add-product")
                }catch(err){next(err)}
            }
    })
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
 router.post('/Admin_account',urlencodedParser,async function(req,res,next){
    try{
        var password=req.body.password
        var email=req.body.email
        var Nom=req.body.name
        var Prenom=req.body.name
       
        var phone=req.body.phone
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt)
        user=await User.create({Nom:Nom,Prenom:Prenom,Email:email,
           password:hashPass,phone:phone,TypeUserId:1});
       res.redirect('back')

       }catch(err){
           next(err)
       }

    
}  )
router.get('/add-marque',async function(req,res,next){
    try{
       
       res.render('Admin/add-marque')
    }catch(err){
        next(err)
    }
})
router.post('/add_marque',async function(req,res,next){
    try{
        var mrque=await Marque.create({Marque:req.body.marque});
       res.redirect('/add-marque')
    }catch(err){
        next(err)
    }
})
 router.get('/delete_products/:id',async function(req,res,next){
    try{
        Command.destroy({where:{MobileId:req.params.id}})
        Mobile.destroy({where:{id:req.params.id}})
        res.redirect('back')
    }catch(err){
     next(err)
    }
 }
 
 )
 router.get('/delete_marques/:id',async function(req,res,next){
    try{
       
        Mobile.destroy({where:{MarqueId:req.params.id}})
        Marque.destroy({where:{id:req.params.id}})
        res.redirect('back')
    }catch(err){
     next(err)
    }
 }
 
 )
 router.get('/delete_user/:id',async function(req,res,next){
    try{
        Command.destroy({where:{UserId:req.params.id}})
        User.destroy({where:{id:req.params.id}})
        res.redirect('back')
    }catch(err){
     next(err)
    }
 }
 
 )
 router.get('/comands',async function(req,res,next){
 
    
    var comand=await Command.findAll({include:[{model:Mobile},{model:User}]})
    
      res.render('Admin/comands',{comand})
    })
 
module.exports=router;