import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Building2, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '#/lib/authContext'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/org/new')({ component: NewOrgPage })

function NewOrgPage() {
    const navigate = useNavigate()
    const { token, setOrg } = useAuth()
    const createOrg = useMutation(api.orgs.createOrg)

    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Auto-generate slug from name
    const handleNameChange = (val: string) => {
        setName(val)
        if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))
        }
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const result = await createOrg({ token: token ?? undefined, name, slug })
            setOrg(result.orgId)
            navigate({ to: '/_dashboard' })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 pt-12">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-cyan-400" />
                    Create Organization
                </h1>
                <p className="text-slate-400 mt-2 text-lg">Define a new isolated environment for instances and agents.</p>
            </div>

            <Card className="border-cyan-500/20">
                <CardHeader className="bg-slate-900/50 border-b border-slate-800">
                    <CardTitle className="text-lg">Organization Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Organization Name</label>
                            <input
                                autoFocus
                                required
                                value={name}
                                onChange={e => handleNameChange(e.target.value)}
                                placeholder="Acme Corp"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">URL Slug</label>
                            <div className="flex items-center">
                                <span className="bg-slate-800 border border-slate-700 border-r-0 rounded-l-lg px-4 py-3 text-slate-500 font-mono text-sm">
                                    app.clawcontrol.dev/
                                </span>
                                <input
                                    required
                                    value={slug}
                                    onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                    placeholder="acme-corp"
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-r-lg px-4 py-3 text-white font-mono focus:border-cyan-500 outline-none transition-colors"
                                />
                            </div>
                            <p className="text-xs text-slate-500">This must be unique across all ClawControl organizations.</p>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => navigate({ to: '/_dashboard/org/switch' })}
                                className="px-6 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!name || !slug}
                                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                Create Organization
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
