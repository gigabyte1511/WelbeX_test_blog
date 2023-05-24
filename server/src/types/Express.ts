import { type Request } from 'express'
import { type IPost } from './PostType'

export interface IPostRequest extends Request {
    body: IPost
    userID: string
}
