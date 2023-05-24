import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import * as jwtService from './jwtService'
import { UserModel } from '../models/userModel'

export const checkEmailUnique = async (email) => {
  console.log(email)
  const allUsers = await UserModel.findAll({ raw: true })
  return !allUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())
}

export const createUser = async (userObj) => {
  const hashPassword = await bcrypt.hash(
    userObj.password,
    10
  )

  const newUserID = uuidv4()

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

export const authenticateUser = async (userObj) => {
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

export const signOut = async (userID) => {
  const { id } = userID
  const preparedUser = { id, refreshToken: '' }
  await UserModel.update(preparedUser, {
    where: { id: [id] }
  })
}
