// Определение модели продукта
import sequelize from './index'
import { DataTypes } from 'sequelize'
import { PostModel } from './postModel'

export const UserModel = sequelize.define('user', {
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
