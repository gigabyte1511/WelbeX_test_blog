"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const { sequelize } = require('./src/models/index')
var index_1 = __importDefault(require("./models/index"));
var postRouter_1 = __importDefault(require("./routes/postRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var dotenv = __importStar(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv.config();
var server = (0, express_1.default)();
var PORT = process.env.SERVER_PORT;
server.use((0, cors_1.default)());
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
    res.send('<h2>MyIOT API</h2>');
});
server.listen(PORT, function () {
    console.log("Server has been started on port: ".concat(PORT));
});
