import Link from 'next/link'

interface FooterV2Props {
  overlay?: boolean
}

export default function FooterV2({ overlay = false }: FooterV2Props) {
  const text = overlay
    ? 'text-background/60 hover:text-background'
    : 'text-muted-foreground hover:text-foreground'

  const labelClass = overlay
    ? 'text-[10px] tracking-[0.25em] uppercase font-sans text-background/40'
    : 'label-text'

  const borderClass = overlay
    ? 'border-background/20'
    : 'border-border'

  const bottomTextClass = overlay
    ? 'text-background/40'
    : 'text-muted-foreground'

  return (
    <footer
      className={
        overlay
          ? 'w-full relative z-20'
          : 'border-t border-border bg-background w-full'
      }
    >
      {/* Top divider for overlay mode */}
      {overlay && (
        <div className="w-full border-t border-background/20" />
      )}

      <div className="px-6 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Contact */}
          <div>
            <p className={`${labelClass} mb-5`}>CONTACT</p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+212660252070"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                +212 660-252070
              </a>
              <a
                href="mailto:contact@interloft.ma"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                contact@interloft.ma
              </a>
              <div className="flex flex-col gap-1 mt-1">
                <p className={`font-sans text-xs ${overlay ? 'text-background/60' : 'text-muted-foreground'}`}>
                  Casablanca, Maroc
                </p>
                <p className={`font-sans text-xs ${overlay ? 'text-background/60' : 'text-muted-foreground'}`}>
                  Marrakech, Maroc
                </p>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <p className={`${labelClass} mb-5`}>SERVICE CLIENT</p>
            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/cookies"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                Politique des cookies
              </Link>
              <Link
                href="/terms"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                Conditions générales
              </Link>
            </nav>
          </div>

          {/* Brand */}
          <div>
            <p className={`${labelClass} mb-5`}>INTERLOFT</p>
            <div className="flex flex-col gap-3">
              <p className={`font-sans text-xs ${overlay ? 'text-background/60' : 'text-muted-foreground'}`}>
                Showroom Casablanca
              </p>
              <p className={`font-sans text-xs ${overlay ? 'text-background/60' : 'text-muted-foreground'}`}>
                Sur rendez-vous uniquement
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className={`${labelClass} mb-5`}>SUIVEZ-NOUS</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/interloft"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                Instagram
              </a>
              <Link
                href="/newsletter"
                className={`font-sans text-xs ${text} transition-colors`}
              >
                Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${borderClass} px-6 md:px-12 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-3`}>
        <p className={`font-sans text-[10px] ${bottomTextClass} tracking-widest uppercase`}>
          © {new Date().getFullYear()} INTERloft. Tous droits réservés.
        </p>
        <p className={`font-sans text-[10px] ${bottomTextClass} tracking-widest uppercase`}>
          Mobilier Contemporain — Maroc
        </p>
      </div>
    </footer>
  )
}
