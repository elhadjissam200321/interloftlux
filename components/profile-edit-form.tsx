'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

interface ProfileEditFormProps {
    initialData: {
        firstName: string
        lastName: string
        email: string
    }
}

export default function ProfileEditForm({ initialData }: ProfileEditFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState(initialData)
    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        setIsLoading(true)
        const { error } = await supabase.auth.updateUser({
            data: {
                first_name: form.firstName,
                last_name: form.lastName,
            }
        })

        if (error) {
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le profil.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Profil mis à jour",
                description: "Vos informations ont été enregistrées avec succès.",
            })
            router.refresh()
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block label-text mb-2">Prénom</label>
                    <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                    />
                </div>
                <div>
                    <label className="block label-text mb-2">Nom</label>
                    <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-foreground"
                    />
                </div>
            </div>
            <div>
                <label className="block label-text mb-2">Email</label>
                <input
                    type="email"
                    value={form.email}
                    disabled
                    className="w-full border border-border bg-foreground/5 px-4 py-2 font-sans text-sm text-muted-foreground cursor-not-allowed"
                />
                <p className="text-[10px] text-muted-foreground mt-2">L'adresse email ne peut pas être modifiée.</p>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="label-text px-8 py-3 bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-50"
            >
                {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
        </form>
    )
}
