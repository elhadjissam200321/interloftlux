import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'
import LogoutButton from '@/components/logout-button'

export const metadata = {
  title: 'Mon Compte — Interloft',
  description: 'Gerez votre compte Interloft',
}

export default async function ComptePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/auth/connexion')
  }

  const user = data.user
  const firstName = user.user_metadata?.first_name || ''
  const lastName = user.user_metadata?.last_name || ''
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : user.email

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-6 md:px-12 flex items-center justify-between border-b border-border">
        <Link href="/" className="relative h-10 w-28">
          <Image
            src="/images/logo.png"
            alt="Interloft"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Collections
          </Link>
          <Link
            href="/contact"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Bienvenue
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              {displayName}
            </h1>
          </div>

          {/* Account Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <div className="border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <User size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Mon Profil</h2>
                  <p className="text-sm text-muted-foreground">Gerez vos informations personnelles</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">{user.email}</span>
                </div>
                {firstName && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Prenom</span>
                    <span className="text-foreground">{firstName}</span>
                  </div>
                )}
                {lastName && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Nom</span>
                    <span className="text-foreground">{lastName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Orders Card */}
            <div className="border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <Package size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Mes Commandes</h2>
                  <p className="text-sm text-muted-foreground">Suivez vos commandes en cours</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Vous n'avez pas encore passe de commande.
              </p>
              <Link
                href="/products"
                className="inline-block text-xs tracking-[0.15em] uppercase text-foreground underline underline-offset-4 hover:opacity-70"
              >
                Decouvrir nos collections
              </Link>
            </div>

            {/* Favorites Card */}
            <div className="border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <Heart size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Mes Favoris</h2>
                  <p className="text-sm text-muted-foreground">Vos pieces favorites</p>
                </div>
              </div>
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

            {/* Settings Card */}
            <div className="border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                  <Settings size={24} strokeWidth={1} className="text-foreground" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-foreground mb-1">Parametres</h2>
                  <p className="text-sm text-muted-foreground">Gerez votre compte</p>
                </div>
              </div>
              <div className="space-y-3">
                <LogoutButton />
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
