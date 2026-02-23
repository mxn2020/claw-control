import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '#/lib/authContext'
import { useMutation, useQuery } from 'convex/react'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ArrowLeft, Bot, Download, Server } from 'lucide-react'
import { api } from '../../../../../../convex/_generated/api'
import { useToast } from '#/components/ui/toast'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/skills/marketplace_/$skillId/deploy')({
    component: SkillDeploy,
})

function SkillDeploy() {
    const { skillId } = Route.useParams()
    const navigate = useNavigate()
    const { toast } = useToast()

    const discoverItems = useQuery(api.discover.list, { type: 'skill' })
    const skill = discoverItems?.find((s: any) => s._id === skillId)

    const { user } = useAuth()
    const agents = useQuery(api.agents.list, user?.orgId ? { orgId: user.orgId } : 'skip') ?? []
    const instances = useQuery(api.instances.list, user?.orgId ? { orgId: user.orgId } : 'skip') ?? []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convexApi = api as Record<string, any>
    const installSkill = useMutation(convexApi.skills?.install ?? null)

    const [targetType, setTargetType] = useState<'global' | 'instance' | 'agent'>('global')
    const [targetId, setTargetId] = useState<string>('')
    const [deploying, setDeploying] = useState(false)

    if (!skill) {
        return (
            <div className="flex items-center justify-center py-20 animate-pulse text-slate-500">
                Loading deploy configuration...
            </div>
        )
    }

    async function handleDeploy() {
        if (!user?.orgId || !skill) return
        setDeploying(true)
        try {
            await installSkill({
                orgId: user.orgId,
                discoverItemId: skill._id,
                targetType,
                targetId: targetType !== 'global' ? targetId : undefined
            })
            toast(`${skill.title} deployed successfully`, 'success')
            navigate({ to: '/skills/installed' })
        } catch (err) {
            toast(err instanceof Error ? err.message : 'Failed to deploy skill', 'error')
        } finally {
            setDeploying(false)
        }
    }

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate({ to: '/skills/marketplace' })} className="text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Deploy Skill</h1>
                    <p className="text-sm text-slate-400 mt-1">Configure deployment for {skill.title}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Target Configuration</CardTitle>
                        <Badge variant="success" className="bg-emerald-500/20 text-emerald-400">Scan Passed</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-300">Deployment Scope</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button
                                    onClick={() => setTargetType('global')}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${targetType === 'global' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Download className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <span className="text-sm font-medium text-white">Global</span>
                                </button>
                                <button
                                    onClick={() => setTargetType('instance')}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${targetType === 'instance' ? 'border-violet-500 bg-violet-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                                        <Server className="w-4 h-4 text-violet-400" />
                                    </div>
                                    <span className="text-sm font-medium text-white">Instance</span>
                                </button>
                                <button
                                    onClick={() => setTargetType('agent')}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${targetType === 'agent' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <span className="text-sm font-medium text-white">Agent</span>
                                </button>
                            </div>
                        </div>

                        {targetType === 'instance' && (
                            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                                <label className="text-sm font-medium text-slate-300">Select Instance</label>
                                <select
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                >
                                    <option value="" disabled>Choose an instance...</option>
                                    {instances.map((inst: any) => (
                                        <option key={inst._id} value={inst._id}>{inst.name} ({inst.status})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {targetType === 'agent' && (
                            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                                <label className="text-sm font-medium text-slate-300">Select Agent</label>
                                <select
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                >
                                    <option value="" disabled>Choose an agent...</option>
                                    {agents.map((ag: any) => (
                                        <option key={ag._id} value={ag._id}>{ag.name} ({ag.status})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 space-y-3">
                            <h4 className="text-sm font-medium text-white mb-2">Required Configuration</h4>
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-400">API Key (OpenWeatherMap)</label>
                                <input type="password" placeholder="Defaults to global instance secret" className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                            <Button variant="outline" onClick={() => navigate({ to: '/skills/marketplace' })}>Cancel</Button>
                            <Button
                                onClick={handleDeploy}
                                disabled={deploying || (targetType !== 'global' && !targetId)}
                            >
                                {deploying ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                                {deploying ? 'Deploying...' : 'Deploy Skill'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
