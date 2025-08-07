import Inventory from '../models/Inventory.js';
import AuditLog from '../models/AuditLog.js';
import sequelize from '../config/database.js';

export const recordSale = async (req, res) => {

  const userId = req.user?.id || null;
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid product_id or quantity' });
  }

  const t = await sequelize.transaction();

  try {
    const inventory = await Inventory.findOne({ where: { product_id }, transaction: t });
    if (!inventory) {
      await t.rollback();
      return res.status(404).json({ error: 'Inventory record not found' });
    }

    if (inventory.quantity < quantity) {
      await t.rollback();
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    await inventory.decrement('quantity', { by: quantity, transaction: t });

    await AuditLog.create({
      user_id: userId,
      action_type: 'SALE',
      target_table: 'Inventory',
      target_id: product_id,
      description: `Sale of ${quantity} units from product ID ${product_id}`
    }, { transaction: t });

    await t.commit();
    res.json({ message: 'Sale recorded', product_id, quantity });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};
