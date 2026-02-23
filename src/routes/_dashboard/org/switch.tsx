import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Building2, Plus, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/org/switch')({ component: OrgSwitchPage })

function OrgSwitchPage() {
    const { user, setOrg } = useAuth()
    const navigate = useNavigate()

    const organizations = user?.organizations ?? []
    const activeOrgId = user?.orgId

    const handleSwitch = (id: string) => {
        setOrg(id)
        navigate({ to: '/_dashboard' as any })
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 pt-12">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-cyan-400" />
                    Switch Organization
                </h1>
                <p className="text-slate-400 mt-2 text-lg">Select an organization context to view its resources.</p>
            </div>

            <Card className="border-cyan-500/20">
                <CardHeader className="bg-slate-900/50 border-b border-slate-800">
                    <CardTitle className="text-lg">Your Organizations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-800/50">
                        {organizations.map(org => {
                            const isActive = org.id === activeOrgId
                            return (
                                <button
                                    key={org.id}
                                    onClick={() => handleSwitch(org.id)}
                                    className={`w-full flex justify-between items-center p-6 transition-colors hover:bg-slate-800/30
                                        ${isActive ? 'bg-cyan-950/20' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                                            ${isActive ? 'bg-cyan-600/20 text-cyan-400' : 'bg-slate-800 text-slate-300'}`}>
                                            {org.name.charAt(0)}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-white text-lg">{org.name}</div>
                                            <div className="text-slate-500 text-sm flex gap-2">
                                                <span>{org.slug}</span>
                                                <span>•</span>
                                                <span className="capitalize">{org.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isActive ? (
                                        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                                            <Check className="w-4 h-4" /> Active
                                        </div>
                                    ) : (
                                        <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <button
                onClick={() => navigate({ to: '/_dashboard/org/new' as any })}
                className="w-full flex items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/30 transition-all text-slate-400 hover:text-cyan-400 font-medium"
            >
                <Plus className="w-5 h-5" />
                Create New Organization
            </button>
        </div>
    )
}
