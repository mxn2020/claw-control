import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ArrowLeft, Box, Save, CheckCircle, Settings } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/sandbox',
)({
  component: SandboxConfig,
})

function SandboxConfig() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const updateInstance = useMutation(api.instances.update)
  const [sandboxMode, setSandboxMode] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (instance?.config?.sandboxMode !== undefined) {
      setSandboxMode(instance.config.sandboxMode)
    }
  }, [instance?.config?.sandboxMode])

  async function handleSave() {
    if (!instance) return
    try {
      await updateInstance({
        id: instance._id,
        config: {
          ...instance.config,
          sandboxMode,
        },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save:', err)
    }
  }

  if (!instance) {
    return <div className="flex items-center justify-center h-64"><span className="text-slate-400">Loading…</span></div>
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Box className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Sandbox Configuration</h1>
            <p className="text-sm text-slate-400">{instance.name}</p>
          </div>
        </div>
        <Button size="sm" onClick={handleSave}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Docker Setup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Image Name</label>
              <Input defaultValue="ghcr.io/claw-control/sandbox" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Image Tag</label>
              <Input defaultValue="v1.4.2-alpine" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              <CardTitle>Sandbox Mode</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-white">Enable Sandbox Isolation</h4>
                <p className="text-xs text-slate-400 mt-1">Tool execution runs in isolated containers</p>
              </div>
              <button
                type="button"
                onClick={() => setSandboxMode(!sandboxMode)}
                className={`w-12 h-6 rounded-full relative transition-colors ${sandboxMode ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${sandboxMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Resource Limits</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">CPU (vCPU)</label>
                <Input type="number" defaultValue="2" min="0.5" max="8" step="0.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Memory (GB)</label>
                <Input type="number" defaultValue="4" min="0.5" max="32" step="0.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Disk (GB)</label>
                <Input type="number" defaultValue="20" min="1" max="200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
