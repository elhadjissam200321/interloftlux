import Link from 'next/link'

export default function FooterV2() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Contact */}
          <div>
            <p className="label-text mb-6">CONTACT</p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+212660252070"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +212 660-252070
              </a>
              <a
                href="mailto:contact@interloft.ma"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                contact@interloft.ma
              </a>
              <div className="flex flex-col gap-2 mt-2">
                <p className="font-sans text-sm text-muted-foreground">
                  Casablanca, Maroc
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Marrakech, Maroc
                </p>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <p className="label-text mb-6">SERVICE CLIENT</p>
            <nav className="flex flex-col gap-4">
              <Link
                href="/privacy"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/cookies"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Politique des cookies
              </Link>
              <Link
                href="/terms"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Conditions générales
              </Link>
            </nav>
          </div>

          {/* Brand */}
          <div>
            <p className="label-text mb-6">INTERLOFT</p>
            <div className="flex flex-col gap-4">
              <p className="font-sans text-sm text-muted-foreground">
                Showroom Casablanca
              </p>
              <p className="font-sans text-sm text-muted-foreground">
                Sur rendez-vous uniquement
              </p>
            </div>
          </div>

          {/* Social / Follow */}
          <div>
            <p className="label-text mb-6">SUIVEZ-NOUS</p>
            <div className="flex flex-col gap-4">
              <a
                href="https://instagram.com/interloft"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
              <Link
                href="/newsletter"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          © {new Date().getFullYear()} INTERloft. Tous droits réservés.
        </p>
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          Mobilier Contemporain — Maroc
        </p>
      </div>
    </footer>
  )
}
