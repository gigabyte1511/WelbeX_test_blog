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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
var jwtService = __importStar(require("../services/jwtService"));
var checkAuth = function (req, res, next) {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    var token = req.headers.authorization.split(' ')[1];
    try {
        var id = jwtService.checkToken(token).id;
        console.log("------------id--------------", id);
        req.userID = id;
        req.userToken = token;
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
    return next();
};
exports.checkAuth = checkAuth;
