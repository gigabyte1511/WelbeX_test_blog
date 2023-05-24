"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.authenticateUser = exports.signOut = exports.createUser = exports.checkEmailUnique = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var uuid_1 = require("uuid");
var jwtService = __importStar(require("./jwtService"));
var userModel_1 = require("../models/userModel");
var checkEmailUnique = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(email);
                return [4 /*yield*/, userModel_1.UserModel.findAll({ raw: true })];
            case 1:
                allUsers = _a.sent();
                return [2 /*return*/, !allUsers.some(function (user) { return user.email.toLowerCase() === email.toLowerCase(); })];
        }
    });
}); };
exports.checkEmailUnique = checkEmailUnique;
var createUser = function (userObj) { return __awaiter(void 0, void 0, void 0, function () {
    var hashPassword, newUserID, newRefreshToken, newUserFromDB, _a, password, refreshToken, returnedUserFromDB;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, bcrypt_1.default.hash(userObj.password, 10)];
            case 1:
                hashPassword = _b.sent();
                newUserID = (0, uuid_1.v4)();
                newRefreshToken = jwtService.createRefreshToken({ id: newUserID });
                return [4 /*yield*/, userModel_1.UserModel.create(__assign(__assign({}, userObj), { id: newUserID, refreshToken: newRefreshToken, password: hashPassword }))];
            case 2:
                newUserFromDB = _b.sent();
                _a = newUserFromDB.dataValues, password = _a.password, refreshToken = _a.refreshToken, returnedUserFromDB = __rest(_a, ["password", "refreshToken"]);
                return [2 /*return*/, __assign({}, returnedUserFromDB)];
        }
    });
}); };
exports.createUser = createUser;
var signOut = function (userID) { return __awaiter(void 0, void 0, void 0, function () {
    var id, preparedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = userID;
                preparedUser = { id: id, refreshToken: '' };
                return [4 /*yield*/, userModel_1.UserModel.update(preparedUser, {
                        where: { id: [id] }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.signOut = signOut;
var authenticateUser = function (userObj) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, findedInDBUser, _a, accessToken, refreshToken, email, password, restFindedInDBUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, userModel_1.UserModel.findAll({ raw: true })];
            case 1:
                allUsers = _b.sent();
                findedInDBUser = allUsers.find(function (user) { return user.email.toLowerCase() === userObj.email.toLowerCase(); });
                _a = (findedInDBUser == null);
                if (_a) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(userObj.password, findedInDBUser.password)];
            case 2:
                _a = !(_b.sent());
                _b.label = 3;
            case 3:
                if (_a) {
                    throw new Error('Email or password incorrect');
                }
                accessToken = jwtService.createAccessToken({ id: findedInDBUser.id });
                refreshToken = jwtService.createRefreshToken({ id: findedInDBUser.id });
                findedInDBUser.refreshToken = refreshToken;
                email = findedInDBUser.email;
                return [4 /*yield*/, userModel_1.UserModel.update(findedInDBUser, {
                        where: { email: [email] }
                    })];
            case 4:
                _b.sent();
                password = findedInDBUser.password, restFindedInDBUser = __rest(findedInDBUser, ["password"]);
                return [2 /*return*/, __assign(__assign({}, restFindedInDBUser), { accessToken: accessToken })];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
var refresh = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModel_1.UserModel.findByPk(req.userID)];
            case 1:
                user = _a.sent();
                if (user == null) {
                    res
                        .status(401)
                        .json('User not found');
                    return [2 /*return*/];
                }
                accessToken = jwtService.createAccessToken({ id: user.id });
                refreshToken = jwtService.createRefreshToken({ id: user.id });
                return [4 /*yield*/, user.update];
            case 2:
                _a.sent();
                {
                    refreshToken;
                }
                return [2 /*return*/, {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }];
        }
    });
}); };
exports.refresh = refresh;
