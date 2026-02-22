import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ArrowLeft, Shield, Save, CheckCircle } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/tools/sandbox',
)({
  component: AgentToolsSandbox,
})

type SandboxMode = 'off' | 'on' | 'all'

const modes: { value: SandboxMode; label: string; description: string }[] = [
  { value: 'off', label: 'Off', description: 'No sandboxing — tools run directly on host.' },
  { value: 'on', label: 'On', description: 'High-risk tools isolated in sandbox container.' },
  { value: 'all', label: 'All', description: 'Every tool call runs in isolated sandbox.' },
]

function AgentToolsSandbox() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })
  const updateAgent = useMutation(api.agents.update)
  const [selectedMode, setSelectedMode] = useState<SandboxMode>('on')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (agent?.toolsConfig?.sandboxMode !== undefined) {
      setSelectedMode(agent.toolsConfig.sandboxMode ? 'on' : 'off')
    }
  }, [agent?.toolsConfig?.sandboxMode])

  async function handleSave() {
    try {
      await updateAgent({
        id: agentId as Id<"agents">,
        toolsConfig: {
          ...agent?.toolsConfig,
          sandboxMode: selectedMode !== 'off',
        },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save sandbox:', err)
    }
  }

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/tools"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sandbox Mode</h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure tool execution isolation for {agent?.name ?? 'agent'}
          </p>
        </div>
        <Button size="sm" onClick={handleSave}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle>Sandbox Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {modes.map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => setSelectedMode(mode.value)}
                className={`w-full flex items-center justify-between rounded-lg border p-4 text-left transition-colors ${selectedMode === mode.value
                    ? 'border-cyan-500/50 bg-cyan-500/10'
                    : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600'
                  }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{mode.label}</span>
                    {selectedMode === mode.value && (
                      <Badge variant="success">selected</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{mode.description}</p>
                </div>
                <div
                  className={`h-4 w-4 rounded-full border-2 ${selectedMode === mode.value
                      ? 'border-cyan-500 bg-cyan-500'
                      : 'border-slate-600 bg-transparent'
                    }`}
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
