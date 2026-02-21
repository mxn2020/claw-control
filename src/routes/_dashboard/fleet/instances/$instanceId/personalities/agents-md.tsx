import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/personalities/agents-md')({ component: InstancePersonalityAgentsMd })
function InstancePersonalityAgentsMd() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">AGENTS.md</h1><p className="text-sm text-slate-400 mt-1">Multi-agent orchestration config</p></div>
      <Card><CardHeader><CardTitle>AGENTS.md Editor</CardTitle></CardHeader><CardContent>
        <textarea className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 min-h-[400px] font-mono" placeholder="# AGENTS.md content loaded from VPS..." readOnly />
        <p className="text-xs text-slate-500 mt-2">Content stored on VPS instance. Connect to edit.</p>
      </CardContent></Card>
    </div>
  )
}
