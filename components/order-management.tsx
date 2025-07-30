"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, CheckCircle, Clock, AlertCircle, Copy, Send, Package, CreditCard } from "lucide-react"
import { generateProductDeliveryMessage, generatePaymentReminderMessage } from "./product-data"

interface Order {
  id: string
  productId: number
  productName: string
  customerName: string
  customerPhone: string
  amount: string
  paymentMethod: string
  status: "pending" | "paid" | "delivered" | "expired"
  createdAt: Date
  paidAt?: Date
  deliveredAt?: Date
}

// Demo orders data - in real app this would come from database
const demoOrders: Order[] = [
  {
    id: "SP12345678",
    productId: 1,
    productName: "Netflix Premium",
    customerName: "John Doe",
    customerPhone: "6281234567890",
    amount: "Rp 25.000",
    paymentMethod: "Bank BCA",
    status: "pending",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "SP12345679",
    productId: 2,
    productName: "Spotify Premium",
    customerName: "Jane Smith",
    customerPhone: "6281234567891",
    amount: "Rp 15.000",
    paymentMethod: "OVO",
    status: "paid",
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    paidAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
  {
    id: "SP12345680",
    productId: 5,
    productName: "ChatGPT Plus",
    customerName: "Bob Wilson",
    customerPhone: "6281234567892",
    amount: "Rp 85.000",
    paymentMethod: "DANA",
    status: "delivered",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    paidAt: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    deliveredAt: new Date(Date.now() - 85 * 60 * 1000), // 1 hour 25 minutes ago
  },
]

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(demoOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openWhatsApp = (message: string, phoneNumber: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleDeliverProduct = (order: Order) => {
    const product = { name: order.productName, duration: "1 Bulan" }
    const deliveryMessage = generateProductDeliveryMessage(product, order.productId)
    openWhatsApp(deliveryMessage, order.customerPhone)

    // Update order status
    setOrders(
      orders.map((o) => (o.id === order.id ? { ...o, status: "delivered" as const, deliveredAt: new Date() } : o)),
    )
  }

  const handleSendReminder = (order: Order) => {
    const product = { name: order.productName }
    const reminderMessage = generatePaymentReminderMessage(product, order.paymentMethod)
    openWhatsApp(reminderMessage, order.customerPhone)
  }

  const handleMarkAsPaid = (order: Order) => {
    setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "paid" as const, paidAt: new Date() } : o)))
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "paid":
        return (
          <Badge className="bg-blue-500 text-white">
            <CreditCard className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Delivered
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-red-500 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
        <p className="text-gray-600">Kelola pesanan dan pengiriman akun premium secara otomatis</p>
      </div>

      {/* Order Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending Payment</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.filter((o) => o.status === "paid").length}</div>
            <div className="text-sm text-gray-600">Ready to Deliver</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
            <div className="text-sm text-gray-600">Delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-2 hover:border-purple-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{order.productName}</h3>
                    <p className="text-gray-600">Order #{order.id}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{order.amount}</div>
                  <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Time</p>
                  <p className="font-medium">{order.createdAt.toLocaleString("id-ID")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status Timeline</p>
                  <div className="text-sm">
                    {order.paidAt && <p className="text-green-600">✅ Paid: {order.paidAt.toLocaleString("id-ID")}</p>}
                    {order.deliveredAt && (
                      <p className="text-blue-600">📦 Delivered: {order.deliveredAt.toLocaleString("id-ID")}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {order.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                      onClick={() => handleSendReminder(order)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleMarkAsPaid(order)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Paid
                    </Button>
                  </>
                )}

                {order.status === "paid" && (
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleDeliverProduct(order)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Deliver Product
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedOrder(order)
                    setIsModalOpen(true)
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  View Details
                </Button>

                <Button size="sm" variant="outline" onClick={() => copyToClipboard(order.id)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy ID
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Product Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Product:</span> {selectedOrder.productName}
                    </p>
                    <p>
                      <span className="text-gray-600">Amount:</span> {selectedOrder.amount}
                    </p>
                    <p>
                      <span className="text-gray-600">Payment:</span> {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="text-gray-600">Status:</span> {getStatusBadge(selectedOrder.status)}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Name:</span> {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="text-gray-600">Phone:</span> {selectedOrder.customerPhone}
                    </p>
                    <p>
                      <span className="text-gray-600">Order Date:</span>{" "}
                      {selectedOrder.createdAt.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      const product = { name: selectedOrder.productName, duration: "1 Bulan" }
                      const deliveryMessage = generateProductDeliveryMessage(product, selectedOrder.productId)
                      openWhatsApp(deliveryMessage, selectedOrder.customerPhone)
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Product Now
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      const product = { name: selectedOrder.productName }
                      const reminderMessage = generatePaymentReminderMessage(product, selectedOrder.paymentMethod)
                      openWhatsApp(reminderMessage, selectedOrder.customerPhone)
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
