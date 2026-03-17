import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PageContentForm from '@/components/admin/page-content-form'

export default async function AdminPageEditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()
    if (!supabase) return null

    const { data: page } = await supabase
        .from('pages_content')
        .select('*')
        .eq('id', id)
        .single()

    // If it doesn't exist yet, we pass the ID to initialize it
    const initialData = page || { id }

    return (
        <PageContentForm initialData={initialData} />
    )
}
