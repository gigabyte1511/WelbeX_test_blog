// Определение модели продукта
import sequelize from './index'
import { DataTypes, type Model } from 'sequelize'
import { type UserInstance } from './userModel'

interface PostAttributes {
  post_header: string
  post_text: string
  post_previewURL: string
  id?: number
}
export interface PostInstance extends Model<PostAttributes>, PostAttributes { }

export interface PostWithUser extends PostInstance {
  user: UserInstance
}

export const PostModel = sequelize.define<PostInstance>('post', {
  post_header: {
    type: DataTypes.STRING,
    defaultValue: 'noName'
  },
  post_text: {
    type: DataTypes.STRING,
    defaultValue: 'No description'
  },
  post_previewURL: {
    type: DataTypes.STRING,
    defaultValue: 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
  }
})
