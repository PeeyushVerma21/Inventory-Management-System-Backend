import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';

const ProductDetail = sequelize.define('ProductDetail', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Product, key: 'id' } },
  description_long: DataTypes.TEXT,
  image_url: DataTypes.STRING,
  dimensions: DataTypes.STRING,
  other_attributes: DataTypes.JSON
}, { timestamps: false });

export default ProductDetail;
