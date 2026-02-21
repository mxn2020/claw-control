import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/inject')({ component: AgentMemoryInject })
function AgentMemoryInject() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Inject Memory</h1><p className="text-sm text-slate-400 mt-1">Inject knowledge directly into agent memory</p></div>
      <Card><CardHeader><CardTitle>Memory Injection</CardTitle></CardHeader><CardContent>
        <textarea className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 min-h-[200px] font-mono" placeholder="Enter memory content to inject..." />
        <div className="mt-3 flex justify-end">
          <button type="button" className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">Inject</button>
        </div>
        <p className="text-xs text-slate-500 mt-2">Memory injection requires VPS agent connectivity.</p>
      </CardContent></Card>
    </div>
  )
}
