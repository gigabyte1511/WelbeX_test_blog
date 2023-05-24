// Определение модели продукта
import sequelize from './index'
import { DataTypes, type Model } from 'sequelize'
import { PostModel } from './postModel'

interface UserAttributes {
  id: string
  username: string
  email: string
  password: string
  refreshToken: string
}
export interface UserInstance extends Model<UserAttributes>, UserAttributes { }

export const UserModel = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

UserModel.hasMany(PostModel, {
  onDelete: 'CASCADE',
  foreignKey: 'userId'
})
PostModel.belongsTo(UserModel, {
  foreignKey: 'userId'
})
