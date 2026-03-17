import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default async function AdminCollaboratorsPage() {
    const supabase = await createClient()
    if (!supabase) return null

    const { data: collaborators, error } = await supabase
        .from('collaborators')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="font-serif text-3xl mb-2">Collaborateurs</h1>
                    <p className="text-muted-foreground text-sm font-sans">Gérez les architectes et designers partenaires.</p>
                </div>
                <Link
                    href="/admin/collaborators/new"
                    className="bg-foreground text-background px-6 py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <Plus size={16} />
                    Nouveau Collaborateur
                </Link>
            </div>

            <div className="border border-border bg-card">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-secondary/20">
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Profil</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Nom</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Profession</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Slug</th>
                            <th className="p-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {collaborators?.map((collab) => (
                            <tr key={collab.id} className="hover:bg-secondary/10 transition-colors group">
                                <td className="p-4">
                                    <div className="relative w-12 h-12 rounded-full bg-secondary overflow-hidden">
                                        <Image
                                            src={collab.image}
                                            alt={collab.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="font-serif text-sm">{collab.name}</p>
                                </td>
                                <td className="p-4">
                                    <span className="text-[10px] uppercase tracking-widest opacity-60">
                                        {collab.profession}
                                    </span>
                                </td>
                                <td className="p-4 text-xs font-mono opacity-60">
                                    {collab.slug}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/collaborators/${collab.id}`}
                                            className="p-2 hover:bg-secondary transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit size={16} strokeWidth={1.5} />
                                        </Link>
                                        <button
                                            className="p-2 hover:bg-red-500/10 text-red-500 transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={16} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!collaborators || collaborators.length === 0) && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-sm text-muted-foreground italic">
                                    Aucun collaborateur trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
