import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, MessageCircle, HelpCircle, Search, Shield, Zap, Crown, Headphones, DollarSign } from "lucide-react"
import Logo from "./components/logo"
import Footer from "./components/footer"

export default function WarungRebahanClone() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link href="/testimoni" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <MessageCircle className="w-4 h-4" />
                Testimoni
              </Link>
              <Link href="/faq" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Link>
              <Link href="/cek-transaksi" className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                <Search className="w-4 h-4" />
                Cek Transaksi
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
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-4">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 mb-4">
            ⭐ SIPREMIUM - Your Premium Account Marketplace
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Marketplace <span className="text-blue-600">Aplikasi Premium</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Terpercaya & Terjangkau
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              SIPREMIUM adalah spesialis penjualan akun premium Netflix, Spotify, CapCut, ChatGPT dan aplikasi premium
              lainnya. Ready stock langsung dari tim internal - legal, aman, dan siap digunakan.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/catalog">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Lihat Semua Aplikasi
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat Admin
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">⚡ 100% Premium Features</Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">🛡️ Garansi Aman</Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">⏰ Support 24 Jam</Badge>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

              {/* Main illustration placeholder */}
              <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-4xl">S</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                    {["Netflix", "Spotify", "YouTube", "Disney+", "CapCut", "Premium"].map((app, index) => (
                      <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-xs font-medium text-center shadow-sm"
                      >
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4">
                <Badge className="bg-orange-500 text-white">Best Seller</Badge>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <Badge className="bg-green-500 text-white">Premium</Badge>
              </div>
              <div className="absolute top-1/2 -right-8">
                <Badge className="bg-red-500 text-white">Hot</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-blue-600">Mengapa</span> <span className="text-purple-600">Memilih</span>{" "}
            <span className="text-pink-600">Kami?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman jual beli akun premium yang aman, nyaman, dan terpercaya untuk semua
            kebutuhan Anda.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Transaksi Cepat */}
          <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">Transaksi Cepat</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Proses pembelian yang cepat dan aman melalui WhatsApp dengan sistem pembayaran yang transparan dan
                terjamin keamanannya.
              </p>
            </CardContent>
          </Card>

          {/* Akun Premium */}
          <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">Akun Premium</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Setiap akun premium telah melalui verifikasi manual tim kami, dengan fitur lengkap dan status aktif yang
                siap digunakan.
              </p>
            </CardContent>
          </Card>

          {/* Support 24 Jam */}
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">Support 24 Jam</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tim support kami siap membantu Anda kapan saja dengan respon cepat dan solusi terbaik untuk setiap
                kebutuhan.
              </p>
            </CardContent>
          </Card>

          {/* Harga Murah */}
          <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">Harga Murah</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Harga yang terjangkau mulai dari Rp5.000 dengan transparansi penuh, tanpa biaya tersembunyi atau komisi
                tambahan.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer whatsappNumber="+6287777808021" />
    </div>
  )
}
