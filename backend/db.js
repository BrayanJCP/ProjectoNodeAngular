var Sequelize= require('sequelize');
module.exports={
    sequelize:new Sequelize('pruebatecnica','root','admin',{
        host:'localhost',
        dialect:'mysql',
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        }
    }),
}
