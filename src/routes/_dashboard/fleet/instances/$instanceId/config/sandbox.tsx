import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Box,
  Settings,
  Save,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/sandbox',
)({
  component: SandboxConfig,
})

function SandboxConfig() {
  const { instanceId } = Route.useParams()

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
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Docker Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Image Name
              </label>
              <Input defaultValue="ghcr.io/claw-control/sandbox" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Image Tag
              </label>
              <Input defaultValue="v1.4.2-alpine" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              <CardTitle>Isolation Level</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Isolation Mode
              </label>
              <select className="flex h-10 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                <option value="none">None</option>
                <option value="process">Process</option>
                <option value="container" selected>Container</option>
              </select>
            </div>
            <p className="text-xs text-slate-400">
              Container isolation provides the strongest security boundary between agent workloads.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resource Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  CPU (vCPU)
                </label>
                <Input type="number" defaultValue="2" min="0.5" max="8" step="0.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Memory (GB)
                </label>
                <Input type="number" defaultValue="4" min="0.5" max="32" step="0.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Disk (GB)
                </label>
                <Input type="number" defaultValue="20" min="1" max="200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
