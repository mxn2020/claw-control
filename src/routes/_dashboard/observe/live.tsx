import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Radio,
  Power,
  Bot,
  Wrench,
  MessageSquare,
  UserPlus,
  AlertTriangle,
  Filter,
  Gauge,
  DollarSign,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/observe/live')({
  component: ObserveLive,
})

const mockEvents = [
  {
    id: 1,
    type: 'agent.started',
    message: 'Support Agent started on Production Gateway',
    instance: 'gw-prod-01',
    agent: 'support-agent',
    channel: 'webchat',
    time: '2s ago',
    icon: <Bot className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 2,
    type: 'tool.call',
    message: 'web-search invoked by Research Agent',
    instance: 'gw-prod-02',
    agent: 'research-agent',
    channel: 'api',
    time: '5s ago',
    icon: <Wrench className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 3,
    type: 'session.created',
    message: 'New session "Billing inquiry" via WebChat',
    instance: 'gw-prod-01',
    agent: 'billing-agent',
    channel: 'webchat',
    time: '12s ago',
    icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 4,
    type: 'user.joined',
    message: 'User connected to Discord channel #support',
    instance: 'gw-prod-03',
    agent: 'support-agent',
    channel: 'discord',
    time: '18s ago',
    icon: <UserPlus className="w-4 h-4 text-purple-400" />,
  },
  {
    id: 5,
    type: 'agent.error',
    message: 'QA Tester rate limit exceeded on staging',
    instance: 'gw-staging-01',
    agent: 'qa-tester',
    channel: 'slack',
    time: '25s ago',
    icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 6,
    type: 'swarm.scaled',
    message: 'Swarm "cs-team" scaled to 5 agents',
    instance: 'gw-prod-01',
    agent: 'swarm-orchestrator',
    channel: 'internal',
    time: '31s ago',
    icon: <Bot className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 7,
    type: 'tool.call',
    message: 'db-query executed by Analytics Agent',
    instance: 'gw-prod-02',
    agent: 'analytics-agent',
    channel: 'api',
    time: '42s ago',
    icon: <Wrench className="w-4 h-4 text-cyan-400" />,
  },
]

const filters = [
  { label: 'Instance', options: ['gw-prod-01', 'gw-prod-02', 'gw-staging-01'] },
  { label: 'Agent', options: ['support-agent', 'research-agent', 'qa-tester'] },
  { label: 'Swarm', options: ['cs-team', 'research-pool', 'ops-fleet'] },
  { label: 'Channel', options: ['webchat', 'discord', 'slack', 'api'] },
]

function ObserveLive() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Event Stream</h1>
          <p className="text-sm text-slate-400 mt-1">
            Mission control — real-time event feed across all instances
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors border-2 border-red-500 shadow-lg shadow-red-900/30">
          <Power className="w-5 h-5" />
          KILL SWITCH
        </button>
      </div>

      {/* Spend Velocity Meter */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <Gauge className="w-6 h-6 text-cyan-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">
                  Spend Velocity
                </span>
                <span className="text-sm font-bold text-cyan-400">
                  $2.14/hr
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: '42%' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">$0</span>
                <span className="text-xs text-slate-500">Budget: $5.00/hr</span>
              </div>
            </div>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-slate-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            {filters.map((filter) => (
              <select
                key={filter.label}
                className="bg-slate-700 border border-slate-600 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="">{filter.label}: All</option>
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ))}
            <Button variant="ghost" size="sm">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Stream */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <CardTitle className="text-base">Live Feed</CardTitle>
            <Badge variant="success" className="ml-2">
              streaming
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0"
              >
                {event.icon}
                <Badge variant="outline" className="text-xs shrink-0">
                  {event.type}
                </Badge>
                <span className="text-sm text-slate-300 flex-1">
                  {event.message}
                </span>
                <Badge variant="info" className="text-xs shrink-0">
                  {event.instance}
                </Badge>
                <span className="text-xs text-slate-500 shrink-0">
                  {event.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
