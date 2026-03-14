import Link from 'next/link'

interface FooterV2Props {
  overlay?: boolean
}

export default function FooterV2({ overlay = false }: FooterV2Props) {
  const base = overlay
    ? 'text-background/50 hover:text-background/90'
    : 'text-foreground/40 hover:text-foreground/80'

  const label = overlay
    ? 'text-[9px] tracking-[0.3em] uppercase font-sans text-background/30 mb-4 block'
    : 'text-[9px] tracking-[0.3em] uppercase font-sans text-foreground/25 mb-4 block'

  const divider = overlay ? 'border-background/10' : 'border-foreground/10'

  const muted = overlay ? 'text-background/40' : 'text-foreground/30'

  return (
    <footer className={overlay ? 'w-full' : 'w-full border-t border-foreground/8 bg-background'}>

      {overlay && <div className={`w-full border-t ${divider}`} />}

      <div className="px-8 md:px-12 lg:px-16 pt-8 pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">

          {/* Contact */}
          <div>
            <span className={label}>Contact</span>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+212660252070" className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}>
                +212 660-252070
              </a>
              <a href="mailto:contact@interloft.ma" className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}>
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
              <Link href="/privacy" className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}>
                Confidentialité
              </Link>
              <Link href="/cookies" className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}>
                Cookies
              </Link>
              <Link href="/terms" className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}>
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
                className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}
              >
                Instagram
              </a>
              <Link href="/newsletter" className={`font-sans text-[10px] font-light tracking-wide ${base} transition-colors`}>
                Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar — flush, no centering */}
        <div className={`border-t ${divider} pt-4`}>
          <p className={`font-sans text-[9px] font-light tracking-[0.25em] uppercase ${muted}`}>
            © {new Date().getFullYear()} Interloft
          </p>
        </div>
      </div>
    </footer>
  )
}
