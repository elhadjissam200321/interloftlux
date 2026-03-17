
import { createClient } from './server'
import { type ProductCategory } from '../data'

export async function getProducts() {
    const supabase = await createClient()
    if (!supabase) return []
    const { data } = await supabase.from('products').select('*')
    return data || []
}

export async function getProductsByCategory(category: string) {
    const supabase = await createClient()
    if (!supabase) return []
    const { data } = await supabase.from('products').select('*').eq('category', category)
    return data || []
}

export async function getProductBySlug(slug: string) {
    const supabase = await createClient()
    if (!supabase) return null
    const { data } = await supabase.from('products').select('*').eq('slug', slug).single()
    return data
}

export async function getCategories() {
    const supabase = await createClient()
    if (!supabase) return []
    const { data } = await supabase.from('categories').select('*').order('label')
    return data || []
}

export async function getCategoryBySlug(slug: string) {
    const supabase = await createClient()
    if (!supabase) return null
    const { data } = await supabase.from('categories').select('*').eq('id', slug).single()
    return data
}

export async function getCollections() {
    const supabase = await createClient()
    if (!supabase) return []
    const { data } = await supabase.from('collections').select('*')
    return data || []
}

export async function getCollectionBySlug(slug: string) {
    const supabase = await createClient()
    if (!supabase) return null
    const { data } = await supabase.from('collections').select('*').eq('id', slug).single()
    return data
}

export async function getCollaborators() {
    const supabase = await createClient()
    if (!supabase) return []
    const { data } = await supabase.from('collaborators').select('*').order('created_at', { ascending: false })
    return data || []
}

export async function getCollaboratorBySlug(slug: string) {
    const supabase = await createClient()
    if (!supabase) return null
    const { data } = await supabase.from('collaborators').select('*').eq('slug', slug).single()
    return data
}

export async function getOtherCollaborators(currentSlug: string, limit: number = 3) {
    const supabase = await createClient()
    if (!supabase) return []
    const { data } = await supabase
        .from('collaborators')
        .select('*')
        .neq('slug', currentSlug)
        .limit(limit)
    return data || []
}

export async function getPageContent(id: string) {
    const supabase = await createClient()
    if (!supabase) return null
    const { data } = await supabase
        .from('pages_content')
        .select('*')
        .eq('id', id)
        .single()
    return data
}
