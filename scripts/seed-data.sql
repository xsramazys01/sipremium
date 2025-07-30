-- Seed initial data for SIPREMIUM

-- Insert products
INSERT OR REPLACE INTO products (id, name, description, price, duration, category, image_url) VALUES
(1, 'Netflix Premium', 'Akun Netflix Premium dengan akses 4K dan multiple profiles', 25000, '1 Bulan', 'Streaming', '/placeholder.svg?height=200&width=300&text=Netflix'),
(2, 'Spotify Premium', 'Akun Spotify Premium dengan kualitas 320kbps dan offline download', 15000, '1 Bulan', 'Music', '/placeholder.svg?height=200&width=300&text=Spotify'),
(3, 'YouTube Premium', 'YouTube Premium dengan YouTube Music dan no ads', 35000, '1 Bulan', 'Streaming', '/placeholder.svg?height=200&width=300&text=YouTube'),
(4, 'Disney+ Hotstar', 'Disney+ Hotstar dengan konten Disney, Marvel, dan live sports', 45000, '1 Bulan', 'Streaming', '/placeholder.svg?height=200&width=300&text=Disney'),
(5, 'ChatGPT Plus', 'ChatGPT Plus dengan akses GPT-4 dan priority access', 85000, '1 Bulan', 'AI Tools', '/placeholder.svg?height=200&width=300&text=ChatGPT'),
(6, 'CapCut Pro', 'CapCut Pro dengan export tanpa watermark dan premium effects', 20000, '1 Bulan', 'Video Editing', '/placeholder.svg?height=200&width=300&text=CapCut'),
(7, 'Canva Pro', 'Canva Pro dengan premium templates dan background remover', 30000, '1 Bulan', 'Design', '/placeholder.svg?height=200&width=300&text=Canva'),
(8, 'Adobe Creative Cloud', 'Adobe Creative Cloud dengan semua aplikasi Adobe', 150000, '1 Bulan', 'Design', '/placeholder.svg?height=200&width=300&text=Adobe'),
(9, 'Grammarly Premium', 'Grammarly Premium dengan advanced grammar dan plagiarism check', 40000, '1 Bulan', 'Writing', '/placeholder.svg?height=200&width=300&text=Grammarly');

-- Insert product accounts
INSERT OR REPLACE INTO product_accounts (product_id, username, password, profile_name, login_url, additional_info, max_devices, supported_devices, features) VALUES
(1, 'netflix.premium2024@gmail.com', 'NetflixSecure123!', 'Premium User', 'https://netflix.com/login', 
 '✅ Akun dapat digunakan di 4 device bersamaan\n✅ Kualitas 4K Ultra HD tersedia\n✅ Download offline unlimited\n⚠️ Jangan ubah password atau profile utama', 
 4, '["Smart TV", "Android", "iOS", "Windows", "macOS", "PlayStation", "Xbox"]', 
 '["4K Ultra HD", "HDR", "Dolby Atmos", "Download Offline", "Multiple Profiles"]'),

(2, 'spotify.premium2024@gmail.com', 'SpotifySecure123!', 'Premium User', 'https://accounts.spotify.com/login',
 '✅ Akun individual, 1 device streaming\n✅ Download hingga 10.000 lagu\n✅ Kualitas audio 320kbps\n⚠️ Jangan login di device lain saat streaming',
 1, '["Android", "iOS", "Windows", "macOS", "Web Browser", "Smart Speaker"]',
 '["No Ads", "320kbps Quality", "Offline Download", "Unlimited Skip", "Spotify Connect"]'),

(3, 'youtube.premium2024@gmail.com', 'YouTubeSecure123!', 'Premium User', 'https://accounts.google.com/signin',
 '✅ YouTube Premium + YouTube Music included\n✅ Background play dan picture-in-picture\n✅ Download video untuk offline\n⚠️ Gunakan dengan bijak',
 1, '["Android", "iOS", "Web Browser", "Smart TV", "Chromecast"]',
 '["No Ads", "Background Play", "YouTube Music", "Download Videos", "YouTube Originals"]'),

(4, 'disney.premium2024@gmail.com', 'DisneySecure123!', 'Premium User', 'https://www.hotstar.com/id/login',
 '✅ Semua konten Disney, Marvel, Star Wars, Pixar\n✅ Live sports EPL, Liga Champions, NBA\n✅ Konten 4K untuk film pilihan\n⚠️ Maksimal 4 device, 2 streaming bersamaan',
 4, '["Smart TV", "Android", "iOS", "Web Browser", "Chromecast", "Apple TV"]',
 '["Disney Content", "Marvel & Star Wars", "Live Sports", "4K Quality", "Kids Profile"]'),

(5, 'chatgpt.plus2024@gmail.com', 'ChatGPTSecure123!', 'Plus User', 'https://chat.openai.com/auth/login',
 '✅ Akses GPT-4 dengan response lebih cepat\n✅ Priority access saat server busy\n✅ Plugin dan advanced features\n⚠️ Fair usage policy berlaku',
 1, '["Web Browser", "Mobile Browser", "Desktop App"]',
 '["GPT-4 Access", "Priority Access", "Advanced Features", "Longer Context", "Plugin Support"]'),

