import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { categories, getProductsByCategory, getCategoryBySlug, type ProductCategory } from '@/lib/data'

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) return { title: 'INTeloft' }
  return {
    title: `${cat.label} — INTeloft`,
    description: `Découvrez notre collection de ${cat.label.toLowerCase()}.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const products = getProductsByCategory(slug as ProductCategory)

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Minimal Header */}
      <div className="pt-28 pb-12 px-6 md:px-12 flex items-end justify-between">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-foreground">
          {category.label}
        </h1>
        <Link 
          href="/products" 
          className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors pb-2"
        >
          Toutes les collections
        </Link>
      </div>

      {/* Products Grid */}
      <div className="px-6 md:px-12 pb-24">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sans text-sm text-muted-foreground">
              Collection à venir
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${category.id}/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                </div>
                <div className="pt-4">
                  <h2 className="font-serif text-lg font-light text-foreground">
                    {product.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
