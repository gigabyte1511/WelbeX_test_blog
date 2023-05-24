import * as jwtService from '../services/jwtService'

export const checkAuth = (req, res, next) => {
  console.log(req.headers)
  if (!req.headers.authorization) {
    return res.sendStatus(401)
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const { id } = jwtService.checkToken(token)
    req.userID = id
    req.userToken = token
  } catch (error) {
    console.log(error)
    return res.sendStatus(401)
  }

  return next()
}
