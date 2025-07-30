"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Home,
  MessageCircle,
  HelpCircle,
  Search,
  Shield,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  Music,
  Video,
  Gamepad2,
  BookOpen,
  Camera,
  Brain,
  Palette,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import ProductDetailModal from "./product-detail-modal"
import Logo from "./components/logo"
import Footer from "./components/footer"
import PaymentFlow from "./components/payment-flow"

const categories = [
  { id: "all", name: "Semua", icon: Filter },
  { id: "streaming", name: "Streaming", icon: Play },
  { id: "music", name: "Musik", icon: Music },
  { id: "productivity", name: "Produktivitas", icon: BookOpen },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "design", name: "Design", icon: Palette },
  { id: "ai", name: "AI Tools", icon: Brain },
]

const products = [
  {
    id: 1,
    name: "Netflix Premium",
    category: "streaming",
    price: "Rp 25.000",
    duration: "1 Bulan",
    rating: 4.9,
    sold: 1250,
    features: ["4K Ultra HD", "4 Screens", "Download Offline", "All Content"],
    badge: "Best Seller",
    badgeColor: "bg-orange-500",
    icon: Video,
    gradient: "from-red-500 to-red-600",
    description: "Streaming 4K tanpa iklan dengan akses ke semua konten Netflix original dan internasional",
  },
  {
    id: 2,
    name: "Spotify Premium",
    category: "music",
    price: "Rp 15.000",
    duration: "1 Bulan",
    rating: 4.8,
    sold: 980,
    features: ["No Ads", "Offline Download", "High Quality", "Unlimited Skip"],
    badge: "Popular",
    badgeColor: "bg-green-500",
    icon: Music,
    gradient: "from-green-500 to-green-600",
    description: "Musik tanpa iklan dengan kualitas audio tinggi dan download offline unlimited",
  },
  {
    id: 3,
    name: "YouTube Premium",
    category: "streaming",
    price: "Rp 20.000",
    duration: "1 Bulan",
    rating: 4.7,
    sold: 750,
    features: ["No Ads", "Background Play", "YouTube Music", "Download Videos"],
    badge: "Hot",
    badgeColor: "bg-red-500",
    icon: Play,
    gradient: "from-red-500 to-pink-500",
    description: "YouTube tanpa iklan dengan background play dan akses YouTube Music Premium",
  },
  {
    id: 4,
    name: "Disney+ Hotstar",
    category: "streaming",
    price: "Rp 18.000",
    duration: "1 Bulan",
    rating: 4.6,
    sold: 620,
    features: ["Disney Content", "Marvel & Star Wars", "Sports Live", "4K Quality"],
    badge: "Family",
    badgeColor: "bg-blue-500",
    icon: Video,
    gradient: "from-blue-500 to-purple-500",
    description: "Konten Disney, Marvel, Star Wars lengkap plus live sports premium",
  },
  {
    id: 5,
    name: "ChatGPT Plus",
    category: "ai",
    price: "Rp 85.000",
    duration: "1 Bulan",
    rating: 4.9,
    sold: 450,
    features: ["GPT-4 Access", "Faster Response", "Priority Access", "Advanced Features"],
    badge: "AI Powered",
    badgeColor: "bg-purple-500",
    icon: Brain,
    gradient: "from-purple-500 to-indigo-500",
    description: "AI assistant terdepan dengan GPT-4 untuk produktivitas dan kreativitas maksimal",
  },
  {
    id: 6,
    name: "CapCut Pro",
    category: "design",
    price: "Rp 12.000",
    duration: "1 Bulan",
    rating: 4.5,
    sold: 380,
    features: ["No Watermark", "Premium Effects", "HD Export", "Advanced Tools"],
    badge: "Creator",
    badgeColor: "bg-pink-500",
    icon: Camera,
    gradient: "from-pink-500 to-rose-500",
    description: "Video editing professional tanpa watermark dengan efek premium dan export HD",
  },
  {
    id: 7,
    name: "Canva Pro",
    category: "design",
    price: "Rp 30.000",
    duration: "1 Bulan",
    rating: 4.8,
    sold: 520,
    features: ["Premium Templates", "Background Remover", "Brand Kit", "Team Features"],
    badge: "Design Pro",
    badgeColor: "bg-cyan-500",
    icon: Palette,
    gradient: "from-cyan-500 to-blue-500",
    description: "Design tool lengkap dengan jutaan template premium dan AI background remover",
  },
  {
    id: 8,
    name: "Adobe Creative Cloud",
    category: "design",
    price: "Rp 120.000",
    duration: "1 Bulan",
    rating: 4.9,
    sold: 280,
    features: ["All Adobe Apps", "Cloud Storage", "Premium Fonts", "Stock Photos"],
    badge: "Professional",
    badgeColor: "bg-orange-600",
    icon: Palette,
    gradient: "from-orange-500 to-red-500",
    description: "Suite lengkap aplikasi Adobe untuk kebutuhan creative professional",
  },
  {
    id: 9,
    name: "Grammarly Premium",
    category: "productivity",
    price: "Rp 35.000",
    duration: "1 Bulan",
    rating: 4.7,
    sold: 340,
    features: ["Advanced Grammar", "Plagiarism Check", "Tone Detector", "Writing Goals"],
    badge: "Writing Pro",
    badgeColor: "bg-green-600",
    icon: BookOpen,
    gradient: "from-green-500 to-emerald-500",
    description: "AI writing assistant untuk grammar check, plagiarism detection, dan tone analysis",
  },
]

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [paymentProduct, setPaymentProduct] = useState(null)
  const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false)

  const openProductDetail = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeProductDetail = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const openPaymentFlow = (product: any) => {
    setPaymentProduct(product)
    setIsPaymentFlowOpen(true)
  }

  const closePaymentFlow = () => {
    setIsPaymentFlowOpen(false)
    setPaymentProduct(null)
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              <Link href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
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

      {/* Page Header */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-blue-600">Katalog</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Akun Premium
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih dari berbagai akun premium terpercaya dengan harga terjangkau dan garansi penuh. Semua akun resmi dan
            siap digunakan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari akun premium..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "border-purple-200 text-gray-600 hover:border-purple-400 hover:bg-purple-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const Icon = product.icon
            return (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${product.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`${product.badgeColor} text-white px-2 py-1 text-xs`}>{product.badge}</Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{product.sold} terjual</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{product.price}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {product.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Mulai dari</div>
                      <div className="text-sm font-medium text-green-600">Garansi 100%</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                      onClick={() => openProductDetail(product)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Lihat Detail
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() => openPaymentFlow(product)}
                      title="Beli Sekarang"
                    >
                      <CreditCard className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau pilih kategori lain</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Tidak menemukan yang Anda cari?</h3>
          <p className="text-gray-600 mb-6">
            Hubungi admin SIPREMIUM untuk request akun premium lainnya atau konsultasi gratis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
              onClick={() => {
                const message = encodeURIComponent(`Halo Admin SIPREMIUM! 👋

Saya ingin konsultasi dan request akun premium.
Mohon bantuannya ya! 🙏`)
                const phoneNumber = "6287777808021"
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
                window.open(whatsappUrl, "_blank")
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat Admin WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent px-8"
            >
              <Shield className="w-5 h-5 mr-2" />
              Lihat Garansi
            </Button>
          </div>
        </div>
      </section>
      <PaymentFlow product={paymentProduct} isOpen={isPaymentFlowOpen} onClose={closePaymentFlow} />
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeProductDetail} />
      <Footer />
    </div>
  )
}
