"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Инициализация подключения к базе данных
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("".concat(process.env.DB_NAME), "".concat(process.env.DB_USERNAME), "".concat(process.env.DB_PASSWORD), {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(function () {
    console.log("Connection to DB ".concat(process.env.DB_NAME, " has been established successfully."));
})
    .catch(function (error) {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
