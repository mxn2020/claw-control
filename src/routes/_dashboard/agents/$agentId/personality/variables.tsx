import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { Variable, FileText } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/personality/variables')({ component: AgentPersonalityVariables })

function AgentPersonalityVariables() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })

  if (!agent) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  // Extract template variables from personality content
  const extractVars = (content: string | undefined): string[] => {
    if (!content) return []
    const matches = content.match(/\{\{([^}]+)\}\}/g) || []
    return [...new Set(matches.map(m => m.replace(/\{\{|\}\}/g, '').trim()))]
  }

  const soulVars = extractVars(agent.personality?.soulMd)
  const agentsVars = extractVars(agent.personality?.agentsMd)
  const userVars = extractVars(agent.personality?.userMd)
  const allVars = [...new Set([...soulVars, ...agentsVars, ...userVars])]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Template Variables</h1>
        <p className="text-sm text-slate-400 mt-1">Variables detected in personality files for {agent.name}</p>
      </div>

      {allVars.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Variable className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm">Detected Variables ({allVars.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {allVars.map(v => {
                const sources: string[] = []
                if (soulVars.includes(v)) sources.push('SOUL.md')
                if (agentsVars.includes(v)) sources.push('AGENTS.md')
                if (userVars.includes(v)) sources.push('USER.md')

                return (
                  <div key={v} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <code className="text-sm text-cyan-400 font-mono">{`{{${v}}}`}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      {sources.map(s => (
                        <Badge key={s} variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Variable className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No template variables found in personality files.</p>
            <p className="text-xs text-slate-500 mt-2">
              Use <code className="text-cyan-400">{`{{variable_name}}`}</code> syntax in SOUL.md, AGENTS.md, or USER.md to create template variables.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
