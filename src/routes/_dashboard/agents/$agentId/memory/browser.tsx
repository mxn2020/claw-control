import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/browser')({ component: AgentMemoryBrowser })
function AgentMemoryBrowser() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Memory Browser</h1><p className="text-sm text-slate-400 mt-1">Browse and search the agent's memory store</p></div>
      <Card><CardHeader><CardTitle>Memory Contents</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Memory browser requires VPS agent connectivity. Connect a running instance to browse memory entries, search by key, and view memory contents.</p></CardContent></Card>
    </div>
  )
}
