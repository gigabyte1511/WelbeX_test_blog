import * as authValidator from '../validators/authValidator'
import { getPreparedErrorsFromYup } from '../validators/utils'
import * as authService from '../services/authService'
import { type Request, type Response } from 'express'
import { type SignUp } from '../types/UserType'
import { type ValidationError } from 'yup'

interface SignUpRequest extends Request {
  body: SignUp
  userID: string
}
interface SignInRequest extends Request {
  body: SignUp
}
interface SignOutRequest extends Request {
  userID: string
}

export const signUp = async (req: SignUpRequest, res: Response): Promise<void> => {
  try {
    await authValidator.signUpSchema.validate(req.body, { abortEarly: false })
  } catch (error) {
    res
      .status(400)
      .json(getPreparedErrorsFromYup(error as ValidationError))
    return
  }
  try {
    if (await authService.checkEmailUnique(req.body.email)) {
      const createUser = await authService.createUser(req.body)
      res
        .status(200)
        .json(createUser)
      return
    }
    res
      .status(400)
      .json({ error: 'Этот email-адрес уже используется' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json(error)
  }
}

export const signIn = async (req: SignInRequest, res: Response): Promise<void> => {
  try {
    await authValidator.signInSchema.validate(req.body, { abortEarly: false })
  } catch (error) {
    res
      .status(400)
      .json(getPreparedErrorsFromYup(error as ValidationError))
    return
  }
  try {
    try {
      const authenticatedUser = await authService.authenticateUser(req.body)
      res
        .status(200)
        .json(authenticatedUser)
    } catch (error) {
      res.status(400).send(error.message)
      return
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const signOut = async (req: SignOutRequest, res: Response): Promise<void> => {
  try {
    await authService.signOut(req.userID)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const refreshToken = async (req: Response, res: Response): Promise<void> => {
  try {
    res.json(await authService.refresh(req))
  } catch (error) {
    console.log({ error })
    if (error.message === '401') {
      res.sendStatus(401)
      return
    }
    res.sendStatus(500)
  }
}
