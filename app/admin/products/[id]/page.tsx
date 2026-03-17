import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/product-form'

export default async function AdminProductEditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()
    if (!supabase) return null

    // Fetch categories and collections for dropdowns
    const [catRes, collRes] = await Promise.all([
        supabase.from('categories').select('*').order('label'),
        supabase.from('collections').select('*').order('label')
    ])

    const categories = catRes.data
    const collections = collRes.data

    let product = null
    if (id !== 'new') {
        const { data } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (!data) notFound()
        product = data
    }

    return (
        <ProductForm
            initialData={product}
            categories={categories || []}
            collections={collections || []}
        />
    )
}
