import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/agents/$agentId/personality/user-md')({ component: AgentPersonalityUserMd })
function AgentPersonalityUserMd() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">USER.md</h1><p className="text-sm text-slate-400 mt-1">User-facing personality configuration</p></div>
      <Card><CardHeader><CardTitle>USER.md Editor</CardTitle></CardHeader><CardContent>
        <textarea className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 min-h-[400px] font-mono" placeholder="# USER.md content loaded from VPS agent..." readOnly />
        <p className="text-xs text-slate-500 mt-2">USER.md content is stored on the VPS instance. Connect a running instance to edit.</p>
      </CardContent></Card>
    </div>
  )
}
