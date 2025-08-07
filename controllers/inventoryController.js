import Inventory from '../models/Inventory.js';
import Product from '../models/Product.js';

export const getLowStock = async (req, res) => {
  const threshold = parseInt(req.query.threshold, 10) || 10;

  try {
    const lowStockItems = await Inventory.findAll({
      where: {
        quantity: { lt: threshold }
      },
      include: [{ model: Product, as: 'Product' }]
    });

    res.json(lowStockItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
