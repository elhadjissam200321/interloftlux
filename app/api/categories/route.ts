import { categories } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate network delay for async behavior
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  return NextResponse.json(categories)
}
