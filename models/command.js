
const sequelize=require('../sequlize');
module.exports=(sequelize,type)=>{
    return sequelize.define('comand',{
        id:{type:type.INTEGER,
        autoIncrement:true,
        primaryKey:true},
        quantity:type.INTEGER,
    
    })
}