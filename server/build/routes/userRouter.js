"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Роут описывает взамидействие администратора над содержимым базы данных
var express_1 = __importDefault(require("express"));
var signController_1 = require("../controllers/signController");
var authGuard_1 = require("../middlewares/authGuard");
var userRouter = express_1.default.Router();
// Регистрация администратора
userRouter.route('/signUp')
    .post(signController_1.signUp);
// Авторизация администратора
userRouter.route('/signIn')
    .post(signController_1.signIn);
// Выход администратора из системы
userRouter.route('/signOut')
    .post(authGuard_1.checkAuth, signController_1.signOut);
userRouter.route('/refresh')
    .get(authGuard_1.checkAuth, signController_1.refreshToken);
exports.default = userRouter;
