const sequelize=require('../sequlize');
module.exports=(sequelize,type)=>{
    return sequelize.define('colour',{
        id:{type:type.INTEGER,
        autoIncrement:true,
        primaryKey:true},
        quantity:type.INTEGER,
        colour:type.STRING,
    }
    
   
    )
}