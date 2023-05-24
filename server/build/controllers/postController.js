"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostByID = exports.deletePostByID = exports.addNewPost = exports.getPostByID = exports.getAllPosts = void 0;
var postModel_1 = require("../models/postModel");
var postValidator_1 = require("../validators/postValidator");
var utils_1 = require("../validators/utils");
var userModel_1 = require("../models/userModel");
var getAllPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, offset, alllPosts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = (req.query.limits !== undefined) ? Number(req.query.limits) : undefined;
                offset = (req.query.page !== undefined) ? (Number(req.query.page) - 1) * Number(req.query.limits) : undefined;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postModel_1.PostModel.findAll({
                        limit: limit,
                        offset: offset,
                        include: {
                            model: userModel_1.UserModel,
                            attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
                        },
                        order: [['createdAt', 'DESC']]
                    })];
            case 2:
                alllPosts = _a.sent();
                res
                    .status(200)
                    .json(alllPosts);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllPosts = getAllPosts;
var getPostByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, postByID, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, postModel_1.PostModel.findByPk(id, {
                        include: {
                            model: userModel_1.UserModel,
                            attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
                        }
                    })];
            case 1:
                postByID = _a.sent();
                if (postByID == null) {
                    res
                        .status(400)
                        .json('Post not found');
                    return [2 /*return*/];
                }
                res
                    .status(200)
                    .json(postByID);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPostByID = getPostByID;
var addNewPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3, userFromDB, newPost, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postValidator_1.createPostSchema.validate(req.body, { abortEarly: false })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res
                    .status(400)
                    .json((0, utils_1.getPreparedErrorsFromYup)(error_3));
                return [2 /*return*/];
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, userModel_1.UserModel.findByPk(req.userID)];
            case 4:
                userFromDB = _a.sent();
                return [4 /*yield*/, userFromDB.createPost(req.body)];
            case 5:
                newPost = _a.sent();
                res
                    .status(200)
                    .json(newPost);
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.log(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addNewPost = addNewPost;
var deletePostByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, postByID, resFromDB, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, postModel_1.PostModel.findByPk(id, {
                        include: {
                            model: userModel_1.UserModel,
                            attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
                        }
                    })];
            case 1:
                postByID = _a.sent();
                if (postByID == null) {
                    res
                        .status(400)
                        .json('Post not found');
                    return [2 /*return*/];
                }
                if (postByID.user.id !== req.userID) {
                    res
                        .status(403)
                        .json('You have not permissions');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, postModel_1.PostModel.destroy({
                        where: {
                            id: [id]
                        }
                    })];
            case 2:
                resFromDB = _a.sent();
                console.log(resFromDB);
                res
                    .status(200)
                    .json('Post removed successfully');
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePostByID = deletePostByID;
var updatePostByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, postByID, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, postModel_1.PostModel.findByPk(id, {
                        include: {
                            model: userModel_1.UserModel,
                            attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
                        }
                    })];
            case 1:
                postByID = _a.sent();
                if (postByID == null) {
                    res
                        .status(400)
                        .json('Post not found');
                    return [2 /*return*/];
                }
                if (postByID.user.id !== req.userID) {
                    res
                        .status(403)
                        .json('You have not permissions');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, postByID.update(req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, postModel_1.PostModel.findByPk(id)];
            case 3:
                result = _a.sent();
                res
                    .status(200)
                    .json(result);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.log(error_6);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatePostByID = updatePostByID;
