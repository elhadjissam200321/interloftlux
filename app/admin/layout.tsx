import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    Users,
    Settings,
    Plus
} from 'lucide-react'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    if (!supabase) redirect('/compte')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth/connexion')

    // Simple admin check (for now just logged in, can be refined)

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border p-6 flex flex-col gap-8">
                <Link href="/" className="font-serif text-xl tracking-widest uppercase mb-4">
                    INTERloft Admin
                </Link>

                <nav className="flex flex-col gap-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm"
                    >
                        <LayoutDashboard size={18} strokeWidth={1.5} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm"
                    >
                        <ShoppingBag size={18} strokeWidth={1.5} />
                        Produits
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm"
                    >
                        <Layers size={18} strokeWidth={1.5} />
                        Catégories
                    </Link>
                    <Link
                        href="/admin/collections"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm"
                    >
                        <Layers size={18} strokeWidth={1.5} />
                        Collections
                    </Link>
                    <Link
                        href="/admin/collaborators"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm"
                    >
                        <Users size={18} strokeWidth={1.5} />
                        Collaborateurs
                    </Link>
                    <Link
                        href="/admin/pages"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm"
                    >
                        <Layers size={18} strokeWidth={1.5} />
                        Pages
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-border">
                    <Link
                        href="/compte"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-sm opacity-60"
                    >
                        <Settings size={18} strokeWidth={1.5} />
                        Paramètres
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
