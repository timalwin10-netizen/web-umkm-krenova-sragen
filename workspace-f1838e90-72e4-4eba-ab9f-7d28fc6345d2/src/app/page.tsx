'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Search, Filter, Star, MapPin, Phone, Mail, Clock, Package, Users, TrendingUp, Award, Heart, ArrowRight } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua', icon: Package },
    { id: 'kuliner', name: 'Kuliner', icon: Package },
    { id: 'kerajinan', name: 'Kerajinan', icon: Award },
    { id: 'fashion', name: 'Fashion', icon: Heart },
    { id: 'pertanian', name: 'Pertanian', icon: TrendingUp },
  ];

  const features = [
    {
      title: 'Promosi Digital',
      description: 'Wadah untuk mempromosikan produk UMKM Sragen ke pasar yang lebih luas',
      icon: TrendingUp,
    },
    {
      title: 'Transaksi Mudah',
      description: 'Sistem pembayaran yang aman dan mudah untuk pembeli dan penjual',
      icon: ShoppingCart,
    },
    {
      title: 'Jaringan Luas',
      description: 'Menghubungkan UMKM dengan konsumen dari berbagai daerah',
      icon: Users,
    },
    {
      title: 'Dukungan Penuh',
      description: 'Bimbingan dan support untuk pengembangan usaha UMKM',
      icon: Award,
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Keripik Singkong Pedas',
      category: 'kuliner',
      price: 15000,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=300&h=200&fit=crop',
      shop: 'Keripik Mbah Sri',
      description: 'Keripik singkong renyah dengan bumbu pedas khas Sragen'
    },
    {
      id: 2,
      name: 'Batik Tulis Sragen',
      category: 'fashion',
      price: 250000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=300&h=200&fit=crop',
      shop: 'Batik Sragen Indah',
      description: 'Batik tulis khas Sragen dengan motif tradisional'
    },
    {
      id: 3,
      name: 'Anyaman Bambu',
      category: 'kerajinan',
      price: 75000,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      shop: 'Kerajinan Bambu Jaya',
      description: 'Tas anyaman bambu dengan desain modern dan fungsional'
    },
    {
      id: 4,
      name: 'Madu Hutan Sragen',
      category: 'pertanian',
      price: 85000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      shop: 'Madu Alam Sragen',
      description: 'Madu murni dari hutan Sragen dengan kualitas terbaik'
    },
    {
      id: 5,
      name: 'Dendeng Sapi',
      category: 'kuliner',
      price: 45000,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300&h=200&fit=crop',
      shop: 'Dendeng Pak Budi',
      description: 'Dendeng sapi khas Sragen dengan bumbu rahasia keluarga'
    },
    {
      id: 6,
      name: 'Tas Kulit Sapi',
      category: 'fashion',
      price: 350000,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
      shop: 'Kulit Sragen Prestige',
      description: 'Tas kulit sapi asli dengan desain elegan dan awet'
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-amber-900">UMKM Sragen</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#beranda" className="text-gray-700 hover:text-amber-700 transition-colors">Beranda</a>
              <a href="#tentang" className="text-gray-700 hover:text-amber-700 transition-colors">Tentang</a>
              <a href="#fitur" className="text-gray-700 hover:text-amber-700 transition-colors">Fitur</a>
              <a href="#produk" className="text-gray-700 hover:text-amber-700 transition-colors">Produk</a>
              <a href="#kontak" className="text-gray-700 hover:text-amber-700 transition-colors">Kontak</a>
              <a href="/shop" className="text-gray-700 hover:text-amber-700 transition-colors">Toko</a>
              <a href="/register" className="text-gray-700 hover:text-amber-700 transition-colors">Daftar</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-amber-900 mb-6">
                Platform Digital UMKM Kabupaten Sragen
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Wujudkan potensi UMKM Sragen melalui platform digital yang menghubungkan 
                produk lokal dengan pasar global. Dukung usaha lokal, bangkitkan ekonomi daerah.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">
                  <a href="/shop" className="flex items-center">
                    Jelajahi Produk
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                  <a href="/register">
                    Bergabung Sekarang
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=600&h=400&fit=crop"
                alt="UMKM Sragen" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Tentang Platform Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform ini dibangun untuk mendukung dan mempromosikan UMKM di Kabupaten Sragen, 
              memberikan kesempatan yang lebih luas bagi para pelaku usaha lokal.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-700" />
                </div>
                <CardTitle className="text-amber-900">500+ UMKM</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bergabung dan mempromosikan produk mereka melalui platform kami
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-amber-700" />
                </div>
                <CardTitle className="text-amber-900">2000+ Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Berbagai produk khas Sragen dari kuliner hingga kerajinan
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-amber-700" />
                </div>
                <CardTitle className="text-amber-900">Pertumbuhan 300%</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Peningkatan penjualan UMKM yang bergabung dengan platform kami
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Fitur Platform</h2>
            <p className="text-xl text-gray-600">
              Berbagai fitur untuk mendukung kesuksesan UMKM Sragen
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <CardTitle className="text-amber-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Produk Unggulan</h2>
            <p className="text-xl text-gray-600 mb-8">
              Temukan berbagai produk khas UMKM Sragen
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-amber-700 hover:bg-amber-800" : "border-amber-700 text-amber-700 hover:bg-amber-50"}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-amber-700">
                    {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-amber-900">{product.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-amber-900">Rp {product.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{product.shop}</p>
                    </div>
                    <Button size="sm" className="bg-amber-700 hover:bg-amber-800">
                      <a href="/shop" className="flex items-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Beli
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 px-4 bg-amber-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-xl opacity-90">
              Siap membantu UMKM Sragen berkembang dan sukses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-amber-800 border-amber-700">
              <CardHeader className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <CardTitle className="text-white">Alamat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="opacity-90">
                  Jl. Sukowati No. 123<br />
                  Sragen, Kabupaten Sragen<br />
                  Jawa Tengah 57211
                </p>
              </CardContent>
            </Card>
            <Card className="bg-amber-800 border-amber-700">
              <CardHeader className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <CardTitle className="text-white">Telepon</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="opacity-90">
                  (0271) 123-456<br />
                  0812-3456-7890
                </p>
              </CardContent>
            </Card>
            <Card className="bg-amber-800 border-amber-700">
              <CardHeader className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2" />
                <CardTitle className="text-white">Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="opacity-90">
                  info@umkm-sragen.id<br />
                  support@umkm-sragen.id
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">UMKM Sragen</span>
          </div>
          <p className="opacity-75">
            © 2024 Platform UMKM Sragen. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}