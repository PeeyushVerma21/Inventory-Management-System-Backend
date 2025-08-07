import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sku: { type: DataTypes.STRING, unique: true },
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2)
}, { timestamps: true });

export default Product;
