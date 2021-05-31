const sequelize =require('../sequlize')
module.exports=(sequelize,type)=>{
   return sequelize.define('admin',{
       id:{
           type:type.INTEGER,
           autoIncrement:true,
           primaryKey:true,
       },
       userName:type.STRING,
        password:type.STRING,
        
   })
} 