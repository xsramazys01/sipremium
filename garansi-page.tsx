"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  MessageCircle,
  HelpCircle,
  Search,
  Shield,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertTriangle,
  Phone,
  FileText,
  Award,
  Users,
  Star,
} from "lucide-react"
import Logo from "./components/logo"
import Footer from "./components/footer"

const guaranteeFeatures = [
  {
    icon: Shield,
    title: "Garansi 100% Uang Kembali",
    description: "Jika akun tidak sesuai deskripsi atau bermasalah dalam 24 jam pertama, uang akan dikembalikan penuh",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: RefreshCw,
    title: "Penggantian Akun Gratis",
    description: "Akun bermasalah akan diganti dengan yang baru tanpa biaya tambahan selama masa garansi",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Support 24/7",
    description: "Tim customer service siap membantu kapan saja untuk mengatasi masalah yang Anda alami",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: CheckCircle,
    title: "Verifikasi Kualitas",
    description: "Setiap akun telah melalui tes kualitas ketat sebelum dikirimkan kepada pelanggan",
    color: "from-orange-500 to-red-500",
  },
]

const guaranteePeriods = [
  {
    package: "1 Bulan",
    period: "30 Hari",
    coverage: "Full Coverage",
    popular: false,
  },
  {
    package: "3 Bulan",
    period: "90 Hari",
    coverage: "Full Coverage + Priority Support",
    popular: true,
  },
  {
    package: "6 Bulan",
    period: "180 Hari",
    coverage: "Full Coverage + Premium Support",
    popular: false,
  },
]

const guaranteeSteps = [
  {
    step: 1,
    title: "Laporkan Masalah",
    description: "Hubungi customer service melalui WhatsApp dengan detail masalah yang dialami",
    icon: MessageCircle,
  },
  {
    step: 2,
    title: "Verifikasi Tim",
    description: "Tim kami akan memverifikasi masalah dan menentukan solusi terbaik dalam waktu maksimal 24 jam",
    icon: Search,
  },
  {
    step: 3,
    title: "Penyelesaian",
    description: "Akun akan diganti atau uang dikembalikan sesuai dengan kebijakan garansi yang berlaku",
    icon: CheckCircle,
  },
]

const testimonials = [
  {
    name: "Ahmad Rizki",
    product: "Netflix Premium",
    comment: "Akun bermasalah di hari ke-2, langsung diganti sama admin tanpa ribet. Pelayanan mantap!",
    rating: 5,
  },
  {
    name: "Siti Nurhaliza",
    product: "Spotify Premium",
    comment: "Garansi benar-benar ditepati. Uang dikembalikan 100% karena akun tidak sesuai ekspektasi.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    product: "YouTube Premium",
    comment: "Customer service responsif banget. Masalah langsung ditangani dalam hitungan jam.",
    rating: 5,
  },
]

export default function GaransiPage() {
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
              <Link href="/garansi" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
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
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-600">Garansi</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              100% Terpercaya
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan jaminan kualitas terbaik untuk setiap pembelian. Kepuasan dan kepercayaan Anda
            adalah prioritas utama kami.
          </p>
        </div>

        {/* Guarantee Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {guaranteeFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Guarantee Periods */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Masa Garansi Berdasarkan Paket</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Setiap paket memiliki masa garansi yang berbeda sesuai dengan durasi pembelian
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {guaranteePeriods.map((period, index) => (
              <Card
                key={index}
                className={`border-2 transition-all hover:shadow-lg ${
                  period.popular ? "border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50" : "border-purple-100"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  {period.popular && (
                    <Badge className="bg-orange-500 text-white mb-2 mx-auto w-fit">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl font-bold text-gray-800">{period.package}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600 mt-2">{period.period}</div>
                  <p className="text-sm text-gray-600 mt-1">Masa Garansi</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center mb-6">
                    <p className="font-semibold text-gray-800 mb-2">{period.coverage}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Penggantian akun gratis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Uang kembali 100%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Support 24/7</span>
                      </div>
                      {period.popular && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Priority handling</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Claim */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Cara Klaim Garansi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proses klaim garansi yang mudah dan cepat dalam 3 langkah sederhana
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {guaranteeSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <Card className="mb-16 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              Syarat dan Ketentuan Garansi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Yang Termasuk Garansi:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Akun tidak bisa login atau suspended</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Fitur premium tidak aktif atau terbatas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Kualitas tidak sesuai dengan deskripsi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Akun bermasalah karena kesalahan sistem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Downgrade akun tanpa pemberitahuan</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Yang Tidak Termasuk Garansi:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Kesalahan pengguna (mengganti password, dll)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Melanggar terms of service platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sharing akun dengan pihak ketiga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Masalah koneksi internet pengguna</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Perubahan kebijakan platform resmi</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Testimoni Garansi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pengalaman nyata pelanggan yang telah menggunakan layanan garansi kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.comment}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.product}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Butuh Bantuan Klaim Garansi?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Tim customer service kami siap membantu proses klaim garansi Anda. Hubungi kami sekarang untuk mendapatkan
              bantuan cepat dan profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: +6287777808021
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Panduan Klaim
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response: {"< 1 Jam"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>15,000+ Pelanggan Puas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>99% Success Rate</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
