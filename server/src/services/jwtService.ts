
import jwt, { type JwtPayload } from 'jsonwebtoken'

export const createAccessToken = (payload: { id: string }): string => jwt.sign(
  payload,
  process.env.JWT_SECRET,
  {
    expiresIn: +process.env.JWT_ACCESS_TOKEN_LIFETIME_IN_SECONDS
  }
)

export const createRefreshToken = (payload: { id: string }): string => jwt.sign(
  payload,
  process.env.JWT_SECRET,
  {
    expiresIn: +process.env.JWT_REFRESH_TOKEN_LIFETIME_IN_SECONDS
  }
)

export const checkToken = (accessToken: string): JwtPayload => {
  try {
    return jwt.verify(accessToken, process.env.JWT_SECRET) as JwtPayload
  } catch (error: unknown) {
    console.log(error)
    throw new Error((error as Error).message)
  }
}
