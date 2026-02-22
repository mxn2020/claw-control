import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { Clock, Sun, Moon, Cpu } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/schedule')({ component: AgentModelSchedule })

function AgentModelSchedule() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })

  if (!agent) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Model Schedule</h1>
        <p className="text-sm text-slate-400 mt-1">Time-based model switching for {agent.name}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-sm">Current Model</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant="success">Active</Badge>
            <span className="text-sm font-mono text-cyan-400">{agent.model ?? 'Not configured'}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <CardTitle className="text-sm">Peak Hours (9am – 6pm)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-slate-800 rounded-lg bg-slate-900/50">
              <div>
                <p className="text-sm font-medium text-white">Primary Model</p>
                <p className="text-xs text-slate-400 font-mono mt-1">{agent.model || 'gpt-4o'}</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-xs text-slate-500">Uses the configured primary model during business hours for maximum quality.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <CardTitle className="text-sm">Off-Peak Hours (6pm – 9am)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-slate-800 rounded-lg bg-slate-900/50">
              <div>
                <p className="text-sm font-medium text-white">Fallback Model</p>
                <p className="text-xs text-slate-400 font-mono mt-1">gpt-4o-mini</p>
              </div>
              <Badge variant="default">Scheduled</Badge>
            </div>
            <p className="text-xs text-slate-500">Automatically switches to a cost-optimized model during off-peak hours.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <CardTitle className="text-sm">Schedule Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Model scheduling allows automatic switching between model tiers based on time-of-day rules.
            This helps optimize costs by using cheaper models during low-traffic periods while maintaining
            quality during peak hours. Schedule rules are enforced on the VPS instance.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
