import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const initialCMSData = [
    {
        id: 'accueil',
        title: 'Accueil',
        subtitle: 'DESIGN CONTEMPORAIN',
        description: 'Maison de design fondée à Casablanca en 2015.',
        content: {
            nav_about: 'Introduction',
            nav_products: 'Produits',
            nav_collections: 'Collections',
            nav_collaborations: 'Collaborations',
            nav_contact: 'Contact',
            hero_text: 'INTERloft Luxury Living'
        }
    },
    {
        id: 'about',
        title: 'À propos',
        subtitle: 'FONDÉE 2015',
        description: 'DIRECTRICE GÉNÉRALE ET CRÉATIVE : LEILA BOUTALEB',
        content: {
            main_text: "INTERLOFT EST UNE MAISON DE DESIGN CONTEMPORAIN FONDÉE À CASABLANCA EN 2015. LEILA BOUTALEB, DIRECTRICE GÉNÉRALE ET CRÉATIVE, SÉLECTIONNE AVEC SOIN CHAQUE PIÈCE DE MOBILIER ET D'OBJETS PRÉSENTÉS PAR INTERLOFT. SA PERSPECTIVE CURATORIALE EN MATIÈRE DE DESIGN, DE MEUBLES, D'ÉCLAIRAGE ET D'OBJETS PEUT ÊTRE DÉCRITE COMME INTEMPORELLE, LUXUEUSE ET MINIMALISTE, BIEN QU'ELLE ÉCHAPPE À TOUTE CATÉGORISATION FACILE. LES CLIENTS DU MONDE ENTIER VIENNENT À INTERLOFT POUR TROUVER DES PIÈCES EXCLUSIVES ET UNIQUES, TOUTES PRODUITES SELON LEURS SPÉCIFICATIONS.\n\nINTERLOFT REPRÉSENTE UNE SÉLECTION DE DESIGNERS ET D'ARTISANS CONTEMPORAINS, DONT LES PIÈCES REFLÈTENT LA RICHESSE DU PATRIMOINE MAROCAIN COMBINÉE À UN LANGAGE DESIGN RÉSOLUMENT MODERNE. CHAQUE OBJET EST PENSÉ COMME UNE DÉCLARATION D'INTENTION, OÙ LA FORME ET LA FONCTION S'ENTRELACENT POUR CRÉER DES ESPACES QUI INSPIRENT LA CONTEMPLATION ET LE BIEN-ÊTRE.\n\nLA MARQUE SUIT UNE PHILOSOPHIE DE CRÉATION ARTISANALE OÙ CHAQUE DÉTAIL EST MÉTICULEUSEMENT CONSIDÉRÉ. LES MATÉRIAUX SÉLECTIONNÉS — LIN NATUREL, BOIS MASSIFS, MÉTAUX NOBLES — SONT TRAVAILLÉS AVEC UNE RIGUEUR SANS COMPROMIS. LE RÉSULTAT EST UNE COLLECTION DE MEUBLES ET D'OBJETS QUI INCARNENT LA TIMELESSNESS, CONJUGUANT TRADITION ARTISANALE ET MINIMALISME CONTEMPORAIN.\n\nINTERLOFT OFFRE UNE EXPÉRIENCE CURATORIALE PERSONNALISÉE À SES CLIENTS. PAR UN PROTOCOLE PRIVÉ ET SUR RENDEZ-VOUS, CHAQUE VISITEUR EST IMMERGÉ DANS L'UNIVERS ESTHÉTIQUE DE LA MAISON, DÉCOUVRANT DES PIÈCES QUI RÉSONNENT AVEC LEUR VISION PERSONNELLE DE L'HABITAT MODERNE."
        }
    },
    {
        id: 'collaborations',
        title: 'Collaborations',
        subtitle: 'NOS PARTENAIRES CRÉATIFS',
        description: "Nous travaillons avec les meilleurs architectes et designers du Maroc pour créer des espaces d'exception. Découvrez les créatifs qui partagent notre vision.",
        content: {
            hero_image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
            intro_label: "L'ART DE LA COLLABORATION",
            intro_text: "Chaque collaboration est une rencontre entre deux visions créatives. Nous croyons que le mobilier prend tout son sens lorsqu'il dialogue avec l'architecture qui l'entoure."
        }
    },
    {
        id: 'contact',
        title: 'Contact',
        subtitle: 'Nous contacter',
        description: "Pour toute demande d'information concernant nos collections ou nos produits, contactez notre équipe. Nous vous répondrons dans les meilleurs délais.",
        content: {}
    },
    {
        id: 'conditions',
        title: 'Conditions Générales',
        subtitle: 'Mars 2026',
        description: "Conditions générales de vente et d'utilisation du site INTERloft.",
        content: {}
    },
    {
        id: 'confidentialite',
        title: 'Confidentialité',
        subtitle: 'Mars 2026',
        description: "Politique de confidentialité et protection des données personnelles chez INTERloft.",
        content: {}
    },
    {
        id: 'cookies',
        title: 'Politique Cookies',
        subtitle: 'Mars 2026',
        description: "Politique de gestion des cookies et technologies de suivi chez INTERloft.",
        content: {}
    }
]

export async function POST() {
    try {
        const supabase = await createClient()
        if (!supabase) throw new Error('Could not initialize Supabase')

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { error } = await supabase
            .from('pages_content')
            .upsert(initialCMSData, { onConflict: 'id' })

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Error seeding CMS:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
