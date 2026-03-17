import { createClient } from '@/lib/supabase/server'
import {
    ShoppingBag,
    Layers,
    Users,
    TrendingUp,
    RefreshCw
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
    const supabase = await createClient()
    if (!supabase) return null

    // Fetch quick stats
    const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
    const { count: categoriesCount } = await supabase.from('categories').select('*', { count: 'exact', head: true })
    const { count: collaboratorsCount } = await supabase.from('collaborators').select('*', { count: 'exact', head: true })

    const stats = [
        { label: 'Produits', value: productsCount || 0, icon: ShoppingBag, href: '/admin/products' },
        { label: 'Catégories', value: categoriesCount || 0, icon: Layers, href: '/admin/categories' },
        { label: 'Collaborateurs', value: collaboratorsCount || 0, icon: Users, href: '/admin/collaborators' },
    ]

    return (
        <div className="space-y-10">
            <div>
                <h1 className="font-serif text-3xl mb-2">Tableau de bord</h1>
                <p className="text-muted-foreground text-sm font-sans">Bienvenue dans l'interface de gestion de votre site.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="border border-border p-6 bg-secondary/20 hover:bg-secondary/40 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                                <p className="text-3xl font-light">{item.value}</p>
                            </div>
                            <item.icon size={20} strokeWidth={1} className="text-muted-foreground" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Development / Migration Tool */}
            <div className="border border-primary/20 bg-primary/5 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <RefreshCw size={20} className="text-primary" />
                    <h2 className="font-serif text-xl">Outils de Migration</h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl mb-6">
                    Si vous venez de configurer votre base de données, utilisez ce bouton pour importer les données initiales (produits, collections, collaborateurs) directement dans Supabase.
                </p>
                <button
                    id="migration-trigger"
                    className="bg-foreground text-background px-6 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    Lancer la migration initiale
                </button>
            </div>

            {/* Script for migration (Client-side) */}
            <script dangerouslySetInnerHTML={{
                __html: `
        document.getElementById('migration-trigger')?.addEventListener('click', async () => {
          if (!confirm('Voulez-vous vraiment écraser les données de la base avec les données locales ?')) return;
          
          const btn = document.getElementById('migration-trigger');
          btn.disabled = true;
          btn.innerText = 'MIGRATION EN COURS...';
          
          try {
            const res = await fetch('/api/admin/migrate', { method: 'POST' });
            if (res.ok) {
              alert('Migration réussie !');
              window.location.reload();
            } else {
              alert('Erreur lors de la migration.');
            }
          } catch (err) {
            console.error(err);
            alert('Erreur réseau.');
          } finally {
            btn.disabled = false;
            btn.innerText = 'LANCER LA MIGRATION INITIALE';
          }
        });
      `}} />
        </div>
    )
}
