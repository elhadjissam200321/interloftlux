'use client'

import { products } from '@/lib/data'
import { useFavorites } from '@/hooks/use-favorites'
import Link from 'next/link'
import Image from 'next/image'
import FavoriteButton from '@/components/favorite-button'

export default function FavoritesList() {
    const { favorites, loading } = useFavorites()

    if (loading) return <div className="py-8 text-center text-sm opacity-50 font-sans">Chargement...</div>

    const favoriteProducts = products.filter(p => favorites.includes(p.id))

    if (favoriteProducts.length === 0) {
        return (
            <div className="py-8">
                <p className="text-sm text-muted-foreground mb-4">
                    Vous n'avez pas encore de favoris.
                </p>
                <Link
                    href="/products"
                    className="inline-block text-xs tracking-[0.15em] uppercase text-foreground underline underline-offset-4 hover:opacity-70"
                >
                    Explorer les produits
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {favoriteProducts.map((product) => (
                <div key={product.id} className="group relative">
                    <Link href={`/products/${product.category}/${product.slug}`} className="block">
                        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="mt-2 font-serif text-sm">{product.name}</h3>
                    </Link>
                    <div className="absolute top-2 right-2">
                        <FavoriteButton productId={product.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}
