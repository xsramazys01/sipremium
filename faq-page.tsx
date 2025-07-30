"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Home,
  MessageCircle,
  HelpCircle,
  Search,
  Shield,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Clock,
  Users,
  CreditCard,
  Settings,
  CheckCircle,
} from "lucide-react"
import Logo from "./components/logo"
import Footer from "./components/footer"

const faqCategories = [
  {
    id: "general",
    name: "Umum",
    icon: HelpCircle,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "account",
    name: "Akun & Login",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "payment",
    name: "Pembayaran",
    icon: CreditCard,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "technical",
    name: "Teknis",
    icon: Settings,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "warranty",
    name: "Garansi",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
  },
]

const faqs = [
  // General
  {
    id: 1,
    category: "general",
    question: "Apa itu SIPREMIUM?",
    answer:
      "SIPREMIUM adalah marketplace terpercaya yang menyediakan akun premium untuk berbagai aplikasi seperti Netflix, Spotify, YouTube Premium, ChatGPT Plus, dan lainnya dengan harga terjangkau. Kami menjamin semua akun legal dan aman digunakan.",
  },
  {
    id: 2,
    category: "general",
    question: "Apakah akun yang dijual legal dan aman?",
    answer:
      "Ya, semua akun yang kami jual adalah akun resmi yang diperoleh melalui metode legal. Kami tidak menjual akun hasil hack atau ilegal. Setiap akun telah melalui verifikasi ketat dari tim kami.",
  },
  {
    id: 3,
    category: "general",
    question: "Berapa lama proses pengiriman akun setelah pembayaran?",
    answer:
      "Akun akan dikirimkan maksimal 1-3 jam setelah pembayaran dikonfirmasi. Untuk pembelian di luar jam kerja, akun akan dikirim pada hari kerja berikutnya. Kami beroperasi 24/7 untuk memberikan layanan terbaik.",
  },
  {
    id: 4,
    category: "general",
    question: "Bagaimana cara menghubungi customer service?",
    answer:
      "Anda dapat menghubungi customer service kami melalui WhatsApp di +6287777808021. Tim kami siap membantu 24/7 untuk menjawab pertanyaan dan mengatasi kendala yang Anda alami.",
  },

  // Account & Login
  {
    id: 5,
    category: "account",
    question: "Bisakah saya mengganti password akun yang dibeli?",
    answer:
      "Tidak disarankan mengganti password karena dapat mempengaruhi stabilitas akun dan berpotensi menyebabkan akun terkunci. Gunakan akun sesuai dengan data login yang kami berikan untuk menjaga keamanan dan stabilitas.",
  },
  {
    id: 6,
    category: "account",
    question: "Berapa banyak device yang bisa login dengan satu akun?",
    answer:
      "Jumlah device tergantung pada jenis akun: Netflix Premium (4 device), Spotify Premium (1 device aktif), YouTube Premium (unlimited device tapi 1 streaming), Disney+ (4 device), ChatGPT Plus (1 device). Detail lengkap ada di deskripsi produk.",
  },
  {
    id: 7,
    category: "account",
    question: "Bagaimana jika akun logout sendiri atau tidak bisa login?",
    answer:
      "Jika mengalami masalah login, segera hubungi customer service kami. Kami akan membantu troubleshooting atau mengganti akun jika diperlukan. Garansi kami mencakup penggantian akun yang bermasalah.",
  },
  {
    id: 8,
    category: "account",
    question: "Apakah bisa sharing akun dengan orang lain?",
    answer:
      "Akun yang Anda beli adalah untuk penggunaan pribadi. Meskipun beberapa platform memungkinkan multiple profile, kami tidak menyarankan sharing dengan orang yang tidak dikenal untuk menjaga keamanan akun.",
  },

  // Payment
  {
    id: 9,
    category: "payment",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima pembayaran melalui: Transfer Bank (BCA, BRI, BNI, Mandiri), E-wallet (OVO, GoPay, DANA, ShopeePay), QRIS, dan Pulsa. Semua metode pembayaran aman dan terpercaya.",
  },
  {
    id: 10,
    category: "payment",
    question: "Apakah ada biaya tambahan selain harga yang tertera?",
    answer:
      "Tidak ada biaya tersembunyi. Harga yang tertera sudah final dan tidak ada biaya admin tambahan. Yang Anda bayar adalah harga yang tertera di website.",
  },
  {
    id: 11,
    category: "payment",
    question: "Bagaimana cara konfirmasi pembayaran?",
    answer:
      "Setelah melakukan pembayaran, kirimkan bukti transfer ke WhatsApp customer service kami. Tim akan memverifikasi pembayaran dan mengirimkan akun dalam waktu 1-3 jam.",
  },
  {
    id: 12,
    category: "payment",
    question: "Apakah bisa refund jika tidak puas?",
    answer:
      "Kami memberikan garansi 100% uang kembali jika akun tidak sesuai dengan deskripsi atau bermasalah dalam 24 jam pertama. Syarat dan ketentuan refund dapat dilihat di halaman garansi.",
  },

  // Technical
  {
    id: 13,
    category: "technical",
    question: "Kenapa video buffering atau kualitas rendah?",
    answer:
      "Kualitas streaming tergantung pada kecepatan internet Anda. Pastikan koneksi internet stabil minimal 25 Mbps untuk 4K, 5 Mbps untuk HD. Jika masih bermasalah, coba restart aplikasi atau device.",
  },
  {
    id: 14,
    category: "technical",
    question: "Aplikasi tidak bisa download atau error saat membuka?",
    answer:
      "Pastikan aplikasi sudah update ke versi terbaru. Clear cache aplikasi, restart device, atau reinstall aplikasi. Jika masih bermasalah, hubungi customer service untuk bantuan troubleshooting.",
  },
  {
    id: 15,
    category: "technical",
    question: "Bagaimana cara menggunakan akun di Smart TV?",
    answer:
      "Login menggunakan email dan password yang kami berikan. Untuk Netflix, bisa juga menggunakan kode aktivasi. Pastikan Smart TV terhubung internet dan aplikasi sudah terinstall. Panduan lengkap akan kami kirimkan bersama akun.",
  },
  {
    id: 16,
    category: "technical",
    question: "Kenapa tidak bisa download untuk offline?",
    answer:
      "Fitur download tersedia untuk akun premium. Pastikan Anda login dengan akun yang benar, ada space storage yang cukup, dan koneksi internet stabil. Beberapa konten mungkin tidak tersedia untuk download karena kebijakan platform.",
  },

  // Warranty
  {
    id: 17,
    category: "warranty",
    question: "Berapa lama masa garansi akun?",
    answer:
      "Garansi akun berlaku sesuai dengan paket yang dibeli: 1 bulan, 3 bulan, atau 6 bulan. Selama masa garansi, jika ada masalah dengan akun, kami akan mengganti atau memperbaiki tanpa biaya tambahan.",
  },
  {
    id: 18,
    category: "warranty",
    question: "Apa saja yang termasuk dalam garansi?",
    answer:
      "Garansi mencakup: akun tidak bisa login, akun suspended, fitur premium tidak aktif, kualitas tidak sesuai deskripsi. Garansi tidak berlaku untuk kesalahan pengguna seperti mengganti password atau melanggar terms of service platform.",
  },
  {
    id: 19,
    category: "warranty",
    question: "Bagaimana cara klaim garansi?",
    answer:
      "Hubungi customer service melalui WhatsApp dengan menyertakan: bukti pembelian, screenshot masalah, dan penjelasan detail. Tim kami akan memverifikasi dan memproses klaim dalam 24 jam.",
  },
  {
    id: 20,
    category: "warranty",
    question: "Apakah garansi bisa diperpanjang?",
    answer:
      "Garansi tidak bisa diperpanjang, namun Anda bisa membeli paket baru sebelum masa aktif habis. Kami juga menyediakan paket berlangganan dengan harga lebih hemat untuk penggunaan jangka panjang.",
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
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
              <Link href="/faq" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
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
            <span className="text-blue-600">Frequently</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Asked Questions
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan SIPREMIUM. Jika tidak menemukan
            jawaban, jangan ragu untuk menghubungi customer service kami.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {faqCategories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "border-purple-200 text-gray-600 hover:border-purple-400 hover:bg-purple-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">Q</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg leading-relaxed">{faq.question}</h3>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Masih Ada Pertanyaan?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi tim customer service kami.
              Kami siap membantu 24/7!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp: +6287777808021
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response Time: &lt; 1 Jam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
