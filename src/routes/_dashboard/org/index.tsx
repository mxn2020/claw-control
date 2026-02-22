import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Building2, Save } from 'lucide-react'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/org/')({ component: OrgGeneralPage })

function OrgGeneralPage() {
    const { user } = useAuth()
    const currentOrg = user?.organizations?.find(o => o.id === user?.orgId)

    if (!currentOrg) {
        return <div className="p-8 text-slate-400">Loading organization...</div>
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
                                defaultValue={currentOrg.name}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Organization Slug</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-500 focus:outline-none focus:border-cyan-500"
                                defaultValue={currentOrg.slug}
                                disabled
                            />
                            <p className="text-xs text-slate-500">The slug is used in URLs and cannot be changed.</p>
                        </div>
                        <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
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
