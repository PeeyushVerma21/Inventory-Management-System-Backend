import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Shipment from './Shipment.js';
import Product from './Product.js';

const ShipmentDetail = sequelize.define('ShipmentDetail', {
  shipment_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Shipment, key: 'id' } },
  product_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Product, key: 'id' } },
  quantity: DataTypes.INTEGER
}, { timestamps: false });

export default ShipmentDetail;
