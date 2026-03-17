"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, X, ChevronDown } from 'lucide-react'
import { products, collections } from '@/lib/data'
import SearchModal from '@/components/search-modal'

// ── Inline Produits dropdown (vertical style) ──────────────────────────────
function ProduitsNav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const categories = [
    { label: 'Nouveautés', href: '/products/nouveautes' },
    { label: 'Canapés', href: '/products/canapes' },
    { label: 'Canapés composables', href: '/products/canapes-composables' },
    { label: 'Fauteuils', href: '/products/fauteuils' },
    { label: 'Lits', href: '/products/lits' },
    { label: 'Meubles', href: '/products/meubles' },
    { label: 'Tringlerie', href: '/products/tringlerie' },
  ]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors cursor-pointer"
      >
        Produits
        <ChevronDown size={10} strokeWidth={2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-3 bg-background/95 backdrop-blur-sm shadow-xl min-w-[180px] py-3 z-50">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-2 font-sans text-[10px] tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Inline Collections dropdown (vertical style) ───────────────────────────
function CollectionsNav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors cursor-pointer"
      >
        Collections
        <ChevronDown size={10} strokeWidth={2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-3 bg-background/95 backdrop-blur-sm shadow-xl min-w-[200px] py-3 z-50">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-2 font-sans text-[10px] tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {col.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component — with product info restored and no footer overlay ──────
export default function HomeHeader3() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const currentProduct = products[currentIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="w-full relative h-screen min-h-[600px] overflow-hidden bg-foreground">

        {/* ── Full-height slides ── */}
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
            <div className="absolute inset-0 bg-foreground/25" />
          </div>
        ))}

        {/* ── Top bar: logo centered, nav left, icons right — all at top ── */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-8 md:pt-10">

          {/* Logo row — centered */}
          <div className="flex justify-center pointer-events-none">
            <Link href="/accueil-3" className="relative block h-14 md:h-20 w-36 md:w-48 pointer-events-auto">
              <Image
                src="/images/logo.png"
                alt="Interloft"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Nav + Icons row — directly below logo */}
          <div className="flex items-start justify-between px-8 md:px-12 mt-6 md:mt-8">

            {/* Left: vertical nav (desktop) / Menu button (mobile) */}
            <nav className="hidden md:flex flex-col gap-4">
              <Link
                href="/about"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors"
              >
                Introduction
              </Link>
              <ProduitsNav />
              <CollectionsNav />
              <Link
                href="/collaborations"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors"
              >
                Collaborations
              </Link>
              <Link
                href="/contact"
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors"
              >
                Contact
              </Link>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden font-sans text-[11px] tracking-[0.2em] uppercase text-background/80 hover:text-background transition-colors cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              Menu
            </button>

            {/* Right: icons */}
            <div className="flex items-center gap-5">
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

          </div>
        </div>

        {/* ── Product info — bottom left ── */}
        <div className="absolute bottom-20 md:bottom-24 left-8 md:left-12 z-20">
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

        {/* ── Slide counter — bottom left ── */}
        <div className="absolute bottom-8 left-8 md:left-12 z-20">
          <span className="font-sans text-[10px] tracking-[0.2em] text-background/60">
            {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── Progress dots — bottom right ── */}
        <div className="absolute bottom-8 right-8 md:right-12 z-20 flex items-center gap-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-px transition-all duration-500 ${index === currentIndex ? 'bg-background w-10' : 'bg-background/40 w-6'
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

      </header>

      {/* ── Search Modal ── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-center items-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        style={{ backgroundColor: 'var(--color-mobile-menu)' }}
      >
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
            Introduction
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Produits
          </Link>
          <Link
            href="/collections/beldi"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Collections
          </Link>
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
