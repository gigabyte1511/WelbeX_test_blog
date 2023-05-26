// Роут описывает взамидействие администратора над содержимым базы данных
import express from 'express'
import { addNewPost, deletePostByID, getAllPosts, getPostsCount, updatePostByID } from '../controllers/postController'
import { checkAuth } from '../middlewares/authGuard'
const postRouter = express.Router()

postRouter.route('/')
  // Get all posts from DB
  .get(getAllPosts)

  // Add new post to DB
  .post(checkAuth, addNewPost)

postRouter.route('/count')
  // Get all posts count
  .get(getPostsCount)

postRouter.route('/:id')
  // Delete post in DB by id
  .delete(checkAuth, deletePostByID)

  // Update post in DB by id
  .patch(checkAuth, updatePostByID)

export default postRouter
