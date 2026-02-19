import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Bot,
  Activity,
  Clock,
  Coins,
  Hash,
  Wrench,
  MessageSquare,
  Brain,
  Pause,
  Play,
} from 'lucide-react'
import { useAgents } from '#/lib/dataHooks'
import { useDataContext } from '#/lib/dataContext'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/agents/$agentId/')({
  component: AgentDetail,
})

const mockSoulSnippet = `You are a helpful customer support agent.
You are empathetic, concise, and solution-oriented.
Always greet the user warmly and confirm understanding before resolving issues.`

const mockRecentSessions = [
  { id: 'sess_901', channel: 'Discord', messages: 14, duration: '8m', time: '3 min ago' },
  { id: 'sess_900', channel: 'Slack', messages: 6, duration: '3m', time: '22 min ago' },
  { id: 'sess_899', channel: 'Web Chat', messages: 21, duration: '12m', time: '1 hour ago' },
  { id: 'sess_898', channel: 'Discord', messages: 9, duration: '5m', time: '2 hours ago' },
]

const mockTools = [
  { name: 'search_docs', enabled: true },
  { name: 'create_ticket', enabled: true },
  { name: 'escalate_human', enabled: true },
  { name: 'query_database', enabled: false },
]

const mockChannels = [
  { name: 'Discord', bound: true },
  { name: 'Slack', bound: true },
  { name: 'Web Chat', bound: true },
  { name: 'Email', bound: false },
]

const tabs = [
  'Overview',
  'Personality',
  'Tools',
  'Skills',
  'Memory',
  'Sessions',
  'Model',
  'Observe',
  'Security',
]

// Connected variant — useMutation is safe here (ConvexProvider is guaranteed)
function AgentStatusToggle({ agentId, status }: { agentId: string; status: string }) {
  const updateStatus = useMutation(api.agents.updateStatus)

  const toggle = async () => {
    const newStatus = status === 'active' ? 'paused' : 'active'
    await updateStatus({
      id: agentId as Id<'agents'>,
      status: newStatus,
    })
  }

  return (
    <Button size="sm" variant="outline" className="gap-1.5" onClick={toggle}>
      {status === 'active' ? (
        <><Pause size={14} /> Pause</>
      ) : (
        <><Play size={14} /> Resume</>
      )}
    </Button>
  )
}

function AgentDetail() {
  const { agentId } = Route.useParams()
  const agents = useAgents()
  const ctx = useDataContext()

  const agent = agents.find((a) => a.id === agentId)
  const agentName = agent?.name ?? 'Agent'
  const agentStatus = agent?.status ?? 'idle'
  const agentModel = agent?.model ?? '—'
  const agentSessionCount = agent?.sessionCount ?? 0
  const agentTotalTokens = agent?.totalTokens ?? 0
  const agentTotalCost = agent?.totalCost ?? 0

  const stats = [
    { label: 'Sessions', value: agentSessionCount, icon: <Hash className="w-4 h-4 text-cyan-400" /> },
    {
      label: 'Total Tokens',
      value: agentTotalTokens >= 1_000_000
        ? `${(agentTotalTokens / 1_000_000).toFixed(1)}M`
        : `${(agentTotalTokens / 1_000).toFixed(1)}K`,
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: 'Total Cost',
      value: `$${agentTotalCost.toFixed(2)}`,
      icon: <Coins className="w-4 h-4 text-cyan-400" />,
    },
    { label: 'Uptime', value: '—', icon: <Clock className="w-4 h-4 text-cyan-400" /> },
  ]

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/agents"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Agent Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white">{agentName}</h1>
          <Badge variant={agentStatus === 'active' ? 'success' : 'warning'}>
            {agentStatus}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span>{agentModel}</span>
          {ctx && (agentStatus === 'active' || agentStatus === 'paused') && (
            <AgentStatusToggle agentId={agentId} status={agentStatus} />
          )}
        </div>
      </div>

      {/* Agent Meta */}
      <div className="text-sm text-slate-400">
        ID: {agentId}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-slate-700 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={
              i === 0
                ? 'px-4 py-2.5 text-sm font-medium text-cyan-400 border-b-2 border-cyan-400 whitespace-nowrap'
                : 'px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-500 transition-colors whitespace-nowrap'
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      <div className="space-y-6">
        {/* Stats Row */}
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
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personality Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <CardTitle>Personality (SOUL.md)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-slate-300 whitespace-pre-wrap bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                {mockSoulSnippet}
              </pre>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <CardTitle>Recent Sessions</CardTitle>
                </div>
                <Badge variant="info">{mockRecentSessions.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{session.id}</div>
                      <div className="text-xs text-slate-400">
                        {session.channel} · {session.messages} msgs · {session.duration}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{session.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tool Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <CardTitle>Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                  >
                    <span className="text-sm font-mono text-slate-300">{tool.name}</span>
                    <Badge variant={tool.enabled ? 'success' : 'default'}>
                      {tool.enabled ? 'enabled' : 'disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Channel Bindings */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Bindings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockChannels.map((channel) => (
                  <div
                    key={channel.name}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                  >
                    <span className="text-sm text-slate-300">{channel.name}</span>
                    <Badge variant={channel.bound ? 'success' : 'default'}>
                      {channel.bound ? 'bound' : 'unbound'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
