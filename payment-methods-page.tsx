"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  MessageCircle,
  HelpCircle,
  Search,
  Shield,
  CreditCard,
  Smartphone,
  Building2,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  QrCode,
  Wallet,
  Phone,
  Globe,
  Star,
  Users,
  TrendingUp,
} from "lucide-react"
import Logo from "./components/logo"
import Footer from "./components/footer"

// WhatsApp helper functions
const generateWhatsAppMessage = (paymentMethod: string, accountInfo: string, productName?: string, amount?: string) => {
  const baseMessage = `Halo Admin SIPREMIUM! 👋

Saya ingin melakukan pembayaran dengan detail berikut:

📱 *INFORMASI PEMBAYARAN*
• Metode: ${paymentMethod}
• ${paymentMethod.includes("Bank") ? "Rekening Tujuan" : "Nomor Tujuan"}: ${accountInfo}
${productName ? `• Produk: ${productName}` : ""}
${amount ? `• Total: ${amount}` : ""}

Mohon konfirmasi dan berikan instruksi selanjutnya.
Terima kasih! 🙏`

  return encodeURIComponent(baseMessage)
}

const generatePaymentConfirmationMessage = (paymentMethod: string, amount: string, productName?: string) => {
  const message = `Halo Admin SIPREMIUM! ✅

Saya sudah melakukan pembayaran dengan detail:

💳 *KONFIRMASI PEMBAYARAN*
• Metode: ${paymentMethod}
• Total: ${amount}
${productName ? `• Produk: ${productName}` : ""}
• Waktu Transfer: ${new Date().toLocaleString("id-ID")}

Bukti transfer akan saya kirim setelah pesan ini.
Mohon segera diproses ya! 🙏

Terima kasih! 😊`

  return encodeURIComponent(message)
}

const openWhatsApp = (message: string) => {
  const phoneNumber = "6287777808021" // Remove + and spaces
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappUrl, "_blank")
}

const bankTransferMethods = [
  {
    id: "bca",
    name: "Bank BCA",
    logo: "/placeholder.svg?height=40&width=80&text=BCA",
    accountNumber: "1234567890",
    accountName: "SIPREMIUM STORE",
    processingTime: "1-15 menit",
    fee: "Gratis",
    popular: true,
    instructions: [
      "Login ke BCA Mobile atau Internet Banking",
      "Pilih menu Transfer > Transfer ke BCA",
      "Masukkan nomor rekening: 1234567890",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi transfer dan simpan bukti",
      "Kirim bukti transfer ke WhatsApp admin",
    ],
  },
  {
    id: "bri",
    name: "Bank BRI",
    logo: "/placeholder.svg?height=40&width=80&text=BRI",
    accountNumber: "0987654321",
    accountName: "SIPREMIUM STORE",
    processingTime: "1-15 menit",
    fee: "Gratis",
    popular: false,
    instructions: [
      "Login ke BRI Mobile atau Internet Banking",
      "Pilih menu Transfer > Transfer ke BRI",
      "Masukkan nomor rekening: 0987654321",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi transfer dan simpan bukti",
      "Kirim bukti transfer ke WhatsApp admin",
    ],
  },
  {
    id: "bni",
    name: "Bank BNI",
    logo: "/placeholder.svg?height=40&width=80&text=BNI",
    accountNumber: "1122334455",
    accountName: "SIPREMIUM STORE",
    processingTime: "1-15 menit",
    fee: "Gratis",
    popular: false,
    instructions: [
      "Login ke BNI Mobile Banking",
      "Pilih menu Transfer > Transfer ke BNI",
      "Masukkan nomor rekening: 1122334455",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi transfer dan simpan bukti",
      "Kirim bukti transfer ke WhatsApp admin",
    ],
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    logo: "/placeholder.svg?height=40&width=80&text=Mandiri",
    accountNumber: "9988776655",
    accountName: "SIPREMIUM STORE",
    processingTime: "1-15 menit",
    fee: "Gratis",
    popular: false,
    instructions: [
      "Login ke Mandiri Online atau Livin'",
      "Pilih menu Transfer > Transfer ke Mandiri",
      "Masukkan nomor rekening: 9988776655",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi transfer dan simpan bukti",
      "Kirim bukti transfer ke WhatsApp admin",
    ],
  },
]

