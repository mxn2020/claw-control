import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { useToast } from '#/components/ui/toast'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { Shield, Save, CheckCircle, ToggleLeft, ToggleRight } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/tools/allowed')({ component: AgentToolsAllowed })

const TOOL_CATEGORIES = [
  { id: 'exec', label: 'Shell Exec', desc: 'Run shell commands on the server', risk: 'high' },
  { id: 'file_read', label: 'File Read', desc: 'Read files from the filesystem', risk: 'low' },
  { id: 'file_write', label: 'File Write', desc: 'Write and modify files', risk: 'medium' },
  { id: 'file_delete', label: 'File Delete', desc: 'Delete files from the filesystem', risk: 'high' },
  { id: 'browser', label: 'Browser', desc: 'Automated web browsing and scraping', risk: 'medium' },
  { id: 'http', label: 'HTTP Requests', desc: 'Make outbound HTTP/API calls', risk: 'medium' },
  { id: 'memory_read', label: 'Memory Read', desc: 'Read from the memory store', risk: 'low' },
  { id: 'memory_write', label: 'Memory Write', desc: 'Write to the memory store', risk: 'low' },
  { id: 'email_send', label: 'Email Send', desc: 'Send emails on behalf of the user', risk: 'high' },
  { id: 'canvas_push', label: 'Canvas Push', desc: 'Render interactive UI components', risk: 'low' },
  { id: 'cron_manage', label: 'Cron Management', desc: 'Create and manage scheduled jobs', risk: 'medium' },
  { id: 'approval_bypass', label: 'Approval Bypass', desc: 'Execute without human approval', risk: 'high' },
]

const RISK_COLORS: Record<string, string> = {
  low: 'text-emerald-400',
  medium: 'text-amber-400',
  high: 'text-red-400',
}

function AgentToolsAllowed() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })
  const updatePersonality = useMutation(api.agents.updatePersonality)
  const { toast } = useToast()

  // Parse existing tool config from agent personality (stored as JSON in toolsConfig)
  const existingConfig = (agent?.personality as Record<string, unknown>)?.toolsConfig as Record<string, boolean> | undefined
  const [config, setConfig] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {}
    TOOL_CATEGORIES.forEach(t => { defaults[t.id] = true })
    // high risk tools default to off
    defaults['exec'] = false
    defaults['file_delete'] = false
    defaults['email_send'] = false
    defaults['approval_bypass'] = false
    return { ...defaults, ...existingConfig }
  })
  const [isSaving, setIsSaving] = useState(false)

  function toggleTool(id: string) {
    setConfig(prev => ({ ...prev, [id]: !prev[id] }))
  }

  async function handleSave() {
    if (!agent) return
    setIsSaving(true)
    try {
      const existingPersonality = (agent.personality ?? {}) as Record<string, unknown>
      await updatePersonality({
        id: agent._id,
        personality: {
          ...existingPersonality,
          toolsConfig: config,
        } as { soulMd?: string; agentsMd?: string; userMd?: string },
      })
      toast('Tool policy saved', 'success')
    } catch (err) {
      toast('Failed to save tool policy', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const allowedCount = Object.values(config).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tool Policy</h1>
          <p className="text-sm text-slate-400 mt-1">
            {agent?.name ?? 'Agent'} — {allowedCount} of {TOOL_CATEGORIES.length} tool categories allowed
          </p>
        </div>
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {isSaving ? 'Saving…' : 'Save Policy'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Tool Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {TOOL_CATEGORIES.map(tool => (
              <div
                key={tool.id}
                className={`flex items-center justify-between py-3 px-4 rounded-lg border transition-colors ${config[tool.id]
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-slate-700/50 bg-slate-900/30'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => toggleTool(tool.id)} className="flex-shrink-0">
                    {config[tool.id]
                      ? <ToggleRight className="w-6 h-6 text-emerald-400" />
                      : <ToggleLeft className="w-6 h-6 text-slate-500" />}
                  </button>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-white">{tool.label}</span>
                    <p className="text-xs text-slate-400">{tool.desc}</p>
                  </div>
                </div>
                <Badge variant={config[tool.id] ? 'success' : 'default'} className="flex-shrink-0">
                  <span className={`mr-1 ${RISK_COLORS[tool.risk]}`}>●</span>
                  {tool.risk} risk
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
