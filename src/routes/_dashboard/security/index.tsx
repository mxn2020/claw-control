import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Shield,
  Lock,
  AlertTriangle,
  Bug,
  Archive,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/security/')({
  component: SecurityCenter,
})

const tabs = [
  { label: 'Posture', active: true },
  { label: 'Secrets', active: false },
  { label: 'Quarantine', active: false },
  { label: 'Compliance', active: false },
  { label: 'Incidents', active: false },
]

const securityStats = [
  {
    label: 'Open Ports',
    value: '3',
    icon: <Lock className="w-5 h-5 text-cyan-400" />,
  },
  {
    label: 'CVEs Found',
    value: '2',
    icon: <Bug className="w-5 h-5 text-amber-400" />,
  },
  {
    label: 'Risky Permissions',
    value: '5',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
  },
  {
    label: 'Quarantined',
    value: '1',
    icon: <Archive className="w-5 h-5 text-slate-400" />,
  },
]

const recentEvents = [
  {
    id: 1,
    message: 'CVE-2024-1234 detected in web-search skill dependency',
    severity: 'high',
    time: '10 min ago',
  },
  {
    id: 2,
    message: 'Suspicious outbound connection blocked by firewall rule',
    severity: 'medium',
    time: '1 hour ago',
  },
  {
    id: 3,
    message: 'Secret rotation completed for OpenAI API key',
    severity: 'info',
    time: '3 hours ago',
  },
]

const severityVariant = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'danger' as const
    case 'medium':
      return 'warning' as const
    case 'info':
      return 'info' as const
    default:
      return 'default' as const
  }
}

function SecurityCenter() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Center</h1>
        <p className="text-sm text-slate-400 mt-1">
          Fleet security posture and threat monitoring
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              tab.active
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Security Score */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-emerald-500/50 bg-emerald-500/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">87</div>
                <div className="text-xs text-slate-400">/100</div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Security Posture Score
              </h2>
              <p className="text-sm text-slate-400">
                Good — 2 issues require attention
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{stat.label}</span>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">
              Recent Security Events
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                <Badge variant={severityVariant(event.severity)}>
                  {event.severity}
                </Badge>
                <span className="text-sm text-slate-300 flex-1">
                  {event.message}
                </span>
                <span className="text-xs text-slate-500">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
