'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import { X, Plus, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProductFormProps {
    initialData?: any
    categories: any[]
    collections: any[]
}

export default function ProductForm({ initialData, categories, collections }: ProductFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        category: initialData?.category || categories[0]?.id || '',
        collection_id: initialData?.collection_id || '',
        description: initialData?.description || '',
        materials: initialData?.materials || [],
        dimensions: initialData?.dimensions || '',
        image: initialData?.image || '',
        gallery: initialData?.gallery || []
    })

    const [newMaterial, setNewMaterial] = useState('')
    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        setIsLoading(true)

        const { error } = await supabase
            .from('products')
            .upsert({
                ...form,
                id: initialData?.id || undefined,
                updated_at: new Date().toISOString()
            })

        if (error) {
            toast({
                title: "Erreur",
                description: "Impossible d'enregistrer le produit.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Produit enregistré",
                description: "Les modifications ont été sauvegardées.",
            })
            router.push('/admin/products')
            router.refresh()
        }
        setIsLoading(false)
    }

    const addMaterial = () => {
        if (newMaterial.trim()) {
            setForm({ ...form, materials: [...form.materials, newMaterial.trim()] })
            setNewMaterial('')
        }
    }

    const removeMaterial = (index: number) => {
        setForm({ ...form, materials: form.materials.filter((_: any, i: number) => i !== index) })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-12 pb-24">
            <div className="flex items-center gap-4 border-b border-border pb-8">
                <Link href="/admin/products" className="p-2 hover:bg-secondary transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="font-serif text-3xl">
                    {initialData ? 'Modifier le produit' : 'Nouveau produit'}
                </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block label-text mb-2">Nom du produit</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Slug (URL)</label>
                        <input
                            type="text"
                            required
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            placeholder="canape-alba"
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Catégorie</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground appearance-none mb-6"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>

                        <label className="block label-text mb-2">Collection (Optionnel)</label>
                        <select
                            value={form.collection_id}
                            onChange={(e) => setForm({ ...form, collection_id: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground appearance-none"
                        >
                            <option value="">Aucune collection</option>
                            {collections.map((coll) => (
                                <option key={coll.id} value={coll.id}>{coll.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description & Specs */}
                <div className="space-y-6">
                    <div>
                        <label className="block label-text mb-2">Description</label>
                        <textarea
                            required
                            rows={5}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Dimensions</label>
                        <input
                            type="text"
                            value={form.dimensions}
                            onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                            placeholder="L 240 × P 96 × H 78 cm"
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                </div>
            </div>

            {/* Materials */}
            <div>
                <label className="block label-text mb-4">Matériaux</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {form.materials.map((m: string, i: number) => (
                        <span key={i} className="bg-secondary px-3 py-1 text-xs flex items-center gap-2 group">
                            {m}
                            <button type="button" onClick={() => removeMaterial(i)} className="opacity-40 hover:opacity-100">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                        placeholder="Ajouter un matériau..."
                        className="flex-1 border border-border bg-transparent px-4 py-2 font-sans text-sm focus:outline-none focus:border-foreground"
                    />
                    <button
                        type="button"
                        onClick={addMaterial}
                        className="p-2 border border-border hover:bg-secondary transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
                <div>
                    <label className="block label-text mb-2">Image principale (URL)</label>
                    <input
                        type="text"
                        required
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground mb-4"
                    />
                    {form.image && (
                        <div className="relative w-32 h-40 bg-secondary overflow-hidden">
                            <Image src={form.image} alt="Preview" fill className="object-cover" />
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-foreground text-background px-12 py-4 text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={18} />
                    {isLoading ? 'Enregistrement...' : 'Enregistrer le produit'}
                </button>
            </div>
        </form>
    )
}
