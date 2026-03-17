import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

export default async function AdminProductsPage() {
    const supabase = await createClient()
    if (!supabase) return null

    const { data: products, error } = await supabase
        .from('products')
        .select('*, categories(label), collections(label)')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-3xl mb-2">Produits</h1>
                    <p className="text-muted-foreground text-sm font-sans">Gérez le catalogue de produits de votre site.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-foreground text-background px-6 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <Plus size={16} />
                    Nouveau Produit
                </Link>
            </div>

            <div className="border border-border bg-card">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-secondary/20">
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Image</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Nom</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Catégorie</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Slug</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products?.map((product) => (
                            <tr key={product.id} className="hover:bg-secondary/10 transition-colors group">
                                <td className="p-4">
                                    <div className="relative w-12 h-16 bg-secondary overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="font-serif text-sm">{product.name}</p>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest bg-secondary px-2 py-0.5 w-fit">
                                            {product.categories?.label || 'Sans catégorie'}
                                        </span>
                                        {product.collections?.label && (
                                            <span className="text-[10px] uppercase tracking-widest bg-foreground/5 px-2 py-0.5 w-fit text-muted-foreground">
                                                {product.collections.label}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 text-xs font-mono opacity-60">
                                    {product.slug}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/products/${product.category}/${product.slug}`}
                                            target="_blank"
                                            className="p-2 hover:bg-secondary transition-colors"
                                            title="Voir sur le site"
                                        >
                                            <ExternalLink size={16} strokeWidth={1.5} />
                                        </Link>
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="p-2 hover:bg-secondary transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit size={16} strokeWidth={1.5} />
                                        </Link>
                                        <button
                                            className="p-2 hover:bg-red-500/10 text-red-500 transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={16} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!products || products.length === 0) && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-sm text-muted-foreground italic">
                                    Aucun produit trouvé. Importez les données ou créez-en un nouveau.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
