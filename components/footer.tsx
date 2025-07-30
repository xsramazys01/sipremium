import Logo from "./logo"
import { MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo showText={false} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">SIPREMIUM</h3>
              <p className="text-gray-400 mb-4">
                Marketplace terpercaya untuk akun premium Netflix, Spotify, YouTube Premium, dan aplikasi premium
                lainnya dengan harga terjangkau.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +6287777808021</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/catalog" className="hover:text-white transition-colors">
                  Katalog
                </a>
              </li>
              <li>
                <a href="/testimoni" className="hover:text-white transition-colors">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/garansi" className="hover:text-white transition-colors">
                  Garansi
                </a>
              </li>
              <li>
                <a href="/payment-methods" className="hover:text-white transition-colors">
                  Metode Pembayaran
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Products */}
          <div>
            <h4 className="font-semibold mb-4">Produk Populer</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Netflix Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Spotify Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  YouTube Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Disney+ Hotstar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ChatGPT Plus
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SIPREMIUM. All rights reserved. | Premium Account Marketplace</p>
        </div>
      </div>
    </footer>
  )
}
