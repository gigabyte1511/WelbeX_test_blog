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

interface PostWithUser extends PostInstance {
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
    defaultValue: 'https://previews.123rf.com/images/jauhari1/jauhari11912/jauhari1191200030/138578675-microcontroller-iot-development-illustration-as-eps-10-file.jpg'
  }
})
