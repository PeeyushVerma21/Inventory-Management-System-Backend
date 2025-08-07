# Inventory Management System - Backend

This is the backend API for a full-stack Inventory Management System designed to track products, stock levels, suppliers, shipments, and sales. The backend is built using **Node.js**, **Express**, and **MySQL** with **Sequelize** ORM.

---

## Features

- **User Authentication** (Registration, Login) with JWT and password hashing
- **Products Management** (CRUD) with detailed product info and inventory tracking
- **Suppliers Management** (CRUD)
- **Shipments**: Record incoming stock with atomic inventory update
- **Sales**: Record sales and decrement stock safely, preventing negative inventory
- **Inventory Alerts**: Low stock threshold alerts
- **Audit Logs**: Track important actions (stock updates, sales, CRUD actions)
- Full transactional integrity for operations affecting multiple tables
- Role-based access control support (admin, manager, staff)
- Secure API endpoints protected with JWT

---

## Tech Stack

- **Node.js** (ES6 modules)
- **Express.js**
- **Sequelize ORM** for MySQL
- **MySQL** relational database
- **jsonwebtoken (JWT)** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variable management

---

## Prerequisites

- Node.js >= 14
- MySQL server installed and running
- NPM (Node Package Manager)
- Postman or any API testing tool (optional, for testing)

---

## Getting Started

### 1. Clone the Repository

- git clone <your-repository-url>


### 2. Install Dependencies

- npm install


### 3. Setup Environment Variables

- Create a `.env` file with your MySQL credentials and other configs:

MYSQL_DATABASE=inventory_db

MYSQL_USER=root

MYSQL_PASSWORD=your_mysql_password

MYSQL_HOST=localhost

MYSQL_PORT=3306

JWT_SECRET=your_jwt_secret

PORT=5000


Make sure to replace values appropriately.

### 4. Create MySQL Database

Log into your MySQL server and create the database:

CREATE DATABASE inventory_db;


### 5. Run the Server




## API Endpoints Overview

All protected endpoints require a JWT token in the request header:


### Authentication

- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and receive JWT token

### Products

- `POST /api/products` — Create a product
- `GET /api/products` — List all products
- `GET /api/products/:id` — Get product details by ID
- `PUT /api/products/:id` — Update product by ID
- `DELETE /api/products/:id` — Delete product by ID

### Suppliers

- `POST /api/suppliers` — Create supplier
- `GET /api/suppliers` — List all suppliers
- `GET /api/suppliers/:id` — Get supplier by ID
- `PUT /api/suppliers/:id` — Update supplier
- `DELETE /api/suppliers/:id` — Delete supplier

### Shipments

- `POST /api/shipments` — Record incoming shipment with products and quantities (inventory updated)

### Sales

- `POST /api/sales` — Record a sale, decrement inventory safely

### Inventory

- `GET /api/inventory/low-stock?threshold=x` — List products with stock below threshold (default 10)

### Audit Logs

- `GET /api/audit-logs` — Retrieve audit logs (typically admin only)

---

## Project Structure

