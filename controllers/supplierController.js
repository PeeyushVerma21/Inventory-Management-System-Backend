import Supplier from '../models/Supplier.js';
import sequelize from '../config/database.js';

export const createSupplier = async (req, res) => {
  try {
    const { name, contact_info, address } = req.body;
    const supplier = await Supplier.create({ name, contact_info, address });
    res.status(201).json({ message: 'Supplier created', supplier });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    await supplier.update(req.body);
    res.json({ message: 'Supplier updated', supplier });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    await supplier.destroy();
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
