import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Supplier from './Supplier.js';
import User from './User.js';

const Shipment = sequelize.define('Shipment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_id: { type: DataTypes.INTEGER, references: { model: Supplier, key: 'id' } },
  created_by: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  arrival_date: DataTypes.DATE
}, { timestamps: true });

export default Shipment;
