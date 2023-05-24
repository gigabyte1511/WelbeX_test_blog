// Роут описывает взамидействие администратора над содержимым базы данных
import express from 'express'
import { signIn, signOut, signUp } from '../controllers/signController'
import { checkAuth } from '../middlewares/authGuard'
const userRouter = express.Router()

// Регистрация администратора
userRouter.route('/signUp')
  .post(signUp)

// Авторизация администратора
userRouter.route('/signIn')
  .post(signIn)

// Выход администратора из системы
userRouter.route('/signOut')
  .post(checkAuth, signOut)

export default userRouter
