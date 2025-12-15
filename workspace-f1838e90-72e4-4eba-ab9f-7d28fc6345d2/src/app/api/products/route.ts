import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk demo
const mockProducts = [
  {
    id: 1,
    name: 'Keripik Singkong Pedas',
    description: 'Keripik singkong renyah dengan bumbu pedas khas Sragen',
    price: 15000,
    category: 'kuliner',
    stock: 50,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=300&h=200&fit=crop',
    shop: 'Keripik Mbah Sri',
    shopId: 1,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Batik Tulis Sragen',
    description: 'Batik tulis khas Sragen dengan motif tradisional',
    price: 250000,
    category: 'fashion',
    stock: 15,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=300&h=200&fit=crop',
    shop: 'Batik Sragen Indah',
    shopId: 2,
    status: 'active',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 3,
    name: 'Anyaman Bambu',
    description: 'Tas anyaman bambu dengan desain modern dan fungsional',
    price: 75000,
    category: 'kerajinan',
    stock: 25,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    shop: 'Kerajinan Bambu Jaya',
    shopId: 3,
    status: 'active',
    createdAt: '2024-01-25T09:15:00Z'
  },
  {
    id: 4,
    name: 'Madu Hutan Sragen',
    description: 'Madu murni dari hutan Sragen dengan kualitas terbaik',
    price: 85000,
    category: 'pertanian',
    stock: 30,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    shop: 'Madu Alam Sragen',
    shopId: 4,
    status: 'active',
    createdAt: '2024-02-01T11:20:00Z'
  },
  {
    id: 5,
    name: 'Dendeng Sapi',
    description: 'Dendeng sapi khas Sragen dengan bumbu rahasia keluarga',
    price: 45000,
    category: 'kuliner',
    stock: 20,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300&h=200&fit=crop',
    shop: 'Dendeng Pak Budi',
    shopId: 5,
    status: 'active',
    createdAt: '2024-02-05T16:45:00Z'
  },
  {
    id: 6,
    name: 'Tas Kulit Sapi',
    description: 'Tas kulit sapi asli dengan desain elegan dan awet',
    price: 350000,
    category: 'fashion',
    stock: 10,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
    shop: 'Kulit Sragen Prestige',
    shopId: 6,
    status: 'active',
    createdAt: '2024-02-10T13:30:00Z'
  },
  {
    id: 7,
    name: 'Kerupuk Udang',
    description: 'Kerupuk udang renyah dengan rasa gurih khas',
    price: 25000,
    category: 'kuliner',
    stock: 40,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=300&h=200&fit=crop',
    shop: 'Kerupuk Bu Lina',
    shopId: 7,
    status: 'active',
    createdAt: '2024-02-15T10:10:00Z'
  },
  {
    id: 8,
    name: 'Wayang Kulit',
    description: 'Wayang kulit khas Sragen dengan ukiran tangan',
    price: 150000,
    category: 'kerajinan',
    stock: 8,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    shop: 'Wayang Sragen Heritage',
    shopId: 8,
    status: 'active',
    createdAt: '2024-02-20T15:25:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sort') || 'name';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredProducts = mockProducts;
    
    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search term
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.shop.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi input
    const requiredFields = ['name', 'description', 'price', 'category', 'stock', 'shopId'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      );
    }
    
    // Simulasi penyimpanan data
    const newProduct = {
      id: mockProducts.length + 1,
      ...body,
      rating: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Simulasi penyimpanan ke database
    mockProducts.push(newProduct);
    
    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully. Please wait for admin approval.'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}