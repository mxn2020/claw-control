import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useToast } from '#/components/ui/toast'
import type { Id } from '../../../../../convex/_generated/dataModel'
import { ArrowLeft, Server, Plus, Cloud, HardDrive, Copy, CheckCircle, Terminal, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/fleet/instances/new')({
  component: NewInstancePage,
})

const PROVIDERS = ['Self-hosted', 'AWS', 'GCP', 'Azure', 'DigitalOcean', 'Hetzner', 'Oracle', 'Other']
const REGIONS = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-northeast-1', 'local']

type ProvisionMode = 'select' | 'byo' | 'cloud'

function NewInstancePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const createInstance = useMutation(api.instances.create)

  const [mode, setMode] = useState<ProvisionMode>('select')
  const [name, setName] = useState('')
  const [provider, setProvider] = useState('Self-hosted')
  const [region, setRegion] = useState('local')
  const [teamId, setTeamId] = useState<string>('none')
  const [tier, setTier] = useState<string>('Shared-Nano')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registrationToken, setRegistrationToken] = useState<string | null>(null)
  const [managedSuccess, setManagedSuccess] = useState(false)

  const [copied, setCopied] = useState(false)

  // Load teams
  const orgTeams = useQuery(api.teams.list, user?.orgId ? { orgId: user.orgId as Id<"organizations"> } : "skip")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Instance name is required.'); return }
    if (!user?.orgId) { setError('No organization found.'); return }
    setIsSubmitting(true)
    setError(null)
    try {
      const orgId = user.orgId as Id<"organizations">

      const payload: any = {
        orgId,
        name: name.trim(),
        provider: mode === 'cloud' ? provider : 'Self-hosted',
        region: mode === 'cloud' ? region : 'local',
      }

      if (teamId !== 'none') payload.teamId = teamId as Id<"teams">;
      if (mode === 'cloud') payload.tier = tier;

      const instanceId = await createInstance(payload)

      if (mode === 'cloud') {
        setManagedSuccess(true)
        toast('Cloud provisioning started!', 'success')
      } else {
        const token = `claw_reg_${instanceId.toString().slice(-8)}_${Date.now().toString(36)}`
        setRegistrationToken(token)
        toast('Instance registered successfully', 'success')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create instance.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCopyToken() {
    if (registrationToken) {
      navigator.clipboard.writeText(registrationToken)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Step 1 — Mode selection
  if (mode === 'select') {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate({ to: '/fleet' })} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Provision Instance</h1>
            <p className="text-sm text-slate-400 mt-0.5">Choose how to add an OpenClaw instance to your fleet</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMode('byo')}
            className="text-left border border-slate-700 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 p-5 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-cyan-400" />
              </div>
              <Badge variant="outline">Recommended</Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1.5">BYO Server</h3>
            <p className="text-sm text-slate-400 mb-3">
              Connect an existing server or VPS running OpenClaw. Your instance connects outbound to ClawControl — no inbound ports required.
            </p>
            <span className="text-xs text-cyan-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Get started <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMode('cloud')}
            className="text-left border border-slate-700 bg-slate-900/50 hover:border-violet-500/50 hover:bg-violet-500/5 p-5 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-violet-400" />
              </div>
              <Badge>Managed</Badge>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1.5">Cloud Provider</h3>
            <p className="text-sm text-slate-400 mb-3">
              Provision a new instance on AWS, GCP, Azure, or any supported cloud. ClawControl handles deployment and configuration.
            </p>
            <span className="text-xs text-violet-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Configure <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    )
  }

  // Success state — Managed Cloud
  if (managedSuccess) {
    return (
      <div className="max-w-xl space-y-6">
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
            <Cloud className="w-7 h-7 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Provisioning Started</h2>
          <p className="text-sm text-slate-400">
            ClawControl is spinning up your new Managed Cloud instance. This usually takes 2-3 minutes.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="w-4 h-4 text-violet-400" />
              Instance Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Name</span>
                <span className="font-medium text-white">{name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Configuration</span>
                <span>{provider} • {region}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Compute Tier</span>
                <span>{tier}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Status</span>
                <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">Provisioning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate({ to: '/fleet' })}>
            Back to Fleet
          </Button>
          <Button onClick={() => navigate({ to: '/fleet/instances' })}>
            <Server className="w-4 h-4 mr-1.5" />
            View Instances
          </Button>
        </div>
      </div>
    )
  }

  // Success state — BYO Server token
  if (registrationToken) {
    return (
      <div className="max-w-xl space-y-6">
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Instance Registered</h2>
          <p className="text-sm text-slate-400">
            Add the registration token to your OpenClaw config to connect
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Registration Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-slate-400">
              Paste this into your OpenClaw gateway config or run the bootstrap command below:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-slate-800 px-3 py-2.5 rounded-lg font-mono text-cyan-300 break-all border border-slate-700">
                {registrationToken}
              </code>
              <button onClick={handleCopyToken} className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1.5"># Bootstrap command (run on your server):</p>
              <code className="text-xs font-mono text-slate-300 block">
                curl -sSL https://get.openclaw.dev | bash -s -- --token {registrationToken}
              </code>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate({ to: '/fleet' })}>
            Back to Fleet
          </Button>
          <Button onClick={() => navigate({ to: '/fleet/instances' })}>
            <Server className="w-4 h-4 mr-1.5" />
            View Instances
          </Button>
        </div>
      </div>
    )
  }

  // Step 2 — Instance form (BYO or Cloud)
  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setMode('select')} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {mode === 'byo' ? 'BYO Server' : 'Cloud Provisioning'}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {mode === 'byo'
              ? 'Register an existing OpenClaw instance'
              : 'Launch a new instance on a cloud provider'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {mode === 'byo'
              ? <HardDrive className="w-5 h-5 text-cyan-400" />
              : <Cloud className="w-5 h-5 text-violet-400" />}
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

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Team Scoping (Optional)</label>
              <select
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
              >
                <option value="none">No Team (Global)</option>
                {orgTeams?.map((t: any) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
              <p className="text-xs text-slate-500 pt-1">Only admins and users within this team will be able to access the instance.</p>
            </div>

            {mode === 'cloud' && (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Compute Tier</label>
                <select
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                >
                  <option value="Shared-Nano">Shared-Nano (0.5 vCPU, 1GB RAM) - $5/mo</option>
                  <option value="Dedicated-Micro">Dedicated-Micro (1 vCPU, 4GB RAM) - $15/mo</option>
                  <option value="Dedicated-Standard">Dedicated-Standard (4 vCPU, 16GB RAM) - $40/mo</option>
                </select>
              </div>
            )}

            {mode === 'cloud' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Provider</label>
                  <select
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  >
                    {PROVIDERS.filter(p => p !== 'Self-hosted' && p !== 'Other').map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-300">Region</label>
                  <select
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {REGIONS.filter(r => r !== 'local').map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            )}

            {mode === 'byo' && (
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-slate-300">
                <p className="font-medium text-cyan-400 mb-1.5">How connection works</p>
                <p className="text-xs text-slate-400">
                  Your OpenClaw instance connects to ClawControl by initiating an outbound agent tunnel — no inbound ports required.
                  After registering, you'll receive a token to paste into your OpenClaw config.
                </p>
              </div>
            )}

            {mode === 'cloud' && (
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-slate-300">
                <p className="font-medium text-violet-400 mb-1.5">Cloud provisioning</p>
                <p className="text-xs text-slate-400">
                  ClawControl will generate the deployment configuration for your selected cloud provider.
                  You can download the Terraform/Pulumi template or use the one-click deploy for supported platforms.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setMode('select')}>
                Back
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
