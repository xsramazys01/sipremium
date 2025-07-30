"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  MessageCircle,
  HelpCircle,
  Search,
  Shield,
  Star,
  Users,
  Calendar,
  Filter,
  ThumbsUp,
  Quote,
  CheckCircle,
  Play,
  Music,
  Video,
  Brain,
  Camera,
} from "lucide-react"
import Logo from "./components/logo"
import Footer from "./components/footer"

const testimonials = [
  {
    id: 1,
    name: "Andi Pratama",
    avatar: "/placeholder.svg?height=60&width=60&text=AP",
    product: "Netflix Premium",
    productIcon: Video,
    rating: 5,
    date: "2 hari lalu",
    verified: true,
    comment:
      "Kualitas 4K nya mantap banget! Bisa nonton di 4 device sekaligus tanpa masalah. Pelayanan admin juga sangat responsif dan ramah. Sudah langganan 6 bulan dan tidak pernah ada masalah. Highly recommended!",
    likes: 24,
    helpful: true,
  },
  {
    id: 2,
    name: "Sari Dewi",
    avatar: "/placeholder.svg?height=60&width=60&text=SD",
    product: "Spotify Premium",
    productIcon: Music,
    rating: 5,
    date: "3 hari lalu",
    verified: true,
    comment:
      "Akhirnya bisa dengerin musik tanpa iklan! Kualitas audio jernih banget, download offline juga cepat. Harga jauh lebih murah dari official tapi fitur sama persis. Admin fast response, transaksi aman.",
    likes: 18,
    helpful: true,
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "/placeholder.svg?height=60&width=60&text=BS",
    product: "YouTube Premium",
    productIcon: Play,
    rating: 4,
    date: "5 hari lalu",
    verified: true,
    comment:
      "YouTube tanpa iklan itu surga banget! Background play juga work perfect. Cuma kadang loading agak lama, tapi overall satisfied. Customer service helpful banget pas ada kendala.",
    likes: 15,
    helpful: true,
  },
  {
    id: 4,
    name: "Maya Sari",
    avatar: "/placeholder.svg?height=60&width=60&text=MS",
    product: "ChatGPT Plus",
    productIcon: Brain,
    rating: 5,
    date: "1 minggu lalu",
    verified: true,
    comment:
      "GPT-4 access dengan harga segini worth it banget! Response time cepat, unlimited usage. Sangat membantu untuk pekerjaan dan belajar. Admin profesional, proses pembelian mudah dan aman.",
    likes: 32,
    helpful: true,
  },
  {
    id: 5,
    name: "Rizki Ahmad",
    avatar: "/placeholder.svg?height=60&width=60&text=RA",
    product: "CapCut Pro",
    productIcon: Camera,
    rating: 5,
    date: "1 minggu lalu",
    verified: true,
    comment:
      "Editing video jadi lebih mudah tanpa watermark! Premium effects nya keren-keren, export HD juga cepat. Harga terjangkau untuk fitur yang lengkap. Recommended untuk content creator!",
    likes: 21,
    helpful: true,
  },
  {
    id: 6,
    name: "Linda Putri",
    avatar: "/placeholder.svg?height=60&width=60&text=LP",
    product: "Disney+ Hotstar",
    productIcon: Video,
    rating: 4,
    date: "2 minggu lalu",
    verified: true,
    comment:
      "Konten Disney dan Marvel lengkap banget! Anak-anak senang bisa nonton film favorit mereka. Kualitas streaming bagus, jarang buffering. Harga murah tapi kualitas premium.",
    likes: 12,
    helpful: true,
  },
  {
    id: 7,
    name: "Doni Kurniawan",
    avatar: "/placeholder.svg?height=60&width=60&text=DK",
    product: "Netflix Premium",
    productIcon: Video,
    rating: 5,
    date: "2 minggu lalu",
    verified: true,
    comment:
      "Sudah 3 bulan pakai dan sangat puas! Akun stabil, tidak pernah logout sendiri. Bisa ganti profile sesuai kebutuhan keluarga. Admin selalu siap membantu 24/7. Top service!",
    likes: 19,
    helpful: true,
  },
  {
    id: 8,
    name: "Fitri Handayani",
    avatar: "/placeholder.svg?height=60&width=60&text=FH",
    product: "Canva Pro",
    productIcon: Camera,
    rating: 5,
    date: "3 minggu lalu",
    verified: true,
    comment:
      "Template premium nya banyak banget! Background remover work perfect, sangat membantu untuk design. Harga jauh lebih murah dari berlangganan langsung. Pelayanan memuaskan!",
    likes: 16,
    helpful: true,
  },
]

