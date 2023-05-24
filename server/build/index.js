"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var cors = require('cors');
// const { sequelize } = require('./src/models/index')
var index_1 = __importDefault(require("./models/index"));
var postRouter_1 = __importDefault(require("./routes/postRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var server = (0, express_1.default)();
var PORT = process.env.SERVER_PORT;
server.use(cors());
// sequelize.sync({ force: true })
index_1.default.sync({ alter: true })
    .then(function () {
    console.log('The DB has been succesfuly synced');
})
    .catch(function (err) {
    console.log("Failed to sync DB: ".concat(err.message));
});
server.use(express_1.default.json());
server.use('/api/v0.1/post', postRouter_1.default);
server.use('/api/v0.1/user', userRouter_1.default);
server.get('/', function (req, res) {
    res.send("<h2>MyIOT API</h2>");
});
server.listen(PORT, function () {
    console.log("Server has been started on port: ".concat(PORT));
});
