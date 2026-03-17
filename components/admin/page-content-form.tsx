'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

interface PageContentFormProps {
    initialData?: any
}

export default function PageContentForm({ initialData }: PageContentFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        id: initialData?.id || '',
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        description: initialData?.description || '',
        content: initialData?.content || {}
    })

    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        setIsLoading(true)

        const { error } = await supabase
            .from('pages_content')
            .upsert({
                ...form,
                updated_at: new Date().toISOString()
            })

        if (error) {
            toast({
                title: "Erreur",
                description: "Impossible d'enregistrer les modifications.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Page enregistrée",
                description: "Les modifications ont été sauvegardées.",
            })
            router.refresh()
        }
        setIsLoading(false)
    }

    const updateContentField = (key: string, value: any) => {
        setForm({
            ...form,
            content: {
                ...form.content,
                [key]: value
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-12 pb-24">
            <div className="flex items-center gap-4 border-b border-border pb-8">
                <Link href="/admin/pages" className="p-2 hover:bg-secondary transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="font-serif text-3xl">
                    Modifier : {form.id.charAt(0).toUpperCase() + form.id.slice(1)}
                </h1>
            </div>

            <div className="space-y-8">
                {/* Basic Fields */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block label-text mb-2">Titre (H1)</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                            />
                        </div>
                        <div>
                            <label className="block label-text mb-2">Sous-titre / Label</label>
                            <input
                                type="text"
                                value={form.subtitle}
                                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block label-text mb-2">Description / Intro</label>
                        <textarea
                            rows={5}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none h-full"
                        />
                    </div>
                </div>

                {/* Dynamic Content (JSONB) */}
                <div className="pt-8 border-t border-border">
                    <h2 className="font-serif text-xl mb-6">Contenu Sectionné</h2>
                    <div className="space-y-6">
                        {Object.entries(form.content).map(([key, value]: [string, any]) => (
                            <div key={key} className="p-6 border border-border space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{key}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newContent = { ...form.content }
                                            delete newContent[key]
                                            setForm({ ...form, content: newContent })
                                        }}
                                        className="text-destructive hover:opacity-70 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <textarea
                                    value={value}
                                    onChange={(e) => updateContentField(key, e.target.value)}
                                    className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none"
                                    rows={4}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            const key = prompt('Nom de la nouvelle clé (ex: section1_text) :')
                            if (key) updateContentField(key, '')
                        }}
                        className="mt-6 flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Plus size={14} />
                        Ajouter une section
                    </button>
                </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-foreground text-background px-12 py-4 text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={18} />
                    {isLoading ? 'Enregistrement...' : 'Enregistrer la page'}
                </button>
            </div>
        </form>
    )
}
