import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk demo
const mockOrders = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi input
    const requiredFields = ['customerName', 'customerPhone', 'customerAddress', 'items', 'totalAmount'];
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
    
    // Validasi items
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Items must be a non-empty array' },
        { status: 400 }
      );
    }
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Simulasi penyimpanan data
    const newOrder = {
      id: mockOrders.length + 1,
      orderNumber,
      ...body,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simulasi penyimpanan ke database
    mockOrders.push(newOrder);
    
    return NextResponse.json({
      success: true,
      data: newOrder,
      message: 'Order created successfully. Please wait for confirmation.'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');
    
    let filteredOrders = mockOrders;
    
    if (status) {
      filteredOrders = filteredOrders.filter(order => 
        order.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    if (customerId) {
      filteredOrders = filteredOrders.filter(order => 
        order.customerId === parseInt(customerId)
      );
    }
    
    return NextResponse.json({
      success: true,
      data: filteredOrders,
      total: filteredOrders.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}