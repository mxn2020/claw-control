import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  KeyRound,
  RefreshCw,
  Clock,
  Shield,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/security/secrets')({
  component: SecuritySecrets,
})

const credentials = [
  {
    name: 'OPENAI_API_KEY',
    type: 'API Key',
    lastRotated: '2025-01-10',
    daysAgo: 5,
    distributedTo: ['support-agent', 'research-agent', 'qa-tester'],
    status: 'active',
  },
  {
    name: 'ANTHROPIC_API_KEY',
    type: 'API Key',
    lastRotated: '2025-01-12',
    daysAgo: 3,
    distributedTo: ['support-agent'],
    status: 'active',
  },
  {
    name: 'DATABASE_URL',
    type: 'Connection String',
    lastRotated: '2024-12-01',
    daysAgo: 45,
    distributedTo: ['analytics-agent', 'billing-agent'],
    status: 'stale',
  },
  {
    name: 'STRIPE_SECRET_KEY',
    type: 'API Key',
    lastRotated: '2025-01-08',
    daysAgo: 7,
    distributedTo: ['billing-agent'],
    status: 'active',
  },
  {
    name: 'DISCORD_BOT_TOKEN',
    type: 'OAuth Token',
    lastRotated: '2024-11-15',
    daysAgo: 61,
    distributedTo: ['support-agent'],
    status: 'expired',
  },
  {
    name: 'SLACK_WEBHOOK_URL',
    type: 'Webhook',
    lastRotated: '2025-01-05',
    daysAgo: 10,
    distributedTo: ['support-agent', 'qa-tester'],
    status: 'active',
  },
]

const rotationSchedules = [
  { name: 'API Keys', interval: '30 days', nextRotation: '2025-02-10', autoRotate: true },
  { name: 'OAuth Tokens', interval: '60 days', nextRotation: '2025-01-15', autoRotate: true },
  { name: 'Connection Strings', interval: '90 days', nextRotation: '2025-03-01', autoRotate: false },
  { name: 'Webhooks', interval: '90 days', nextRotation: '2025-04-05', autoRotate: false },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'success' as const
    case 'stale':
      return 'warning' as const
    case 'expired':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function SecuritySecrets() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Secrets Vault</h1>
          <p className="text-sm text-slate-400 mt-1">
            Credential management, rotation, and distribution
          </p>
        </div>
        <Button variant="default" size="sm">
          <KeyRound className="w-4 h-4 mr-2" />
          Add Secret
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Secrets</span>
              <KeyRound className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {credentials.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Stale / Expired</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {credentials.filter((c) => c.status !== 'active').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Auto-Rotate</span>
              <RefreshCw className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {rotationSchedules.filter((r) => r.autoRotate).length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Credentials List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Credentials</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Last Rotated
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Distribution
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {credentials.map((cred) => (
                  <tr
                    key={cred.name}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">
                      {cred.name}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{cred.type}</td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {cred.lastRotated}{' '}
                      <span className="text-slate-500">
                        ({cred.daysAgo}d ago)
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {cred.distributedTo.map((agent) => (
                          <Badge
                            key={agent}
                            variant="outline"
                            className="text-xs"
                          >
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(cred.status)}>
                        {cred.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Rotation Scheduler */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-base">Rotation Scheduler</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Secret Type
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Interval
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Next Rotation
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Auto-Rotate
                  </th>
                </tr>
              </thead>
              <tbody>
                {rotationSchedules.map((schedule) => (
                  <tr
                    key={schedule.name}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-white">{schedule.name}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {schedule.interval}
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">
                      {schedule.nextRotation}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={schedule.autoRotate ? 'success' : 'default'}
                      >
                        {schedule.autoRotate ? 'enabled' : 'manual'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
