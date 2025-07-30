"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Home,
  MessageCircle,
  HelpCircle,
  Search,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  CreditCard,
  Package,
  Download,
  RefreshCw,
} from "lucide-react"
import Logo from "./components/logo"
import Footer from "./components/footer"

const sampleTransactions = [
  {
    id: "TRX001234567",
    date: "2024-01-15",
    product: "Netflix Premium",
    package: "3 Bulan",
    amount: "Rp 65.000",
    status: "completed",
    paymentMethod: "BCA Transfer",
    accountDelivered: true,
    expiryDate: "2024-04-15",
  },
  {
    id: "TRX001234568",
    date: "2024-01-14",
    product: "Spotify Premium",
    package: "1 Bulan",
    amount: "Rp 15.000",
    status: "completed",
    paymentMethod: "OVO",
    accountDelivered: true,
    expiryDate: "2024-02-14",
  },
  {
    id: "TRX001234569",
    date: "2024-01-13",
    product: "ChatGPT Plus",
    package: "1 Bulan",
    amount: "Rp 85.000",
    status: "pending",
    paymentMethod: "DANA",
    accountDelivered: false,
    expiryDate: null,
  },
]

const statusConfig = {
  completed: {
    label: "Selesai",
    color: "bg-green-500",
    icon: CheckCircle,
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },
  pending: {
    label: "Menunggu Pembayaran",
    color: "bg-yellow-500",
    icon: Clock,
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
  },
  processing: {
    label: "Diproses",
    color: "bg-blue-500",
    icon: RefreshCw,
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  failed: {
    label: "Gagal",
    color: "bg-red-500",
    icon: XCircle,
    textColor: "text-red-700",
    bgColor: "bg-red-50",
  },
}

export default function CekTransaksiPage() {
  const [transactionId, setTransactionId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setSearchError("")
    setSearchResult(null)

    // Simulate API call
    setTimeout(() => {
      const found = sampleTransactions.find((tx) => tx.id === transactionId || phoneNumber.includes("812345"))

      if (found) {
        setSearchResult(found)
      } else {
        setSearchError("Transaksi tidak ditemukan. Periksa kembali ID transaksi atau nomor WhatsApp Anda.")
      }
      setIsSearching(false)
    }, 1500)
  }

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
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
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-blue-600">Cek</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Status Transaksi
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lacak status pembelian Anda dengan mudah. Masukkan ID transaksi atau nomor WhatsApp yang digunakan saat
            pembelian.
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-8 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Search className="w-6 h-6 text-purple-600" />
              Lacak Transaksi Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Transaksi</label>
                <Input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Contoh: TRX001234567"
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
                <p className="text-xs text-gray-500 mt-1">ID transaksi dikirimkan via WhatsApp setelah pembayaran</p>
              </div>

              <div className="text-center text-gray-500 font-medium">ATAU</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 08123456789"
                  className="border-2 border-purple-200 focus:border-purple-400"
                />
                <p className="text-xs text-gray-500 mt-1">Nomor WhatsApp yang digunakan saat pembelian</p>
              </div>

              {searchError && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{searchError}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSearching || (!transactionId && !phoneNumber)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Mencari...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Cek Status Transaksi
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search Result */}
        {searchResult && (
          <Card className="max-w-4xl mx-auto border-2 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-6 h-6 text-purple-600" />
                  Detail Transaksi
                </CardTitle>
                <Badge className={`${getStatusConfig(searchResult.status).color} text-white px-3 py-1`}>
                  {getStatusConfig(searchResult.status).label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transaction Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID Transaksi</label>
                    <p className="text-lg font-semibold text-gray-800">{searchResult.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tanggal Pembelian</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-800">{searchResult.date}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Produk</label>
                    <p className="text-lg font-semibold text-gray-800">
                      {searchResult.product} - {searchResult.package}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Total Pembayaran</label>
                    <p className="text-2xl font-bold text-purple-600">{searchResult.amount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Metode Pembayaran</label>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-800">{searchResult.paymentMethod}</p>
                    </div>
                  </div>
                  {searchResult.expiryDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Masa Aktif Hingga</label>
                      <p className="text-gray-800">{searchResult.expiryDate}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Details */}
              <div className={`p-4 rounded-lg ${getStatusConfig(searchResult.status).bgColor}`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const StatusIcon = getStatusConfig(searchResult.status).icon
                    return <StatusIcon className={`w-6 h-6 ${getStatusConfig(searchResult.status).textColor}`} />
                  })()}
                  <div>
                    <h4 className={`font-semibold ${getStatusConfig(searchResult.status).textColor}`}>
                      Status: {getStatusConfig(searchResult.status).label}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {searchResult.status === "completed" &&
                        "Pembayaran berhasil dikonfirmasi dan akun telah dikirimkan."}
                      {searchResult.status === "pending" &&
                        "Menunggu konfirmasi pembayaran. Silakan kirim bukti transfer ke WhatsApp kami."}
                      {searchResult.status === "processing" && "Pembayaran sedang diverifikasi oleh tim kami."}
                      {searchResult.status === "failed" &&
                        "Pembayaran gagal atau dibatalkan. Hubungi customer service untuk bantuan."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Delivery Status */}
              {searchResult.accountDelivered && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-green-700">Akun Telah Dikirimkan</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Detail akun telah dikirimkan ke WhatsApp Anda. Periksa pesan dari admin SIPREMIUM.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hubungi Customer Service
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="max-w-4xl mx-auto mt-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Butuh Bantuan?</h3>
              <p className="text-gray-600">
                Jika Anda mengalami kesulitan atau memiliki pertanyaan tentang transaksi, tim kami siap membantu
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">WhatsApp Support</h4>
                <p className="text-sm text-gray-600 mb-3">Chat langsung dengan admin</p>
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                  +6287777808021
                </Button>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Response Time</h4>
                <p className="text-sm text-gray-600 mb-3">Rata-rata balasan dalam</p>
                <Badge className="bg-blue-100 text-blue-700">{"< 1 Jam"}</Badge>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Garansi 100%</h4>
                <p className="text-sm text-gray-600 mb-3">Uang kembali jika bermasalah</p>
                <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 bg-transparent">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
