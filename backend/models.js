var db = require('./db');
var sequelize = require('sequelize');
module.exports = {
    User: db.sequelize.define('users', {
        name: sequelize.STRING,
        password: sequelize.STRING,
        email: sequelize.STRING
    }),
    Product: db.sequelize.define('products', {
        name: sequelize.STRING,
        description: sequelize.STRING,
        cost: sequelize.STRING
    }),
}