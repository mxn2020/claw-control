import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Shield, AlertTriangle, CheckCircle, FileCode, ArrowLeft } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_dashboard/skills/marketplace_/$skillId/scan')({
    component: SkillScan,
})

function SkillScan() {
    const { skillId } = Route.useParams()
    const navigate = useNavigate()

    // Here we'd query the specific discover item or skill details.
    // Using a mock query for the demo:
    const discoverItems = useQuery(api.discover.list, { type: 'skill' })
    const skill = discoverItems?.find(s => s._id === skillId)

    const [scanning, setScanning] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setScanning(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    if (!skill) {
        return (
            <div className="flex items-center justify-center py-20 animate-pulse text-slate-500">
                Loading skill data...
            </div>
        )
    }

    const mockPermissions = ['fs:read', 'net:http_request', 'env:read']

    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate({ to: '/skills/marketplace' })} className="text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Security Scan</h1>
                    <p className="text-sm text-slate-400 mt-1">Analyzing {skill.title}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-cyan-400" />
                        <CardTitle>Static Analysis Report</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {scanning ? (
                        <div className="py-12 text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
                            <p className="text-sm text-slate-400">Performing AST analysis and dependency check...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Overall Score */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Passed</h3>
                                        <p className="text-sm text-slate-400">No critical vulnerabilities found</p>
                                    </div>
                                </div>
                                <Badge variant="success" className="text-sm px-3 py-1">Risk: LOW</Badge>
                            </div>

                            {/* Permissions */}
                            <div>
                                <h4 className="text-sm font-medium text-white mb-3">Requested Capabilities</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {mockPermissions.map(perm => (
                                        <div key={perm} className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/50 bg-slate-800/50">
                                            <FileCode className="w-4 h-4 text-slate-400" />
                                            <span className="font-mono text-xs text-slate-300">{perm}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                                        <span className="font-mono text-xs text-amber-300">exec:process</span>
                                        <Badge variant="warning" className="ml-auto text-[10px]">Flagged</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Dependencies */}
                            <div>
                                <h4 className="text-sm font-medium text-white mb-3">Dependency Tree</h4>
                                <div className="p-4 rounded-lg bg-slate-900 border border-slate-700/50">
                                    <p className="text-xs text-emerald-400 mb-1 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> 14 direct dependencies</p>
                                    <p className="text-xs text-emerald-400 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> 0 known CVEs</p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-700/50">
                                <Button variant="outline" onClick={() => navigate({ to: '/skills/marketplace' })}>Cancel</Button>
                                <Button onClick={() => navigate({ to: `/skills/marketplace/${skillId}/deploy` })}>
                                    Continue to Deploy
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
