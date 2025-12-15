'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Package, Upload, Plus, X, MapPin, Phone, Mail, Clock, Star, CheckCircle, AlertCircle, Store, User, FileText } from 'lucide-react';

interface ShopData {
  name: string;
  owner: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  description: string;
  operatingHours: string;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  image: string;
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shopData, setShopData] = useState<ShopData>({
    name: '',
    owner: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    description: '',
    operatingHours: ''
  });
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    'Kuliner',
    'Kerajinan',
    'Fashion',
    'Pertanian',
    'Jasa',
    'Lainnya'
  ];

  const productCategories = [
    'Makanan',
    'Minuman',
    'Pakaian',
    'Aksesoris',
    'Kerajinan',
    'Pertanian',
    'Lainnya'
  ];

  const validateShopData = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!shopData.name.trim()) newErrors.name = 'Nama toko wajib diisi';
    if (!shopData.owner.trim()) newErrors.owner = 'Nama pemilik wajib diisi';
    if (!shopData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    if (!shopData.email.trim()) newErrors.email = 'Email wajib diisi';
    if (!shopData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!shopData.category) newErrors.category = 'Kategori wajib dipilih';
    if (!shopData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProductData = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!currentProduct.name.trim()) newErrors.productName = 'Nama produk wajib diisi';
    if (!currentProduct.description.trim()) newErrors.productDescription = 'Deskripsi produk wajib diisi';
    if (!currentProduct.price.trim()) newErrors.productPrice = 'Harga produk wajib diisi';
    if (!currentProduct.category) newErrors.productCategory = 'Kategori produk wajib dipilih';
    if (!currentProduct.stock.trim()) newErrors.productStock = 'Stok produk wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShopDataChange = (field: keyof ShopData, value: string) => {
    setShopData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleProductDataChange = (field: keyof ProductData, value: string) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
    // Clear specific product errors
    const errorField = `product${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorField]) {
      setErrors(prev => ({ ...prev, [errorField]: '' }));
    }
  };

  const addProduct = () => {
    if (validateProductData()) {
      setProducts(prev => [...prev, { ...currentProduct }]);
      setCurrentProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
      });
    }
  };

  const removeProduct = (index: number) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep === 1 && validateShopData()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    if (products.length === 0) {
      setErrors({ submit: 'Minimal harus menambahkan 1 produk' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulasi pengiriman data ke backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Simpan data ke localStorage untuk demo
      const submissionData = {
        shop: shopData,
        products: products,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('shopRegistration', JSON.stringify(submissionData));
    }, 2000);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setShopData({
      name: '',
      owner: '',
      phone: '',
      email: '',
      address: '',
      category: '',
      description: '',
      operatingHours: ''
    });
    setProducts([]);
    setCurrentProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: ''
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Pendaftaran Berhasil!</CardTitle>
            <CardDescription>
              Terima kasih telah mendaftar. Tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk verifikasi.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Detail Pendaftaran:</h4>
                <p className="text-sm text-gray-600"><strong>Nama Toko:</strong> {shopData.name}</p>
                <p className="text-sm text-gray-600"><strong>Pemilik:</strong> {shopData.owner}</p>
                <p className="text-sm text-gray-600"><strong>Email:</strong> {shopData.email}</p>
                <p className="text-sm text-gray-600"><strong>Jumlah Produk:</strong> {products.length}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={resetForm} className="flex-1 bg-amber-700 hover:bg-amber-800">
                  Daftarkan Toko Lain
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Kembali ke Beranda
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <a href="/shop" className="text-gray-700 hover:text-amber-700 transition-colors">Toko</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Daftarkan Toko UMKM Anda</h1>
          <p className="text-xl opacity-90">
            Bergabunglah dengan platform UMKM Sragen dan perluas jangkauan pasar Anda
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-amber-700 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <Store className="w-4 h-4" />
              </div>
              <span className={`font-medium ${currentStep >= 1 ? 'text-amber-900' : 'text-gray-500'}`}>Data Toko</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4">
              <div className={`h-full bg-amber-700 transition-all duration-300`} style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-amber-700 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <Package className="w-4 h-4" />
              </div>
              <span className={`font-medium ${currentStep >= 2 ? 'text-amber-900' : 'text-gray-500'}`}>Produk</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="w-5 h-5 text-amber-700" />
                  <span>Informasi Toko</span>
                </CardTitle>
                <CardDescription>
                  Lengkapi data toko Anda untuk memulai pendaftaran
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Nama Toko *</Label>
                    <Input
                      id="shopName"
                      placeholder="Masukkan nama toko"
                      value={shopData.name}
                      onChange={(e) => handleShopDataChange('name', e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nama Pemilik *</Label>
                    <Input
                      id="ownerName"
                      placeholder="Masukkan nama pemilik"
                      value={shopData.owner}
                      onChange={(e) => handleShopDataChange('owner', e.target.value)}
                      className={errors.owner ? 'border-red-500' : ''}
                    />
                    {errors.owner && <p className="text-sm text-red-500">{errors.owner}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      placeholder="Masukkan nomor telepon"
                      value={shopData.phone}
                      onChange={(e) => handleShopDataChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email"
                      value={shopData.email}
                      onChange={(e) => handleShopDataChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    placeholder="Masukkan alamat lengkap toko"
                    value={shopData.address}
                    onChange={(e) => handleShopDataChange('address', e.target.value)}
                    className={errors.address ? 'border-red-500' : ''}
                    rows={3}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Toko *</Label>
                    <Select value={shopData.category} onValueChange={(value) => handleShopDataChange('category', value)}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operatingHours">Jam Operasional</Label>
                    <Input
                      id="operatingHours"
                      placeholder="Contoh: 08:00 - 21:00"
                      value={shopData.operatingHours}
                      onChange={(e) => handleShopDataChange('operatingHours', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Toko *</Label>
                  <Textarea
                    id="description"
                    placeholder="Jelaskan tentang toko dan produk Anda"
                    value={shopData.description}
                    onChange={(e) => handleShopDataChange('description', e.target.value)}
                    className={errors.description ? 'border-red-500' : ''}
                    rows={4}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} className="bg-amber-700 hover:bg-amber-800">
                    Lanjut ke Produk
                    <Package className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Add Product Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5 text-amber-700" />
                    <span>Tambah Produk</span>
                  </CardTitle>
                  <CardDescription>
                    Tambahkan produk yang akan dijual di toko Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Nama Produk *</Label>
                      <Input
                        id="productName"
                        placeholder="Masukkan nama produk"
                        value={currentProduct.name}
                        onChange={(e) => handleProductDataChange('name', e.target.value)}
                        className={errors.productName ? 'border-red-500' : ''}
                      />
                      {errors.productName && <p className="text-sm text-red-500">{errors.productName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Harga *</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        placeholder="Masukkan harga produk"
                        value={currentProduct.price}
                        onChange={(e) => handleProductDataChange('price', e.target.value)}
                        className={errors.productPrice ? 'border-red-500' : ''}
                      />
                      {errors.productPrice && <p className="text-sm text-red-500">{errors.productPrice}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Deskripsi Produk *</Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Jelaskan tentang produk Anda"
                      value={currentProduct.description}
                      onChange={(e) => handleProductDataChange('description', e.target.value)}
                      className={errors.productDescription ? 'border-red-500' : ''}
                      rows={3}
                    />
                    {errors.productDescription && <p className="text-sm text-red-500">{errors.productDescription}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Kategori Produk *</Label>
                      <Select value={currentProduct.category} onValueChange={(value) => handleProductDataChange('category', value)}>
                        <SelectTrigger className={errors.productCategory ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.productCategory && <p className="text-sm text-red-500">{errors.productCategory}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productStock">Stok *</Label>
                      <Input
                        id="productStock"
                        type="number"
                        placeholder="Masukkan jumlah stok"
                        value={currentProduct.stock}
                        onChange={(e) => handleProductDataChange('stock', e.target.value)}
                        className={errors.productStock ? 'border-red-500' : ''}
                      />
                      {errors.productStock && <p className="text-sm text-red-500">{errors.productStock}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productImage">URL Gambar Produk</Label>
                    <Input
                      id="productImage"
                      placeholder="Masukkan URL gambar (opsional)"
                      value={currentProduct.image}
                      onChange={(e) => handleProductDataChange('image', e.target.value)}
                    />
                  </div>

                  <Button onClick={addProduct} className="w-full bg-amber-700 hover:bg-amber-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk
                  </Button>
                </CardContent>
              </Card>

              {/* Product List */}
              {products.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Daftar Produk ({products.length})</span>
                      <Badge variant="secondary">{products.length} produk</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm font-medium text-amber-700">Rp {parseInt(product.price).toLocaleString()}</span>
                              <span className="text-sm text-gray-500">Stok: {product.stock}</span>
                              <Badge variant="outline">{product.category}</Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProduct(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Error Alert */}
              {errors.submit && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Kembali
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={resetForm}>
                    Reset Form
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-amber-700 hover:bg-amber-800"
                    disabled={isSubmitting || products.length === 0}
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

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