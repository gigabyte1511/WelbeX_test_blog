"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.createRefreshToken = exports.createAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createAccessToken = function (payload) { return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_ACCESS_TOKEN_LIFETIME_IN_SECONDS
}); };
exports.createAccessToken = createAccessToken;
var createRefreshToken = function (payload) { return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_REFRESH_TOKEN_LIFETIME_IN_SECONDS
}); };
exports.createRefreshToken = createRefreshToken;
var checkToken = function (accessToken) {
    try {
        return jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
    }
    catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
exports.checkToken = checkToken;
