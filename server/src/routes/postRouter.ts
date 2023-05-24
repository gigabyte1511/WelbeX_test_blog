// Роут описывает взамидействие администратора над содержимым базы данных
import express from 'express'
import { addNewPost, deletePostByID, getAllPosts, getPostByID, updatePostByID } from '../controllers/postController'
import { checkAuth } from '../middlewares/authGuard'
const postRouter = express.Router()

// Действия администратора
postRouter.route('/')
  // Получить все устройства
  .get(getAllPosts)
  .post(checkAuth, addNewPost)

postRouter.route('/:id')
  // Получить устройство по его ID
  .get(getPostByID)
  // Удалить устройство по ID
  .delete(checkAuth, deletePostByID)
  // Удалить устройство по ID
  .patch(checkAuth, updatePostByID)

export default postRouter
