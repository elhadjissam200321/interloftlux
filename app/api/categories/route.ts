import { getCategories } from '@/lib/supabase/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  const categories = await getCategories()
  return NextResponse.json(categories)
}
