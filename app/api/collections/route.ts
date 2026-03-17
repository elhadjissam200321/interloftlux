import { getCollections } from '@/lib/supabase/queries'
import { NextResponse } from 'next/server'

export async function GET() {
    const collections = await getCollections()
    return NextResponse.json(collections)
}
