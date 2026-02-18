import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ArrowLeft, Plus } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/new')({
  component: NewAgent,
})

const mockInstances = [
  { id: 'inst_1', name: 'Production Gateway' },
  { id: 'inst_2', name: 'Staging Server' },
  { id: 'inst_3', name: 'Dev Instance' },
]

const mockModels = [
  'gpt-4o',
  'gpt-4o-mini',
  'claude-3.5-sonnet',
  'claude-3-haiku',
]

const mockBlueprints = [
  { id: 'bp_1', name: 'Customer Support' },
  { id: 'bp_2', name: 'Research Assistant' },
  { id: 'bp_3', name: 'Code Reviewer' },
]

function NewAgent() {
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
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            {/* Agent Name */}
            <div className="space-y-1.5">
              <label htmlFor="agent-name" className="block text-sm font-medium text-slate-300">
                Agent Name
              </label>
              <input
                id="agent-name"
                type="text"
                placeholder="e.g. support-bot"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select an instance…
                </option>
                {mockInstances.map((inst) => (
                  <option key={inst.id} value={inst.id}>
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select a model…
                </option>
                {mockModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Blueprint Selector (optional) */}
            <div className="space-y-1.5">
              <label htmlFor="blueprint-select" className="block text-sm font-medium text-slate-300">
                Blueprint{' '}
                <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <select
                id="blueprint-select"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                defaultValue=""
              >
                <option value="">None</option>
                {mockBlueprints.map((bp) => (
                  <option key={bp.id} value={bp.id}>
                    {bp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Agent
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
