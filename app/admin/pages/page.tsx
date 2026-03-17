import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Edit } from 'lucide-react'
import SeedCMSButton from '@/components/admin/seed-cms-button'

export default async function AdminPagesPage() {
    const supabase = await createClient()
    if (!supabase) return null

    const { data: pages } = await supabase
        .from('pages_content')
        .select('id, title, updated_at')
        .order('id')

    const defaultPages = [
        { id: 'accueil', title: 'Accueil' },
        { id: 'about', title: 'À propos' },
        { id: 'collaborations', title: 'Collaborations' },
        { id: 'contact', title: 'Contact' },
        { id: 'conditions', title: 'Conditions Générales' },
        { id: 'confidentialite', title: 'Confidentialité' },
        { id: 'cookies', title: 'Politique Cookies' }
    ]

    const mergedPages = defaultPages.map(dp => {
        const existing = pages?.find(p => p.id === dp.id)
        return {
            ...dp,
            title: existing?.title || dp.title,
            exists: !!existing,
            updated_at: existing?.updated_at
        }
    })

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end border-b border-border pb-8">
                <div>
                    <h1 className="font-serif text-4xl mb-4">Gestion des Pages</h1>
                    <p className="text-muted-foreground text-sm">Modifiez le contenu textuel des pages statiques.</p>
                </div>
                <SeedCMSButton />
            </div>

            <div className="grid gap-6">
                {mergedPages.map((page) => (
                    <div key={page.id} className="group p-6 border border-border hover:border-foreground transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="p-3 bg-secondary rounded-full text-muted-foreground group-hover:text-foreground transition-colors">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl mb-1">{page.title}</h3>
                                <div className="flex gap-4">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">ID: {page.id}</span>
                                    {page.updated_at && (
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                            Modifié le {new Date(page.updated_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Link
                            href={`/admin/pages/${page.id}`}
                            className="p-3 hover:bg-secondary transition-colors"
                        >
                            <Edit size={20} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
