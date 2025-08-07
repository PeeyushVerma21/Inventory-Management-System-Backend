import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

import './models/User.js';
import './models/Product.js';
import './models/ProductDetail.js';
import './models/Inventory.js';
import './models/Supplier.js';
import './models/Shipment.js';
import './models/ShipmentDetail.js';
import './models/AuditLog.js';
import './models/_associations.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import supplierRoutes from './routes/suppliers.js';
import shipmentRoutes from './routes/shipments.js';
import salesRoutes from './routes/sales.js';
import auditLogRoutes from './routes/auditLogs.js';
import inventoryRoutes from './routes/inventory.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/inventory', inventoryRoutes);


app.get('/', (req, res) => res.json({ msg: "Inventory API running" }));

try {
  await sequelize.sync({ alter: true });
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on ${port}`));
} catch (err) {
  console.error('DB Connection Error:', err);
}
