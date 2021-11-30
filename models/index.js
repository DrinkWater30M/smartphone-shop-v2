const  {Sequelize}  = require('sequelize');
const initModels = require("./init-models");

const sequelize = new Sequelize("ql_ban_dien_thoai", "root", "123456", {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    sequelize,
    models: initModels(sequelize)
};
