"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, Menu, X } from 'lucide-react'
import { products } from '@/lib/data'
import ProductsDropdown from '@/components/products-dropdown'
import CollectionsDropdown from '@/components/collections-dropdown'
import MobileProductsMenu from '@/components/mobile-products-menu'
import MobileCollectionsMenu from '@/components/mobile-collections-menu'
import SearchModal from '@/components/search-modal'

export default function HomeHeader() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const currentProduct = products[currentIndex]

  return (
    <>
      <header className="w-full relative h-screen min-h-[600px] overflow-hidden bg-foreground">
        {/* Full-height slides */}
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-foreground/20" />
          </div>
        ))}

        {/* Logo centered at top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
          <Link href="/" className="relative block h-14 md:h-20 w-36 md:w-48">
            <Image
              src="/images/logo.png"
              alt="Interloft"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav overlay — left */}
        <nav className="hidden md:flex absolute top-10 left-12 z-30 flex-col gap-4">
          <Link
            href="/about"
            className="nav-link text-background/80 hover:text-background transition-colors"
          >
            À propos
          </Link>
          <ProductsDropdown variant="light" />
          <CollectionsDropdown variant="light" />
          <Link
            href="/collaborations"
            className="nav-link text-background/80 hover:text-background transition-colors"
          >
            Collaborations
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden absolute top-8 left-8 z-30 text-background/80 hover:text-background transition-colors cursor-pointer"
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Icons — top right */}
        <div className="absolute top-8 right-8 md:top-10 md:right-12 z-30 flex items-center gap-5">
          <button 
            onClick={() => setSearchOpen(true)}
            aria-label="Rechercher" 
            className="text-background/80 hover:text-background transition-colors cursor-pointer"
          >
            <Search size={16} strokeWidth={1.5} />
          </button>
          <Link 
            href="/compte"
            aria-label="Compte" 
            className="text-background/80 hover:text-background transition-colors"
          >
            <User size={16} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Product info — bottom left */}
        <div className="absolute bottom-16 md:bottom-20 left-8 md:left-12 z-20">
          <Link href={`/products/${currentProduct.category}/${currentProduct.slug}`} className="group block">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/60 mb-2">
              {currentProduct.category.replace(/-/g, ' ')}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-background mb-4 tracking-wide">
              {currentProduct.name}
            </h2>
            <span className="inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.25em] uppercase text-background/80 group-hover:text-background transition-colors">
              Découvrir
              <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
            </span>
          </Link>
        </div>

        {/* Progress indicators — bottom right */}
        <div className="absolute bottom-6 right-8 md:right-12 z-20 flex items-center gap-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-px transition-all duration-500 ${
                index === currentIndex ? 'bg-background w-10' : 'bg-background/40 w-6'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide counter — bottom left */}
        <div className="absolute bottom-6 left-8 md:left-12 z-20">
          <span className="font-sans text-[10px] tracking-[0.2em] text-background/60">
            {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background flex flex-col justify-center items-center transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={28} strokeWidth={1} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            À propos
          </Link>
          
          <MobileProductsMenu onLinkClick={() => setMobileMenuOpen(false)} />
          
          <MobileCollectionsMenu onLinkClick={() => setMobileMenuOpen(false)} />
          
          <Link
            href="/collaborations"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Collaborations
          </Link>
          
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  )
}
