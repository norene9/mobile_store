const sequelize = require("../sequlize");

module.exports=(sequelize,type)=>{
   return sequelize.define('TypeUser',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        type:type.STRING,
       
       }
    
    )
}