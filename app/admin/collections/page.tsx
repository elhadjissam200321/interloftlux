import { createClient } from '@/lib/supabase/server'
import { Edit } from 'lucide-react'
import Link from 'next/link'

export default async function AdminCollectionsPage() {
    const supabase = await createClient()
    if (!supabase) return null

    const { data: collections } = await supabase
        .from('collections')
        .select('*')
        .order('label')

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-3xl mb-2">Collections</h1>
                    <p className="text-muted-foreground text-sm font-sans">Gérez les regroupements thématiques de produits.</p>
                </div>
                <Link
                    href="/admin/collections/new"
                    className="bg-foreground text-background px-6 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                    Nouvelle Collection
                </Link>
            </div>

            <div className="space-y-4">
                {collections?.map((coll) => (
                    <div key={coll.id} className="border border-border p-6 bg-card flex justify-between items-center group">
                        <div>
                            <h2 className="font-serif text-xl mb-1">{coll.label}</h2>
                            <p className="text-xs text-muted-foreground opacity-60">/{coll.href}</p>
                        </div>
                        <Link href={`/admin/collections/${coll.id}`} className="p-2 hover:bg-secondary transition-colors">
                            <Edit size={16} strokeWidth={1.5} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
