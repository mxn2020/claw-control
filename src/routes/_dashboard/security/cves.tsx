import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
    ShieldAlert,
    Search,
    Server,
    PackageOpen,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/security/cves')({
    component: CVEMatrix,
})

const MOCK_CVES = [
    { id: 'CVE-2024-3094', package: 'xz-utils', severity: 'critical', score: 10.0, published: '2024-03-29' },
    { id: 'CVE-2023-4863', package: 'libwebp', severity: 'high', score: 8.8, published: '2023-09-12' },
    { id: 'CVE-2023-38545', package: 'curl', severity: 'high', score: 8.1, published: '2023-10-18' },
    { id: 'CVE-2024-21626', package: 'runc', severity: 'high', score: 8.6, published: '2024-01-31' },
    { id: 'CVE-2023-44487', package: 'nghttp2', severity: 'medium', score: 7.5, published: '2023-10-10' },
]

function CVEMatrix() {
    const { user } = useAuth()
    const orgId = user?.orgId as any
    const instances = useQuery(api.instances.list, orgId ? { orgId } : "skip")

    if (!instances && orgId) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="text-slate-400">Loading instances…</span>
            </div>
        )
    }

    const allInstances = instances ?? []

    // Deterministic exposure mapping
    const activeExposures = allInstances.flatMap((inst: any, idx: any) => {
        // Arbitrarily assign CVEs based on index for demo
        if (idx % 3 === 0) return [] // Safe instance
        return idx % 2 === 0
            ? [{ instance: inst.name, cve: MOCK_CVES[0], remediated: false }]
            : [{ instance: inst.name, cve: MOCK_CVES[1], remediated: false }, { instance: inst.name, cve: MOCK_CVES[2], remediated: true }]
    })

    const severityVariant = (severity: string) => {
        switch (severity) {
            case 'critical': return 'danger' as const
            case 'high': return 'danger' as const
            case 'medium': return 'warning' as const
            case 'low': return 'info' as const
            default: return 'default' as const
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Vulnerabilities (CVEs)</h1>
                <p className="text-sm text-slate-400 mt-1">
                    Exposure detection and CVE matrix across your fleet
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-3">
                            <Search className="w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search CVEs, packages, or instances..."
                                className="flex-1 bg-transparent border-none text-sm text-slate-300 placeholder-slate-500 focus:outline-none"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="py-4 flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5 text-red-400" />
                            <div>
                                <div className="text-sm font-semibold text-white">Critical Exposures</div>
                                <div className="text-xs text-slate-400">{activeExposures.filter((e: any) => e.cve.severity === 'critical' && !e.remediated).length} detected across fleet</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* CVE DB */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <PackageOpen className="w-4 h-4 text-cyan-400" />
                            <CardTitle className="text-base">CVE Matrix</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">CVE ID</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Severity</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Package</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Risk Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_CVES.map((cve) => (
                                        <tr key={cve.id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50">
                                            <td className="px-4 py-3 font-mono text-cyan-400 cursor-pointer hover:underline text-xs">{cve.id}</td>
                                            <td className="px-4 py-3"><Badge variant={severityVariant(cve.severity)}>{cve.severity}</Badge></td>
                                            <td className="px-4 py-3 text-slate-300 font-mono text-xs">{cve.package}</td>
                                            <td className="px-4 py-3 font-mono text-slate-400 text-xs">{cve.score.toFixed(1)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Fleet Exposure */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-amber-400" />
                            <CardTitle className="text-base">Active Fleet Exposures</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {activeExposures.length === 0 ? (
                            <div className="p-6 text-center text-sm text-slate-500">No active exposures detected in current fleet.</div>
                        ) : (
                            <div className="overflow-y-auto max-h-[400px]">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-800 bg-slate-900/50 sticky top-0">
                                            <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Instance</th>
                                            <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Vulnerability</th>
                                            <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeExposures.map((exp: any, i: any) => (
                                            <tr key={i} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50">
                                                <td className="px-4 py-3 text-slate-300 font-medium">{exp.instance}</td>
                                                <td className="px-4 py-3">
                                                    <span className="font-mono text-xs text-slate-400 block">{exp.cve.id}</span>
                                                    <span className="text-xs text-slate-500">{exp.cve.package}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant={exp.remediated ? 'success' : 'danger'}>
                                                        {exp.remediated ? 'Patched' : 'Exposed'}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
