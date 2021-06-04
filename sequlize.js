const Sequelize= require('sequelize');
const UserModel= require('./models/User');
const MarqueModel=require('./models/Marque');
const MobileModel=require('./models/Mobile');
const TypeUserModel=require('./models/TypeUser');
const AssuranceModel=require('./models/Assurance');
const colourModel=require('./models/colour');
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
const Assurance=AssuranceModel(sequelize,Sequelize)
const Admin=AdminModel(sequelize,Sequelize);
const Command=commandModel(sequelize,Sequelize);
const colour=colourModel(sequelize,Sequelize)
User.hasMany(Assurance);
Assurance.belongsTo(User);
Marque.hasMany(Mobile);
Command.belongsTo(User);
TypeUser.hasMany(User);
TypeUser.hasMany(Admin);
Mobile.hasMany(colour);
sequelize.sync({
    force:false
}).then(()=>{
    console.log("database a est ete crier")
});
module.exports={
User,Admin,Command,Assurance,Mobile,Marque,TypeUser,colour
}
