'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Save, ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface CollectionFormProps {
    initialData?: any
}

export default function CollectionForm({ initialData }: CollectionFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        id: initialData?.id || '',
        label: initialData?.label || '',
        description: initialData?.description || '',
        href: initialData?.href || ''
    })

    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        setIsLoading(true)

        const { error } = await supabase
            .from('collections')
            .upsert({
                ...form,
                updated_at: new Date().toISOString()
            })

        if (error) {
            toast({
                title: "Erreur",
                description: "Impossible d'enregistrer la collection.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Collection enregistrée",
                description: "Les modifications ont été sauvegardées.",
            })
            router.push('/admin/collections')
            router.refresh()
        }
        setIsLoading(false)
    }

    async function handleDelete() {
        if (!supabase || !initialData?.id || !confirm('Êtes-vous sûr de vouloir supprimer cette collection ?')) return

        setIsLoading(true)
        const { error } = await supabase
            .from('collections')
            .delete()
            .eq('id', initialData.id)

        if (error) {
            toast({
                title: "Erreur",
                description: "Impossible de supprimer la collection.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Collection supprimée",
                description: "La collection a été retirée du catalogue.",
            })
            router.push('/admin/collections')
            router.refresh()
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-12 pb-24 text-foreground bg-background">
            <div className="flex items-center justify-between border-b border-border pb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/collections" className="p-2 hover:bg-secondary transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="font-serif text-3xl">
                        {initialData ? 'Modifier la collection' : 'Nouvelle collection'}
                    </h1>
                </div>
                {initialData && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex items-center gap-2 text-destructive hover:opacity-70 transition-opacity text-xs uppercase tracking-widest px-4 py-2"
                    >
                        <Trash2 size={16} />
                        Supprimer
                    </button>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div>
                        <label className="block label-text mb-2">ID (Slug)</label>
                        <input
                            type="text"
                            required
                            disabled={!!initialData}
                            value={form.id}
                            onChange={(e) => setForm({ ...form, id: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground disabled:opacity-50"
                            placeholder="ex: collection-ete"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Label (Nom)</label>
                        <input
                            type="text"
                            required
                            value={form.label}
                            onChange={(e) => setForm({ ...form, label: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                            placeholder="ex: Collection d'Été"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Lien (HREF)</label>
                        <input
                            type="text"
                            required
                            value={form.href}
                            onChange={(e) => setForm({ ...form, href: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                            placeholder="ex: collections/ete"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block label-text mb-2">Description</label>
                        <textarea
                            required
                            rows={8}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none"
                            placeholder="Décrivez la collection..."
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-foreground text-background px-12 py-4 text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={18} />
                    {isLoading ? 'Enregistrement...' : 'Enregistrer la collection'}
                </button>
            </div>
        </form>
    )
}
