'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface FooterV2Props {
  overlay?: boolean
}

export default function FooterV2({ overlay = false }: FooterV2Props) {
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const base = overlay
    ? 'text-background/55 hover:text-background transition-colors'
    : 'text-foreground/45 hover:text-foreground transition-colors'

  const label = overlay
    ? 'text-[9px] tracking-[0.3em] uppercase font-sans text-background/30 mb-4 block'
    : 'text-[9px] tracking-[0.3em] uppercase font-sans text-foreground/25 mb-4 block'

  const divider = overlay ? 'border-background/10' : 'border-foreground/10'
  const muted = overlay ? 'text-background/40' : 'text-foreground/30'
  const inputColor = overlay
    ? 'bg-transparent text-background placeholder-background/30 border-background/20 focus:border-background/60'
    : 'bg-transparent text-foreground placeholder-foreground/30 border-foreground/20 focus:border-foreground/60'
  const overlayPanelBg = overlay ? 'border-background/10' : 'border-foreground/10'

  function handleNewsletterToggle() {
    setNewsletterOpen(v => !v)
    setSent(false)
    setEmail('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer
      className={overlay ? 'w-full' : 'w-full border-t border-foreground/8'}
      style={!overlay ? { backgroundColor: 'var(--color-footer-bg)' } : undefined}
    >

      {overlay && <div className={`w-full border-t ${divider}`} />}

      {/* Newsletter expand panel — Studio27 style */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          newsletterOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-8 md:px-12 lg:px-16 py-7 border-b ${overlayPanelBg}`}>
          <div className="flex flex-col items-end gap-5">
            {/* Title block — right-aligned like studio27 */}
            <div className="text-right">
              <p className={`font-sans text-[10px] tracking-[0.35em] uppercase font-light ${overlay ? 'text-background/70' : 'text-foreground/60'}`}>
                Interloft Newsletter
              </p>
              <a
                href="https://instagram.com/interloft"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-[10px] tracking-[0.35em] uppercase font-light ${base} block mt-1`}
              >
                Instagram
              </a>
            </div>

            {/* Email row */}
            {sent ? (
              <p className={`font-sans text-[10px] tracking-[0.25em] uppercase font-light ${muted}`}>
                Merci — vous êtes inscrit.
              </p>
            ) : (
              <form onSubmit={handleSend} className="flex items-baseline gap-4 w-full max-w-sm">
                <label className={`font-sans text-[10px] tracking-[0.3em] uppercase font-light shrink-0 ${muted}`}>
                  Email
                </label>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=""
                  className={`flex-1 font-sans text-[10px] font-light tracking-wide border-0 border-b outline-none pb-0.5 ${inputColor} transition-colors`}
                  required
                />
                <button
                  type="submit"
                  className={`font-sans text-[10px] tracking-[0.3em] uppercase font-light shrink-0 ${base}`}
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 md:px-12 lg:px-16 pt-8 pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">

          {/* Contact */}
          <div>
            <span className={label}>Contact</span>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+212660252070" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                +212 660-252070
              </a>
              <a href="mailto:contact@interloft.ma" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                contact@interloft.ma
              </a>
              <p className={`font-sans text-[10px] font-light tracking-wide ${muted} mt-1`}>Casablanca</p>
              <p className={`font-sans text-[10px] font-light tracking-wide ${muted}`}>Marrakech</p>
            </div>
          </div>

          {/* Service client */}
          <div>
            <span className={label}>Service client</span>
            <nav className="flex flex-col gap-2.5">
              <Link href="/confidentialite" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Confidentialité
              </Link>
              <Link href="/cookies" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Cookies
              </Link>
              <Link href="/conditions" className={`font-sans text-[10px] font-light tracking-wide ${base}`}>
                Conditions
              </Link>
            </nav>
          </div>

          {/* Interloft */}
          <div>
            <span className={label}>Interloft</span>
            <div className="flex flex-col gap-2.5">
              <p className={`font-sans text-[10px] font-light tracking-wide ${muted}`}>Showroom Casablanca</p>
              <p className={`font-sans text-[10px] font-light tracking-wide ${muted}`}>Sur rendez-vous</p>
            </div>
          </div>

          {/* Suivez-nous */}
          <div>
            <span className={label}>Suivez-nous</span>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com/interloft"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-[10px] font-light tracking-wide ${base}`}
              >
                Instagram
              </a>
              <button
                onClick={handleNewsletterToggle}
                className={`font-sans text-[10px] font-light tracking-wide text-left ${base} ${newsletterOpen ? 'underline underline-offset-4' : ''}`}
              >
                Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t ${divider} pt-4`}>
          <p className={`font-sans text-[9px] font-light tracking-[0.25em] uppercase ${muted}`}>
            © {new Date().getFullYear()} Interloft
          </p>
        </div>
      </div>
    </footer>
  )
}
