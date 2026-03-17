'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import { X, Plus, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CollaboratorFormProps {
    initialData?: any
}

export default function CollaboratorForm({ initialData }: CollaboratorFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        profession: initialData?.profession || 'Architecte',
        city: initialData?.city || '',
        description: initialData?.description || '',
        collaboration_story: initialData?.collaboration_story || '',
        image: initialData?.image || '',
        hero_image: initialData?.hero_image || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        website: initialData?.website || '',
        address: initialData?.address || '',
        expertise: initialData?.expertise || [],
        projects: initialData?.projects || [],
        featured_project: initialData?.featured_project || {
            name: '',
            description: '',
            image: '',
            materialsUsed: []
        }
    })

    const [newExpertise, setNewExpertise] = useState('')
    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!supabase) return

        setIsLoading(true)

        const { error } = await supabase
            .from('collaborators')
            .upsert({
                ...form,
                id: initialData?.id || undefined,
                updated_at: new Date().toISOString()
            })

        if (error) {
            toast({
                title: "Erreur",
                description: "Impossible d'enregistrer le collaborateur.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Collaborateur enregistré",
                description: "Les informations ont été sauvegardées.",
            })
            router.push('/admin/collaborators')
            router.refresh()
        }
        setIsLoading(false)
    }

    const addExpertise = () => {
        if (newExpertise.trim()) {
            setForm({ ...form, expertise: [...form.expertise, newExpertise.trim()] })
            setNewExpertise('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-12 pb-24">
            <div className="flex items-center gap-4 border-b border-border pb-8">
                <Link href="/admin/collaborators" className="p-2 hover:bg-secondary transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="font-serif text-3xl">
                    {initialData ? 'Modifier le collaborateur' : 'Nouveau collaborateur'}
                </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block label-text mb-2">Nom complet</label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Slug (URL)</label>
                        <input
                            type="text"
                            required
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>

                    <div>
                        <label className="block label-text mb-2">Profession</label>
                        <select
                            value={form.profession}
                            onChange={(e) => setForm({ ...form, profession: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground appearance-none"
                        >
                            <option value="Architecte">Architecte</option>
                            <option value="Designer d'Intérieur">Designer d'Intérieur</option>
                        </select>
                    </div>

                    <div>
                        <label className="block label-text mb-2">Ville</label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block label-text mb-2">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div>
                        <label className="block label-text mb-2">Site Web</label>
                        <input
                            type="text"
                            value={form.website}
                            onChange={(e) => setForm({ ...form, website: e.target.value })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <label className="block label-text mb-2">Biographie / Description</label>
                    <textarea
                        required
                        rows={5}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none"
                    />
                </div>
                <div>
                    <label className="block label-text mb-2">L'histoire de la collaboration</label>
                    <textarea
                        rows={5}
                        value={form.collaboration_story}
                        onChange={(e) => setForm({ ...form, collaboration_story: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none"
                    />
                </div>
            </div>

            {/* Expertise Tags */}
            <div>
                <label className="block label-text mb-4">Expertise / Tags</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {form.expertise.map((exp: string, i: number) => (
                        <span key={i} className="bg-secondary px-3 py-1 text-xs flex items-center gap-2">
                            {exp}
                            <button type="button" onClick={() => setForm({ ...form, expertise: form.expertise.filter((_: any, j: number) => i !== j) })} className="opacity-40 hover:opacity-100">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newExpertise}
                        onChange={(e) => setNewExpertise(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                        placeholder="Ajouter une expertise..."
                        className="flex-1 border border-border bg-transparent px-4 py-2 font-sans text-sm focus:outline-none focus:border-foreground"
                    />
                    <button type="button" onClick={addExpertise} className="p-2 border border-border hover:bg-secondary transition-colors">
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Images */}
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <label className="block label-text mb-2">Photo de profil (URL)</label>
                    <input
                        type="text"
                        required
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground mb-4"
                    />
                    {form.image && (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-secondary">
                            <Image src={form.image} alt="Preview" fill className="object-cover" />
                        </div>
                    )}
                </div>
                <div>
                    <label className="block label-text mb-2">Image de couverture Hero (URL)</label>
                    <input
                        type="text"
                        value={form.hero_image}
                        onChange={(e) => setForm({ ...form, hero_image: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground mb-4"
                    />
                    {form.hero_image && (
                        <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                            <Image src={form.hero_image} alt="Preview" fill className="object-cover" />
                        </div>
                    )}
                </div>
            </div>

            {/* Feature Project Section */}
            <div className="border-t border-border pt-12">
                <h3 className="font-serif text-2xl mb-8">Projet Phare</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <label className="block label-text mb-2">Nom du projet</label>
                            <input
                                type="text"
                                value={form.featured_project?.name || ''}
                                onChange={(e) => setForm({
                                    ...form,
                                    featured_project: { ...(form.featured_project || {}), name: e.target.value }
                                })}
                                className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground"
                            />
                        </div>
                        <div>
                            <label className="block label-text mb-2">Description du projet</label>
                            <textarea
                                rows={3}
                                value={form.featured_project?.description || ''}
                                onChange={(e) => setForm({
                                    ...form,
                                    featured_project: { ...(form.featured_project || {}), description: e.target.value }
                                })}
                                className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground resize-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block label-text mb-2">Image du projet (URL)</label>
                        <input
                            type="text"
                            value={form.featured_project?.image || ''}
                            onChange={(e) => setForm({
                                ...form,
                                featured_project: { ...(form.featured_project || {}), image: e.target.value }
                            })}
                            className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm focus:outline-none focus:border-foreground mb-4"
                        />
                        {form.featured_project?.image && (
                            <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                                <Image src={form.featured_project.image} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Multi-Project Section */}
            <div className="border-t border-border pt-12">
                <h3 className="font-serif text-2xl mb-8">Liste des Projets</h3>
                <div className="space-y-6">
                    {form.projects?.map((project: any, index: number) => (
                        <div key={index} className="flex gap-4 p-6 bg-secondary relative group">
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, projects: form.projects.filter((_: any, i: number) => i !== index) })}
                                className="absolute -top-2 -right-2 bg-foreground text-background p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <X size={14} />
                            </button>
                            <div className="w-24 h-24 relative flex-shrink-0 bg-muted">
                                {project.image && <Image src={project.image} alt="" fill className="object-cover" />}
                            </div>
                            <div className="flex-1 grid md:grid-cols-2 gap-4">
                                <input
                                    placeholder="Nom du projet"
                                    value={project.name}
                                    onChange={(e) => {
                                        const newProjects = [...form.projects]
                                        newProjects[index].name = e.target.value
                                        setForm({ ...form, projects: newProjects })
                                    }}
                                    className="bg-transparent border-b border-border py-1 px-2 focus:outline-none focus:border-foreground"
                                />
                                <input
                                    placeholder="Image URL"
                                    value={project.image}
                                    onChange={(e) => {
                                        const newProjects = [...form.projects]
                                        newProjects[index].image = e.target.value
                                        setForm({ ...form, projects: newProjects })
                                    }}
                                    className="bg-transparent border-b border-border py-1 px-2 focus:outline-none focus:border-foreground"
                                />
                                <input
                                    placeholder="Lieu"
                                    value={project.location}
                                    onChange={(e) => {
                                        const newProjects = [...form.projects]
                                        newProjects[index].location = e.target.value
                                        setForm({ ...form, projects: newProjects })
                                    }}
                                    className="bg-transparent border-b border-border py-1 px-2 focus:outline-none focus:border-foreground col-span-full"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, projects: [...form.projects, { name: '', image: '', location: '' }] })}
                        className="w-full py-4 border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                    >
                        <Plus size={16} /> Ajouter un projet
                    </button>
                </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-foreground text-background px-12 py-4 text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={18} />
                    {isLoading ? 'Enregistrement...' : 'Enregistrer le profil'}
                </button>
            </div>
        </form>
    )
}
