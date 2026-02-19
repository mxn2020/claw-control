import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ArrowLeft, Server, Plus } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/fleet/instances/new')({
  component: NewInstancePage,
})

const PROVIDERS = ['Self-hosted', 'AWS', 'GCP', 'Azure', 'DigitalOcean', 'Hetzner', 'Oracle', 'Other']
const REGIONS = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-northeast-1', 'local']

function NewInstancePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [provider, setProvider] = useState('Self-hosted')
  const [region, setRegion] = useState('local')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Instance name is required.'); return }
    setIsSubmitting(true)
    setError(null)
    try {
      // Note: orgId would come from user context in full implementation
      // For now navigate back and show success
      await navigate({ to: '/fleet' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create instance.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => navigate({ to: '/fleet' })} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Register Instance</h1>
          <p className="text-sm text-slate-400 mt-0.5">Connect an existing OpenClaw instance to your fleet</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <CardTitle>Instance Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="inst-name" className="block text-sm font-medium text-slate-300">Name</label>
              <Input
                id="inst-name"
                placeholder="Production Gateway"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Provider</label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                >
                  {PROVIDERS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Region</label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {REGIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-slate-300">
              <p className="font-medium text-cyan-400 mb-1.5">Connection</p>
              <p className="text-xs text-slate-400">
                Your OpenClaw instance connects to ClawControl by running an outbound agent tunnel — no inbound ports required.
                After creating this record, you'll receive a registration token to paste into your OpenClaw config.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/fleet' })}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Plus className="w-4 h-4 mr-1.5" />
                {isSubmitting ? 'Registering…' : 'Register Instance'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
