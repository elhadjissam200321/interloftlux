
import { createClient } from '@supabase/supabase-js'
import { categories, products, collections } from '../data'
import { collaborators } from '../collaborators-data'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function migrate() {
    console.log('Starting migration...')

    // 1. Migrate Categories
    console.log('Migrating categories...')
    const { error: catError } = await supabase.from('categories').upsert(
        categories.map(c => ({
            id: c.id,
            label: c.label,
            image: c.image,
            href: c.href
        }))
    )
    if (catError) console.error('Error categories:', catError)

    // 2. Migrate Products
    console.log('Migrating products...')
    const { error: prodError } = await supabase.from('products').upsert(
        products.map(p => ({
            slug: p.slug,
            name: p.name,
            category: p.category,
            description: p.description,
            materials: p.materials,
            dimensions: p.dimensions,
            image: p.image,
            gallery: p.gallery
        }))
    )
    if (prodError) console.error('Error products:', prodError)

    // 3. Migrate Collections
    console.log('Migrating collections...')
    const { error: collError } = await supabase.from('collections').upsert(
        collections.map(c => ({
            id: c.id,
            label: c.label,
            description: c.description,
            href: c.href
        }))
    )
    if (collError) console.error('Error collections:', collError)

    // 4. Migrate Collaborators
    console.log('Migrating collaborators...')
    const { error: collabError } = await supabase.from('collaborators').upsert(
        collaborators.map(c => ({
            name: c.name,
            profession: c.profession,
            city: c.city,
            description: c.bio,
            collaboration_story: c.collaborationStory,
            image: c.image,
            hero_image: c.heroImage,
            expertise: c.featuredProject.materialsUsed,
            projects: c.projects, // Send the whole projects array
            featured_project: c.featuredProject
        }))
    )
    if (collabError) console.error('Error collaborators:', collabError)

    console.log('Migration finished!')
}

migrate()
