"use client"

// Centralized product data storage
// In production, this would be stored in a database with proper security
export const productData = {
  1: {
    // Netflix Premium
    username: "netflix.premium2024@gmail.com",
    password: "NetflixSecure123!",
    profileName: "Premium User",
    additionalInfo:
      "✅ Akun dapat digunakan di 4 device bersamaan\n✅ Kualitas 4K Ultra HD tersedia\n✅ Download offline unlimited\n⚠️ Jangan ubah password atau profile utama\n⚠️ Gunakan sesuai fair usage policy",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://netflix.com/login",
    supportedDevices: ["Smart TV", "Android", "iOS", "Windows", "macOS", "PlayStation", "Xbox"],
    maxDevices: 4,
    features: ["4K Ultra HD", "HDR", "Dolby Atmos", "Download Offline", "Multiple Profiles"],
  },
  2: {
    // Spotify Premium
    username: "spotify.premium2024@gmail.com",
    password: "SpotifySecure123!",
    profileName: "Premium User",
    additionalInfo:
      "✅ Akun individual, 1 device streaming\n✅ Download hingga 10.000 lagu\n✅ Kualitas audio 320kbps\n✅ Skip unlimited dan no ads\n⚠️ Jangan login di device lain saat streaming",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://accounts.spotify.com/login",
    supportedDevices: ["Android", "iOS", "Windows", "macOS", "Web Browser", "Smart Speaker"],
    maxDevices: 1,
    features: ["No Ads", "320kbps Quality", "Offline Download", "Unlimited Skip", "Spotify Connect"],
  },
  3: {
    // YouTube Premium
    username: "youtube.premium2024@gmail.com",
    password: "YouTubeSecure123!",
    profileName: "Premium User",
    additionalInfo:
      "✅ YouTube Premium + YouTube Music included\n✅ Background play dan picture-in-picture\n✅ Download video untuk offline\n✅ No ads di semua video\n⚠️ Gunakan dengan bijak, jangan spam download",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://accounts.google.com/signin",
    supportedDevices: ["Android", "iOS", "Web Browser", "Smart TV", "Chromecast"],
    maxDevices: 1,
    features: ["No Ads", "Background Play", "YouTube Music", "Download Videos", "YouTube Originals"],
  },
  4: {
    // Disney+ Hotstar
    username: "disney.premium2024@gmail.com",
    password: "DisneySecure123!",
    profileName: "Premium User",
    additionalInfo:
      "✅ Semua konten Disney, Marvel, Star Wars, Pixar\n✅ Live sports EPL, Liga Champions, NBA\n✅ Konten 4K untuk film pilihan\n✅ Parental control untuk anak\n⚠️ Maksimal 4 device, 2 streaming bersamaan",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://www.hotstar.com/id/login",
    supportedDevices: ["Smart TV", "Android", "iOS", "Web Browser", "Chromecast", "Apple TV"],
    maxDevices: 4,
    features: ["Disney Content", "Marvel & Star Wars", "Live Sports", "4K Quality", "Kids Profile"],
  },
  5: {
    // ChatGPT Plus
    username: "chatgpt.plus2024@gmail.com",
    password: "ChatGPTSecure123!",
    profileName: "Plus User",
    additionalInfo:
      "✅ Akses GPT-4 dengan response lebih cepat\n✅ Priority access saat server busy\n✅ Plugin dan advanced features\n✅ Longer conversation context\n⚠️ Fair usage policy berlaku\n⚠️ Jangan gunakan untuk spam atau abuse",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://chat.openai.com/auth/login",
    supportedDevices: ["Web Browser", "Mobile Browser", "Desktop App"],
    maxDevices: 1,
    features: ["GPT-4 Access", "Priority Access", "Advanced Features", "Longer Context", "Plugin Support"],
  },
  6: {
    // CapCut Pro
    username: "capcut.pro2024@gmail.com",
    password: "CapCutSecure123!",
    profileName: "Pro User",
    additionalInfo:
      "✅ Export tanpa watermark CapCut\n✅ Premium effects dan transitions\n✅ HD/4K export quality\n✅ Advanced editing tools\n✅ Cloud storage untuk project\n⚠️ Gunakan untuk keperluan personal/komersial sesuai ToS",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://www.capcut.com/login",
    supportedDevices: ["Android", "iOS", "Desktop App", "Web Version"],
    maxDevices: 2,
    features: ["No Watermark", "Premium Effects", "4K Export", "Advanced Tools", "Cloud Storage"],
  },
  7: {
    // Canva Pro
    username: "canva.pro2024@gmail.com",
    password: "CanvaSecure123!",
    profileName: "Pro User",
    additionalInfo:
      "✅ Jutaan template premium\n✅ AI Background remover\n✅ Brand kit dan team features\n✅ Premium stock photos/videos\n✅ Unlimited storage\n⚠️ Bisa untuk komersial, simpan brand kit dengan aman",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://www.canva.com/login",
    supportedDevices: ["Web Browser", "Android", "iOS", "Desktop App"],
    maxDevices: 2,
    features: ["Premium Templates", "Background Remover", "Brand Kit", "Team Features", "Premium Stock"],
  },
  8: {
    // Adobe Creative Cloud
    username: "adobe.cc2024@gmail.com",
    password: "AdobeSecure123!",
    profileName: "Creative User",
    additionalInfo:
      "✅ Semua aplikasi Adobe (20+ apps)\n✅ 100GB cloud storage\n✅ Adobe Fonts dan Stock credits\n✅ Latest updates dan features\n⚠️ Maksimal 2 device activation\n⚠️ Deactivate device lama sebelum install di device baru",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://auth.services.adobe.com/",
    supportedDevices: ["Windows", "macOS", "iPad", "Web Browser"],
    maxDevices: 2,
    features: ["All Adobe Apps", "Cloud Storage", "Adobe Fonts", "Stock Credits", "Latest Updates"],
  },
  9: {
    // Grammarly Premium
    username: "grammarly.premium2024@gmail.com",
    password: "GrammarlySecure123!",
    profileName: "Premium User",
    additionalInfo:
      "✅ Advanced grammar dan style checking\n✅ Plagiarism detector dengan 16B database\n✅ Tone detector dan writing goals\n✅ Vocabulary enhancement suggestions\n⚠️ Fokus untuk English writing\n⚠️ Gunakan untuk academic/professional writing",
    validUntil: "30 hari dari pembelian",
    loginUrl: "https://app.grammarly.com/",
    supportedDevices: ["Web Browser", "Desktop App", "Mobile Keyboard", "MS Word", "Google Docs"],
    maxDevices: 1,
    features: ["Advanced Grammar", "Plagiarism Check", "Tone Detector", "Writing Goals", "Vocabulary Enhancement"],
  },
}

