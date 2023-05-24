import { type Request, type Response } from 'express'
import { type PostInstance, PostModel, type PostWithUser } from '../models/postModel'
import { createPostSchema } from '../validators/postValidator'
import { getPreparedErrorsFromYup } from '../validators/utils'
import { UserModel } from '../models/userModel'
import { type IPost } from '../types/PostType'
import { type ValidationError } from 'yup'

export interface addNewPostRequest extends Request {
  body: IPost
  userID: string
}
interface deletePostRequest extends Request {
  userID: string
}
interface updatePostRequest extends Request {
  userID: string
  body: IPost

}

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  const limit = (req.query.limits !== undefined) ? Number(req.query.limits) : undefined
  const offset = (req.query.page !== undefined) ? (Number(req.query.page) - 1) * Number(req.query.limits) : undefined
  try {
    const alllPosts = await PostModel.findAll({
      limit,
      offset,
      include: {
        model: UserModel,
        attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
      },
      order: [['createdAt', 'DESC']]
    })
    res
      .status(200)
      .json(alllPosts)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const getPostByID = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const postByID = await PostModel.findByPk(id, {
      include: {
        model: UserModel,
        attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
      }
    })
    if (postByID == null) {
      res
        .status(400)
        .json('Post not found')
      return
    }
    res
      .status(200)
      .json(postByID)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const addNewPost = async (req: addNewPostRequest, res: Response): Promise<void> => {
  try {
    await createPostSchema.validate(req.body, { abortEarly: false })
  } catch (error: unknown) {
    res
      .status(400)
      .json(getPreparedErrorsFromYup(error as ValidationError))
    return
  }
  try {
    const userFromDB = await UserModel.findByPk(req.userID)
    const newPost = await userFromDB.createPost(req.body) as PostInstance
    res
      .status(200)
      .json(newPost)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const deletePostByID = async (req: deletePostRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const postByID = await PostModel.findByPk(id, {
      include: {
        model: UserModel,
        attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
      }
    }) as PostWithUser
    if (postByID == null) {
      res
        .status(400)
        .json('Post not found')
      return
    }
    if (postByID.user.id !== req.userID) {
      res
        .status(403)
        .json('You have not permissions')
      return
    }
    const resFromDB = await PostModel.destroy({
      where: {
        id: [id]
      }
    })
    console.log(resFromDB)
    res
      .status(200)
      .json('Post removed successfully')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const updatePostByID = async (req: updatePostRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const postByID = await PostModel.findByPk(id, {
      include: {
        model: UserModel,
        attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
      }
    }) as PostWithUser
    if (postByID == null) {
      res
        .status(400)
        .json('Post not found')
      return
    }
    if (postByID.user.id !== req.userID) {
      res
        .status(403)
        .json('You have not permissions')
      return
    }
    await postByID.update(req.body)
    const result = await PostModel.findByPk(id)

    res
      .status(200)
      .json(result)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
