import HomeHeader2 from '@/components/home/home-header-2'
import { getProducts, getCategories, getCollections, getPageContent } from '@/lib/supabase/queries'

export default async function Home() {
  const [products, categories, collections, page] = await Promise.all([
    getProducts(),
    getCategories(),
    getCollections(),
    getPageContent('accueil')
  ])

  return (
    <main>
      <HomeHeader2
        initialProducts={products}
        initialCategories={categories}
        initialCollections={collections}
        pageContent={page}
      />
    </main>
  )
}
