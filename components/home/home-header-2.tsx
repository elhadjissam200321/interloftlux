'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Search, User, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductsDropdown from '@/components/products-dropdown'
import CollectionsDropdown from '@/components/collections-dropdown'
import MobileProductsMenu from '@/components/mobile-products-menu'
import MobileCollectionsMenu from '@/components/mobile-collections-menu'
import SearchModal from '@/components/search-modal'

const heroGallery = [
  '/images/canapes.jpg',
  '/images/fauteuils.jpg',
  '/images/showroom.jpg',
  '/images/composables.jpg',
  '/images/lits.jpg',
]

const products = [
  {
    id: 1,
    category: 'NOUVEAUTES',
    name: 'Canapé Nova',
    index: '04 / 07',
    image: '/images/product-sofa-2.jpg',
  },
  {
    id: 2,
    category: 'NOUVEAUTES',
    name: 'Fauteuil Élégance',
    index: '05 / 07',
    image: '/images/fauteuils.jpg',
  },
  {
    id: 3,
    category: 'COLLECTIONS',
    name: 'Lit Prestige',
    index: '06 / 07',
    image: '/images/lits.jpg',
  },
]

export default function HomeHeader2() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const currentProduct = products[currentProductIndex]

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <>
      <header className="relative min-h-screen bg-background text-foreground overflow-hidden">
        {/* Top Image Gallery Strip */}
        <div className="absolute top-0 left-0 right-0 h-32 md:h-40 overflow-x-auto bg-background border-b border-border flex">
          {heroGallery.map((image, index) => (
            <div key={index} className="flex-shrink-0 h-full aspect-video relative">
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Logo - Centered in top strip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <Link href="/" className="text-4xl md:text-5xl font-serif font-light tracking-[0.2em] text-foreground hover:opacity-75 transition-opacity">
            I
          </Link>
        </div>

        {/* Main Hero Section */}
        <div className="absolute top-40 md:top-48 left-0 right-0 bottom-0">
          {/* Hero Background Image */}
          <Image
            src={currentProduct.image}
            alt={currentProduct.name}
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent" />

          {/* Left Navigation & Product Info */}
          <div className="absolute left-0 top-0 bottom-0 z-10 p-8 md:p-12 flex flex-col justify-between">
            {/* Navigation */}
            <nav className="space-y-4 text-xs md:text-sm tracking-widest uppercase font-sans">
              <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors block">
                Introduction
              </Link>
              <ProductsDropdown variant="dark" />
              <CollectionsDropdown variant="dark" />
              <Link href="/products/nouveautes" className="text-foreground/70 hover:text-foreground transition-colors block">
                Nouveautés
              </Link>
            </nav>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/60 mb-3">
                  {currentProduct.category}
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-foreground mb-6">
                  {currentProduct.name}
                </h1>
                <button className="text-xs tracking-[0.15em] uppercase font-sans border-b border-foreground pb-1 hover:opacity-60 transition-opacity">
                  Découvrir
                </button>
              </div>

              {/* Pagination */}
              <p className="text-xs tracking-widest text-foreground/50">
                {currentProduct.index}
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="absolute right-0 top-0 bottom-0 z-10 p-8 md:p-12 flex flex-col justify-between items-end">
            {/* Top icons */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher" 
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link 
                href="/compte"
                aria-label="Compte" 
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Product Navigation */}
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={prevProduct}
                className="text-foreground/70 hover:text-foreground transition-colors p-2"
                aria-label="Produit précédent"
              >
                <ChevronLeft size={24} strokeWidth={1} />
              </button>
              <button
                onClick={nextProduct}
                className="text-foreground/70 hover:text-foreground transition-colors p-2"
                aria-label="Produit suivant"
              >
                <ChevronRight size={24} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden fixed top-44 left-8 z-30 text-foreground hover:opacity-60 transition-opacity"
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-foreground"
              aria-label="Fermer le menu"
            >
              <Menu size={24} strokeWidth={1.5} className="rotate-90" />
            </button>
            <nav className="pt-20 px-8 space-y-8 text-center">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl font-light text-foreground hover:opacity-60 transition-opacity"
              >
                Introduction
              </Link>
              <MobileProductsMenu onLinkClick={() => setMobileMenuOpen(false)} />
              <MobileCollectionsMenu onLinkClick={() => setMobileMenuOpen(false)} />
              <Link
                href="/products/nouveautes"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl font-light text-foreground hover:opacity-60 transition-opacity"
              >
                Nouveautés
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
