import { NextResponse } from 'next/server';
import { VectorizedPrescription } from '@/types/canvas';

export async function POST(request: Request) {
  try {
    const data: Partial<VectorizedPrescription> = await request.json();

    if (!data.strokes || !Array.isArray(data.strokes)) {
      return NextResponse.json({ error: 'Invalid stroke data' }, { status: 400 });
    }

    // TODO: Implement storing data to mongodb
    // In a real implementation, we would save this to MongoDB
    console.log('Received prescription with', data.strokes.length, 'strokes');
    
    // Simulate DB operation
    const id = Math.random().toString(36).substr(2, 9);
    
    return NextResponse.json({ 
      success: true, 
      id,
      message: 'Prescription saved (simulated)' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error in prescriptions POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
