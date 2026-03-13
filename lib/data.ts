export type ProductCategory =
  | 'nouveautes'
  | 'canapes'
  | 'canapes-composables'
  | 'fauteuils'
  | 'lits'
  | 'meubles'
  | 'rideaux'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  description: string
  materials: string[]
  dimensions: string
  image: string
  gallery: string[]
}

export interface Category {
  id: ProductCategory
  label: string
  image: string
  href: string
}

export const categories: Category[] = [
  {
    id: 'nouveautes',
    label: 'Nouveautés',
    image: '/images/nouveautes.jpg',
    href: '/products/nouveautes',
  },
  {
    id: 'canapes',
    label: 'Canapés',
    image: '/images/canapes.jpg',
    href: '/products/canapes',
  },
  {
    id: 'canapes-composables',
    label: 'Canapés Composables',
    image: '/images/composables.jpg',
    href: '/products/canapes-composables',
  },
  {
    id: 'fauteuils',
    label: 'Fauteuils',
    image: '/images/fauteuils.jpg',
    href: '/products/fauteuils',
  },
  {
    id: 'lits',
    label: 'Lits',
    image: '/images/lits.jpg',
    href: '/products/lits',
  },
  {
    id: 'meubles',
    label: 'Meubles',
    image: '/images/meubles.jpg',
    href: '/products/meubles',
  },
  {
    id: 'rideaux',
    label: 'Rideaux',
    image: '/images/rideaux.jpg',
    href: '/products/rideaux',
  },
]

export const products: Product[] = [
  {
    id: '1',
    slug: 'canape-alba',
    name: 'Canapé Alba',
    category: 'canapes',
    description:
      'Le canapé Alba incarne l\'élégance minimaliste avec ses lignes épurées et ses proportions soigneusement étudiées. Conçu pour créer une atmosphère sereine dans tout intérieur contemporain.',
    materials: ['Lin naturel', 'Structure en hêtre massif', 'Mousse haute résilience'],
    dimensions: 'L 240 × P 96 × H 78 cm — Hauteur d\'assise : 42 cm',
    image: '/images/canapes.jpg',
    gallery: ['/images/canapes.jpg', '/images/product-sofa-1.jpg', '/images/product-sofa-2.jpg'],
  },
  {
    id: '2',
    slug: 'canape-composable-forma',
    name: 'Canapé Composable Forma',
    category: 'canapes-composables',
    description:
      'La collection Forma propose un système modulaire d\'une grande liberté de composition. Chaque élément s\'assemble harmonieusement pour créer un espace de vie sur mesure.',
    materials: ['Tissu bouclé écru', 'Piètement en chêne huilé', 'Rembourrage en duvet'],
    dimensions: 'Modules de L 90 × P 96 × H 72 cm — Configurations multiples',
    image: '/images/composables.jpg',
    gallery: ['/images/composables.jpg', '/images/canapes.jpg'],
  },
  {
    id: '3',
    slug: 'fauteuil-lune',
    name: 'Fauteuil Lune',
    category: 'fauteuils',
    description:
      'Le Fauteuil Lune est une pièce sculptée entre confort et beauté formelle. Sa silhouette organique et sa généreuse assise en font un objet de contemplation autant qu\'un siège.',
    materials: ['Velours côtelé naturel', 'Structure en métal laqué noir mat', 'Mousse ergonomique'],
    dimensions: 'L 82 × P 88 × H 80 cm — Hauteur d\'assise : 44 cm',
    image: '/images/fauteuils.jpg',
    gallery: ['/images/fauteuils.jpg'],
  },
  {
    id: '4',
    slug: 'canape-nova',
    name: 'Canapé Nova',
    category: 'nouveautes',
    description:
      'Nouvelle pièce de la collection, le Canapé Nova se distingue par son architecture audacieuse et son tissu de haute qualité. Une proposition contemporaine pour les intérieurs exigeants.',
    materials: ['Microfibre sable', 'Piètement en noyer massif', 'Coussin en plumes d\'oie'],
    dimensions: 'L 210 × P 90 × H 74 cm — Hauteur d\'assise : 40 cm',
    image: '/images/nouveautes.jpg',
    gallery: ['/images/nouveautes.jpg', '/images/product-sofa-1.jpg'],
  },
  {
    id: '5',
    slug: 'lit-alba',
    name: 'Lit Alba',
    category: 'lits',
    description:
      'Le Lit Alba redéfinit l\'espace nuit avec sa tête de lit capitonnée et son plateau bas. Une silhouette horizontale et apaisante pour des nuits d\'un luxe discret.',
    materials: ['Lin lavé beige', 'Structure en bois massif teinté', 'Sommier à lattes'],
    dimensions: 'L 180 × P 200 cm — Hauteur totale 90 cm',
    image: '/images/lits.jpg',
    gallery: ['/images/lits.jpg'],
  },
  {
    id: '6',
    slug: 'console-trace',
    name: 'Console Tracé',
    category: 'meubles',
    description:
      'La Console Tracé est une pièce d\'une remarquable légèreté visuelle. Sa structure filiforme en métal laqué et son plateau en marbre composent un équilibre parfait entre rigueur et sensibilité.',
    materials: ['Plateau en marbre travertin', 'Structure en acier laqué noir', 'Fixations invisibles'],
    dimensions: 'L 140 × P 38 × H 80 cm',
    image: '/images/meubles.jpg',
    gallery: ['/images/meubles.jpg'],
  },
  {
    id: '7',
    slug: 'rideaux-seville',
    name: 'Rideaux Séville',
    category: 'rideaux',
    description:
      'Confectionnés à la main dans un lin épais et drapant, les Rideaux Séville filtrent la lumière naturelle avec une précision poétique. Disponibles en plusieurs coloris naturels.',
    materials: ['100% lin lavé', 'Oeillets en laiton brossé', 'Doublure en coton naturel'],
    dimensions: 'Largeur 140 cm — Hauteur sur mesure de 200 à 300 cm',
    image: '/images/rideaux.jpg',
    gallery: ['/images/rideaux.jpg'],
  },
]

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.id === slug)
}
