import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Webhook,
  Plus,
  Bell,
  BarChart3,
  ExternalLink,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/configure/integrations')({
  component: ConfigureIntegrations,
})

const webhooks = [
  {
    name: 'Deploy Notifications',
    url: 'https://hooks.slack.com/services/T…/B…/x…',
    events: ['deploy.started', 'deploy.completed', 'deploy.failed'],
    status: 'active',
    lastTriggered: '2 hours ago',
  },
  {
    name: 'Security Alerts',
    url: 'https://hooks.slack.com/services/T…/B…/y…',
    events: ['security.incident', 'quarantine.triggered'],
    status: 'active',
    lastTriggered: '1 day ago',
  },
  {
    name: 'Agent Errors',
    url: 'https://webhook.site/abc-123',
    events: ['agent.error', 'agent.crash'],
    status: 'disabled',
    lastTriggered: '5 days ago',
  },
]

const siemIntegrations = [
  {
    name: 'Datadog',
    type: 'APM + Logs',
    status: 'connected',
    endpoint: 'https://api.datadoghq.com',
    lastSync: '30 sec ago',
  },
  {
    name: 'Splunk',
    type: 'Log Forwarding',
    status: 'connected',
    endpoint: 'https://hec.splunk.acme.com:8088',
    lastSync: '1 min ago',
  },
  {
    name: 'Elastic',
    type: 'APM + Logs',
    status: 'not configured',
    endpoint: '—',
    lastSync: '—',
  },
]

const alertingChannels = [
  { name: '#ops-alerts', platform: 'Slack', severity: 'critical', status: 'active' },
  { name: '#engineering', platform: 'Slack', severity: 'warning', status: 'active' },
  { name: 'ops-team@acme.com', platform: 'Email', severity: 'critical', status: 'active' },
  { name: 'PagerDuty — Ops', platform: 'PagerDuty', severity: 'critical', status: 'active' },
  { name: '#dev-alerts', platform: 'Discord', severity: 'info', status: 'disabled' },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'active':
    case 'connected':
      return 'success' as const
    case 'disabled':
    case 'not configured':
      return 'default' as const
    default:
      return 'default' as const
  }
}

function ConfigureIntegrations() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-sm text-slate-400 mt-1">
            Webhooks, SIEM, and alerting channel configurations
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Webhooks */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Webhook className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Webhooks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">URL</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Events</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Last Triggered</th>
                </tr>
              </thead>
              <tbody>
                {webhooks.map((wh) => (
                  <tr key={wh.name} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{wh.name}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                      <ExternalLink className="w-3 h-3 inline mr-1" />
                      {wh.url}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {wh.events.map((evt) => (
                          <Badge key={evt} variant="outline" className="text-xs">{evt}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(wh.status)}>{wh.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {wh.lastTriggered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* SIEM Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-base">SIEM Integrations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Provider</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Endpoint</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Last Sync</th>
                </tr>
              </thead>
              <tbody>
                {siemIntegrations.map((siem) => (
                  <tr key={siem.name} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white font-medium">{siem.name}</td>
                    <td className="px-4 py-3 text-slate-300">{siem.type}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{siem.endpoint}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(siem.status)}>{siem.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{siem.lastSync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Alerting Channels */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Alerting Channels</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Channel</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Platform</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Severity</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {alertingChannels.map((ch) => (
                  <tr key={ch.name} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{ch.name}</td>
                    <td className="px-4 py-3 text-slate-300">{ch.platform}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          ch.severity === 'critical'
                            ? 'danger'
                            : ch.severity === 'warning'
                              ? 'warning'
                              : 'info'
                        }
                      >
                        {ch.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(ch.status)}>{ch.status}</Badge>
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
