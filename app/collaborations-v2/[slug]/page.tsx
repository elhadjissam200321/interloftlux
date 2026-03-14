import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'
import { getCollaboratorBySlug, getOtherCollaborators, collaborators } from '@/lib/collaborators-data'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return collaborators.map((collaborator) => ({
    slug: collaborator.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const collaborator = getCollaboratorBySlug(slug)
  
  if (!collaborator) {
    return {
      title: 'Collaborateur non trouvé | INTERloft',
    }
  }

  return {
    title: `${collaborator.name} | Collaborations INTERloft`,
    description: collaborator.bio,
  }
}

export default async function CollaboratorPage({ params }: { params: Params }) {
  const { slug } = await params
  const collaborator = getCollaboratorBySlug(slug)

  if (!collaborator) {
    notFound()
  }

  const otherCollaborators = getOtherCollaborators(slug, 3)

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[450px]">
        <Image
          src={collaborator.heroImage}
          alt={collaborator.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <p className="text-xs tracking-[0.25em] uppercase text-background/80 font-sans mb-3">
              {collaborator.profession}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-background mb-4">
              {collaborator.name}
            </h1>
            <p className="text-sm text-background/80">
              {collaborator.city}, Maroc
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Profile */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Portrait */}
            <div className="relative aspect-[4/5] bg-muted overflow-hidden">
              <Image
                src={collaborator.image}
                alt={collaborator.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Bio */}
            <div>
              <p className="label-text mb-6">À PROPOS</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground mb-8">
                {collaborator.name}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {collaborator.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Collaboration Story */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-muted">
        <div className="max-w-3xl mx-auto">
          <p className="label-text mb-6 text-center">NOTRE COLLABORATION</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground mb-10 text-center">
            L'histoire d'un partenariat
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground text-center">
            {collaborator.collaborationStory}
          </p>
        </div>
      </section>

      {/* Section 3: Projects Gallery */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="label-text mb-4">PROJETS RÉALISÉS</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground">
              Nos réalisations communes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborator.projects.map((project) => (
              <article key={project.id} className="group">
                <div className="relative aspect-[4/3] mb-5 overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {project.location}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Project */}
      <section className="w-full bg-muted">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px]">
            <Image
              src={collaborator.featuredProject.image}
              alt={collaborator.featuredProject.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="flex items-center py-16 md:py-20 px-8 md:px-16 lg:px-20">
            <div>
              <p className="label-text mb-4">PROJET PHARE</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground mb-6">
                {collaborator.featuredProject.name}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-8">
                {collaborator.featuredProject.description}
              </p>
              
              {/* Materials Used */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-foreground mb-4">
                  Matériaux utilisés
                </p>
                <div className="flex flex-wrap gap-3">
                  {collaborator.featuredProject.materialsUsed.map((material, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 text-xs tracking-wider uppercase bg-background text-foreground border border-border"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Other Collaborators */}
      <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="label-text mb-4">DÉCOUVRIR AUSSI</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground">
                Autres collaborateurs
              </h2>
            </div>
            <Link
              href="/collaborations-v2"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity"
            >
              Voir tous les collaborateurs
              <span className="w-6 h-px bg-current" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherCollaborators.map((collab) => (
              <article key={collab.id} className="group">
                <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-muted">
                  <Image
                    src={collab.image}
                    alt={collab.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="label-text mb-2">{collab.profession}</p>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-foreground mb-2">
                  {collab.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{collab.city}, Maroc</p>
                <Link
                  href={`/collaborations-v2/${collab.slug}`}
                  className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity"
                >
                  Voir
                  <span className="w-4 h-px bg-current transition-all group-hover:w-8" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Collaborations CTA */}
      <section className="w-full py-16 md:py-20 px-8 md:px-16 lg:px-24 bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/collaborations-v2"
            className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] uppercase text-foreground hover:opacity-60 transition-opacity"
          >
            <span className="w-8 h-px bg-current" />
            Retour aux collaborations
          </Link>
        </div>
      </section>

      <FooterV2 />
    </main>
  )
}