const ewalletMethods = [
  {
    id: "ovo",
    name: "OVO",
    logo: "/placeholder.svg?height=40&width=80&text=OVO",
    phoneNumber: "081234567890",
    processingTime: "Instan",
    fee: "Gratis",
    popular: true,
    instructions: [
      "Buka aplikasi OVO di smartphone",
      "Pilih menu Transfer > Ke Nomor HP",
      "Masukkan nomor: 081234567890",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi dengan PIN OVO",
      "Screenshot bukti transfer dan kirim ke admin",
    ],
  },
  {
    id: "gopay",
    name: "GoPay",
    logo: "/placeholder.svg?height=40&width=80&text=GoPay",
    phoneNumber: "081234567890",
    processingTime: "Instan",
    fee: "Gratis",
    popular: true,
    instructions: [
      "Buka aplikasi Gojek",
      "Pilih GoPay > Transfer",
      "Masukkan nomor: 081234567890",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi dengan PIN GoPay",
      "Screenshot bukti transfer dan kirim ke admin",
    ],
  },
  {
    id: "dana",
    name: "DANA",
    logo: "/placeholder.svg?height=40&width=80&text=DANA",
    phoneNumber: "081234567890",
    processingTime: "Instan",
    fee: "Gratis",
    popular: true,
    instructions: [
      "Buka aplikasi DANA",
      "Pilih Kirim > Ke Teman",
      "Masukkan nomor: 081234567890",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi dengan PIN DANA",
      "Screenshot bukti transfer dan kirim ke admin",
    ],
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    logo: "/placeholder.svg?height=40&width=80&text=ShopeePay",
    phoneNumber: "081234567890",
    processingTime: "Instan",
    fee: "Gratis",
    popular: false,
    instructions: [
      "Buka aplikasi Shopee",
      "Pilih ShopeePay > Transfer",
      "Masukkan nomor: 081234567890",
      "Masukkan nominal sesuai total pembayaran",
      "Konfirmasi dengan PIN ShopeePay",
      "Screenshot bukti transfer dan kirim ke admin",
    ],
  },
]

const qrisMethod = {
  id: "qris",
  name: "QRIS (Quick Response Code Indonesian Standard)",
  logo: "/placeholder.svg?height=60&width=120&text=QRIS",
  processingTime: "Instan",
  fee: "Gratis",
  supportedApps: ["OVO", "GoPay", "DANA", "ShopeePay", "LinkAja", "Bank Mobile Apps"],
  instructions: [
    "Buka aplikasi e-wallet atau mobile banking favorit Anda",
    "Pilih menu Scan QR atau Bayar dengan QR",
    "Scan QR Code yang diberikan admin",
    "Masukkan nominal sesuai total pembayaran",
    "Konfirmasi pembayaran dengan PIN",
    "Screenshot bukti pembayaran dan kirim ke admin",
  ],
}

const pulsaMethod = {
  id: "pulsa",
  name: "Pulsa & Paket Data",
  logo: "/placeholder.svg?height=40&width=80&text=Pulsa",
  phoneNumber: "081234567890",
  processingTime: "1-5 menit",
  fee: "Gratis",
  supportedProviders: ["Telkomsel", "Indosat", "XL", "Tri", "Smartfren"],
  instructions: [
    "Dial *858# atau buka aplikasi provider Anda",
    "Pilih menu Transfer Pulsa",
    "Masukkan nomor tujuan: 081234567890",
    "Masukkan nominal pulsa sesuai kesepakatan",
    "Konfirmasi transfer dengan PIN",
    "Screenshot bukti transfer dan kirim ke admin",
  ],
}

const paymentStats = [
  {
    icon: Users,
    title: "15,000+",
    subtitle: "Transaksi Berhasil",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "< 15 Menit",
    subtitle: "Rata-rata Proses",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "100%",
    subtitle: "Keamanan Terjamin",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "99.8%",
    subtitle: "Success Rate",
    color: "from-orange-500 to-red-500",
  },
]

