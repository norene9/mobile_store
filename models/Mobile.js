const sequelize=require("../sequlize");
module.exports=(sequelize,type)=>{
    return sequelize.define('Mobile',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        mobile:type.STRING,
        prix:type.STRING,
        Description:type.STRING,
        quantitiy:type.INTEGER,
        filepath:type.STRING,
        
       
})
}