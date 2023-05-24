import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import * as jwtService from './jwtService'
import { type UserInstance, UserModel } from '../models/userModel'
import { type SignUp } from '../types/UserType'
import { Response } from 'express-serve-static-core'
import { Request } from 'express'

export const checkEmailUnique = async (email: string): Promise<boolean> => {
  console.log(email)
  const allUsers = await UserModel.findAll({ raw: true })
  return !allUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())
}

export const createUser = async (userObj: SignUp): Promise<UserInstance> => {
  const hashPassword = await bcrypt.hash(
    userObj.password,
    10
  ) as string

  const newUserID = uuidv4() as string

  const newRefreshToken = jwtService.createRefreshToken({ id: newUserID })

  const newUserFromDB = await UserModel.create({
    ...userObj,
    id: newUserID,
    refreshToken: newRefreshToken,
    password: hashPassword
  })
  const { password, refreshToken, ...returnedUserFromDB } = newUserFromDB.dataValues
  return {
    ...returnedUserFromDB
  }
}

export const signOut = async (userID: string): Promise<void> => {
  const id = userID
  const preparedUser = { id, refreshToken: '' }
  await UserModel.update(preparedUser, {
    where: { id: [id] }
  })
}
interface UserWithAccessTokend extends UserInstance {
  accessToken: string
}

export const authenticateUser = async (userObj: SignUp): Promise<UserWithAccessTokend> => {
  const allUsers = await UserModel.findAll({ raw: true })

  const findedInDBUser = allUsers.find(
    (user) => user.email.toLowerCase() === userObj.email.toLowerCase()
  )

  if ((findedInDBUser == null) || !(await bcrypt.compare(userObj.password, findedInDBUser.password))) { throw new Error('Email or password incorrect') }

  const accessToken = jwtService.createAccessToken({ id: findedInDBUser.id })
  const refreshToken = jwtService.createRefreshToken({ id: findedInDBUser.id })

  findedInDBUser.refreshToken = refreshToken
  const { email } = findedInDBUser
  await UserModel.update(findedInDBUser, {
    where: { email: [email] }
  })

  const { password, ...restFindedInDBUser } = findedInDBUser

  return {
    ...restFindedInDBUser,
    accessToken
  }
}

export const refresh = async (req: Request, res: Response): Promise<{ accessToken: string, refreshToken: string }> => {
  const user = await UserModel.findByPk(req.userID) as UserInstance
  if (user == null) {
    res
      .status(401)
      .json('User not found')
    return
  }
  const accessToken = jwtService.createAccessToken({ id: user.id })
  const refreshToken = jwtService.createRefreshToken({ id: user.id })
  await user.update{ refreshToken }

  return {
    accessToken,
    refreshToken
  }
}
