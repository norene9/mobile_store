const multer=require('multer');
connectFlash = require("connect-flash");

const path = require('path');
const express=require('express');
const bcrypt=require('bcrypt');
const bcryptSalt = 10;
const router=express.Router();
var generator = require('generate-password');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json())
//tables
const{Mobile, Marque,User,Command,TypeUser}=require('../sequlize');
router.use(connectFlash());
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
   });
router.get('/',async function(req,res,next){
    const salt = bcrypt.genSaltSync(bcryptSalt);
    var password = generator.generate({
      length: 10,
      numbers: true
  });

    var types= await TypeUser.findAll()
    var Admin= await User.findAll({where:{Nom:'admin_principale'}})
    console.log(types)
    if(types.length==0){
 await TypeUser.create({type:'Admin'})
      await TypeUser.create({type:'Client'})
    }
    if(Admin.length==0){
        var password='admin'
        const hashPass = bcrypt.hashSync(password, salt)
      User.create({Nom:'admin_principale',Prenom:'admin_principale',
      Email:'admin@gmail.com',password:hashPass,TypeUserId:1})
             
           }
           res.redirect('login')
      
})
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
//change password
router.post('/change',async function(req,res,next){
    try{
        var user=await User.findOne({where:{id:req.user.id}})
        const salt = bcrypt.genSaltSync(bcryptSalt);
        var password=req.body.cpwd;
        console.log(password);
        console.log(user.password);
        
        if (bcrypt.compareSync(password, user.password)) {
            const hashPass = bcrypt.hashSync(req.body.npwd, salt)
            await User.update({password:hashPass},{where:{id:req.user.id}})
            res.redirect('logout')
          }else{
              console.log('incorrecte')
              res.redirect('compte')

          }
    }catch(err){
        next(err)
    }
   
     
  })

 //======================Forget password=============//
 const nodemailer = require("nodemailer");
 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nnours180@gmail.com',
      pass: 'hichiron9991' // naturally, replace both with your real credentials or an application-specific password
    }
  });
 router.get('/forget_password',async function(req,res,next){
    res.render('forget_password')
  })
  router.post('/forget_password',async function(req,res,next){
    try{
     var user= await User.findOne({where:{Email:req.body.email}})
     console.log(req.body.email)
     var password = generator.generate({
       length: 10,
       numbers: true
   });
 
   const salt = bcrypt.genSaltSync(bcryptSalt);
   const hashPass = bcrypt.hashSync(password, salt)
   await User.update({password:hashPass},{where:{id:user.id}})
     var email=user.Email
         const mailOptions = {
           from: 'nnours180@gmail.com',
           to: email,
           subject: 'Forget Pssword',
           text: 'votre nouveau mot de passe est:'+' '+password
         };
         transporter.sendMail(mailOptions, function(error, info){
           if (error) {
           console.log(error);
           } else {
             console.log('Email sent: ' + info.response);
           }
         });
       
       req.flash(
         "error",
         `Verifier votre email....`
       );
       res.redirect('/login')
    }catch(err){
 next(err)
    }
   
   
 })
//-----------upload resturant's images----------------//
const upload=multer({
    storage:storage
}).single('image')

router.get('/index',async function(req,res,next){
   try{
    var mobiles=await Mobile.findAll(); 
    res.render('index',{mobiles})
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
     res.render('buy',{mobiles})
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
 router.post("/search",loggedin,async function(req,res,next){
     try{
        var mobiles=await Mobile.findAll({where:{mobile:req.body.search}})
        res.render("searched",{mobiles})
     }catch(err){
         next(err)
     }
     
 })
 //Admin routes
 router.get("/add-product",loggedin,async(req,res)=>{
    var marques= await Marque.findAll()
   
     res.render("Admin/add-product",{marques});
 })
 router.get("/accounts",loggedin,async(req,res)=>{
    var users= await User.findAll({where:{id:1}})
     res.render("Admin/accounts",{users});
 })

 router.post('/Ajouter',loggedin,async (req,res,next)=>{
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
        router.get('/compte',loggedin,async function(req,res,next){
            try{
                var user =await User.findOne({where:{id:req.user.id}})
                res.render('compte',{user})
            }catch(err){
next(err)
            }
        })
router.get('/products',loggedin,async function(req,res,next){
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
    router.get('/annuler',async function(req,res,next){
 
    
        var comand=await Command.Destroy({where:{id:req.body.id}})
        
          res.redirect('back')
        })
    router.get('/pannier',loggedin,async function(req,res,next){
 
    
        var comand=await Command.findAll({where:{UserId:req.user.id},include:[{model:Mobile},{model:User}]});
        
          res.render('pannier',{comand})
        })
 
module.exports=router;