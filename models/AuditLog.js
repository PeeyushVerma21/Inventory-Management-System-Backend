import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  action_type: DataTypes.STRING(64),
  target_table: DataTypes.STRING(32),
  target_id: DataTypes.INTEGER,
  description: DataTypes.TEXT
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });

export default AuditLog;
