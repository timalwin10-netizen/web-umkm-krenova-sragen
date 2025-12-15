'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter, Star, Plus, Minus, X, MapPin, Phone, Mail, Clock, Package, Trash2, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  shop: string;
  description: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    notes: ''
  });

  const categories = [
    { id: 'all', name: 'Semua', icon: Package },
    { id: 'kuliner', name: 'Kuliner', icon: Package },
    { id: 'kerajinan', name: 'Kerajinan', icon: Package },
    { id: 'fashion', name: 'Fashion', icon: Package },
    { id: 'pertanian', name: 'Pertanian', icon: Package },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Keripik Singkong Pedas',
      category: 'kuliner',
      price: 15000,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=300&h=200&fit=crop',
      shop: 'Keripik Mbah Sri',
      description: 'Keripik singkong renyah dengan bumbu pedas khas Sragen',
      stock: 50
    },
    {
      id: 2,
      name: 'Batik Tulis Sragen',
      category: 'fashion',
      price: 250000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=300&h=200&fit=crop',
      shop: 'Batik Sragen Indah',
      description: 'Batik tulis khas Sragen dengan motif tradisional',
      stock: 15
    },
    {
      id: 3,
      name: 'Anyaman Bambu',
      category: 'kerajinan',
      price: 75000,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      shop: 'Kerajinan Bambu Jaya',
      description: 'Tas anyaman bambu dengan desain modern dan fungsional',
      stock: 25
    },
    {
      id: 4,
      name: 'Madu Hutan Sragen',
      category: 'pertanian',
      price: 85000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      shop: 'Madu Alam Sragen',
      description: 'Madu murni dari hutan Sragen dengan kualitas terbaik',
      stock: 30
    },
    {
      id: 5,
      name: 'Dendeng Sapi',
      category: 'kuliner',
      price: 45000,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300&h=200&fit=crop',
      shop: 'Dendeng Pak Budi',
      description: 'Dendeng sapi khas Sragen dengan bumbu rahasia keluarga',
      stock: 20
    },
    {
      id: 6,
      name: 'Tas Kulit Sapi',
      category: 'fashion',
      price: 350000,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
      shop: 'Kulit Sragen Prestige',
      description: 'Tas kulit sapi asli dengan desain elegan dan awet',
      stock: 10
    },
    {
      id: 7,
      name: 'Kerupuk Udang',
      category: 'kuliner',
      price: 25000,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=300&h=200&fit=crop',
      shop: 'Kerupuk Bu Lina',
      description: 'Kerupuk udang renyah dengan rasa gurih khas',
      stock: 40
    },
    {
      id: 8,
      name: 'Wayang Kulit',
      category: 'kerajinan',
      price: 150000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      shop: 'Wayang Sragen Heritage',
      description: 'Wayang kulit khas Sragen dengan ukiran tangan',
      stock: 8
    }
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Simulasi proses checkout
    alert('Pesanan berhasil dibuat! Kami akan menghubungi Anda segera.');
    setCart([]);
    setIsCheckoutOpen(false);
    setOrderForm({
      name: '',
      phone: '',
      address: '',
      email: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-amber-900">UMKM Sragen</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-amber-700 transition-colors">Beranda</a>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-amber-700 hover:bg-amber-800 text-white relative">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Keranjang
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Keranjang Belanja</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? 'Keranjang Anda kosong' : `${getTotalItems()} item di keranjang`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Belum ada produk di keranjang</p>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-amber-700 font-bold">Rp {item.price.toLocaleString()}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-amber-700">Rp {getTotalPrice().toLocaleString()}</span>
                          </div>
                          <Button 
                            className="w-full bg-amber-700 hover:bg-amber-800"
                            onClick={() => setIsCheckoutOpen(true)}
                          >
                            Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Toko UMKM Sragen</h1>
          <p className="text-xl opacity-90">
            Temukan produk khas Sragen dengan kualitas terbaik
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nama</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              Menampilkan {filteredAndSortedProducts.length} produk
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 right-2 bg-amber-700">
                    {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                  {product.stock < 10 && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Stok Terbatas
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-amber-900 text-lg">{product.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xl font-bold text-amber-900">Rp {product.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{product.shop}</p>
                      <p className="text-xs text-gray-500">Stok: {product.stock}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-amber-700 hover:bg-amber-800"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-amber-900">Checkout</h2>
              <Button variant="ghost" onClick={() => setIsCheckoutOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Ringkasan Pesanan</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">{getTotalItems()} item</p>
                  <p className="text-lg font-bold text-amber-700">Rp {getTotalPrice().toLocaleString()}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Informasi Pengiriman</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Nama Lengkap"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  />
                  <Input
                    placeholder="Nomor Telepon"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                  />
                  <textarea
                    placeholder="Alamat Lengkap"
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                  />
                  <textarea
                    placeholder="Catatan (opsional)"
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={2}
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  onClick={handleCheckout}
                  disabled={!orderForm.name || !orderForm.phone || !orderForm.address}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Buat Pesanan
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 px-4 mt-12">
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