import { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'

export const metadata: Metadata = {
  title: 'Collaborations | INTERloft',
  description: 'Découvrez nos collaborations avec des architectes, designers et professionnels du design d\'intérieur.',
}

const collaborations = [
  {
    id: 'architectes',
    title: 'Architectes',
    description: 'Nous collaborons avec des architectes de renom pour créer des espaces uniques où le mobilier s\'intègre parfaitement à l\'architecture. Notre expertise en design de meubles sur mesure permet de répondre aux exigences les plus spécifiques de chaque projet architectural.',
    services: [
      'Mobilier sur mesure pour projets architecturaux',
      'Consultation en design d\'intérieur',
      'Coordination avec les équipes de construction',
      'Solutions techniques personnalisées',
    ],
  },
  {
    id: 'designers',
    title: 'Designers d\'Intérieur',
    description: 'Interloft est le partenaire privilégié des designers d\'intérieur qui recherchent des pièces d\'exception. Notre collection offre une palette de styles allant du contemporain au luxe, permettant aux designers de concrétiser leur vision créative.',
    services: [
      'Accès exclusif aux nouvelles collections',
      'Personnalisation des finitions et matériaux',
      'Tarifs préférentiels pour professionnels',
      'Support technique et échantillons',
    ],
  },
  {
    id: 'hotels',
    title: 'Hôtellerie de Luxe',
    description: 'Les établissements hôteliers de prestige font confiance à Interloft pour équiper leurs espaces. De la suite présidentielle au lobby, nous concevons des ensembles mobiliers qui reflètent l\'identité unique de chaque hôtel.',
    services: [
      'Conception d\'ensembles mobiliers complets',
      'Production en série pour grandes quantités',
      'Résistance et durabilité professionnelles',
      'Service après-vente dédié',
    ],
  },
  {
    id: 'promoteurs',
    title: 'Promoteurs Immobiliers',
    description: 'Pour les projets immobiliers haut de gamme, Interloft propose des solutions de mobilier qui valorisent les espaces et créent une signature distinctive. Nous accompagnons les promoteurs de la conception à la livraison.',
    services: [
      'Ameublement de résidences de luxe',
      'Staging et mise en valeur des biens',
      'Délais adaptés aux plannings chantier',
      'Gestion de projet clé en main',
    ],
  },
]

export default function Collaborations() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 md:mb-24">
            <p className="label-text mb-6">PARTENARIATS</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground mb-8">
              Collaborations
            </h1>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
              INTERLOFT COLLABORE AVEC DES PROFESSIONNELS DU DESIGN ET DE L'ARCHITECTURE POUR CRÉER DES ESPACES D'EXCEPTION. NOTRE EXPERTISE ARTISANALE ET NOTRE ENGAGEMENT ENVERS LA QUALITÉ FONT DE NOUS LE PARTENAIRE IDÉAL POUR VOS PROJETS LES PLUS AMBITIEUX.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborations Grid */}
      <section className="w-full px-8 md:px-16 lg:px-24 pb-24 md:pb-32 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {collaborations.map((collab, index) => (
              <div 
                key={collab.id}
                className="border-t border-border pt-8"
              >
                <p className="label-text mb-4">0{index + 1}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-foreground mb-6">
                  {collab.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-8">
                  {collab.description}
                </p>
                <ul className="space-y-3">
                  {collab.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground mb-6">
            Démarrons un projet ensemble
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-10 max-w-xl mx-auto">
            Vous êtes architecte, designer ou professionnel de l'immobilier ? Contactez-nous pour discuter de votre projet et découvrir comment Interloft peut vous accompagner.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] uppercase text-foreground hover:opacity-60 transition-opacity"
          >
            Nous contacter
            <span className="w-8 h-px bg-current" />
          </a>
        </div>
      </section>

      <FooterV2 />
    </main>
  )
}
