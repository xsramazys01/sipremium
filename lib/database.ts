import { Database } from "sqlite3"
import { promisify } from "util"

// Database connection singleton
class DatabaseConnection {
  private static instance: DatabaseConnection
  private db: Database | null = null

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  public async connect(): Promise<Database> {
    if (this.db) {
      return this.db
    }

    return new Promise((resolve, reject) => {
      this.db = new Database("./sipremium.db", (err) => {
        if (err) {
          console.error("Error opening database:", err)
          reject(err)
        } else {
          console.log("Connected to SQLite database")
          resolve(this.db!)
        }
      })
    })
  }

  public async query(sql: string, params: any[] = []): Promise<any[]> {
    const db = await this.connect()
    const all = promisify(db.all.bind(db))
    return all(sql, params)
  }

  public async run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
    const db = await this.connect()
    const run = promisify(db.run.bind(db))
    return run(sql, params) as Promise<{ lastID: number; changes: number }>
  }

  public async get(sql: string, params: any[] = []): Promise<any> {
    const db = await this.connect()
    const get = promisify(db.get.bind(db))
    return get(sql, params)
  }

  public async close(): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db!.close((err) => {
          if (err) {
            reject(err)
          } else {
            this.db = null
            resolve()
          }
        })
      })
    }
  }
}

export const db = DatabaseConnection.getInstance()

// Database models and types
export interface Product {
  id: number
  name: string
  description: string
  price: number
  duration: string
  category: string
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductAccount {
  id: number
  product_id: number
  username: string
  password: string
  profile_name: string
  login_url: string
  additional_info: string
  max_devices: number
  supported_devices: string // JSON string
  features: string // JSON string
  is_available: boolean
  created_at: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_id: number
  product_id: number
  product_account_id?: number
  amount: number
  payment_method: string
  payment_account: string
  status: "pending" | "paid" | "delivered" | "cancelled" | "expired"
  notes?: string
  proof_image_url?: string
  created_at: string
  paid_at?: string
  delivered_at?: string
  expires_at?: string
  // Joined fields
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  product_name?: string
}

export interface PaymentMethod {
  id: number
  type: "bank" | "ewallet" | "qris" | "pulsa"
  name: string
  account: string
  is_popular: boolean
  is_active: boolean
  created_at: string
}

// Database service functions
export class DatabaseService {
  // Products
  static async getProducts(): Promise<Product[]> {
    return db.query("SELECT * FROM products WHERE is_active = true ORDER BY id")
  }

  static async getProduct(id: number): Promise<Product | null> {
    return db.get("SELECT * FROM products WHERE id = ? AND is_active = true", [id])
  }

  // Product Accounts
  static async getAvailableProductAccount(productId: number): Promise<ProductAccount | null> {
    return db.get("SELECT * FROM product_accounts WHERE product_id = ? AND is_available = true LIMIT 1", [productId])
  }

  static async markProductAccountAsUsed(accountId: number): Promise<void> {
    await db.run("UPDATE product_accounts SET is_available = false WHERE id = ?", [accountId])
  }

  static async markProductAccountAsAvailable(accountId: number): Promise<void> {
    await db.run("UPDATE product_accounts SET is_available = true WHERE id = ?", [accountId])
  }

  // Customers
  static async createCustomer(name: string, email: string, phone: string): Promise<number> {
    // Check if customer exists
    const existing = await db.get("SELECT id FROM customers WHERE phone = ?", [phone])
    if (existing) {
      return existing.id
    }

    const result = await db.run("INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)", [name, email, phone])
    return result.lastID
  }

  static async getCustomer(id: number): Promise<Customer | null> {
    return db.get("SELECT * FROM customers WHERE id = ?", [id])
  }

  // Orders
  static async createOrder(orderData: {
    id: string
    customerId: number
    productId: number
    amount: number
    paymentMethod: string
    paymentAccount: string
    notes?: string
  }): Promise<void> {
    await db.run(
      `INSERT INTO orders (id, customer_id, product_id, amount, payment_method, payment_account, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        orderData.id,
        orderData.customerId,
        orderData.productId,
        orderData.amount,
        orderData.paymentMethod,
        orderData.paymentAccount,
        orderData.notes || null,
      ],
    )
  }

  static async getOrders(status?: string): Promise<Order[]> {
    let query = `
      SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone, p.name as product_name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN products p ON o.product_id = p.id
    `
    const params: any[] = []

    if (status && status !== "all") {
      query += " WHERE o.status = ?"
      params.push(status)
    }

    query += " ORDER BY o.created_at DESC"

    return db.query(query, params)
  }

  static async getOrder(id: string): Promise<Order | null> {
    return db.get(
      `SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone, p.name as product_name
       FROM orders o
       JOIN customers c ON o.customer_id = c.id
       JOIN products p ON o.product_id = p.id
       WHERE o.id = ?`,
      [id],
    )
  }

  static async updateOrderStatus(orderId: string, status: Order["status"], notes?: string): Promise<void> {
    const updateFields = ["status = ?"]
    const params = [status]

    if (status === "paid") {
      updateFields.push("paid_at = CURRENT_TIMESTAMP")
    } else if (status === "delivered") {
      updateFields.push("delivered_at = CURRENT_TIMESTAMP")
    }

    if (notes) {
      updateFields.push("notes = ?")
      params.push(notes)
    }

    params.push(orderId)

    await db.run(`UPDATE orders SET ${updateFields.join(", ")} WHERE id = ?`, params)
  }

  static async assignProductAccountToOrder(orderId: string, accountId: number): Promise<void> {
    await db.run("UPDATE orders SET product_account_id = ? WHERE id = ?", [accountId, orderId])
  }

  // Payment Methods
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    return db.query("SELECT * FROM payment_methods WHERE is_active = true ORDER BY is_popular DESC, name")
  }

  static async getPaymentMethodsByType(type: string): Promise<PaymentMethod[]> {
    return db.query(
      "SELECT * FROM payment_methods WHERE type = ? AND is_active = true ORDER BY is_popular DESC, name",
      [type],
    )
  }

  // Statistics
  static async getOrderStats(): Promise<{
    total: number
    pending: number
    paid: number
    delivered: number
    revenue: number
  }> {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered,
        SUM(CASE WHEN status = 'delivered' THEN amount ELSE 0 END) as revenue
      FROM orders
    `)

    return {
      total: stats.total || 0,
      pending: stats.pending || 0,
      paid: stats.paid || 0,
      delivered: stats.delivered || 0,
      revenue: stats.revenue || 0,
    }
  }

  // Generate unique order ID
  static generateOrderId(): string {
    const timestamp = Date.now().toString().slice(-8)
    return `SP${timestamp}`
  }
}