(6, 'capcut.pro2024@gmail.com', 'CapCutSecure123!', 'Pro User', 'https://www.capcut.com/login',
 '✅ Export tanpa watermark CapCut\n✅ Premium effects dan transitions\n✅ HD/4K export quality\n⚠️ Gunakan untuk keperluan personal/komersial sesuai ToS',
 2, '["Android", "iOS", "Desktop App", "Web Version"]',
 '["No Watermark", "Premium Effects", "4K Export", "Advanced Tools", "Cloud Storage"]'),

(7, 'canva.pro2024@gmail.com', 'CanvaSecure123!', 'Pro User', 'https://www.canva.com/login',
 '✅ Jutaan template premium\n✅ AI Background remover\n✅ Brand kit dan team features\n⚠️ Bisa untuk komersial, simpan brand kit dengan aman',
 2, '["Web Browser", "Android", "iOS", "Desktop App"]',
 '["Premium Templates", "Background Remover", "Brand Kit", "Team Features", "Premium Stock"]'),

(8, 'adobe.cc2024@gmail.com', 'AdobeSecure123!', 'Creative User', 'https://auth.services.adobe.com/',
 '✅ Semua aplikasi Adobe (20+ apps)\n✅ 100GB cloud storage\n✅ Adobe Fonts dan Stock credits\n⚠️ Maksimal 2 device activation',
 2, '["Windows", "macOS", "iPad", "Web Browser"]',
 '["All Adobe Apps", "Cloud Storage", "Adobe Fonts", "Stock Credits", "Latest Updates"]'),

(9, 'grammarly.premium2024@gmail.com', 'GrammarlySecure123!', 'Premium User', 'https://app.grammarly.com/',
 '✅ Advanced grammar dan style checking\n✅ Plagiarism detector dengan 16B database\n✅ Tone detector dan writing goals\n⚠️ Fokus untuk English writing',
 1, '["Web Browser", "Desktop App", "Mobile Keyboard", "MS Word", "Google Docs"]',
 '["Advanced Grammar", "Plagiarism Check", "Tone Detector", "Writing Goals", "Vocabulary Enhancement"]');

-- Insert payment methods
INSERT OR REPLACE INTO payment_methods (type, name, account, is_popular) VALUES
('bank', 'Bank BCA', '1234567890', true),
('bank', 'Bank BRI', '0987654321', false),
('bank', 'Bank BNI', '1122334455', false),
('bank', 'Bank Mandiri', '9988776655', false),
('ewallet', 'OVO', '081234567890', true),
('ewallet', 'GoPay', '081234567890', true),
('ewallet', 'DANA', '081234567890', true),
('ewallet', 'ShopeePay', '081234567890', false);

-- Insert admin user (password: admin123)
INSERT OR REPLACE INTO admin_users (username, password_hash, email) VALUES
('admin', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'admin@sipremium.com');

-- Insert sample customers
INSERT OR REPLACE INTO customers (id, name, email, phone) VALUES
(1, 'John Doe', 'john@example.com', '6281234567890'),
(2, 'Jane Smith', 'jane@example.com', '6281234567891'),
(3, 'Bob Wilson', 'bob@example.com', '6281234567892'),
(4, 'Alice Johnson', 'alice@example.com', '6281234567893'),
(5, 'Charlie Brown', 'charlie@example.com', '6281234567894');

-- Insert sample orders
INSERT OR REPLACE INTO orders (id, customer_id, product_id, amount, payment_method, payment_account, status, created_at, notes) VALUES
('SP12345678', 1, 1, 25000, 'Bank BCA', '1234567890', 'pending', datetime('now', '-30 minutes'), 'Customer menunggu konfirmasi pembayaran'),
('SP12345679', 2, 2, 15000, 'OVO', '081234567890', 'paid', datetime('now', '-60 minutes'), 'Pembayaran sudah dikonfirmasi, siap kirim akun'),
('SP12345680', 3, 5, 85000, 'DANA', '081234567890', 'delivered', datetime('now', '-2 hours'), 'Akun sudah dikirim dan dikonfirmasi customer'),
('SP12345681', 4, 3, 35000, 'Bank BRI', '0987654321', 'pending', datetime('now', '-15 minutes'), 'Baru order, menunggu pembayaran'),
('SP12345682', 5, 4, 45000, 'GoPay', '081234567890', 'paid', datetime('now', '-3 hours'), 'Sudah transfer, bukti sudah dikirim');

-- Update paid orders with paid_at timestamp
UPDATE orders SET paid_at = datetime('now', '-45 minutes') WHERE id = 'SP12345679';
UPDATE orders SET paid_at = datetime('now', '-90 minutes') WHERE id = 'SP12345680';
UPDATE orders SET paid_at = datetime('now', '-150 minutes') WHERE id = 'SP12345682';

-- Update delivered orders with delivered_at timestamp
UPDATE orders SET delivered_at = datetime('now', '-85 minutes') WHERE id = 'SP12345680';
