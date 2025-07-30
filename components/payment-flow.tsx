"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Smartphone, QrCode, Phone, Copy, CheckCircle, Clock, Building2, Zap } from "lucide-react"

interface PaymentFlowProps {
  product: {
    name: string
    price: string
    duration: string
    id: number
  }
  isOpen: boolean
  onClose: () => void
}

interface PaymentMethod {
  id: string
  name: string
  account: string
  popular: boolean
}

interface PaymentMethods {
  bank: PaymentMethod[]
  ewallet: PaymentMethod[]
  qris?: PaymentMethod[]
  pulsa?: PaymentMethod[]
}

const createOrder = async (product: any, paymentMethod: string, accountInfo: string) => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        customerName: "Customer", // In real app, get from form
        customerEmail: "customer@example.com", // In real app, get from form
        customerPhone: "6281234567890", // In real app, get from form
        paymentMethod,
        paymentAccount: accountInfo,
      }),
    })

    const data = await response.json()
    if (response.ok) {
      return data.orderId
    } else {
      console.error("Failed to create order:", data.error)
      return `SP${Date.now().toString().slice(-8)}` // Fallback
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return `SP${Date.now().toString().slice(-8)}` // Fallback
  }
}

const generateWhatsAppMessage = async (paymentMethod: string, accountInfo: string, product: any) => {
  const orderId = await createOrder(product, paymentMethod, accountInfo)

  const baseMessage = `🛒 *PESANAN BARU SIPREMIUM* 🛒

Halo Admin! Saya ingin membeli produk berikut:

📋 *DETAIL PESANAN*
• Order ID: ${orderId}
• Produk: ${product.name}
• Paket: ${product.duration}
• Harga: ${product.price}
• Waktu Order: ${new Date().toLocaleString("id-ID")}

💳 *METODE PEMBAYARAN*
• Pilihan: ${paymentMethod}
• ${paymentMethod.includes("Bank") ? "Rekening Tujuan" : "Nomor Tujuan"}: ${accountInfo}

📝 *LANGKAH SELANJUTNYA*
1. Saya akan melakukan pembayaran sesuai nominal
2. Setelah transfer, saya akan kirim bukti ke chat ini
3. Mohon admin verifikasi pembayaran
4. Kirim akun premium setelah terverifikasi

⚡ *HARAPAN CUSTOMER*
• Verifikasi cepat (1-15 menit)
• Akun premium original & berkualitas
• Support jika ada kendala

Terima kasih admin! Ditunggu konfirmasinya 🙏

*Customer: SIPREMIUM*`

  return encodeURIComponent(baseMessage)
}

const generatePaymentConfirmationMessage = (paymentMethod: string, product: any) => {
  const message = `✅ *KONFIRMASI PEMBAYARAN* ✅

Halo Admin SIPREMIUM!

Saya sudah melakukan pembayaran untuk:

🛒 *DETAIL PESANAN*
• Produk: ${product.name}
• Paket: ${product.duration}
• Total: ${product.price}

💳 *DETAIL PEMBAYARAN*
• Metode: ${paymentMethod}
• Waktu Transfer: ${new Date().toLocaleString("id-ID")}
• Status: ✅ SUDAH TRANSFER

📤 *BUKTI TRANSFER*
Bukti transfer akan saya kirim setelah pesan ini.
Mohon segera diverifikasi dan proses pesanan saya.

⏰ *REQUEST*
• Mohon verifikasi dalam 15 menit
• Kirim akun premium setelah terverifikasi
• Berikan panduan login yang lengkap

Terima kasih admin! 😊

*Customer: SIPREMIUM*`

  return encodeURIComponent(message)
}

