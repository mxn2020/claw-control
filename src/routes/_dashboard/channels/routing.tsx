import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Route as RouteIcon,
  Plus,
  ArrowRight,
  Play,
  Bot,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/channels/routing')({
  component: ChannelsRouting,
})

const routingRules = [
  {
    id: 1,
    priority: 1,
    source: 'Discord — #support',
    target: 'support-agent',
    conditions: 'Contains "help" or "issue"',
    status: 'active',
  },
  {
    id: 2,
    priority: 2,
    source: 'Slack — #engineering',
    target: 'code-review-bot',
    conditions: 'Contains PR link or "review"',
    status: 'active',
  },
  {
    id: 3,
    priority: 3,
    source: 'WebChat — Customer Portal',
    target: 'support-agent',
    conditions: 'All messages (fallback)',
    status: 'active',
  },
  {
    id: 4,
    priority: 4,
    source: 'GitHub — Pull Requests',
    target: 'code-review-bot',
    conditions: 'Event type: pull_request',
    status: 'active',
  },
  {
    id: 5,
    priority: 5,
    source: 'Email — support@acme.com',
    target: 'support-agent',
    conditions: 'Subject matches "billing|account|refund"',
    status: 'active',
  },
  {
    id: 6,
    priority: 6,
    source: 'Slack — #ops-alerts',
    target: 'ops-agent',
    conditions: 'Sender is PagerDuty or Datadog',
    status: 'paused',
  },
]

function ChannelsRouting() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Routing Rules</h1>
          <p className="text-sm text-slate-400 mt-1">
            Define how messages are routed from channels to agents
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Rule
        </Button>
      </div>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <RouteIcon className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Active Rules</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Priority</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Source Channel</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider" />
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Target Agent</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Conditions</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {routingRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-slate-700/50 last:border-0">
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">#{rule.priority}</Badge>
                    </td>
                    <td className="px-4 py-3 text-white">{rule.source}</td>
                    <td className="px-4 py-3">
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="info" className="text-xs">
                        <Bot className="w-3 h-3 mr-1" />
                        {rule.target}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{rule.conditions}</td>
                    <td className="px-4 py-3">
                      <Badge variant={rule.status === 'active' ? 'success' : 'warning'}>
                        {rule.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Message Tester */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-base">Message Tester</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 mb-4">
            Enter a mock message to see which agent would handle it.
          </p>
          <div className="flex gap-3">
            <Input placeholder="Type a test message… e.g. 'I need help with my billing'" className="flex-1" />
            <Button variant="default" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Test
            </Button>
          </div>
          <div className="mt-4 p-4 rounded-lg border border-dashed border-slate-700 bg-slate-900">
            <p className="text-sm text-slate-500">
              Result will appear here — showing matched rule, target agent, and confidence score.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
