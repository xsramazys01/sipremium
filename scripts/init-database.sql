-- Initialize SIPREMIUM Database Schema
-- Run this script to create all necessary tables

-- Create database (if using MySQL/PostgreSQL)
-- CREATE DATABASE sipremium_db;
-- USE sipremium_db;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- Price in rupiah (integer to avoid decimal issues)
    duration VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product accounts table (stores the actual account credentials)
CREATE TABLE IF NOT EXISTS product_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_name VARCHAR(255),
    login_url VARCHAR(500),
    additional_info TEXT,
    max_devices INTEGER DEFAULT 1,
    supported_devices TEXT, -- JSON array as text
    features TEXT, -- JSON array as text
    is_available BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(20) PRIMARY KEY, -- SP12345678 format
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_account_id INTEGER,
    amount INTEGER NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    payment_account VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, delivered, cancelled, expired
    notes TEXT,
    proof_image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME,
    delivered_at DATETIME,
    expires_at DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (product_account_id) REFERENCES product_accounts(id)
);

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(50) NOT NULL, -- bank, ewallet, qris, pulsa
    name VARCHAR(100) NOT NULL,
    account VARCHAR(100) NOT NULL,
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order logs table (for tracking status changes)
CREATE TABLE IF NOT EXISTS order_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id VARCHAR(20) NOT NULL,
    status_from VARCHAR(20),
    status_to VARCHAR(20) NOT NULL,
    notes TEXT,
    admin_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (admin_id) REFERENCES admin_users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_product_accounts_product_id ON product_accounts(product_id);
CREATE INDEX IF NOT EXISTS idx_product_accounts_available ON product_accounts(is_available);
