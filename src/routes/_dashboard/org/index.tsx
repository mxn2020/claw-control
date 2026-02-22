import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Building2, Save, ShieldCheck, Loader2 } from 'lucide-react'
import { useAuth } from '#/lib/authContext'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useState, useEffect } from 'react'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/org/')({ component: OrgGeneralPage })

function OrgGeneralPage() {
    const { user } = useAuth()
    const orgId = user?.orgId as Id<"organizations"> | undefined
    const org = useQuery(api.organizations.get, orgId ? { id: orgId } : "skip")
    const updateOrg = useMutation(api.organizations.update)

    const [name, setName] = useState('')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (org?.name) setName(org.name)
    }, [org?.name])

    if (!orgId || !org) {
        return <div className="p-8 text-slate-400">Loading organization...</div>
    }

    async function handleSave() {
        if (!orgId || !name.trim()) return
        setSaving(true)
        try {
            await updateOrg({ id: orgId, name: name.trim() })
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (err) {
            console.error('Failed to save:', err)
        } finally {
            setSaving(false)
        }
    }

    async function handleToggleMfa(val: boolean) {
        if (!orgId) return
        try {
            await updateOrg({ id: orgId, requireMfa: val })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-cyan-400" />
                        Organization Settings
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Manage your organization's general configuration</p>
                </div>
            </div>

            <div className="max-w-3xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Organization Name</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Organization Slug</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-500 focus:outline-none focus:border-cyan-500"
                                defaultValue={(org as any)?.slug ?? ''}
                                disabled
                            />
                            <p className="text-xs text-slate-500">The slug is used in URLs and cannot be changed.</p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving || !name.trim()}
                            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </CardContent>
                </Card>

                {/* MFA Enforcement */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-cyan-400" />
                            <CardTitle>Security Policies</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1">Enforce MFA for all members</h4>
                                <p className="text-xs text-slate-400">When enabled, all organization members must set up multi-factor authentication to access the dashboard.</p>
                            </div>
                            <button
                                onClick={() => handleToggleMfa(!(org as any)?.requireMfa)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${(org as any)?.requireMfa ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${(org as any)?.requireMfa ? 'translate-x-7' : 'translate-x-1'}`}></div>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-500/20">
                    <CardHeader>
                        <CardTitle className="text-red-400">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-slate-400">Once you delete an organization, there is no going back. Please be certain.</p>
                        <button className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Delete Organization
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
