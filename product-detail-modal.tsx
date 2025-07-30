"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Star,
  Users,
  MessageCircle,
  Play,
  Download,
  Smartphone,
  Monitor,
  Tv,
  Globe,
  Zap,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Music,
  Brain,
  Crown,
  Sparkles,
  Settings,
  Layout,
  Cloud,
  Eraser,
  PaletteIcon as Palette2,
  Users2,
  ImageIcon,
  HardDrive,
  Grid3x3,
  Type,
  Wrench,
  CheckCircle,
  Shield,
  Target,
  BookOpen,
  FileText,
  Volume2,
} from "lucide-react"
import PaymentFlow from "./components/payment-flow"

// Product data storage - in real app this would be in a database
const productData = {
  1: {
    // Netflix Premium
    username: "netflix.premium@example.com",
    password: "NetflixPass123!",
    profileName: "Premium User",
    additionalInfo: "Akun dapat digunakan di 4 device bersamaan. Jangan ubah password atau profile utama.",
    validUntil: "30 hari dari pembelian",
  },
  2: {
    // Spotify Premium
    username: "spotify.premium@example.com",
    password: "SpotifyPass123!",
    profileName: "Premium User",
    additionalInfo: "Akun dapat digunakan di 1 device. Download maksimal 10.000 lagu.",
    validUntil: "30 hari dari pembelian",
  },
  3: {
    // YouTube Premium
    username: "youtube.premium@example.com",
    password: "YouTubePass123!",
    profileName: "Premium User",
    additionalInfo: "Termasuk YouTube Music Premium. Background play tersedia.",
    validUntil: "30 hari dari pembelian",
  },
  4: {
    // Disney+ Hotstar
    username: "disney.premium@example.com",
    password: "DisneyPass123!",
    profileName: "Premium User",
    additionalInfo: "Akses ke semua konten Disney, Marvel, Star Wars. Live sports tersedia.",
    validUntil: "30 hari dari pembelian",
  },
  5: {
    // ChatGPT Plus
    username: "chatgpt.plus@example.com",
    password: "ChatGPTPass123!",
    profileName: "Plus User",
    additionalInfo: "Akses GPT-4, priority access, dan plugin. Fair usage policy berlaku.",
    validUntil: "30 hari dari pembelian",
  },
  6: {
    // CapCut Pro
    username: "capcut.pro@example.com",
    password: "CapCutPass123!",
    profileName: "Pro User",
    additionalInfo: "Export tanpa watermark, premium effects, HD export tersedia.",
    validUntil: "30 hari dari pembelian",
  },
  7: {
    // Canva Pro
    username: "canva.pro@example.com",
    password: "CanvaPass123!",
    profileName: "Pro User",
    additionalInfo: "Premium templates, background remover, brand kit tersedia.",
    validUntil: "30 hari dari pembelian",
  },
  8: {
    // Adobe Creative Cloud
    username: "adobe.cc@example.com",
    password: "AdobePass123!",
    profileName: "Creative User",
    additionalInfo: "Semua aplikasi Adobe, 100GB cloud storage, Adobe Fonts tersedia.",
    validUntil: "30 hari dari pembelian",
  },
  9: {
    // Grammarly Premium
    username: "grammarly.premium@example.com",
    password: "GrammarlyPass123!",
    profileName: "Premium User",
    additionalInfo: "Advanced grammar, plagiarism checker, tone detector tersedia.",
    validUntil: "30 hari dari pembelian",
  },
}

// Function for automatic product delivery
const generateProductDeliveryMessage = (product: any, productId: number) => {
  const productInfo = productData[productId as keyof typeof productData]

  if (!productInfo) {
    return encodeURIComponent(`Maaf, data produk ${product.name} sedang tidak tersedia. Mohon hubungi admin.`)
  }

  const message = `🎉 *PENGIRIMAN AKUN PREMIUM* 🎉

Terima kasih telah berbelanja di SIPREMIUM!
Berikut detail akun ${product.name} Anda:

📱 *DETAIL AKUN*
• Produk: ${product.name}
• Username/Email: ${productInfo.username}
• Password: ${productInfo.password}
• Profile Name: ${productInfo.profileName}
• Berlaku Hingga: ${productInfo.validUntil}

ℹ️ *INFORMASI PENTING*
${productInfo.additionalInfo}

🛡️ *GARANSI & SUPPORT*
• Garansi 100% selama masa aktif
• Support 24/7 via WhatsApp
• Jika ada masalah, langsung hubungi kami

⚠️ *CATATAN PENTING*
• Simpan data akun dengan aman
• Jangan share akun ke orang lain
• Hubungi admin jika ada kendala

Selamat menikmati akun premium Anda! 🚀

*SIPREMIUM - Your Premium Account Partner*
WhatsApp: +6287777808021`

  return encodeURIComponent(message)
}

interface ProductDetailModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

