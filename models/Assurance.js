const sequelize=require('../sequlize');
module.exports=(sequelize,type)=>{
  return sequelize.define('Assurance',{
      id:{
          type:type.INTEGER,
          autoIncrement:true,
          primaryKey:true,
      },
      NumeroDeCommand:type.STRING,
      duree:type.STRING,
      

  })
}