// Function to generate product delivery message
export const generateProductDeliveryMessage = (product: any, productId: number) => {
  const productInfo = productData[productId as keyof typeof productData]

  if (!productInfo) {
    return encodeURIComponent(`❌ Maaf, data produk ${product.name} sedang tidak tersedia. 

Mohon hubungi admin SIPREMIUM untuk bantuan lebih lanjut.
WhatsApp: +6287777808021`)
  }

  const currentDate = new Date()
  const expiryDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

  const message = `🎉 *PENGIRIMAN AKUN PREMIUM BERHASIL* 🎉

Terima kasih telah berbelanja di SIPREMIUM!
Berikut detail akun ${product.name} Anda:

📱 *DETAIL AKUN PREMIUM*
• Produk: ${product.name}
• Email/Username: ${productInfo.username}
• Password: ${productInfo.password}
• Profile Name: ${productInfo.profileName}
• Login URL: ${productInfo.loginUrl}

📅 *MASA AKTIF*
• Mulai: ${currentDate.toLocaleDateString("id-ID")}
• Berakhir: ${expiryDate.toLocaleDateString("id-ID")}
• Durasi: 30 hari penuh

🔧 *SPESIFIKASI AKUN*
• Max Devices: ${productInfo.maxDevices} perangkat
• Supported: ${productInfo.supportedDevices.slice(0, 3).join(", ")}${productInfo.supportedDevices.length > 3 ? ", dll" : ""}

✨ *FITUR PREMIUM*
${productInfo.features.map((feature) => `• ${feature}`).join("\n")}

ℹ️ *PANDUAN PENGGUNAAN*
${productInfo.additionalInfo}

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
1. Buka: ${productInfo.loginUrl}
2. Masukkan email: ${productInfo.username}
3. Masukkan password: ${productInfo.password}
4. Selamat menikmati fitur premium!

Terima kasih telah mempercayai SIPREMIUM! 
Jika ada pertanyaan, jangan ragu hubungi kami.

*SIPREMIUM - Your Trusted Premium Account Partner*
📱 WhatsApp: +6287777808021
⭐ Rating: 4.9/5 (15,000+ customers)
🛡️ Garansi: 100% Money Back Guarantee`

  return encodeURIComponent(message)
}

