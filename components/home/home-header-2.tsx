"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, ChevronDown, X } from 'lucide-react'
import { products, collections } from '@/lib/data'
import type { Category } from '@/lib/data'
import MobileProductsMenu from '@/components/mobile-products-menu'
import MobileCollectionsMenu from '@/components/mobile-collections-menu'
import SearchModal from '@/components/search-modal'

// Vertical inline dropdown for Produits — opens downward from bottom-left nav
function ProduitsNav() {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [hasFetched, setHasFetched] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!hasFetched) {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
        setHasFetched(true)
      } catch {}
    }
    setOpen((v) => !v)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] uppercase text-background/70 hover:text-background transition-colors cursor-pointer"
      >
        Produits
        <ChevronDown
          size={10}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown opens upward since nav is at the bottom */}
      <div
        className={`absolute bottom-full left-0 mb-3 min-w-[180px] bg-foreground/85 backdrop-blur-sm py-3 transition-all duration-300 z-50 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <Link
          href="/products"
          onClick={() => setOpen(false)}
          className="block px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-background/60 hover:text-background transition-colors"
        >
          Tous les produits
        </Link>
        <div className="my-2 mx-5 h-px bg-background/20" />
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            onClick={() => setOpen(false)}
            className="block px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-background/60 hover:text-background transition-colors"
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Vertical inline dropdown for Collections — opens upward from bottom-left nav
function CollectionsNav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] uppercase text-background/70 hover:text-background transition-colors cursor-pointer"
      >
        Collections
        <ChevronDown
          size={10}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute bottom-full left-0 mb-3 min-w-[200px] bg-foreground/85 backdrop-blur-sm py-3 transition-all duration-300 z-50 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {collections.map((col) => (
          <Link
            key={col.id}
            href={col.href}
            onClick={() => setOpen(false)}
            className="block px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-background/60 hover:text-background transition-colors"
          >
            {col.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function HomeHeader2() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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

  const currentProduct = products[currentIndex]

  return (
    <>
      <header className="w-full relative h-screen min-h-[600px] overflow-hidden bg-foreground">

        {/* ── SLIDES ── */}
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
            <div className="absolute inset-0 bg-foreground/25" />
          </div>
        ))}

        {/* ── TOP: LOGO centered ── */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
          <Link href="/accueil-2" className="relative block h-14 md:h-20 w-36 md:w-48">
            <Image
              src="/images/logo.png"
              alt="Interloft"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </Link>
        </div>

        {/* ── TOP RIGHT: icons ── */}
        <div className="absolute top-8 right-8 md:top-10 md:right-12 z-30 flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Rechercher"
            className="text-background/70 hover:text-background transition-colors cursor-pointer"
          >
            <Search size={16} strokeWidth={1.5} />
          </button>
          <Link
            href="/compte"
            aria-label="Compte"
            className="text-background/70 hover:text-background transition-colors"
          >
            <User size={16} strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── BOTTOM LEFT: stacked nav — desktop ── */}
        <nav className="hidden md:flex absolute bottom-14 left-10 z-30 flex-col gap-4">
          <Link
            href="/#introduction"
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-background/70 hover:text-background transition-colors"
          >
            Introduction
          </Link>
          <ProduitsNav />
          <CollectionsNav />
        </nav>

        {/* ── BOTTOM LEFT: "Menu" text button — mobile ── */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden absolute bottom-14 left-8 z-30 font-sans text-[11px] tracking-[0.25em] uppercase text-background/70 hover:text-background transition-colors cursor-pointer"
          aria-label="Ouvrir le menu"
        >
          Menu
        </button>

        {/* ── BOTTOM CENTER: current product name ── */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none hidden md:block">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-background/50 mb-1">
            {currentProduct.category.replace(/-/g, ' ')}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-background/90 tracking-wide">
            {currentProduct.name}
          </h2>
        </div>

        {/* ── BOTTOM RIGHT: slide dots ── */}
        <div className="absolute bottom-7 right-8 md:right-12 z-20 flex items-center gap-3">
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

        {/* ── BOTTOM LEFT: slide counter ── */}
        <div className="absolute bottom-7 left-8 md:left-12 z-20">
          <span className="font-sans text-[10px] tracking-[0.2em] text-background/50">
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
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={28} strokeWidth={1} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/#introduction"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Introduction
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
