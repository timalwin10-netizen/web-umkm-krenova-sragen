# Platform UMKM Sragen

Platform digital untuk mempromosikan dan mendukung Usaha Mikro, Kecil, dan Menengah (UMKM) di Kabupaten Sragen.

## 🚀 Fitur Utama

### 🏠 Halaman Beranda
- Hero section dengan deskripsi UMKM Sragen
- Bagian tentang platform
- Fitur-fitur unggulan
- Kategori UMKM
- Informasi kontak dan lokasi

### 🛍️ Halaman Toko
- Daftar produk UMKM yang lengkap
- Filter dan pencarian produk
- Keranjang belanja dengan micro-transaction
- Sistem checkout dengan form pemesanan
- Manajemen stok real-time

### 📝 Halaman Pendaftaran
- Form pendaftaran untuk UMKM yang ingin bergabung
- Input data toko lengkap
- Manajemen produk
- Validasi form yang komprehensif
- Progress indicator multi-step

### 🔧 Backend API
- RESTful API untuk shops, products, dan orders
- Database dengan Prisma ORM
- Validasi input yang aman
- Error handling yang baik

## 🛠️ Teknologi

### Frontend
- **Next.js 15** dengan App Router
- **TypeScript 5** untuk type safety
- **Tailwind CSS 4** untuk styling
- **shadcn/ui** untuk komponen UI
- **Lucide React** untuk ikon

### Backend
- **Next.js API Routes** untuk backend
- **Prisma ORM** dengan SQLite
- **TypeScript** untuk type safety
- **RESTful API** design

### Database
- **SQLite** untuk development
- **Prisma Schema** dengan relasi lengkap
- **Migrations** otomatis

## 📁 Struktur Proyek

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── shops/         # Shop management
│   │   ├── products/      # Product management
│   │   └── orders/        # Order management
│   ├── shop/              # Halaman toko
│   ├── register/          # Halaman pendaftaran
│   └── page.tsx           # Halaman beranda
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   └── db.ts              # Prisma client
└── hooks/                 # Custom React hooks
```

## 🎨 Tema Desain

### Warna
- **Primary**: #8B4513 (Brown)
- **Secondary**: #A0522D (Sienna)
- **Accent**: #D2691E (Chocolate)
- **Background**: Gradient dari amber-50 ke orange-50

### Typography
- **Judul**: Poppins (bold)
- **Teks**: Open Sans
- **Responsive**: Mobile-first design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd project-umkm-sragen
```

2. Install dependencies
```bash
npm install
```

3. Setup database
```bash
npm run db:push
```

4. Run development server
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Design

Platform dirancang dengan mobile-first approach:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database

### Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 📊 Database Schema

### Models
- **User**: Pengguna (customer, shop_owner, admin)
- **Shop**: Informasi toko UMKM
- **Product**: Produk yang dijual
- **Order**: Pesanan pelanggan
- **OrderItem**: Item dalam pesanan

### Relationships
- User 1:N Shop (shop owner)
- Shop 1:N Product
- User 1:N Order (customer)
- Order 1:N OrderItem
- Product 1:N OrderItem

## 🔒 Security Features

- Input validation pada semua forms
- SQL injection prevention dengan Prisma
- XSS protection
- CSRF protection
- Rate limiting (dapat ditambahkan)

## 🌐 API Endpoints

### Shops
- `GET /api/shops` - Get all shops
- `POST /api/shops` - Create new shop
- `GET /api/shops/:id` - Get shop by ID

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## 🎯 Features Implementation

### Shopping Cart
- LocalStorage untuk persistensi
- Real-time quantity updates
- Stock validation
- Price calculation

### Search & Filter
- Real-time search
- Category filtering
- Price sorting
- Rating sorting

### Form Validation
- Client-side validation
- Error messages
- Required field checking
- Email/phone format validation

## 📈 Performance Optimization

- Image optimization dengan Next.js Image
- Code splitting
- Lazy loading
- Component caching
- Database indexing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Setup environment variables
3. Deploy otomatis

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📝 License

MIT License - see LICENSE file for details

## 📞 Support

- **Email**: support@umkm-sragen.id
- **Phone**: (0271) 123-456
- **Address**: Jl. Sukowati No. 123, Sragen

## 🎉 Acknowledgments

- Pemerintah Kabupaten Sragen
- Komunitas UMKM Sragen
- Tim Developer Platform Digital

---

© 2024 Platform UMKM Sragen. All rights reserved.