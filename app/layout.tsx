import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Preloader from '@/components/preloader'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INTeloft — Mobilier Contemporain',
  description:
    'INTeloft est une marque marocaine dédiée au mobilier contemporain et à l\'aménagement d\'intérieurs modernes.',
  generator: 'v0.app',
  keywords: ['mobilier', 'contemporain', 'luxe', 'Maroc', 'intérieur', 'design'],
  openGraph: {
    title: 'INTeloft — Mobilier Contemporain',
    description: 'Collections de mobilier contemporain de luxe.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`} data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Preloader />
        {children}
      </body>
    </html>
  )
}