const productDetails = {
  1: {
    // Netflix Premium
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Netflix+4K+Streaming",
        title: "4K Ultra HD Streaming",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Netflix+Mobile+Downloads",
        title: "Mobile Downloads Interface",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Netflix+Multiple+Profiles",
        title: "Multiple Profiles Setup",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Netflix+Original+Content",
        title: "Netflix Original Content",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Netflix+Offline+Download",
        title: "Offline Download Feature",
      },
    ],
    longDescription:
      "Netflix Premium memberikan akses penuh ke seluruh katalog Netflix dengan kualitas 4K Ultra HD. Nikmati ribuan film, series, dokumenter, dan konten original Netflix tanpa iklan dengan kualitas gambar terbaik. Akun premium ini mendukung streaming di 4 perangkat secara bersamaan dan dilengkapi fitur download offline untuk menonton kapan saja tanpa koneksi internet.",
    detailedFeatures: [
      {
        title: "4K Ultra HD & HDR",
        description:
          "Streaming dengan kualitas 4K Ultra HD dan HDR untuk pengalaman menonton terbaik dengan detail gambar yang sangat tajam",
        icon: Monitor,
      },
      {
        title: "4 Layar Bersamaan",
        description: "Tonton di 4 perangkat berbeda secara bersamaan dengan akun yang sama, cocok untuk keluarga besar",
        icon: Tv,
      },
      {
        title: "Download Offline",
        description: "Download film dan series untuk ditonton offline di perangkat mobile, hemat kuota internet",
        icon: Download,
      },
      {
        title: "Semua Konten",
        description:
          "Akses ke seluruh katalog Netflix termasuk konten original dan eksklusif yang tidak tersedia di platform lain",
        icon: Play,
      },
      {
        title: "Tanpa Iklan",
        description: "Pengalaman menonton tanpa gangguan iklan sama sekali, fokus penuh pada konten favorit",
        icon: Zap,
      },
      {
        title: "Multi Platform",
        description: "Tersedia di Smart TV, laptop, smartphone, tablet, dan semua perangkat streaming populer",
        icon: Smartphone,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 25.000", discount: null, popular: false },
      { duration: "3 Bulan", price: "Rp 65.000", discount: "13%", popular: true },
      { duration: "6 Bulan", price: "Rp 120.000", discount: "20%", popular: false },
    ],
    reviews: [
      {
        name: "Andi Pratama",
        rating: 5,
        comment: "Kualitas 4K nya mantap banget, bisa nonton di 4 device sekaligus. Recommended banget untuk keluarga!",
        date: "2 hari lalu",
      },
      {
        name: "Sari Dewi",
        rating: 5,
        comment:
          "Akun work 100%, customer service responsif. Puas banget sama pelayanannya, download offline juga lancar.",
        date: "1 minggu lalu",
      },
      {
        name: "Budi Santoso",
        rating: 4,
        comment:
          "Harga terjangkau untuk fitur premium. Download offline juga lancar jaya, konten original Netflix lengkap.",
        date: "2 minggu lalu",
      },
    ],
    faq: [
      {
        question: "Apakah akun ini legal dan aman?",
        answer:
          "Ya, semua akun Netflix kami adalah akun resmi yang dibeli melalui metode legal dan aman digunakan dengan garansi penuh.",
      },
      {
        question: "Berapa lama akun akan aktif?",
        answer:
          "Akun akan aktif sesuai dengan paket yang dipilih (1, 3, atau 6 bulan) sejak tanggal pembelian dengan garansi penuh.",
      },
      {
        question: "Bisa ganti password?",
        answer:
          "Tidak disarankan mengganti password karena dapat mempengaruhi akun. Gunakan akun sesuai data yang diberikan untuk stabilitas maksimal.",
      },
      {
        question: "Garansi jika akun bermasalah?",
        answer:
          "Kami memberikan garansi penuh. Jika ada masalah, akun akan diganti atau uang dikembalikan 100% tanpa pertanyaan.",
      },
    ],
    compatibility: ["Smart TV", "Android", "iOS", "Windows", "macOS", "PlayStation", "Xbox", "Chromecast", "Apple TV"],
    tags: ["Streaming", "4K", "HDR", "Offline", "Multi-device", "Original Content", "Family Plan"],
  },
  2: {
    // Spotify Premium
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Spotify+No+Ads+Experience",
        title: "Ad-Free Listening Experience",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Spotify+Offline+Downloads",
        title: "Offline Download Feature",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Spotify+High+Quality+Audio",
        title: "High Quality Audio Settings",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Spotify+Unlimited+Skips",
        title: "Unlimited Skip Feature",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Spotify+Connect+Feature",
        title: "Spotify Connect Interface",
      },
    ],
    longDescription:
      "Spotify Premium memberikan pengalaman musik tanpa batas dengan kualitas audio tinggi, tanpa iklan, dan fitur download offline. Nikmati lebih dari 100 juta lagu dan podcast premium dengan kualitas audio hingga 320 kbps. Fitur skip unlimited memungkinkan Anda melewati lagu sebanyak yang diinginkan tanpa batasan.",
    detailedFeatures: [
      {
        title: "Tanpa Iklan",
        description:
          "Dengarkan musik favorit tanpa gangguan iklan sama sekali, pengalaman musik yang murni dan menyenangkan",
        icon: Zap,
      },
      {
        title: "Kualitas Audio Tinggi",
        description: "Streaming musik dengan kualitas audio hingga 320 kbps untuk pengalaman mendengar yang superior",
        icon: Volume2,
      },
      {
        title: "Download Offline",
        description: "Download hingga 10.000 lagu untuk didengar offline di maksimal 5 perangkat, hemat kuota internet",
        icon: Download,
      },
      {
        title: "Skip Unlimited",
        description: "Skip lagu sebanyak yang Anda mau tanpa batasan, kontrol penuh atas playlist Anda",
        icon: Play,
      },
      {
        title: "Spotify Connect",
        description: "Kontrol musik dari perangkat lain dengan mudah, seamless experience antar device",
        icon: Smartphone,
      },
      {
        title: "Podcast Premium",
        description: "Akses ke podcast eksklusif dan konten premium yang tidak tersedia di versi gratis",
        icon: Globe,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 15.000", discount: null, popular: false },
      { duration: "3 Bulan", price: "Rp 40.000", discount: "11%", popular: true },
      { duration: "6 Bulan", price: "Rp 75.000", discount: "17%", popular: false },
    ],
    reviews: [
      {
        name: "Maya Sari",
        rating: 5,
        comment: "Kualitas audio jernih banget, download offline juga cepat. Worth it banget untuk music lover!",
        date: "1 hari lalu",
      },
      {
        name: "Rizki Ahmad",
        rating: 5,
        comment: "Akhirnya bisa skip unlimited dan tanpa iklan. Pengalaman musik jadi lebih nyaman dan enjoyable.",
        date: "3 hari lalu",
      },
      {
        name: "Linda Putri",
        rating: 4,
        comment: "Harga murah tapi fitur lengkap. Podcast premium juga banyak pilihan, recommended!",
        date: "1 minggu lalu",
      },
    ],
    faq: [
      {
        question: "Apakah bisa download lagu untuk offline?",
        answer:
          "Ya, Anda bisa download hingga 10.000 lagu untuk didengar secara offline di maksimal 5 perangkat dengan kualitas tinggi.",
      },
      {
        question: "Kualitas audio seperti apa yang didapat?",
        answer:
          "Spotify Premium menyediakan kualitas audio hingga 320 kbps untuk pengalaman mendengar terbaik dengan detail suara yang jernih.",
      },
      {
        question: "Bisa digunakan di berapa perangkat?",
        answer:
          "Akun bisa login di banyak perangkat, tapi hanya bisa streaming di 1 perangkat dalam waktu bersamaan untuk menjaga kualitas.",
      },
    ],
    compatibility: [
      "Android",
      "iOS",
      "Windows",
      "macOS",
      "Web Browser",
      "Smart Speaker",
      "Car Audio",
      "PlayStation",
      "Xbox",
    ],
    tags: ["Musik", "Podcast", "Offline", "High Quality", "No Ads", "Unlimited Skip", "Premium Audio"],
  },
  3: {
    // YouTube Premium
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=YouTube+No+Ads+Experience",
        title: "Ad-Free YouTube Experience",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=YouTube+Background+Play",
        title: "Background Play Feature",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=YouTube+Music+Premium",
        title: "YouTube Music Premium",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=YouTube+Download+Videos",
        title: "Download Videos for Offline",
      },
    ],
    longDescription:
      "YouTube Premium memberikan pengalaman menonton YouTube tanpa iklan, dengan fitur background play, download offline, dan akses ke YouTube Music Premium. Nikmati konten favorit tanpa gangguan iklan dan dengan fitur-fitur eksklusif yang tidak tersedia di versi gratis. Termasuk akses ke YouTube Originals dan konten eksklusif creator.",
    detailedFeatures: [
      {
        title: "Tanpa Iklan",
        description: "Tonton video YouTube tanpa gangguan iklan sama sekali, fokus penuh pada konten yang Anda sukai",
        icon: Zap,
      },
      {
        title: "Background Play",
        description: "Putar video di background saat menggunakan aplikasi lain, multitasking jadi lebih mudah",
        icon: Smartphone,
      },
      {
        title: "Download Video",
        description: "Download video untuk ditonton offline kapan saja, hemat kuota dan tonton dimana saja",
        icon: Download,
      },
      {
        title: "YouTube Music",
        description: "Akses penuh ke YouTube Music Premium tanpa iklan dengan jutaan lagu dan playlist",
        icon: Music,
      },
      {
        title: "Picture-in-Picture",
        description: "Tonton video dalam mode mini sambil browsing atau menggunakan aplikasi lain",
        icon: Monitor,
      },
      {
        title: "YouTube Originals",
        description: "Akses ke konten original YouTube eksklusif dan series premium dari creator favorit",
        icon: Play,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 20.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 55.000", discount: "8%", popular: false },
      { duration: "6 Bulan", price: "Rp 100.000", discount: "17%", popular: false },
    ],
    reviews: [
      {
        name: "Deni Kurniawan",
        rating: 5,
        comment: "Background play sangat membantu! Bisa dengerin musik sambil buka app lain, fitur wajib punya.",
        date: "1 hari lalu",
      },
      {
        name: "Rina Sari",
        rating: 4,
        comment: "Download video buat offline mantap, ga perlu khawatir kuota lagi. YouTube Music juga bonus bagus.",
        date: "3 hari lalu",
      },
      {
        name: "Ahmad Fauzi",
        rating: 5,
        comment: "YouTube Music jadi bonus yang bagus, koleksi lagu lengkap banget. No ads experience the best!",
        date: "5 hari lalu",
      },
    ],
    faq: [
      {
        question: "Apakah YouTube Music termasuk dalam paket?",
        answer:
          "Ya, YouTube Premium sudah termasuk akses penuh ke YouTube Music Premium tanpa biaya tambahan dengan semua fitur premium.",
      },
      {
        question: "Bisa download video dengan kualitas tinggi?",
        answer:
          "Ya, Anda bisa download video dengan berbagai kualitas hingga 1080p sesuai kebutuhan dan kapasitas storage.",
      },
      {
        question: "Background play work di semua device?",
        answer:
          "Background play tersedia di Android dan iOS, untuk web browser memiliki keterbatasan tertentu sesuai kebijakan platform.",
      },
    ],
    compatibility: ["Android", "iOS", "Web Browser", "Smart TV", "Chromecast", "Apple TV", "Android TV"],
    tags: ["Video", "Music", "No Ads", "Background Play", "Download", "Offline", "YouTube Originals"],
  },
  4: {
    // Disney+ Hotstar
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Disney+Content+Collection",
        title: "Disney Content Collection",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Marvel+Movies+Series",
        title: "Marvel Movies & Series",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Star+Wars+Universe",
        title: "Star Wars Universe",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Sports+Live+Streaming",
        title: "Live Sports Streaming",
      },
    ],
    longDescription:
      "Disney+ Hotstar menghadirkan koleksi lengkap konten Disney, Marvel, Star Wars, Pixar, dan National Geographic. Plus akses ke pertandingan olahraga live dan konten lokal eksklusif. Nikmati ribuan jam konten berkualitas tinggi untuk seluruh keluarga dengan parental control yang aman untuk anak-anak.",
    detailedFeatures: [
      {
        title: "Disney Originals",
        description:
          "Koleksi lengkap film dan series original Disney terbaru termasuk konten eksklusif yang tidak tersedia di platform lain",
        icon: Play,
      },
      {
        title: "Marvel Universe",
        description: "Semua film dan series Marvel Cinematic Universe lengkap dari Iron Man hingga series terbaru",
        icon: Zap,
      },
      {
        title: "Star Wars Saga",
        description: "Koleksi lengkap film dan series Star Wars termasuk The Mandalorian dan series original lainnya",
        icon: Globe,
      },
      {
        title: "Live Sports",
        description: "Streaming langsung pertandingan olahraga premium seperti EPL, Liga Champions, NBA, dan Formula 1",
        icon: Tv,
      },
      {
        title: "4K Quality",
        description:
          "Streaming dengan kualitas 4K Ultra HD untuk konten pilihan dengan detail gambar yang sangat tajam",
        icon: Monitor,
      },
      {
        title: "Family Friendly",
        description: "Konten aman untuk seluruh keluarga dengan parental control dan profil anak yang terkontrol",
        icon: Smartphone,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 18.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 50.000", discount: "7%", popular: false },
      { duration: "6 Bulan", price: "Rp 95.000", discount: "12%", popular: false },
    ],
    reviews: [
      {
        name: "Sinta Dewi",
        rating: 5,
        comment: "Koleksi Marvel dan Disney lengkap banget! Anak-anak suka sekali, konten family friendly terbaik.",
        date: "2 hari lalu",
      },
      {
        name: "Bayu Pratama",
        rating: 4,
        comment: "Live sports nya bagus, EPL dan Liga Champions jernih. Star Wars collection juga lengkap.",
        date: "4 hari lalu",
      },
      {
        name: "Ani Susanti",
        rating: 5,
        comment: "Konten family friendly, cocok buat nonton bareng keluarga. Parental control juga mudah diatur.",
        date: "1 minggu lalu",
      },
    ],
    faq: [
      {
        question: "Apakah ada konten dewasa?",
        answer:
          "Disney+ Hotstar fokus pada konten family-friendly, ada fitur parental control untuk mengatur akses anak dengan aman.",
      },
      {
        question: "Bisa nonton live sports apa saja?",
        answer:
          "Tersedia EPL, Liga Champions, NBA, Formula 1, dan berbagai pertandingan olahraga premium lainnya secara live.",
      },
      {
        question: "Konten lokal Indonesia tersedia?",
        answer:
          "Ya, tersedia konten lokal Indonesia termasuk film dan series dari produser lokal serta konten regional.",
      },
    ],
    compatibility: ["Smart TV", "Android", "iOS", "Web Browser", "Chromecast", "Apple TV", "PlayStation", "Xbox"],
    tags: ["Disney", "Marvel", "Star Wars", "Sports", "Family", "4K", "Live TV", "Kids Safe"],
  },
  5: {
    // ChatGPT Plus
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=ChatGPT+GPT4+Interface",
        title: "GPT-4 Advanced Interface",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=ChatGPT+Code+Generation",
        title: "Advanced Code Generation",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=ChatGPT+Data+Analysis",
        title: "Advanced Data Analysis",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=ChatGPT+Plugin+Access",
        title: "Plugin Access Features",
      },
    ],
    longDescription:
      "ChatGPT Plus memberikan akses ke GPT-4, model AI terbaru dengan kemampuan reasoning yang lebih baik, response yang lebih cepat, dan akses prioritas bahkan saat traffic tinggi. Dilengkapi dengan fitur advanced seperti code interpreter, web browsing, dan akses ke berbagai plugin untuk memperluas kemampuan AI assistant Anda.",
    detailedFeatures: [
      {
        title: "GPT-4 Access",
        description:
          "Akses ke model GPT-4 terbaru dengan kemampuan reasoning superior dan pemahaman konteks yang lebih baik",
        icon: Brain,
      },
      {
        title: "Faster Response",
        description: "Response time yang lebih cepat dibanding versi gratis dengan prioritas server yang tinggi",
        icon: Zap,
      },
      {
        title: "Priority Access",
        description: "Akses prioritas bahkan saat server penuh atau traffic tinggi, tidak ada antrian panjang",
        icon: Crown,
      },
      {
        title: "Advanced Features",
        description: "Fitur-fitur advanced seperti code interpreter, web browsing, dan image analysis",
        icon: Globe,
      },
      {
        title: "Longer Conversations",
        description: "Batas percakapan yang lebih panjang dan konteks yang lebih luas untuk diskusi mendalam",
        icon: MessageCircle,
      },
      {
        title: "Plugin Access",
        description: "Akses ke berbagai plugin untuk memperluas kemampuan ChatGPT sesuai kebutuhan spesifik",
        icon: Smartphone,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 85.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 240.000", discount: "6%", popular: false },
      { duration: "6 Bulan", price: "Rp 450.000", discount: "12%", popular: false },
    ],
    reviews: [
      {
        name: "Teguh Santoso",
        rating: 5,
        comment: "GPT-4 memang lebih pintar, coding assistance nya sangat membantu pekerjaan. Worth every penny!",
        date: "1 hari lalu",
      },
      {
        name: "Dewi Lestari",
        rating: 5,
        comment: "Response cepat dan akurat, cocok buat research dan writing. Plugin access juga sangat berguna.",
        date: "2 hari lalu",
      },
      {
        name: "Rudi Hermawan",
        rating: 4,
        comment: "Plugin access sangat berguna untuk workflow, tapi harga agak mahal untuk kantong mahasiswa.",
        date: "5 hari lalu",
      },
    ],
    faq: [
      {
        question: "Apa bedanya GPT-4 dengan GPT-3.5?",
        answer:
          "GPT-4 memiliki kemampuan reasoning yang lebih baik, akurasi tinggi, dan dapat memproses konteks yang lebih panjang dengan pemahaman yang lebih mendalam.",
      },
      {
        question: "Apakah ada batasan penggunaan?",
        answer:
          "Ada fair usage policy, tapi lebih generous dibanding versi gratis dengan reset limit yang regular dan akses prioritas.",
      },
      {
        question: "Plugin apa saja yang tersedia?",
        answer:
          "Tersedia plugin untuk web browsing, code interpreter, image generation, data analysis, dan masih banyak lagi sesuai kebutuhan.",
      },
    ],
    compatibility: ["Web Browser", "Mobile Browser", "API Access", "Third-party Apps", "Desktop Apps"],
    tags: ["AI", "GPT-4", "Coding", "Writing", "Research", "Priority", "Advanced", "Productivity"],
  },
  6: {
    // CapCut Pro
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=CapCut+No+Watermark+Export",
        title: "No Watermark Export",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=CapCut+Premium+Effects",
        title: "Premium Effects Collection",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=CapCut+HD+Export+Quality",
        title: "HD Export Quality",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=CapCut+Advanced+Tools",
        title: "Advanced Editing Tools",
      },
    ],
    longDescription:
      "CapCut Pro memberikan akses ke semua fitur premium untuk editing video, termasuk export tanpa watermark, efek premium, template eksklusif, dan tools editing advanced. Cocok untuk content creator, social media manager, dan siapa saja yang ingin membuat video berkualitas profesional dengan mudah dan cepat.",
    detailedFeatures: [
      {
        title: "No Watermark",
        description: "Export video tanpa watermark CapCut untuk hasil yang profesional dan clean",
        icon: Zap,
      },
      {
        title: "Premium Effects",
        description: "Akses ke ribuan efek premium, filter, dan transisi eksklusif yang tidak tersedia di versi gratis",
        icon: Sparkles,
      },
      {
        title: "HD Export",
        description: "Export video dengan kualitas HD hingga 4K resolution untuk hasil yang sangat tajam",
        icon: Monitor,
      },
      {
        title: "Advanced Tools",
        description: "Tools editing advanced seperti keyframe, masking, color grading, dan audio enhancement",
        icon: Settings,
      },
      {
        title: "Premium Templates",
        description: "Template video premium untuk berbagai kebutuhan konten social media dan marketing",
        icon: Layout,
      },
      {
        title: "Cloud Storage",
        description: "Penyimpanan cloud untuk backup project dan asset dengan sinkronisasi antar device",
        icon: Cloud,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 12.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 32.000", discount: "11%", popular: false },
      { duration: "6 Bulan", price: "Rp 60.000", discount: "17%", popular: false },
    ],
    reviews: [
      {
        name: "Fajar Content",
        rating: 5,
        comment: "No watermark sangat penting buat konten creator! Effects nya juga keren dan mudah digunakan.",
        date: "1 hari lalu",
      },
      {
        name: "Sari Vlogger",
        rating: 5,
        comment: "Export HD cepat dan hasil jernih. Template premium nya bagus-bagus dan sangat membantu workflow.",
        date: "3 hari lalu",
      },
      {
        name: "Budi Editor",
        rating: 4,
        comment: "Advanced tools nya powerful, tapi butuh learning curve dikit. Overall sangat recommended!",
        date: "1 minggu lalu",
      },
    ],
    faq: [
      {
        question: "Apakah bisa export 4K?",
        answer:
          "Ya, CapCut Pro mendukung export hingga 4K resolution untuk hasil video terbaik dengan kualitas profesional.",
      },
      {
        question: "Berapa storage cloud yang didapat?",
        answer:
          "Mendapat storage cloud yang cukup untuk backup project dan asset premium dengan sinkronisasi otomatis.",
      },
      {
        question: "Template premium bisa digunakan komersial?",
        answer:
          "Ya, semua template premium bisa digunakan untuk keperluan komersial tanpa royalty atau biaya tambahan.",
      },
    ],
    compatibility: ["Android", "iOS", "Desktop App", "Web Version", "Tablet"],
    tags: ["Video Editing", "No Watermark", "HD Export", "Premium Effects", "Templates", "Mobile", "Content Creator"],
  },
  7: {
    // Canva Pro
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Canva+Premium+Templates",
        title: "Premium Templates Collection",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Canva+Background+Remover",
        title: "AI Background Remover",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Canva+Brand+Kit",
        title: "Brand Kit Management",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Canva+Team+Collaboration",
        title: "Team Collaboration Features",
      },
    ],
    longDescription:
      "Canva Pro memberikan akses ke jutaan template premium, background remover AI, brand kit, unlimited storage, dan fitur kolaborasi tim untuk kebutuhan design profesional. Cocok untuk designer, marketer, dan business owner yang membutuhkan tools design lengkap dengan kualitas profesional namun mudah digunakan.",
    detailedFeatures: [
      {
        title: "Premium Templates",
        description:
          "Akses ke jutaan template premium untuk berbagai kebutuhan design dari social media hingga presentasi",
        icon: Layout,
      },
      {
        title: "AI Background Remover",
        description: "Hapus background foto dengan satu klik menggunakan AI yang sangat akurat dan presisi",
        icon: Eraser,
      },
      {
        title: "Brand Kit",
        description: "Kelola brand identity dengan logo, font, dan color palette untuk konsistensi visual brand",
        icon: Palette2,
      },
      {
        title: "Team Collaboration",
        description: "Kolaborasi tim dengan sharing, commenting, dan approval workflow yang terintegrasi",
        icon: Users2,
      },
      {
        title: "Premium Stock",
        description: "Akses ke stock photos, videos, dan audio premium berkualitas tinggi tanpa royalty",
        icon: ImageIcon,
      },
      {
        title: "Unlimited Storage",
        description: "Storage unlimited untuk semua design dan asset dengan backup otomatis ke cloud",
        icon: HardDrive,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 30.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 80.000", discount: "11%", popular: false },
      { duration: "6 Bulan", price: "Rp 150.000", discount: "17%", popular: false },
    ],
    reviews: [
      {
        name: "Maya Designer",
        rating: 5,
        comment: "Background remover sangat akurat! Template premium nya juga berkualitas tinggi dan up-to-date.",
        date: "2 hari lalu",
      },
      {
        name: "Andi Marketing",
        rating: 5,
        comment: "Brand kit memudahkan maintain consistency visual brand. Team collaboration juga smooth banget.",
        date: "4 hari lalu",
      },
      {
        name: "Sinta Creative",
        rating: 4,
        comment: "Kolaborasi tim jadi lebih mudah, stock premium nya juga lengkap. Recommended untuk agency!",
        date: "1 minggu lalu",
      },
    ],
    faq: [
      {
        question: "Berapa banyak template yang tersedia?",
        answer:
          "Tersedia jutaan template premium untuk social media, presentation, poster, dan kebutuhan design lainnya yang selalu update.",
      },
      {
        question: "Background remover akurat untuk semua foto?",
        answer:
          "AI background remover sangat akurat, terutama untuk foto dengan kontras yang jelas dan dapat handle berbagai jenis objek.",
      },
      {
        question: "Bisa invite berapa orang dalam tim?",
        answer:
          "Bisa invite anggota tim sesuai kebutuhan dengan berbagai level akses dan permission yang dapat dikustomisasi.",
      },
    ],
    compatibility: ["Web Browser", "Android", "iOS", "Desktop App", "API Access", "Third-party Integrations"],
    tags: ["Design", "Templates", "Background Remover", "Brand Kit", "Team", "Professional", "AI Tools"],
  },
  8: {
    // Adobe Creative Cloud
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Adobe+All+Apps+Suite",
        title: "Complete Adobe Apps Suite",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Adobe+Photoshop+Advanced",
        title: "Photoshop Advanced Features",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Adobe+After+Effects",
        title: "After Effects Motion Graphics",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Adobe+Creative+Cloud+Sync",
        title: "Creative Cloud Sync",
      },
    ],
    longDescription:
      "Adobe Creative Cloud memberikan akses ke seluruh ekosistem aplikasi Adobe termasuk Photoshop, Illustrator, After Effects, Premiere Pro, dan 20+ aplikasi lainnya untuk kebutuhan creative profesional. Dilengkapi dengan cloud storage, premium fonts, dan stock assets untuk workflow yang terintegrasi dan produktif.",
    detailedFeatures: [
      {
        title: "Complete App Suite",
        description:
          "Akses ke 20+ aplikasi Adobe termasuk Photoshop, Illustrator, After Effects, Premiere Pro, dan lainnya",
        icon: Grid3x3,
      },
      {
        title: "Cloud Storage",
        description: "100GB cloud storage untuk sync project antar device dengan backup otomatis dan version control",
        icon: Cloud,
      },
      {
        title: "Adobe Fonts",
        description: "Akses ke ribuan font premium dari Adobe Fonts yang dapat digunakan untuk semua project",
        icon: Type,
      },
      {
        title: "Stock Assets",
        description: "Credit untuk download asset dari Adobe Stock termasuk foto, video, dan template premium",
        icon: ImageIcon,
      },
      {
        title: "Latest Updates",
        description: "Selalu mendapat update terbaru dan fitur-fitur baru segera setelah dirilis Adobe",
        icon: Download,
      },
      {
        title: "Professional Tools",
        description: "Tools professional grade untuk video, photo, design, dan web development dengan standar industri",
        icon: Wrench,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 120.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 320.000", discount: "11%", popular: false },
      { duration: "6 Bulan", price: "Rp 600.000", discount: "17%", popular: false },
    ],
    reviews: [
      {
        name: "Rizky Designer",
        rating: 5,
        comment:
          "Complete banget! Photoshop, Illustrator, After Effects semua ada. Worth every penny untuk professional.",
        date: "1 hari lalu",
      },
      {
        name: "Devi Filmmaker",
        rating: 5,
        comment: "Premiere Pro dan After Effects perfect buat video editing professional. Cloud sync juga seamless.",
        date: "3 hari lalu",
      },
      {
        name: "Anto Graphic",
        rating: 4,
        comment: "Font collection nya amazing, cloud sync juga smooth antar device. Investment yang worthit!",
        date: "5 hari lalu",
      },
    ],
    faq: [
      {
        question: "Aplikasi apa saja yang termasuk?",
        answer:
          "Termasuk Photoshop, Illustrator, After Effects, Premiere Pro, InDesign, XD, Lightroom, dan 15+ aplikasi lainnya.",
      },
      {
        question: "Bisa install di berapa device?",
        answer:
          "Bisa install di 2 device secara bersamaan dengan akun yang sama, dengan deactivation otomatis jika lebih.",
      },
      {
        question: "Adobe Stock credit berapa?",
        answer:
          "Mendapat credit Adobe Stock yang bisa digunakan untuk download asset premium sesuai paket yang dipilih.",
      },
    ],
    compatibility: ["Windows", "macOS", "iPad", "Web Browser", "Mobile Apps", "Cloud Services"],
    tags: [
      "Professional",
      "Photography",
      "Video",
      "Design",
      "Complete Suite",
      "Adobe",
      "Creative",
      "Industry Standard",
    ],
  },
  9: {
    // Grammarly Premium
    media: [
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Grammarly+Advanced+Grammar",
        title: "Advanced Grammar Checking",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Grammarly+Plagiarism+Checker",
        title: "Plagiarism Detection System",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Grammarly+Tone+Detector",
        title: "Tone Detection Feature",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=300&width=500&text=Grammarly+Writing+Goals",
        title: "Writing Goals & Analytics",
      },
    ],
    longDescription:
      "Grammarly Premium membantu meningkatkan kualitas writing dengan grammar checker advanced, plagiarism detection, tone detector, dan writing goals untuk berbagai kebutuhan professional. Cocok untuk writer, student, professional, dan siapa saja yang ingin meningkatkan kualitas tulisan dalam bahasa Inggris dengan bantuan AI yang canggih.",
    detailedFeatures: [
      {
        title: "Advanced Grammar",
        description:
          "Grammar checking yang lebih detail dan akurat dari versi gratis dengan saran perbaikan yang komprehensif",
        icon: CheckCircle,
      },
      {
        title: "Plagiarism Detection",
        description: "Deteksi plagiarism dengan database 16 miliar web pages untuk memastikan originalitas tulisan",
        icon: Shield,
      },
      {
        title: "Tone Detector",
        description:
          "Analisis tone writing untuk memastikan pesan tersampaikan dengan tepat sesuai konteks dan audience",
        icon: Volume2,
      },
      {
        title: "Writing Goals",
        description: "Set writing goals berdasarkan audience, formality, dan intent untuk hasil yang lebih targeted",
        icon: Target,
      },
      {
        title: "Vocabulary Enhancement",
        description: "Saran kata yang lebih tepat dan bervariasi untuk improve vocabulary dan writing style",
        icon: BookOpen,
      },
      {
        title: "Style Guide",
        description: "Konsistensi style dengan brand atau academic style guide untuk professional writing",
        icon: FileText,
      },
    ],
    pricingOptions: [
      { duration: "1 Bulan", price: "Rp 35.000", discount: null, popular: true },
      { duration: "3 Bulan", price: "Rp 95.000", discount: "10%", popular: false },
      { duration: "6 Bulan", price: "Rp 180.000", discount: "14%", popular: false },
    ],
    reviews: [
      {
        name: "Prof. Indira",
        rating: 5,
        comment: "Plagiarism checker sangat akurat untuk academic writing. Tone detector juga helpful untuk paper.",
        date: "2 hari lalu",
      },
      {
        name: "Sarah Writer",
        rating: 5,
        comment:
          "Grammar suggestions jauh lebih detail dari free version. Writing jadi lebih professional dan polished.",
        date: "4 hari lalu",
      },
      {
        name: "Budi Content",
        rating: 4,
        comment: "Vocabulary enhancement bagus buat improve writing style. Recommended untuk content writer!",
        date: "1 minggu lalu",
      },
    ],
    faq: [
      {
        question: "Seberapa akurat plagiarism checker?",
        answer:
          "Sangat akurat dengan database 16 miliar web pages dan academic papers untuk detection yang komprehensif dan reliable.",
      },
      {
        question: "Bisa untuk bahasa selain English?",
        answer:
          "Grammarly fokus pada English, namun memiliki support terbatas untuk beberapa bahasa lain dengan fitur basic.",
      },
      {
        question: "Tone detector support writing style apa?",
        answer:
          "Support berbagai tone: formal, informal, confident, friendly, academic, business, dan masih banyak lagi.",
      },
    ],
    compatibility: ["Web Browser", "MS Word", "Google Docs", "Desktop App", "Mobile Keyboard", "Email Clients"],
    tags: ["Writing", "Grammar", "Plagiarism", "Academic", "Professional", "English", "AI Assistant", "Productivity"],
  },
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [selectedMedia, setSelectedMedia] = useState(0)
  const [selectedPricing, setSelectedPricing] = useState(0)
  const [isPaymentFlowOpen, setIsPaymentFlowOpen] = useState(false)

  const openPaymentFlow = () => {
    setIsPaymentFlowOpen(true)
  }

  const closePaymentFlow = () => {
    setIsPaymentFlowOpen(false)
  }

  if (!product) return null

  let details = productDetails[product.id as keyof typeof productDetails]

  // If no specific details found, create generic details
  if (!details) {
    details = {
      media: [
        {
          type: "image",
          src: `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(product.name + " Preview")}`,
          title: `${product.name} Preview`,
        },
        {
          type: "image",
          src: `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(product.name + " Features")}`,
          title: `${product.name} Features`,
        },
        {
          type: "image",
          src: `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(product.name + " Interface")}`,
          title: `${product.name} Interface`,
        },
        {
          type: "image",
          src: `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(product.name + " Premium")}`,
          title: `${product.name} Premium Access`,
        },
      ],
      longDescription: `${product.name} memberikan akses premium dengan fitur lengkap dan kualitas terbaik. Nikmati pengalaman premium tanpa batas dengan harga terjangkau dan garansi penuh dari SIPREMIUM. Akun resmi dan aman digunakan untuk kebutuhan personal maupun profesional.`,
      detailedFeatures: product.features.map((feature, index) => ({
        title: feature,
        description: `Fitur ${feature} memberikan pengalaman terbaik dan akses penuh ke semua kemampuan premium yang tersedia`,
        icon: [Play, Download, Smartphone, Monitor, Zap, Globe][index] || Play,
      })),
      pricingOptions: [
        { duration: "1 Bulan", price: product.price, discount: null, popular: true },
        {
          duration: "3 Bulan",
          price: `Rp ${Math.floor(Number.parseInt(product.price.replace(/\D/g, "")) * 2.7).toLocaleString()}`,
          discount: "10%",
          popular: false,
        },
        {
          duration: "6 Bulan",
          price: `Rp ${Math.floor(Number.parseInt(product.price.replace(/\D/g, "")) * 5).toLocaleString()}`,
          discount: "17%",
          popular: false,
        },
      ],
      reviews: [
        {
          name: "Customer Satisfied",
          rating: 5,
          comment: `${product.name} sangat bagus dan sesuai ekspektasi. Pelayanan admin SIPREMIUM juga responsif dan profesional.`,
          date: "2 hari lalu",
        },
        {
          name: "Happy User",
          rating: 4,
          comment: `Harga terjangkau untuk fitur premium. Recommended banget untuk yang butuh ${product.name} berkualitas!`,
          date: "1 minggu lalu",
        },
        {
          name: "Verified Buyer",
          rating: 5,
          comment: `Akun work 100% dan stabil. Garansi dari SIPREMIUM juga terpercaya, pelayanan memuaskan!`,
          date: "2 minggu lalu",
        },
      ],
      faq: [
        {
          question: "Apakah akun ini aman digunakan?",
          answer: `Ya, semua akun ${product.name} kami adalah akun resmi dan aman digunakan dengan garansi penuh dari SIPREMIUM.`,
        },
        {
          question: "Berapa lama masa aktif akun?",
          answer: `Masa aktif akun sesuai dengan paket yang dipilih, mulai dari 1 bulan hingga 6 bulan dengan garansi penuh.`,
        },
        {
          question: "Bagaimana jika akun bermasalah?",
          answer: `Kami memberikan garansi 100%. Jika ada masalah, akun akan diganti atau uang dikembalikan tanpa pertanyaan.`,
        },
        {
          question: "Apakah bisa digunakan di multiple device?",
          answer: `Ya, akun dapat digunakan sesuai dengan ketentuan platform masing-masing dengan panduan lengkap dari kami.`,
        },
      ],
      compatibility: ["Web Browser", "Mobile App", "Desktop App", "Smart TV", "Tablet"],
      tags: ["Premium", "Official", "Guaranteed", "Support 24/7", "Best Price"],
    }
  }

  const handleMediaSelect = (index: number) => {
    setSelectedMedia(index)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${product.gradient} rounded-xl flex items-center justify-center`}
              >
                <product.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-800">{product.name}</DialogTitle>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({details.reviews.length} ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{product.sold} terjual</span>
                  </div>
                  <Badge className={`${product.badgeColor} text-white`}>{product.badge}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="bg-transparent">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <div className="p-6 pt-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Fitur</TabsTrigger>
                <TabsTrigger value="reviews">Ulasan</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Media Gallery */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Screenshots & Preview</h3>
                    <div className="relative">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <img
                          src={details.media[selectedMedia]?.src || "/placeholder.svg"}
                          alt={details.media[selectedMedia]?.title || `${product.name} media ${selectedMedia + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Navigation arrows */}
                      <div className="absolute inset-y-0 left-2 flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleMediaSelect((selectedMedia - 1 + details.media.length) % details.media.length)
                          }
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute inset-y-0 right-2 flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleMediaSelect((selectedMedia + 1) % details.media.length)}
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Media thumbnails */}
                    <div className="grid grid-cols-4 gap-2">
                      {details.media.map((media, index) => (
                        <button
                          key={index}
                          onClick={() => handleMediaSelect(index)}
                          className={`relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedMedia === index ? "border-purple-500" : "border-transparent"
                          }`}
                        >
                          <img
                            src={media.src || "/placeholder.svg"}
                            alt={media.title || `Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Media title and description */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">{details.media[selectedMedia]?.title}</h4>
                      <p className="text-sm text-gray-600">Preview fitur dan interface {product.name}</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Deskripsi Produk</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{details.longDescription}</p>

                    {/* Pricing Options */}
                    <h4 className="font-semibold mb-4">Pilih Paket</h4>
                    <div className="space-y-3 mb-6">
                      {details.pricingOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedPricing(index)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedPricing === index
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{option.duration}</span>
                                {option.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
                              </div>
                              <div className="text-2xl font-bold text-purple-600">{option.price}</div>
                            </div>
                            {option.discount && (
                              <div className="text-right">
                                <div className="text-sm text-green-600 font-medium">Hemat {option.discount}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compatibility */}
                    <h4 className="font-semibold mb-3">Kompatibilitas</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {details.compatibility.map((platform, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                          {platform}
                        </Badge>
                      ))}
                    </div>

                    {/* Tags */}
                    <h4 className="font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {details.tags.map((tag, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                        onClick={openPaymentFlow}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Beli Sekarang
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                        onClick={() => {
                          const deliveryMessage = generateProductDeliveryMessage(product, product.id)
                          const phoneNumber = "6287777808021"
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${deliveryMessage}`
                          window.open(whatsappUrl, "_blank")
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Dapatkan Akun (Demo)
                      </Button>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                        onClick={() => {
                          const message = encodeURIComponent(`Halo Admin SIPREMIUM! 👋

Saya tertarik dengan produk ${product.name} dan ingin bertanya lebih lanjut.

Mohon informasinya ya! 🙏`)
                          const phoneNumber = "6287777808021"
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
                          window.open(whatsappUrl, "_blank")
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat Admin SIPREMIUM
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <h3 className="text-lg font-semibold mb-6">Fitur Lengkap</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {details.detailedFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <Card key={index} className="border-2 border-gray-100 hover:border-purple-200 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <h3 className="text-lg font-semibold mb-6">Ulasan Pelanggan</h3>
                <div className="space-y-6">
                  {details.reviews.map((review, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800">{review.name}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {details.faq.map((item, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-6">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-600 text-sm font-bold">Q</span>
                          </div>
                          {item.question}
                        </h4>
                        <div className="ml-8">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <PaymentFlow
          product={
            product
              ? {
                  name: product.name,
                  price: details?.pricingOptions[selectedPricing]?.price || product.price,
                  duration: details?.pricingOptions[selectedPricing]?.duration || "1 Bulan",
                }
              : null
          }
          isOpen={isPaymentFlowOpen}
          onClose={closePaymentFlow}
        />
      </DialogContent>
    </Dialog>
  )
}
