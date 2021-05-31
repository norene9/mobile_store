const sequelize = require("../sequlize");
module.exports=(sequelize,type)=>{
   return sequelize.define('Marque',{
       id:{type:type.INTEGER,
        autoincrement:true,
        primaryKey:true

       },
       Marque:type.STRING,
       
       
   }) 
}