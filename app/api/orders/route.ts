import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const orders = await DatabaseService.getOrders(status || undefined)

    // Format orders for frontend
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      productId: order.product_id,
      productName: order.product_name,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerEmail: order.customer_email,
      amount: `Rp ${order.amount.toLocaleString("id-ID")}`,
      numericAmount: order.amount,
      paymentMethod: order.payment_method,
      paymentAccount: order.payment_account,
      status: order.status,
      notes: order.notes,
      createdAt: new Date(order.created_at),
      paidAt: order.paid_at ? new Date(order.paid_at) : undefined,
      deliveredAt: order.delivered_at ? new Date(order.delivered_at) : undefined,
    }))

    return NextResponse.json({ orders: formattedOrders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, customerName, customerEmail, customerPhone, paymentMethod, paymentAccount } = body

    // Get product details
    const product = await DatabaseService.getProduct(productId)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Create or get customer
    const customerId = await DatabaseService.createCustomer(customerName, customerEmail, customerPhone)

    // Generate order ID
    const orderId = DatabaseService.generateOrderId()

    // Create order
    await DatabaseService.createOrder({
      id: orderId,
      customerId,
      productId,
      amount: product.price,
      paymentMethod,
      paymentAccount,
      notes: "Order created via website",
    })

    return NextResponse.json({
      orderId,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
