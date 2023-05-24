import * as authValidator from '../validators/authValidator'
import { getPreparedErrorsFromYup } from '../validators/utils'
import * as authService from '../services/authService'

export const signUp = async (req, res) => {
  try {
    await authValidator.signUpSchema.validate(req.body, { abortEarly: false })
  } catch (error) {
    res
      .status(400)
      .json(getPreparedErrorsFromYup(error))
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

export const signIn = async (req, res) => {
  try {
    await authValidator.signInSchema.validate(req.body, { abortEarly: false })
  } catch (error) {
    res
      .status(400)
      .json(getPreparedErrorsFromYup(error))
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

export const signOut = async (req, res) => {
  try {
    await authService.signOut(req.userID)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
