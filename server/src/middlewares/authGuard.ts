import { type Response, type Request, type NextFunction } from 'express'
import * as jwtService from '../services/jwtService'

interface checkAuthRequest extends Request {
  userID: string
  userToken: string
}

export const checkAuth = async (req: checkAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.headers)
  if (!req.headers.authorization) {
    res.sendStatus(401)
    return
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const { id } = jwtService.checkToken(token)
    req.userID = id as string
    req.userToken = token
  } catch (error) {
    console.log(error)
    res.sendStatus(401)
    return
  }

  next()
}
