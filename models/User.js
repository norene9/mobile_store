const sequelize = require("../sequlize");

module.exports=(sequelize,type)=>{
   return sequelize.define('User',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        Nom:type.STRING,
        Prenom:type.STRING,
        Email:type.STRING,
        password:type.STRING,
        adress:type.STRING,
        phone:type.STRING,

        
    })
}