// Function to generate order confirmation message
export const generateOrderConfirmationMessage = (product: any, paymentMethod: string, accountInfo: string) => {
  const orderNumber = `SP${Date.now().toString().slice(-8)}`

  const message = `📋 *KONFIRMASI PESANAN SIPREMIUM* 📋

Pesanan Anda telah diterima dan sedang diproses!

🛒 *DETAIL PESANAN*
• Order ID: ${orderNumber}
• Produk: ${product.name}
• Paket: ${product.duration}
• Harga: ${product.price}
• Waktu Order: ${new Date().toLocaleString("id-ID")}

💳 *METODE PEMBAYARAN*
• Metode: ${paymentMethod}
• ${paymentMethod.includes("Bank") ? "Rekening" : "Nomor"}: ${accountInfo}

⏰ *STATUS PESANAN*
🔄 Menunggu pembayaran...

📝 *LANGKAH SELANJUTNYA*
1. Lakukan pembayaran sesuai nominal
2. Kirim bukti transfer ke chat ini
3. Admin akan verifikasi (1-15 menit)
4. Akun premium akan dikirim otomatis

⚡ *PENGIRIMAN OTOMATIS*
Setelah pembayaran terverifikasi, akun premium akan dikirim langsung ke WhatsApp ini dalam format lengkap dengan:
• Username & Password
• Panduan login step-by-step  
• Tips penggunaan optimal
• Garansi & support info

🛡️ *JAMINAN SIPREMIUM*
✅ Akun 100% original & legal
✅ Garansi penuh selama masa aktif
✅ Support 24/7 responsive
✅ Replacement gratis jika bermasalah

Terima kasih telah memilih SIPREMIUM!
Kami akan segera memproses pesanan Anda.

*SIPREMIUM - Your Premium Account Partner*
WhatsApp: +6287777808021`

  return encodeURIComponent(message)
}

// Function to generate payment reminder message
export const generatePaymentReminderMessage = (product: any, paymentMethod: string) => {
  const message = `⏰ *REMINDER PEMBAYARAN* ⏰

Halo! Pesanan ${product.name} Anda masih menunggu pembayaran.

💳 *DETAIL PEMBAYARAN*
• Produk: ${product.name}
• Total: ${product.price}
• Metode: ${paymentMethod}

📤 *KIRIM BUKTI TRANSFER*
Setelah transfer, mohon kirim screenshot bukti pembayaran ke chat ini untuk verifikasi cepat.

⚡ *PROSES OTOMATIS*
• Verifikasi: 1-15 menit
• Pengiriman akun: Otomatis setelah verifikasi
• Support: 24/7 siap membantu

Butuh bantuan? Chat admin sekarang!

*SIPREMIUM - Fast & Reliable Service*`

  return encodeURIComponent(message)
}
