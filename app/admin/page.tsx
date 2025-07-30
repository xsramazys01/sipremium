"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Send,
  Package,
  CreditCard,
  Search,
  Eye,
  DollarSign,
  RefreshCw,
} from "lucide-react"

interface Order {
  id: string
  productId: number
  productName: string
  customerName: string
  customerPhone: string
  customerEmail: string
  amount: string
  numericAmount: number
  paymentMethod: string
  paymentAccount: string
  status: "pending" | "paid" | "delivered" | "expired" | "cancelled"
  createdAt: Date
  paidAt?: Date
  deliveredAt?: Date
  notes?: string
}

interface Stats {
  total: number
  pending: number
  paid: number
  delivered: number
  revenue: number
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, paid: 0, delivered: 0, revenue: 0 })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Simple admin authentication
  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAuthenticated(true)
      fetchData()
    } else {
      alert("Password salah!")
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch orders
      const ordersResponse = await fetch(`/api/orders?status=${statusFilter}`)
      const ordersData = await ordersResponse.json()
      if (ordersResponse.ok) {
        setOrders(ordersData.orders)
      }

      // Fetch stats
      const statsResponse = await fetch("/api/stats")
      const statsData = await statsResponse.json()
      if (statsResponse.ok) {
        setStats(statsData.stats)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [statusFilter, isAuthenticated])

  const openWhatsApp = (message: string, phoneNumber: string) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleMarkAsPaid = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "paid",
          notes: "Pembayaran dikonfirmasi oleh admin",
        }),
      })

      if (response.ok) {
        fetchData() // Refresh data
      } else {
        alert("Gagal mengupdate status order")
      }
    } catch (error) {
      console.error("Error updating order:", error)
      alert("Terjadi kesalahan saat mengupdate order")
    }
  }

  const handleDeliverProduct = async (order: Order) => {
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "delivered",
          notes: "Akun sudah dikirim via WhatsApp",
        }),
      })

      if (response.ok) {
        // Generate and send delivery message
        const deliveryMessage = await generateProductDeliveryMessage(order)
        openWhatsApp(deliveryMessage, order.customerPhone)
        fetchData() // Refresh data
      } else {
        alert("Gagal mengupdate status order")
      }
    } catch (error) {
      console.error("Error delivering product:", error)
      alert("Terjadi kesalahan saat mengirim produk")
    }
  }

  const generateProductDeliveryMessage = async (order: Order) => {
    try {
      const response = await fetch(`/api/product-accounts/${order.productId}`)
      const data = await response.json()

      if (!response.ok || !data.account) {
        return encodeURIComponent(`❌ Maaf, data produk ${order.productName} sedang tidak tersedia. 

Mohon hubungi admin SIPREMIUM untuk bantuan lebih lanjut.
WhatsApp: +6287777808021`)
      }

      const account = data.account
      const currentDate = new Date()
      const expiryDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)

      const message = `🎉 *PENGIRIMAN AKUN PREMIUM BERHASIL* 🎉

Terima kasih telah berbelanja di SIPREMIUM!
Berikut detail akun ${order.productName} Anda:

📱 *DETAIL AKUN PREMIUM*
• Produk: ${account.productName}
• Email/Username: ${account.username}
• Password: ${account.password}
• Profile Name: ${account.profileName}
• Login URL: ${account.loginUrl}

📅 *MASA AKTIF*
• Mulai: ${currentDate.toLocaleDateString("id-ID")}
• Berakhir: ${expiryDate.toLocaleDateString("id-ID")}
• Durasi: 30 hari penuh

🔧 *SPESIFIKASI AKUN*
• Max Devices: ${account.maxDevices} perangkat
• Supported: ${account.supportedDevices.slice(0, 3).join(", ")}${account.supportedDevices.length > 3 ? ", dll" : ""}

✨ *FITUR PREMIUM*
${account.features.map((feature: string) => `• ${feature}`).join("\n")}

ℹ️ *PANDUAN PENGGUNAAN*
${account.additionalInfo}

🛡️ *GARANSI & SUPPORT SIPREMIUM*
✅ Garansi 100% selama masa aktif
✅ Support 24/7 via WhatsApp
✅ Replacement gratis jika bermasalah
✅ Panduan lengkap setup & troubleshooting

⚠️ *PENTING - BACA SEBELUM DIGUNAKAN*
• Simpan data akun di tempat aman
• Jangan share ke orang lain
• Login sesuai batas device yang diizinkan
• Hubungi admin jika ada kendala
• Screenshot pesan ini sebagai bukti

🚀 *CARA LOGIN*
1. Buka: ${account.loginUrl}
2. Masukkan email: ${account.username}
3. Masukkan password: ${account.password}
4. Selamat menikmati fitur premium!

Terima kasih telah mempercayai SIPREMIUM! 
Jika ada pertanyaan, jangan ragu hubungi kami.

*SIPREMIUM - Your Trusted Premium Account Partner*
📱 WhatsApp: +6287777808021
⭐ Rating: 4.9/5 (15,000+ customers)
🛡️ Garansi: 100% Money Back Guarantee`

      return encodeURIComponent(message)
    } catch (error) {
      console.error("Error generating delivery message:", error)
      return encodeURIComponent(`❌ Terjadi kesalahan saat mengambil data akun. 

Mohon hubungi admin SIPREMIUM untuk bantuan.
WhatsApp: +6287777808021`)
    }
  }

  const handleSendReminder = (order: Order) => {
    const message = `⏰ *REMINDER PEMBAYARAN* ⏰

Halo! Pesanan ${order.productName} Anda masih menunggu pembayaran.

💳 *DETAIL PEMBAYARAN*
• Produk: ${order.productName}
• Total: ${order.amount}
• Metode: ${order.paymentMethod}

📤 *KIRIM BUKTI TRANSFER*
Setelah transfer, mohon kirim screenshot bukti pembayaran ke chat ini untuk verifikasi cepat.

⚡ *PROSES OTOMATIS*
• Verifikasi: 1-15 menit
• Pengiriman akun: Otomatis setelah verifikasi
• Support: 24/7 siap membantu

Butuh bantuan? Chat admin sekarang!

*SIPREMIUM - Fast & Reliable Service*`

    openWhatsApp(encodeURIComponent(message), order.customerPhone)
  }

  const handleCancelOrder = async (orderId: string) => {
    if (confirm("Yakin ingin membatalkan pesanan ini?")) {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "cancelled",
            notes: "Pesanan dibatalkan oleh admin",
          }),
        })

        if (response.ok) {
          fetchData() // Refresh data
        } else {
          alert("Gagal membatalkan order")
        }
      } catch (error) {
        console.error("Error cancelling order:", error)
        alert("Terjadi kesalahan saat membatalkan order")
      }
    }
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
      case "cancelled":
        return (
          <Badge className="bg-gray-500 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Admin login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <Button onClick={handleAdminLogin} className="w-full">
              Login
            </Button>
            <p className="text-sm text-gray-500 text-center">Demo password: admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Kelola pesanan dan verifikasi pembayaran</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Package className="w-4 h-4" />
              Total Orders
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              Pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.paid}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <CreditCard className="w-4 h-4" />
              Paid
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Delivered
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">Rp {stats.revenue.toLocaleString("id-ID")}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <DollarSign className="w-4 h-4" />
              Revenue
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by customer name, order ID, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button variant="outline" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading orders...</p>
            </CardContent>
          </Card>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found matching your criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="border-2 hover:border-purple-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{order.productName}</h3>
                      <p className="text-gray-600">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {order.customerName} • {order.customerPhone}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{order.amount}</div>
                    <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    <div className="text-xs text-gray-400">{order.paymentAccount}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Time</p>
                    <p className="font-medium">{order.createdAt.toLocaleString("id-ID")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Time</p>
                    <p className="font-medium">{order.paidAt ? order.paidAt.toLocaleString("id-ID") : "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Time</p>
                    <p className="font-medium">{order.deliveredAt ? order.deliveredAt.toLocaleString("id-ID") : "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="font-medium text-sm">{order.notes || "-"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {order.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleMarkAsPaid(order.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Paid
                      </Button>
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
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </Button>
                    </>
                  )}

                  {order.status === "paid" && (
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
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
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(order.id)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy ID
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                    onClick={() => openWhatsApp("Halo, ada yang bisa saya bantu?", order.customerPhone)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Order Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
                      <span className="text-gray-600">Payment Method:</span> {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="text-gray-600">Payment Account:</span> {selectedOrder.paymentAccount}
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
                      <span className="text-gray-600">Email:</span> {selectedOrder.customerEmail}
                    </p>
                    <p>
                      <span className="text-gray-600">Order Date:</span>{" "}
                      {selectedOrder.createdAt.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Order Timeline</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Order Created: {selectedOrder.createdAt.toLocaleString("id-ID")}</span>
                  </div>
                  {selectedOrder.paidAt && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Payment Confirmed: {selectedOrder.paidAt.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {selectedOrder.deliveredAt && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">
                        Product Delivered: {selectedOrder.deliveredAt.toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Admin Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.status === "pending" && (
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => {
                        handleMarkAsPaid(selectedOrder.id)
                        setIsModalOpen(false)
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Paid
                    </Button>
                  )}

                  {selectedOrder.status === "paid" && (
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => {
                        handleDeliverProduct(selectedOrder)
                        setIsModalOpen(false)
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Deliver Product
                    </Button>
                  )}

                  <Button variant="outline" onClick={() => handleSendReminder(selectedOrder)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Reminder
                  </Button>

                  <Button
                    variant="outline"
                    className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                    onClick={() =>
                      openWhatsApp("Halo, ada yang bisa saya bantu dengan pesanan Anda?", selectedOrder.customerPhone)
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Customer
                  </Button>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Notes</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