const paymentTips = [
  {
    icon: CheckCircle,
    title: "Pastikan Nominal Tepat",
    description: "Transfer sesuai dengan nominal yang tertera untuk mempercepat verifikasi",
  },
  {
    icon: Clock,
    title: "Kirim Bukti Transfer",
    description: "Segera kirim screenshot bukti transfer ke WhatsApp admin setelah pembayaran",
  },
  {
    icon: Shield,
    title: "Simpan Bukti Pembayaran",
    description: "Simpan bukti transfer sebagai dokumentasi dan untuk keperluan garansi",
  },
  {
    icon: MessageCircle,
    title: "Hubungi Admin Jika Bermasalah",
    description: "Jangan ragu menghubungi customer service jika ada kendala pembayaran",
  },
]

export default function PaymentMethodsPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(id)
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link href="/catalog" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <Search className="w-4 h-4" />
                Katalog
              </Link>
              <Link href="/testimoni" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <MessageCircle className="w-4 h-4" />
                Testimoni
              </Link>
              <Link href="/faq" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Link>
              <Link href="/garansi" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <Shield className="w-4 h-4" />
                Garansi
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-600">Metode</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pembayaran
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih metode pembayaran yang paling nyaman untuk Anda. Semua metode pembayaran aman, cepat, dan tanpa biaya
            tambahan.
          </p>
        </div>

        {/* Payment Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {paymentStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="text-center border-2 border-purple-100 hover:border-purple-300 transition-colors"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{stat.title}</div>
                  <div className="text-gray-600 text-sm">{stat.subtitle}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Payment Methods Tabs */}
        <Tabs defaultValue="bank" className="max-w-6xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Bank Transfer
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

          {/* Bank Transfer */}
          <TabsContent value="bank">
            <div className="grid md:grid-cols-2 gap-6">
              {bankTransferMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`border-2 transition-all hover:shadow-lg ${
                    method.popular
                      ? "border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50"
                      : "border-purple-100"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={method.logo || "/placeholder.svg"}
                          alt={method.name}
                          className="h-10 w-auto object-contain"
                        />
                        <div>
                          <CardTitle className="text-lg">{method.name}</CardTitle>
                          {method.popular && <Badge className="bg-orange-500 text-white mt-1">Popular</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">Nomor Rekening</p>
                          <p className="font-mono font-bold text-lg">{method.accountNumber}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(method.accountNumber, method.id)}
                          className="bg-transparent"
                        >
                          {copiedAccount === method.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Atas Nama</p>
                        <p className="font-semibold">{method.accountName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Proses</p>
                          <p className="font-semibold text-sm">{method.processingTime}</p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <Wallet className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Biaya Admin</p>
                          <p className="font-semibold text-sm">{method.fee}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Cara Transfer:
                    </h4>
                    <ol className="space-y-2 text-sm text-gray-600 mb-4">
                      {method.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>

                    {/* WhatsApp Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        onClick={() => {
                          const message = generateWhatsAppMessage(
                            method.name,
                            method.accountNumber,
                            "Produk yang akan dibeli",
                            "Rp XX.XXX",
                          )
                          openWhatsApp(message)
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Konfirmasi Pembayaran via WhatsApp
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                        onClick={() => {
                          const message = generatePaymentConfirmationMessage(
                            method.name,
                            "Rp XX.XXX",
                            "Produk yang dibeli",
                          )
                          openWhatsApp(message)
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Sudah Transfer? Kirim Bukti
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* E-Wallet */}
          <TabsContent value="ewallet">
            <div className="grid md:grid-cols-2 gap-6">
              {ewalletMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`border-2 transition-all hover:shadow-lg ${
                    method.popular
                      ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50"
                      : "border-purple-100"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={method.logo || "/placeholder.svg"}
                          alt={method.name}
                          className="h-10 w-auto object-contain"
                        />
                        <div>
                          <CardTitle className="text-lg">{method.name}</CardTitle>
                          {method.popular && <Badge className="bg-green-500 text-white mt-1">Popular</Badge>}
                        </div>
                      </div>
                      <Zap className="w-6 h-6 text-yellow-500" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">Nomor HP</p>
                          <p className="font-mono font-bold text-lg">{method.phoneNumber}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(method.phoneNumber, method.id)}
                          className="bg-transparent"
                        >
                          {copiedAccount === method.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Proses</p>
                          <p className="font-semibold text-sm">{method.processingTime}</p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <Wallet className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Biaya Admin</p>
                          <p className="font-semibold text-sm">{method.fee}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Cara Transfer:
                    </h4>
                    <ol className="space-y-2 text-sm text-gray-600 mb-4">
                      {method.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>

                    {/* WhatsApp Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        onClick={() => {
                          const message = generateWhatsAppMessage(
                            method.name,
                            method.phoneNumber,
                            "Produk yang akan dibeli",
                            "Rp XX.XXX",
                          )
                          openWhatsApp(message)
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Konfirmasi Pembayaran via WhatsApp
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                        onClick={() => {
                          const message = generatePaymentConfirmationMessage(
                            method.name,
                            "Rp XX.XXX",
                            "Produk yang dibeli",
                          )
                          openWhatsApp(message)
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Sudah Transfer? Kirim Bukti
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* QRIS */}
          <TabsContent value="qris">
            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl">{qrisMethod.name}</CardTitle>
                <p className="text-gray-600">Satu QR Code untuk semua aplikasi pembayaran digital</p>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-white p-6 rounded-lg border-2 border-dashed border-blue-300 text-center mb-6">
                      <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">QR Code akan diberikan setelah konfirmasi pesanan</p>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        onClick={() => {
                          const message = generateWhatsAppMessage(
                            "QRIS",
                            "QR Code Request",
                            "Produk yang akan dibeli",
                            "Rp XX.XXX",
                          )
                          openWhatsApp(message)
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Minta QR Code via WhatsApp
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">Proses</p>
                        <p className="font-semibold">{qrisMethod.processingTime}</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Wallet className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-xs text-gray-600">Biaya Admin</p>
                        <p className="font-semibold">{qrisMethod.fee}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Aplikasi yang Didukung:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {qrisMethod.supportedApps.map((app, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg border">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">{app}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Cara Pembayaran:
                    </h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                      {qrisMethod.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pulsa */}
          <TabsContent value="pulsa">
            <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl">{pulsaMethod.name}</CardTitle>
                <p className="text-gray-600">Bayar menggunakan pulsa atau paket data Anda</p>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div>
                          <p className="text-sm text-gray-600">Nomor Tujuan</p>
                          <p className="font-mono font-bold text-lg">{pulsaMethod.phoneNumber}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(pulsaMethod.phoneNumber, pulsaMethod.id)}
                          className="bg-transparent"
                        >
                          {copiedAccount === pulsaMethod.id ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <p className="text-xs text-gray-600">Proses</p>
                          <p className="font-semibold">{pulsaMethod.processingTime}</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <Wallet className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <p className="text-xs text-gray-600">Biaya Admin</p>
                          <p className="font-semibold">{pulsaMethod.fee}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-yellow-800 text-sm">Catatan Penting:</p>
                          <p className="text-yellow-700 text-sm">
                            Nominal pulsa akan disesuaikan dengan harga produk. Hubungi admin untuk konfirmasi nominal
                            yang tepat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-orange-500" />
                      Provider yang Didukung:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {pulsaMethod.supportedProviders.map((provider, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg border">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">{provider}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Cara Transfer Pulsa:
                    </h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                      {pulsaMethod.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Tips */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tips Pembayaran</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ikuti tips berikut untuk memastikan proses pembayaran berjalan lancar dan cepat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-gray-800">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Butuh Bantuan Pembayaran?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Tim customer service kami siap membantu Anda memilih metode pembayaran yang tepat dan memandu proses
              pembayaran dari awal hingga selesai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                onClick={() => {
                  const message = encodeURIComponent(`Halo Admin SIPREMIUM! 👋

Saya butuh bantuan terkait pembayaran.
Mohon bantuannya ya! 🙏`)
                  openWhatsApp(message)
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: +6287777808021
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Panduan Pembayaran
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response: {"< 5 Menit"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Rating 4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>100% Aman</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
