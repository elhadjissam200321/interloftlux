'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchFavorites() {
            if (!supabase) {
                setLoading(false)
                return
            }

            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setFavorites(user.user_metadata?.favorites || [])
            }
            setLoading(false)
        }

        fetchFavorites()
    }, [])

    const toggleFavorite = async (productId: string) => {
        if (!supabase) return

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            // Handle unauthenticated state (e.g., prompt login)
            window.location.href = '/auth/connexion'
            return
        }

        const currentFavorites = user.user_metadata?.favorites || []
        const isFavorite = currentFavorites.includes(productId)

        let newFavorites
        if (isFavorite) {
            newFavorites = currentFavorites.filter((id: string) => id !== productId)
        } else {
            newFavorites = [...currentFavorites, productId]
        }

        const { error } = await supabase.auth.updateUser({
            data: { favorites: newFavorites }
        })

        if (!error) {
            setFavorites(newFavorites)
        }
    }

    return { favorites, toggleFavorite, loading }
}
