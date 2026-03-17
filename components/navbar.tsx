'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, User } from 'lucide-react'
import ProductsDropdown from './products-dropdown'
import CollectionsDropdown from './collections-dropdown'
import MobileProductsMenu from './mobile-products-menu'
import MobileCollectionsMenu from './mobile-collections-menu'
import SearchModal from './search-modal'

const staticLinks = [
  { label: 'À propos', href: '/about' },
  { label: 'Collaborations', href: '/collaborations' },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-sm border-b border-border' : 'bg-transparent'
          }`}
        style={scrolled ? { backgroundColor: 'var(--color-navbar)' } : undefined}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16">
          {/* Logo */}
          <Link href="/" className="relative h-12 w-[134px]">
            <Image
              src="/images/logo.png"
              alt="Interloft"
              fill
              className="object-contain transition-all"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/about"
              className={`nav-link transition-opacity hover:opacity-60 ${scrolled ? 'text-foreground' : 'text-background'
                }`}
            >
              Introduction
            </Link>

            <ProductsDropdown variant={scrolled ? 'dark' : 'light'} />

            <CollectionsDropdown variant={scrolled ? 'dark' : 'light'} />

            <Link
              href="/collaborations"
              className={`nav-link transition-opacity hover:opacity-60 ${scrolled ? 'text-foreground' : 'text-background'
                }`}
            >
              Collaborations
            </Link>

            <Link
              href="/contact"
              className={`nav-link transition-opacity hover:opacity-60 ${scrolled ? 'text-foreground' : 'text-background'
                }`}
            >
              Contact
            </Link>

            {/* Search and Account icons */}
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className={`transition-opacity hover:opacity-60 cursor-pointer ${scrolled ? 'text-foreground' : 'text-background'
                  }`}
              >
                <Search size={16} strokeWidth={1.5} />
              </button>
              <Link
                href="/compte"
                aria-label="Compte"
                className={`transition-opacity hover:opacity-60 ${scrolled ? 'text-foreground' : 'text-background'
                  }`}
              >
                <User size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-1.5 p-1 transition-colors ${scrolled ? 'text-foreground' : 'text-background'
              }`}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        style={{ backgroundColor: 'var(--color-mobile-menu)' }}
      >
        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Introduction
          </Link>

          <MobileProductsMenu onLinkClick={() => setMenuOpen(false)} />

          <MobileCollectionsMenu onLinkClick={() => setMenuOpen(false)} />

          <Link
            href="/collaborations"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-3xl font-light tracking-widest uppercase text-foreground hover:opacity-50 transition-opacity"
          >
            Collaborations
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
