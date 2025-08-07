import Product from '../models/Product.js';
import ProductDetail from '../models/ProductDetail.js';
import Inventory from '../models/Inventory.js';
import sequelize from '../config/database.js';

export const createProduct = async (req, res) => {
  const { sku, name, price, description_long, image_url, dimensions, other_attributes } = req.body;
  const t = await sequelize.transaction();
  try {
    const existing = await Product.findOne({ where: { sku }, transaction: t });
    if (existing) {
      await t.rollback();
      return res.status(400).json({ error: "SKU already exists" });
    }

    const product = await Product.create({ sku, name, price }, { transaction: t });

    await ProductDetail.create({
      product_id: product.id,
      description_long,
      image_url,
      dimensions,
      other_attributes
    }, { transaction: t });

    await Inventory.create({ product_id: product.id, quantity: 0 }, { transaction: t });

    await t.commit();
    return res.status(201).json({ message: "Product created", product });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductDetail, as: 'ProductDetail' },
        { model: Inventory, as: 'Inventory' }
      ]
    });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: ProductDetail, as: 'ProductDetail' },
        { model: Inventory, as: 'Inventory' }
      ]
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { sku, name, price, description_long, image_url, dimensions, other_attributes } = req.body;
  
  const t = await sequelize.transaction();
  try {
    const product = await Product.findByPk(id, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ error: "Product not found" });
    }

    if (sku && sku !== product.sku) {
      const skuExists = await Product.findOne({ where: { sku }, transaction: t });
      if (skuExists) {
        await t.rollback();
        return res.status(400).json({ error: "SKU already in use by another product" });
      }
    }

    await product.update({ sku, name, price }, { transaction: t });

    let productDetail = await ProductDetail.findOne({ where: { product_id: id }, transaction: t });
    if (productDetail) {
      await productDetail.update({ description_long, image_url, dimensions, other_attributes }, { transaction: t });
    } else {
      await ProductDetail.create({
        product_id: id,
        description_long,
        image_url,
        dimensions,
        other_attributes
      }, { transaction: t });
    }

    await t.commit();
    return res.json({ message: "Product updated", product });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  try {
    const product = await Product.findByPk(id, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ error: "Product not found" });
    }

    await ProductDetail.destroy({ where: { product_id: id }, transaction: t });

    await Inventory.destroy({ where: { product_id: id }, transaction: t });

    await product.destroy({ transaction: t });

    await t.commit();
    return res.json({ message: "Product deleted" });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
};
