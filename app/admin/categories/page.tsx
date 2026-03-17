import { createClient } from '@/lib/supabase/server'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function AdminCategoriesPage() {
    const supabase = await createClient()
    if (!supabase) return null

    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .order('label')

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-3xl mb-2">Catégories</h1>
                    <p className="text-muted-foreground text-sm font-sans">Gérez les catégories principales de votre catalogue.</p>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="bg-foreground text-background px-6 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                    Nouvelle Catégorie
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((cat) => (
                    <div key={cat.id} className="border border-border p-6 bg-card group">
                        <div className="relative aspect-video bg-secondary mb-4 overflow-hidden">
                            <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div className="flex justify-between items-center">
                            <h2 className="font-serif text-xl">{cat.label}</h2>
                            <Link href={`/admin/categories/${cat.id}`} className="p-2 hover:bg-secondary transition-colors">
                                <Edit size={16} strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
