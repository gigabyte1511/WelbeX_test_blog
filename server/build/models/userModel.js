"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// Определение модели продукта
var index_1 = __importDefault(require("./index"));
var sequelize_1 = require("sequelize");
var postModel_1 = require("./postModel");
exports.UserModel = index_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.UserModel.hasMany(postModel_1.PostModel, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});
postModel_1.PostModel.belongsTo(exports.UserModel, {
    foreignKey: 'userId'
});
