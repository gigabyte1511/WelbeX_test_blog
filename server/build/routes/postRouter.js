"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Роут описывает взамидействие администратора над содержимым базы данных
var express_1 = __importDefault(require("express"));
var postController_1 = require("../controllers/postController");
var authGuard_1 = require("../middlewares/authGuard");
var postRouter = express_1.default.Router();
// Действия администратора
postRouter.route('/')
    // Получить все устройства
    .get(postController_1.getAllPosts)
    .post(authGuard_1.checkAuth, postController_1.addNewPost);
postRouter.route('/:id')
    // Получить устройство по его ID
    .get(postController_1.getPostByID)
    // Удалить устройство по ID
    .delete(authGuard_1.checkAuth, postController_1.deletePostByID)
    // Удалить устройство по ID
    .patch(authGuard_1.checkAuth, postController_1.updatePostByID);
exports.default = postRouter;
