import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ArrowLeft, Save, CheckCircle, Cpu, Settings } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/')({ component: AgentModelIndex })

const AVAILABLE_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'Anthropic' },
  { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', provider: 'Anthropic' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google' },
]

function AgentModelIndex() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as Id<"agents"> })
  const updateAgent = useMutation(api.agents.update)
  const [selectedModel, setSelectedModel] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (agent?.model) setSelectedModel(agent.model)
  }, [agent?.model])

  if (!agent) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  async function handleSave() {
    try {
      await updateAgent({ id: agentId as Id<"agents">, model: selectedModel })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save model:', err)
    }
  }

  return (
    <div className="space-y-6">
      <Link to="/agents/$agentId" params={{ agentId }} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" />Back to Agent</Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Model Configuration</h1>
          <p className="text-sm text-slate-400 mt-1">Select and configure the LLM model for {agent.name}</p>
        </div>
        <Button size="sm" onClick={handleSave} disabled={selectedModel === agent.model}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save Model'}
        </Button>
      </div>

      <Card className="border-cyan-500/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-sm">Current Model</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant="success">Active</Badge>
            <span className="text-sm font-mono text-cyan-400">{agent.model ?? 'Not configured'}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" />
            <CardTitle className="text-sm">Select Model</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AVAILABLE_MODELS.map(model => (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedModel(model.id)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all text-left ${selectedModel === model.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
              >
                <div>
                  <p className={`text-sm font-medium ${selectedModel === model.id ? 'text-cyan-400' : 'text-white'}`}>{model.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{model.provider}</p>
                </div>
                {selectedModel === model.id && <Badge variant="info">Selected</Badge>}
                {agent.model === model.id && selectedModel !== model.id && <Badge variant="outline">Current</Badge>}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
