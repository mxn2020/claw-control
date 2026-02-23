import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Puzzle, Download, Trash2, Shield } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { useToast } from '#/components/ui/toast'

export const Route = createFileRoute('/_dashboard/agents/$agentId/skills/installed')({ component: AgentSkillsInstalled })

function AgentSkillsInstalled() {
  const skills = useQuery(api.platform.list, {})
  const installed = (skills ?? []).filter((s: { isEnabled: boolean }) => s.isEnabled)
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Installed Skills</h1>
          <p className="text-sm text-slate-400 mt-1">{installed.length} skill{installed.length !== 1 ? 's' : ''} active on this agent</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => toast('Browse the Skills Marketplace to install new skills', 'info')}>
          <Download className="w-4 h-4 mr-1.5" />
          Install from Marketplace
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Puzzle className="w-4 h-4 text-cyan-400" />
            Active Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {installed.length === 0 && (
              <div className="text-center py-8">
                <Puzzle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No skills installed. Visit the marketplace to add capabilities.</p>
              </div>
            )}
            {installed.map((s: { _id: string; name: string; version: string; description?: string }) => (
              <div key={s._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Puzzle className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-white">{s.name}</span>
                    <p className="text-xs text-slate-400 truncate">{s.description ?? 'No description'}</p>
                    <p className="text-xs text-slate-500 mt-0.5">v{s.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="success">installed</Badge>
                  <button
                    title="View permissions"
                    className="text-slate-500 hover:text-cyan-400 transition-colors"
                    onClick={() => toast(`${s.name} permissions: file_read, http_request`, 'info')}
                  >
                    <Shield className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="Uninstall skill"
                    className="text-slate-500 hover:text-red-400 transition-colors"
                    onClick={() => toast(`Uninstall ${s.name}: requires VPS agent connectivity`, 'info')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