const generateProductDeliveryMessage = async (product: any, productId: number) => {
  try {
    const response = await fetch(`/api/product-accounts/${productId}`)
    const data = await response.json()

    if (!response.ok || !data.account) {
      return encodeURIComponent(`❌ Maaf, data produk ${product.name} sedang tidak tersedia. 

Mohon hubungi admin SIPREMIUM untuk bantuan lebih lanjut.
WhatsApp: +6287777808021`)
    }

    const account = data.account
    const currentDate = new Date()
    const expiryDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)

    const message = `🎉 *PENGIRIMAN AKUN PREMIUM BERHASIL* 🎉

Terima kasih telah berbelanja di SIPREMIUM!
Berikut detail akun ${product.name} Anda:

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

const openWhatsApp = (message: string) => {
  const phoneNumber = "6287777808021"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappUrl, "_blank")
}

export default function PaymentFlow({ product, isOpen, onClose }: PaymentFlowProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>({ bank: [], ewallet: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      fetchPaymentMethods()
    }
  }, [isOpen])

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/payment-methods")
      const data = await response.json()
      if (response.ok) {
        setPaymentMethods(data.paymentMethods)
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(id)
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Pilih Metode Pembayaran</DialogTitle>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="flex items-center justify-center gap-4 mt-2">
                <Badge className="bg-blue-100 text-blue-700">{product.duration}</Badge>
                <span className="text-2xl font-bold text-purple-600">{product.price}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <Tabs defaultValue="bank" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bank" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Bank
              </TabsTrigger>
              <TabsTrigger value="ewallet" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                E-Wallet
              </TabsTrigger>
              <TabsTrigger value="qris" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                QRIS
              </TabsTrigger>
              <TabsTrigger value="pulsa" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Pulsa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bank" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {paymentMethods.bank.map((method) => (
                  <Card
                    key={method.id}
                    className={`border-2 ${method.popular ? "border-orange-300 bg-orange-50" : "border-gray-200"}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        {method.popular && <Badge className="bg-orange-500 text-white">Popular</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Nomor Rekening</p>
                          <p className="font-mono font-bold">{method.account}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(method.account, method.id)}>
                          {copiedAccount === method.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          onClick={async () => {
                            const message = await generateWhatsAppMessage(method.name, method.account, product)
                            openWhatsApp(message)
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Pesan via WhatsApp
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                          onClick={() => {
                            const message = generatePaymentConfirmationMessage(method.name, product)
                            openWhatsApp(message)
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Sudah Transfer
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                          onClick={async () => {
                            const deliveryMessage = await generateProductDeliveryMessage(product, product.id)
                            openWhatsApp(deliveryMessage)
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Kirim Akun Otomatis (Demo)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ewallet" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {paymentMethods.ewallet.map((method) => (
                  <Card
                    key={method.id}
                    className={`border-2 ${method.popular ? "border-green-300 bg-green-50" : "border-gray-200"}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        {method.popular && <Badge className="bg-green-500 text-white">Popular</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Nomor HP</p>
                          <p className="font-mono font-bold">{method.account}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(method.account, method.id)}>
                          {copiedAccount === method.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          onClick={async () => {
                            const message = await generateWhatsAppMessage(method.name, method.account, product)
                            openWhatsApp(message)
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Pesan via WhatsApp
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                          onClick={() => {
                            const message = generatePaymentConfirmationMessage(method.name, product)
                            openWhatsApp(message)
                          }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Sudah Transfer
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                          onClick={async () => {
                            const deliveryMessage = await generateProductDeliveryMessage(product, product.id)
                            openWhatsApp(deliveryMessage)
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Kirim Akun Otomatis (Demo)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qris" className="mt-6">
              <Card className="border-2 border-blue-300 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <QrCode className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">QRIS Payment</h3>
                  <p className="text-gray-600 mb-6">QR Code akan diberikan setelah konfirmasi pesanan</p>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      onClick={async () => {
                        const message = await generateWhatsAppMessage("QRIS", "QR Code Request", product)
                        openWhatsApp(message)
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Minta QR Code
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                      onClick={async () => {
                        const deliveryMessage = await generateProductDeliveryMessage(product, product.id)
                        openWhatsApp(deliveryMessage)
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Kirim Akun Otomatis (Demo)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pulsa" className="mt-6">
              <Card className="border-2 border-orange-300 bg-orange-50">
                <CardContent className="p-6 text-center">
                  <Phone className="w-20 h-20 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Transfer Pulsa</h3>
                  <p className="text-gray-600 mb-6">Hubungi admin untuk konfirmasi nominal pulsa yang tepat</p>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      onClick={async () => {
                        const message = await generateWhatsAppMessage("Transfer Pulsa", "081234567890", product)
                        openWhatsApp(message)
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Konfirmasi via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                      onClick={async () => {
                        const deliveryMessage = await generateProductDeliveryMessage(product, product.id)
                        openWhatsApp(deliveryMessage)
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Kirim Akun Otomatis (Demo)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800 text-sm">Catatan Penting:</p>
              <p className="text-yellow-700 text-sm">
                Setelah melakukan pembayaran, segera kirim bukti transfer ke WhatsApp admin untuk proses verifikasi yang
                lebih cepat. Admin akan memverifikasi dan mengirim akun premium dalam 1-15 menit.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
