import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'
import { Cpu, Save, CheckCircle, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/config/providers')({ component: InstanceConfigProviders })

const AVAILABLE_PROVIDERS = ['openai', 'anthropic', 'google', 'mistral', 'groq', 'ollama', 'azure-openai']

function InstanceConfigProviders() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const updateInstance = useMutation(api.instances.update)
  const [providers, setProviders] = useState<string[]>([])
  const [defaultModel, setDefaultModel] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (instance?.config) {
      setProviders(instance.config.providers ?? [])
      setDefaultModel(instance.config.defaultModel ?? '')
    }
  }, [instance?.config])

  if (!instance) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
  }

  async function handleSave() {
    try {
      await updateInstance({
        id: instance!._id,
        config: { providers, defaultModel: defaultModel || undefined, sandboxMode: instance!.config?.sandboxMode },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save:', err)
    }
  }

  function toggleProvider(p: string) {
    setProviders(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">LLM Providers</h1>
          <p className="text-sm text-slate-400 mt-1">Configure which LLM providers are available on {instance.name}</p>
        </div>
        <Button size="sm" onClick={handleSave}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save'}
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" />Available Providers</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AVAILABLE_PROVIDERS.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => toggleProvider(p)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${providers.includes(p) ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
              >
                <span className={`text-sm font-medium ${providers.includes(p) ? 'text-emerald-400' : 'text-white'}`}>{p}</span>
                {providers.includes(p) ? <Badge variant="success">enabled</Badge> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Default Model</CardTitle></CardHeader>
        <CardContent>
          <input
            type="text"
            value={defaultModel}
            onChange={(e) => setDefaultModel(e.target.value)}
            placeholder="e.g., gpt-4o, claude-sonnet-4-20250514"
            className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-2">The default model used when agents on this instance don't specify their own.</p>
        </CardContent>
      </Card>
    </div>
  )
}
