import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ArrowLeft, Plus } from 'lucide-react'
import { useInstances } from '#/lib/dataHooks'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/agents/new')({
  component: NewAgent,
})

const defaultModels = [
  'gpt-4o',
  'gpt-4o-mini',
  'claude-3.5-sonnet',
  'claude-3-haiku',
]

function NewAgent() {
  const instances = useInstances() ?? []
  const blueprints = useQuery(api.blueprints.list, {})
  const blueprintList = blueprints ?? []
  const createAgent = useMutation(api.agents.create)
  const { user } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [instanceId, setInstanceId] = useState('')
  const [model, setModel] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !instanceId || !user?.orgId) return

    setSubmitting(true)
    try {
      await createAgent({
        orgId: user.orgId as Id<"organizations">,
        instanceId: instanceId as Id<"instances">,
        name: name.trim(),
        model: model || undefined,
      })
      navigate({ to: '/agents' })
    } catch (err) {
      console.error('Failed to create agent:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/agents"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Create New Agent</h1>
        <p className="text-sm text-slate-400 mt-1">
          Deploy a new agent to one of your instances
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Agent Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Agent Name */}
            <div className="space-y-1.5">
              <label htmlFor="agent-name" className="block text-sm font-medium text-slate-300">
                Agent Name
              </label>
              <input
                id="agent-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. support-bot"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Target Instance */}
            <div className="space-y-1.5">
              <label htmlFor="instance-select" className="block text-sm font-medium text-slate-300">
                Target Instance
              </label>
              <select
                id="instance-select"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={instanceId}
                onChange={(e) => setInstanceId(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an instance…
                </option>
                {instances.map((inst) => (
                  <option key={inst._id} value={inst._id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Selector */}
            <div className="space-y-1.5">
              <label htmlFor="model-select" className="block text-sm font-medium text-slate-300">
                Model
              </label>
              <select
                id="model-select"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">Select a model…</option>
                {defaultModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Blueprint Selector (optional) */}
            <div className="space-y-1.5">
              <label htmlFor="blueprint-select" className="block text-sm font-medium text-slate-300">
                Blueprint <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <select
                id="blueprint-select"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                defaultValue=""
              >
                <option value="">None</option>
                {blueprintList.map((bp: any) => (
                  <option key={bp._id} value={bp._id}>{bp.name}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !name.trim() || !instanceId}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {submitting ? 'Creating…' : 'Create Agent'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
