import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk demo
const mockShops = [
  {
    id: 1,
    name: 'Keripik Mbah Sri',
    owner: 'Sri Mulyani',
    phone: '08123456789',
    email: 'mbahsri@umkm-sragen.id',
    address: 'Jl. Sukowati No. 45, Sragen',
    category: 'Kuliner',
    description: 'Produsen keripik singkong pedas khas Sragen',
    operatingHours: '08:00 - 21:00',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    products: [
      {
        id: 1,
        name: 'Keripik Singkong Pedas',
        description: 'Keripik singkong renyah dengan bumbu pedas khas Sragen',
        price: 15000,
        category: 'Makanan',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1606735934674-8d4ef2e4b2b5?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: 2,
    name: 'Batik Sragen Indah',
    owner: 'Budi Santoso',
    phone: '08234567890',
    email: 'batik@umkm-sragen.id',
    address: 'Jl. Raya Sragen No. 67, Sragen',
    category: 'Fashion',
    description: 'Pengrajin batik tulis khas Sragen dengan motif tradisional',
    operatingHours: '09:00 - 17:00',
    status: 'active',
    createdAt: '2024-01-20T14:30:00Z',
    products: [
      {
        id: 2,
        name: 'Batik Tulis Sragen',
        description: 'Batik tulis khas Sragen dengan motif tradisional',
        price: 250000,
        category: 'Pakaian',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=300&h=200&fit=crop'
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let filteredShops = mockShops;
    
    if (category && category !== 'all') {
      filteredShops = filteredShops.filter(shop => 
        shop.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      filteredShops = filteredShops.filter(shop =>
        shop.name.toLowerCase().includes(search.toLowerCase()) ||
        shop.description.toLowerCase().includes(search.toLowerCase()) ||
        shop.owner.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return NextResponse.json({
      success: true,
      data: filteredShops,
      total: filteredShops.length
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
    const requiredFields = ['name', 'owner', 'phone', 'email', 'address', 'category', 'description'];
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
    const newShop = {
      id: mockShops.length + 1,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      products: body.products || []
    };
    
    // Simulasi penyimpanan ke database
    mockShops.push(newShop);
    
    return NextResponse.json({
      success: true,
      data: newShop,
      message: 'Shop registration successful. Please wait for admin approval.'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}