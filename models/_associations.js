import User from './User.js';
import Product from './Product.js';
import ProductDetail from './ProductDetail.js';
import Inventory from './Inventory.js';
import Supplier from './Supplier.js';
import Shipment from './Shipment.js';
import ShipmentDetail from './ShipmentDetail.js';
import AuditLog from './AuditLog.js';

Product.hasOne(ProductDetail, { foreignKey: 'product_id' });
ProductDetail.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasOne(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

Supplier.hasMany(Shipment, { foreignKey: 'supplier_id' });
Shipment.belongsTo(Supplier, { foreignKey: 'supplier_id' });

User.hasMany(Shipment, { foreignKey: 'created_by' });

Shipment.hasMany(ShipmentDetail, { foreignKey: 'shipment_id' });
Product.hasMany(ShipmentDetail, { foreignKey: 'product_id' });

export {
  User, Product, ProductDetail, Inventory, Supplier, Shipment, ShipmentDetail, AuditLog
};
