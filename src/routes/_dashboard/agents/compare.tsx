import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { GitCompareArrows, Bot } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/compare')({
  component: AgentCompare,
})

const agents = [
  {
    name: 'support-bot',
    model: 'gpt-4o',
    status: 'active' as const,
    tokensUsed: '2.4M',
    cost: '$48.20',
    sessions: 1_248,
    avgLatency: '1.2s',
    personality: 'Friendly, empathetic, concise. Escalates complex issues quickly.',
    strengths: ['Multi-language', 'Sentiment analysis', 'High throughput'],
    instance: 'prod-gateway-1',
  },
  {
    name: 'sales-assistant',
    model: 'gpt-4o-mini',
    status: 'active' as const,
    tokensUsed: '890K',
    cost: '$12.60',
    sessions: 642,
    avgLatency: '0.8s',
    personality: 'Professional, persuasive, detail-oriented. Focuses on value propositions.',
    strengths: ['Lead scoring', 'CRM sync', 'Low cost'],
    instance: 'prod-gateway-1',
  },
]

const comparisonRows = [
  { label: 'Model', key: 'model' as const },
  { label: 'Status', key: 'status' as const },
  { label: 'Tokens Used', key: 'tokensUsed' as const },
  { label: 'Total Cost', key: 'cost' as const },
  { label: 'Sessions', key: 'sessions' as const },
  { label: 'Avg Latency', key: 'avgLatency' as const },
  { label: 'Instance', key: 'instance' as const },
] satisfies { label: string; key: keyof (typeof agents)[0] }[]

function AgentCompare() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex items-center gap-3">
        <GitCompareArrows className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Compare Agents</h1>
          <p className="text-sm text-slate-400 mt-1">
            Side-by-side comparison of agent performance and configuration
          </p>
        </div>
      </div>

      {/* Agent Headers */}
      <div className="grid grid-cols-[200px_1fr_1fr] gap-4">
        <div />
        {agents.map((agent) => (
          <Card key={agent.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-cyan-400" />
                <div>
                  <CardTitle className="text-base">{agent.name}</CardTitle>
                  <span className="text-xs text-slate-400">{agent.model}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700/50">
            {comparisonRows.map((row) => {
              const valA = String(agents[0][row.key])
              const valB = String(agents[1][row.key])
              const isDiff = valA !== valB

              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[200px_1fr_1fr] gap-4 px-6 py-3"
                >
                  <span className="text-sm font-medium text-slate-400">
                    {row.label}
                  </span>
                  <span
                    className={`text-sm ${isDiff ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}
                  >
                    {row.key === 'status' ? (
                      <Badge
                        variant={
                          valA === 'active' ? 'success' : 'warning'
                        }
                      >
                        {valA}
                      </Badge>
                    ) : (
                      valA
                    )}
                  </span>
                  <span
                    className={`text-sm ${isDiff ? 'text-cyan-300 font-semibold' : 'text-slate-300'}`}
                  >
                    {row.key === 'status' ? (
                      <Badge
                        variant={
                          valB === 'active' ? 'success' : 'warning'
                        }
                      >
                        {valB}
                      </Badge>
                    ) : (
                      valB
                    )}
                  </span>
                </div>
              )
            })}

            {/* Personality */}
            <div className="grid grid-cols-[200px_1fr_1fr] gap-4 px-6 py-3">
              <span className="text-sm font-medium text-slate-400">
                Personality
              </span>
              {agents.map((agent) => (
                <p key={agent.name} className="text-sm text-slate-300">
                  {agent.personality}
                </p>
              ))}
            </div>

            {/* Strengths */}
            <div className="grid grid-cols-[200px_1fr_1fr] gap-4 px-6 py-3">
              <span className="text-sm font-medium text-slate-400">
                Strengths
              </span>
              {agents.map((agent) => (
                <div key={agent.name} className="flex flex-wrap gap-1.5">
                  {agent.strengths.map((s) => (
                    <Badge
                      key={s}
                      className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
