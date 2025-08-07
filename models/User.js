import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password_hash: DataTypes.STRING,
  role: { type: DataTypes.ENUM('admin', 'manager', 'staff'), defaultValue: 'staff' }
}, { timestamps: true });

export default User;
