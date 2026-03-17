'use client'

import { useState } from 'react'
import { RefreshCw, Check, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SeedCMSButton() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const router = useRouter()

    async function handleSeed() {
        if (!confirm('Cela va réinitialiser les textes par défaut pour toutes les pages. Continuer ?')) return

        setLoading(true)
        setStatus('idle')

        try {
            const res = await fetch('/api/admin/seed-cms', { method: 'POST' })
            if (!res.ok) throw new Error('Failed to seed')

            setStatus('success')
            router.refresh()
            setTimeout(() => setStatus('idle'), 3000)
        } catch (err) {
            console.error(err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleSeed}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
        >
            {loading ? (
                <RefreshCw size={14} className="animate-spin" />
            ) : status === 'success' ? (
                <Check size={14} className="text-green-500" />
            ) : status === 'error' ? (
                <AlertCircle size={14} className="text-red-500" />
            ) : (
                <RefreshCw size={14} />
            )}
            {loading ? 'Initialisation...' : status === 'success' ? 'Initialisé' : status === 'error' ? 'Erreur' : 'Initialiser les Contenus 22'}
        </button>
    )
}
