import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { ArrowLeft, Settings, Save } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/general',
)({
  component: GeneralConfig,
})

function GeneralConfig() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const update = useMutation(api.instances.update)
  const [saving, setSaving] = useState(false)

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!instance) return
    const form = new FormData(e.currentTarget)
    setSaving(true)
    try {
      await update({
        id: instance._id,
        name: form.get('name') as string || undefined,
        region: form.get('region') as string || undefined,
        version: form.get('version') as string || undefined,
      })
    } finally {
      setSaving(false)
    }
  }

  if (!instance) {
    return <div className="text-center py-12 text-slate-500">Loading…</div>
  }

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId/config"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Configuration
      </Link>

      <form onSubmit={handleSave}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">General Settings</h1>
              <p className="text-sm text-slate-400">{instance.name}</p>
            </div>
          </div>
          <Button type="submit" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Instance Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Instance Name</label>
                <Input name="name" defaultValue={instance.name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Version</label>
                <div className="flex items-center gap-2">
                  <Input name="version" defaultValue={instance.version ?? ''} />
                  <Badge variant="info">{instance.version ?? 'unknown'}</Badge>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Region</label>
                <Input name="region" defaultValue={instance.region ?? ''} placeholder="e.g. us-east-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Provider</label>
                <Input defaultValue={instance.provider ?? 'Local'} readOnly className="opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status</span>
                <Badge variant={instance.status === 'online' ? 'success' : 'default'}>{instance.status}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Agents</span>
                <span className="text-slate-200">{instance.agentCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Created</span>
                <span className="text-slate-200">{instance.createdAt ? new Date(instance.createdAt).toLocaleString() : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Heartbeat</span>
                <span className="text-slate-200">{instance.lastHeartbeat ? new Date(instance.lastHeartbeat).toLocaleString() : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Instance ID</span>
                <span className="font-mono text-xs text-slate-300">{instanceId}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
