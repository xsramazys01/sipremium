import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await DatabaseService.getOrder(params.id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const formattedOrder = {
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
    }

    return NextResponse.json({ order: formattedOrder })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, notes } = body

    await DatabaseService.updateOrderStatus(params.id, status, notes)

    // If marking as delivered, assign a product account
    if (status === "delivered") {
      const order = await DatabaseService.getOrder(params.id)
      if (order) {
        const account = await DatabaseService.getAvailableProductAccount(order.product_id)
        if (account) {
          await DatabaseService.assignProductAccountToOrder(params.id, account.id)
          await DatabaseService.markProductAccountAsUsed(account.id)
        }
      }
    }

    return NextResponse.json({ message: "Order updated successfully" })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
