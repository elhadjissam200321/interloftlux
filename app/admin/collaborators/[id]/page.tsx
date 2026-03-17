import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CollaboratorForm from '@/components/admin/collaborator-form'

export default async function AdminCollaboratorEditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()
    if (!supabase) return null

    let collaborator = null
    if (id !== 'new') {
        const { data } = await supabase
            .from('collaborators')
            .select('*')
            .eq('id', id)
            .single()

        if (!data) notFound()
        collaborator = data
    }

    return (
        <CollaboratorForm initialData={collaborator} />
    )
}
