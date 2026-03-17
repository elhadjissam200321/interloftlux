
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { categories, products, collections } from '@/lib/data'
import { collaborators } from '@/lib/collaborators-data'

export async function POST() {
    const supabase = await createClient()
    if (!supabase) return NextResponse.json({ error: 'No client' }, { status: 500 })

    // Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        // 1. Migrate Categories
        await supabase.from('categories').upsert(
            categories.map(c => ({
                id: c.id,
                label: c.label,
                image: c.image,
                href: c.href
            }))
        )

        // 2. Migrate Products
        await supabase.from('products').upsert(
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

        // 3. Migrate Collections
        await supabase.from('collections').upsert(
            collections.map(c => ({
                id: c.id,
                label: c.label,
                description: c.description,
                href: c.href
            }))
        )

        // 4. Migrate Collaborators
        await supabase.from('collaborators').upsert(
            collaborators.map(c => ({
                slug: c.slug,
                name: c.name,
                profession: c.profession,
                city: c.city,
                description: c.bio,
                collaboration_story: c.collaborationStory,
                image: c.image,
                hero_image: c.heroImage,
                expertise: c.featuredProject.materialsUsed,
                projects: c.projects,
                featured_project: c.featuredProject
            }))
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
    }
}
