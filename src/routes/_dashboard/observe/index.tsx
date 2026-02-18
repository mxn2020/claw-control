import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Activity,
  Bot,
  MessageSquare,
  DollarSign,
  Power,
  Wrench,
  UserPlus,
  AlertTriangle,
  Radio,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/observe/')({
  component: ObserveDashboard,
})

const mockEvents = [
  {
    id: 1,
    type: 'agent.started',
    message: 'Support Agent started on Production Gateway',
    time: '2s ago',
    icon: <Bot className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 2,
    type: 'tool.call',
    message: 'web-search invoked by Research Agent',
    time: '8s ago',
    icon: <Wrench className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 3,
    type: 'session.created',
    message: 'New session "Billing inquiry" via WebChat',
    time: '15s ago',
    icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 4,
    type: 'user.joined',
    message: 'User connected to Discord channel',
    time: '32s ago',
    icon: <UserPlus className="w-4 h-4 text-purple-400" />,
  },
  {
    id: 5,
    type: 'agent.error',
    message: 'QA Tester rate limit exceeded',
    time: '1m ago',
    icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  },
]

const tabs = [
  { label: 'Live', active: true },
  { label: 'Traces', active: false },
  { label: 'Logs', active: false },
  { label: 'Cost', active: false },
  { label: 'Analytics', active: false },
]

function ObserveDashboard() {
  const stats = [
    {
      label: 'Events / min',
      value: '247',
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
    },
    {
      label: 'Active Agents',
      value: '4',
      icon: <Bot className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: 'Active Sessions',
      value: '3',
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
    },
    {
      label: 'Spend Rate',
      value: '$2.14/hr',
      icon: <DollarSign className="w-5 h-5 text-amber-400" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Observe</h1>
          <p className="text-sm text-slate-400 mt-1">
            Mission control — live telemetry and event stream
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors border-2 border-red-500 shadow-lg shadow-red-900/30">
          <Power className="w-5 h-5" />
          KILL SWITCH
        </button>
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
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

      {/* Live Event Stream */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <CardTitle className="text-base">Live Event Stream</CardTitle>
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
