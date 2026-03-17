import { createClient } from '@/lib/supabase/server'
import CollectionForm from '@/components/admin/collection-form'
import { notFound } from 'next/navigation'

interface EditCollectionPageProps {
    params: Promise<{ id: string }>
}

export default async function EditCollectionPage({ params }: EditCollectionPageProps) {
    const { id } = await params
    const supabase = await createClient()

    if (!supabase) return null

    const { data: collection } = await supabase
        .from('collections')
        .select('*')
        .eq('id', id)
        .single()

    if (!collection) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <CollectionForm initialData={collection} />
        </div>
    )
}
