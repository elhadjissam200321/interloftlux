import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { collaborators } from '@/lib/collaborators-data'

export const metadata: Metadata = {
  title: 'Collaborations | INTERloft',
  description: 'Découvrez nos collaborations avec des architectes, designers et studios de design à travers le Maroc.',
}

export default function CollaborationsV2() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80"
          alt="Collaborations INTERloft"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <p className="text-xs tracking-[0.25em] uppercase text-background/80 font-sans mb-4">
              NOS PARTENAIRES CRÉATIFS
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-background mb-6">
              Collaborations
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-background/90 max-w-xl">
              Nous travaillons avec les meilleurs architectes et designers du Maroc pour créer des espaces d'exception. Découvrez les créatifs qui partagent notre vision.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text mb-6">L'ART DE LA COLLABORATION</p>
          <p className="font-serif text-xl md:text-2xl font-light leading-relaxed text-foreground">
            Chaque collaboration est une rencontre entre deux visions créatives. Nous croyons que le mobilier prend tout son sens lorsqu'il dialogue avec l'architecture qui l'entoure.
          </p>
        </div>
      </section>

      {/* Collaborators Grid */}
      <section className="w-full px-8 md:px-16 lg:px-24 pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {collaborators.map((collaborator) => (
              <article 
                key={collaborator.id}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-muted">
                  <Image
                    src={collaborator.image}
                    alt={collaborator.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Info */}
                <div className="space-y-3">
                  <p className="label-text">{collaborator.profession}</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-foreground">
                    {collaborator.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {collaborator.city}, Maroc
                  </p>
                  <Link
                    href={`/collaborations-v2/${collaborator.slug}`}
                    className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity pt-2"
                  >
                    Voir la collaboration
                    <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text mb-6">VOUS ÊTES PROFESSIONNEL ?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground mb-6">
            Rejoignez notre réseau de créatifs
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-10 max-w-xl mx-auto">
            Architectes, designers d'intérieur, studios de design — nous sommes toujours à la recherche de nouveaux talents avec qui collaborer sur des projets d'exception.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] uppercase text-foreground hover:opacity-60 transition-opacity"
          >
            Nous contacter
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
