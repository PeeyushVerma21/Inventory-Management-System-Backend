import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Supplier = sequelize.define('Supplier', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  contact_info: DataTypes.STRING,
  address: DataTypes.TEXT
}, { timestamps: true });

export default Supplier;
