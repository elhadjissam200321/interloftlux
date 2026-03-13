'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, User } from 'lucide-react'
import ProductsDropdown from './products-dropdown'
import MobileProductsMenu from './mobile-products-menu'
import SearchModal from './search-modal'

const staticLinks = [
  { label: 'À propos', href: '/about' },
  { label: 'Points de Vente', href: '/points-de-vente' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16">
          {/* Logo */}
          <Link href="/" className="relative h-10 w-28">
            <Image
              src="https://interloft.ma/storage/2026/03/LOGO.png"
              alt="Interloft"
              fill
              className={`object-contain transition-all ${scrolled ? '' : 'brightness-0 invert'}`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/about"
              className={`nav-link transition-opacity hover:opacity-60 ${
                scrolled ? 'text-foreground' : 'text-background'
              }`}
            >
              À propos
            </Link>
            
            <ProductsDropdown variant={scrolled ? 'dark' : 'light'} />
            
            <Link
              href="/points-de-vente"
              className={`nav-link transition-opacity hover:opacity-60 ${
                scrolled ? 'text-foreground' : 'text-background'
              }`}
            >
              Points de Vente
            </Link>
            
            <Link
              href="/contact"
              className={`nav-link transition-opacity hover:opacity-60 ${
                scrolled ? 'text-foreground' : 'text-background'
              }`}
            >
              Contact
            </Link>
            
            {/* Search and Account icons */}
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className={`transition-opacity hover:opacity-60 cursor-pointer ${
                  scrolled ? 'text-foreground' : 'text-background'
                }`}
              >
                <Search size={16} strokeWidth={1.5} />
              </button>
              <Link
                href="/compte"
                aria-label="Compte"
                className={`transition-opacity hover:opacity-60 ${
                  scrolled ? 'text-foreground' : 'text-background'
                }`}
              >
                <User size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-1.5 p-1 transition-colors ${
              scrolled ? 'text-foreground' : 'text-background'
            }`}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            À propos
          </Link>
          
          <MobileProductsMenu onLinkClick={() => setMenuOpen(false)} />
          
          <Link
            href="/points-de-vente"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Points de Vente
          </Link>
          
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  )
}
