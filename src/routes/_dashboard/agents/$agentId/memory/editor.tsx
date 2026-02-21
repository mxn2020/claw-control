import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/editor')({ component: AgentMemoryEditor })
function AgentMemoryEditor() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Memory Editor</h1><p className="text-sm text-slate-400 mt-1">Edit memory entries directly</p></div>
      <Card><CardHeader><CardTitle>Editor</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Memory editor requires VPS agent connectivity. Connect a running instance to create, edit, and delete memory entries.</p></CardContent></Card>
    </div>
  )
}
