'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ContactForm() {
    const searchParams = useSearchParams()
    const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        // 1. Handle URL query parameters
        const subject = searchParams.get('subject')
        const message = searchParams.get('message')

        if (subject || message) {
            setForm(prev => ({
                ...prev,
                sujet: subject || prev.sujet,
                message: message || prev.message
            }))
        }

        // 2. Handle logged-in user data
        async function getUserData() {
            const supabase = createClient()
            if (!supabase) return

            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const firstName = user.user_metadata?.first_name || ''
                const lastName = user.user_metadata?.last_name || ''
                const fullName = firstName && lastName ? `${firstName} ${lastName}` : ''

                setForm(prev => ({
                    ...prev,
                    nom: fullName || prev.nom,
                    email: user.email || prev.email
                }))
            }
        }

        getUserData()
    }, [searchParams])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <>
            {submitted ? (
                <div className="py-20 text-center">
                    <div className="w-12 h-px bg-foreground mx-auto mb-8" />
                    <h2 className="font-serif text-3xl font-light text-foreground mb-4">
                        Message envoyé
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground">
                        Nous vous contacterons dans les meilleurs délais.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Nom */}
                    <div>
                        <label htmlFor="nom" className="block label-text mb-3">Nom</label>
                        <input
                            id="nom"
                            name="nom"
                            type="text"
                            required
                            value={form.nom}
                            onChange={handleChange}
                            className="w-full border-b border-border bg-transparent py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block label-text mb-3">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border-b border-border bg-transparent py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                            placeholder="votre@email.com"
                        />
                    </div>

                    {/* Sujet */}
                    <div>
                        <label htmlFor="sujet" className="block label-text mb-3">Sujet</label>
                        <input
                            id="sujet"
                            name="sujet"
                            type="text"
                            required
                            value={form.sujet}
                            onChange={handleChange}
                            className="w-full border-b border-border bg-transparent py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                            placeholder="L'objet de votre demande"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block label-text mb-3">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={form.message}
                            onChange={handleChange}
                            className="w-full border-b border-border bg-transparent py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                            placeholder="Votre message..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full font-sans text-xs tracking-[0.3em] uppercase text-primary-foreground bg-primary py-5 hover:opacity-80 transition-opacity"
                    >
                        Envoyer
                    </button>
                </form>
            )}
        </>
    )
}
