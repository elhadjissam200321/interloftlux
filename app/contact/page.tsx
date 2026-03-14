'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import FooterV2 from '@/components/footer-v2'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-border">
        <p className="label-text mb-4">Nous contacter</p>
        <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] font-light text-foreground leading-none">
          Contact
        </h1>
      </div>

      {/* Layout */}
      <div className="px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Left: info */}
        <div>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-sm mb-16">
            Pour toute demande d&rsquo;information concernant nos collections ou nos produits,
            contactez notre équipe. Nous vous répondrons dans les meilleurs délais.
          </p>

          <div className="space-y-8">
            <div className="border-t border-border pt-6">
              <p className="label-text mb-3">Téléphone</p>
              <a
                href="tel:+212660252070"
                className="font-serif text-xl font-light text-foreground hover:opacity-60 transition-opacity"
              >
                +212 660-252070
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <p className="label-text mb-3">Email</p>
              <a
                href="mailto:contact@interloft.ma"
                className="font-serif text-xl font-light text-foreground hover:opacity-60 transition-opacity"
              >
                contact@interloft.ma
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <p className="label-text mb-3">Showrooms</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Casablanca, Maroc<br />
                Marrakech, Maroc
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
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
                <label
                  htmlFor="nom"
                  className="block label-text mb-3"
                >
                  Nom
                </label>
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
                <label
                  htmlFor="email"
                  className="block label-text mb-3"
                >
                  Email
                </label>
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

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block label-text mb-3"
                >
                  Message
                </label>
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
        </div>
      </div>

      <FooterV2 />
    </div>
  )
}