const stats = [
  { label: "Total Pelanggan", value: "15,000+", icon: Users },
  { label: "Rating Rata-rata", value: "4.9/5", icon: Star },
  { label: "Testimoni Positif", value: "98%", icon: ThumbsUp },
  { label: "Produk Tersedia", value: "50+", icon: CheckCircle },
]

const filterOptions = [
  { id: "all", name: "Semua Produk" },
  { id: "netflix", name: "Netflix" },
  { id: "spotify", name: "Spotify" },
  { id: "youtube", name: "YouTube Premium" },
  { id: "chatgpt", name: "ChatGPT Plus" },
  { id: "capcut", name: "CapCut Pro" },
]

export default function TestimoniPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    product: "",
    rating: 5,
    comment: "",
  })

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesFilter = selectedFilter === "all" || testimonial.product.toLowerCase().includes(selectedFilter)
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.comment.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle testimonial submission
    console.log("New testimonial:", newTestimonial)
    // Reset form
    setNewTestimonial({ name: "", product: "", rating: 5, comment: "" })
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
              <Link href="/testimoni" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
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
            <span className="text-blue-600">Testimoni</span>{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pelanggan
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman nyata dari ribuan pelanggan yang telah mempercayai SIPREMIUM untuk kebutuhan akun
            premium mereka
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="text-center border-2 border-purple-100 hover:border-purple-300 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari testimoni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border-2 border-purple-200 focus:border-purple-400 rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedFilter === option.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(option.id)}
                className={`whitespace-nowrap ${
                  selectedFilter === option.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "border-purple-200 text-gray-600 hover:border-purple-400"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {option.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTestimonials.map((testimonial) => {
            const ProductIcon = testimonial.productIcon
            return (
              <Card
                key={testimonial.id}
                className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" title="Verified Customer" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <ProductIcon className="w-4 h-4" />
                          <span>{testimonial.product}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">{testimonial.date}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="w-6 h-6 text-purple-300 absolute -top-2 -left-1" />
                    <p className="text-gray-700 leading-relaxed pl-6">{testimonial.comment}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{testimonial.likes}</span>
                      </button>
                      {testimonial.helpful && <Badge className="bg-green-100 text-green-700 text-xs">Helpful</Badge>}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add Testimonial Form */}
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Bagikan Pengalaman Anda</h3>
              <p className="text-gray-600">
                Sudah menggunakan layanan SIPREMIUM? Ceritakan pengalaman Anda untuk membantu calon pelanggan lain
              </p>
            </div>

            <form onSubmit={handleSubmitTestimonial} className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <Input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="border-2 border-purple-200 focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Produk yang Dibeli</label>
                  <Input
                    type="text"
                    value={newTestimonial.product}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, product: e.target.value })}
                    placeholder="Contoh: Netflix Premium"
                    className="border-2 border-purple-200 focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewTestimonial({ ...newTestimonial, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          rating <= newTestimonial.rating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({newTestimonial.rating}/5)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Testimoni</label>
                <Textarea
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                  placeholder="Ceritakan pengalaman Anda menggunakan layanan SIPREMIUM..."
                  rows={4}
                  className="border-2 border-purple-200 focus:border-purple-400"
                  required
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Kirim Testimoni
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <Footer contact="+6287777808021" />
    </div>
  )
}
