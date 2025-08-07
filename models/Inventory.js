import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';

const Inventory = sequelize.define('Inventory', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Product, key: 'id' } },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: false });

export default Inventory;
