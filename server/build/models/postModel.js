"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
// Определение модели продукта
var index_1 = __importDefault(require("./index"));
var sequelize_1 = require("sequelize");
exports.PostModel = index_1.default.define('post', {
    post_header: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'noName'
    },
    post_text: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'No description'
    },
    post_previewURL: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'https://previews.123rf.com/images/jauhari1/jauhari11912/jauhari1191200030/138578675-microcontroller-iot-development-illustration-as-eps-10-file.jpg'
    }
});
