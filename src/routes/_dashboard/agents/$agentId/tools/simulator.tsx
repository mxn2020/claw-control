import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/tools/simulator')({ component: AgentToolsSimulator })
function AgentToolsSimulator() {
  const skills = useQuery(api.platform.list, {})
  const list = skills ?? []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Tool Simulator</h1><p className="text-sm text-slate-400 mt-1">Test tool invocations in a sandboxed environment</p></div>
      <Card><CardHeader><CardTitle>Select Tool</CardTitle></CardHeader><CardContent>
        <select className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 mb-4">
          <option value="">Choose a tool…</option>
          {list.map(s => <option key={s._id} value={s.name}>{s.name} (v{s.version})</option>)}
        </select>
        <div className="rounded-lg border border-slate-700/50 bg-slate-950 p-4 font-mono text-xs text-slate-400 min-h-[200px]">
          <p className="text-slate-500">Select a tool and provide arguments to simulate execution.</p>
          <p className="text-slate-500 mt-2">Tool simulator requires VPS agent connectivity for live execution.</p>
        </div>
      </CardContent></Card>
    </div>
  )
}
