import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Shield,
  Bug,
  AlertTriangle,
  Wifi,
  Settings,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/security/posture')({
  component: SecurityPosture,
})

const cves = [
  { id: 'CVE-2024-1234', severity: 'high', component: 'web-search@1.1.0', description: 'Remote code execution in dependency' },
  { id: 'CVE-2024-5678', severity: 'medium', component: 'http-client@3.2.1', description: 'SSRF via redirect handling' },
  { id: 'CVE-2024-9012', severity: 'low', component: 'json-parser@2.0.4', description: 'Denial of service with crafted input' },
]

const openPorts = [
  { port: 8080, service: 'Gateway API', instance: 'gw-prod-01', exposure: 'public' },
  { port: 443, service: 'HTTPS', instance: 'gw-prod-01', exposure: 'public' },
  { port: 5432, service: 'PostgreSQL', instance: 'db-prod-01', exposure: 'internal' },
]

const weakConfigs = [
  { rule: 'Agent runs without memory encryption', severity: 'high', agent: 'qa-tester', recommendation: 'Enable memory encryption in agent config' },
  { rule: 'Tool allows unrestricted network access', severity: 'medium', agent: 'research-agent', recommendation: 'Add network policy restrictions' },
  { rule: 'Session timeout set to > 1 hour', severity: 'low', agent: 'support-agent', recommendation: 'Reduce session timeout to 30 minutes' },
  { rule: 'Debug logging enabled in production', severity: 'medium', agent: 'analytics-agent', recommendation: 'Disable debug logging for production instances' },
  { rule: 'API key not rotated in 90+ days', severity: 'high', agent: 'billing-agent', recommendation: 'Rotate API keys immediately' },
]

const riskBreakdown = [
  { category: 'Vulnerabilities', score: 72, items: 3, color: 'bg-amber-500' },
  { category: 'Configuration', score: 65, items: 5, color: 'bg-red-500' },
  { category: 'Network', score: 90, items: 1, color: 'bg-emerald-500' },
  { category: 'Secrets', score: 85, items: 1, color: 'bg-cyan-500' },
  { category: 'Permissions', score: 78, items: 2, color: 'bg-purple-500' },
]

const severityVariant = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'danger' as const
    case 'medium':
      return 'warning' as const
    case 'low':
      return 'info' as const
    default:
      return 'default' as const
  }
}

function SecurityPosture() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Posture</h1>
        <p className="text-sm text-slate-400 mt-1">
          Fleet-wide risk assessment and vulnerability overview
        </p>
      </div>

      {/* Risk Score */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-amber-500/50 bg-amber-500/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">74</div>
                <div className="text-xs text-slate-400">/100</div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Fleet Risk Score
              </h2>
              <p className="text-sm text-slate-400">
                Fair — 9 issues detected across 5 categories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Risk Breakdown</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskBreakdown.map((r) => (
              <div key={r.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{r.category}</span>
                  <span className="text-xs text-slate-400">
                    {r.score}/100 · {r.items} issue{r.items !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`${r.color} h-2 rounded-full transition-all`}
                    style={{ width: `${r.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CVE Badges */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">CVE Findings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cves.map((cve) => (
              <div
                key={cve.id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge variant={severityVariant(cve.severity)}>
                  {cve.severity}
                </Badge>
                <span className="text-sm font-mono text-cyan-400 shrink-0">
                  {cve.id}
                </span>
                <span className="text-sm text-slate-300 flex-1">
                  {cve.description}
                </span>
                <Badge variant="outline" className="text-xs shrink-0">
                  {cve.component}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Open Port Exposure */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Open Port Exposure</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Port
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Instance
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Exposure
                  </th>
                </tr>
              </thead>
              <tbody>
                {openPorts.map((p) => (
                  <tr
                    key={`${p.instance}-${p.port}`}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-cyan-400 font-mono">
                      {p.port}
                    </td>
                    <td className="px-4 py-3 text-white">{p.service}</td>
                    <td className="px-4 py-3 text-slate-300">{p.instance}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          p.exposure === 'public' ? 'warning' : 'success'
                        }
                      >
                        {p.exposure}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weak Config Detector */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">
              Weak Configuration Detector
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weakConfigs.map((cfg, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge variant={severityVariant(cfg.severity)} className="mt-0.5 shrink-0">
                  {cfg.severity}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{cfg.rule}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Agent: {cfg.agent} · {cfg.recommendation}
                  </p>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
