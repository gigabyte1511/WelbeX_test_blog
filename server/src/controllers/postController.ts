import { type Request, type Response } from 'express'
import { PostModel } from '../models/postModel'
import { createPostSchema } from '../validators/postValidator'
import { getPreparedErrorsFromYup } from '../validators/utils'
import { UserModel } from '../models/userModel'
import { type IPostRequest } from '../types/Express'

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const alllPosts = await PostModel.findAll({
      include: {
        model: UserModel,
        attributes: { exclude: ['password', 'refreshToken', 'createdAt', 'updatedAt'] }
      }
    })
    res
      .status(200)
      .json(alllPosts)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const getPostByID = async (req: Request, res: Response) => {
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

export const addNewPost = async (req: IPostRequest, res: Response) => {
  try {
    await createPostSchema.validate(req.body, { abortEarly: false })
  } catch (error: ValidationError) {
    res
      .status(400)
      .json(getPreparedErrorsFromYup(error))
    return
  }
  try {
    const userFromDB = await UserModel.findByPk(req.userID)
    const newPost = await userFromDB.createPost(req.body)
    res
      .status(200)
      .json(newPost)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const deletePostByID = async (req: Request, res: Response) => {
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

export const updatePostByID = async (req: Request, res: Response) => {
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
