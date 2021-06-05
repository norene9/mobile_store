const Sequelize= require('sequelize');
const UserModel= require('./models/User');
const MarqueModel=require('./models/Marque');
const MobileModel=require('./models/Mobile');
const TypeUserModel=require('./models/TypeUser');


const AdminModel=require('./models/Admin');
const commandModel=require('./models/command');
const sequelize=new Sequelize('mobile','root','root',{
    host:'localhost',dialect:'mysql', define: {
        timestamps: false
      }
});
const TypeUser=TypeUserModel(sequelize,Sequelize);
const User=UserModel(sequelize,Sequelize);
const Marque=MarqueModel(sequelize,Sequelize);
const Mobile=MobileModel(sequelize,Sequelize);

const Admin=AdminModel(sequelize,Sequelize);
const Command=commandModel(sequelize,Sequelize);



Marque.hasMany(Mobile);
Command.belongsTo(User);
Command.belongsTo(Mobile);
TypeUser.hasMany(User);
TypeUser.hasMany(Admin);

sequelize.sync({
    force:false
}).then(()=>{
    console.log("database a est ete crier")
});
module.exports={
User,Admin,Command,Mobile,Marque,TypeUser 
}
