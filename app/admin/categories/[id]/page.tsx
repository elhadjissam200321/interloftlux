import { createClient } from '@/lib/supabase/server'
import CategoryForm from '@/components/admin/category-form'
import { notFound } from 'next/navigation'

interface EditCategoryPageProps {
    params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
    const { id } = await params
    const supabase = await createClient()

    if (!supabase) return null

    const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single()

    if (!category) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <CategoryForm initialData={category} />
        </div>
    )
}
