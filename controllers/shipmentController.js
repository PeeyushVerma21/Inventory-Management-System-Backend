import Shipment from '../models/Shipment.js';
import ShipmentDetail from '../models/ShipmentDetail.js';
import Inventory from '../models/Inventory.js';
import sequelize from '../config/database.js';
import AuditLog from '../models/AuditLog.js';


export const createShipment = async (req, res) => {

  const userId = req.user?.id || null; 

  const { supplier_id, arrival_date, products } = req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Products array is required' });
  }

  const t = await sequelize.transaction();

  try {
    const shipment = await Shipment.create({
      supplier_id,
      arrival_date,
      created_by: userId
    }, { transaction: t });

    for (const item of products) {
      const { product_id, quantity } = item;
      if (!product_id || quantity <= 0) {
        await t.rollback();
        return res.status(400).json({ error: 'Invalid product_id or quantity' });
      }

      await ShipmentDetail.create({
        shipment_id: shipment.id,
        product_id,
        quantity
      }, { transaction: t });

      const inventory = await Inventory.findOne({ where: { product_id }, transaction: t });
      if (inventory) {
        await inventory.increment('quantity', { by: quantity, transaction: t });
      } else {
        await Inventory.create({ product_id, quantity }, { transaction: t });
      }

      await AuditLog.create({
        user_id: userId,
        action_type: 'STOCK_UPDATE',
        target_table: 'Inventory',
        target_id: product_id,
        description: `Shipment ID ${shipment.id} added +${quantity} units to product ID ${product_id}`
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Shipment recorded', shipment });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};
