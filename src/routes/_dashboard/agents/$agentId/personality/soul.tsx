import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/personality/soul')({ component: AgentPersonalitySoul })
function AgentPersonalitySoul() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">SOUL.md</h1><p className="text-sm text-slate-400 mt-1">Core personality definition file</p></div>
      <Card><CardHeader><CardTitle>SOUL.md Editor</CardTitle></CardHeader><CardContent>
        <textarea className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 min-h-[400px] font-mono" placeholder="# SOUL.md content loaded from VPS agent..." readOnly />
        <p className="text-xs text-slate-500 mt-2">SOUL.md content is stored on the VPS instance. Connect a running instance to edit.</p>
      </CardContent></Card>
    </div>
  )
}
