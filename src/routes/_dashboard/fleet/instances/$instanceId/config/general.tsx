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
import {
  ArrowLeft,
  Settings,
  Save,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/general',
)({
  component: GeneralConfig,
})

function GeneralConfig() {
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
          <Settings className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">General Settings</h1>
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
            <CardTitle>Instance Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Instance Name
              </label>
              <Input defaultValue="Production Gateway" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Version
              </label>
              <div className="flex items-center gap-2">
                <Input defaultValue="v0.9.2" readOnly className="opacity-70" />
                <Badge variant="success">latest</Badge>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Region
              </label>
              <select className="flex h-10 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                <option value="nyc3">NYC3 — New York</option>
                <option value="sfo3">SFO3 — San Francisco</option>
                <option value="ams3">AMS3 — Amsterdam</option>
                <option value="sgp1">SGP1 — Singapore</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Max CPU (vCPU)
              </label>
              <Input type="number" defaultValue="4" min="1" max="16" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Max Memory (GB)
              </label>
              <Input type="number" defaultValue="8" min="1" max="64" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Max Disk (GB)
              </label>
              <Input type="number" defaultValue="50" min="10" max="500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health &amp; Recovery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Auto-Restart</p>
                <p className="text-xs text-slate-400">
                  Automatically restart on crash or unresponsive state
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-600 peer-checked:bg-cyan-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Health Check Interval (seconds)
              </label>
              <Input type="number" defaultValue="30" min="5" max="300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Max Restart Attempts
              </label>
              <Input type="number" defaultValue="3" min="1" max="10" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Created</span>
              <span className="text-slate-200">2024-11-15 09:32 UTC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Last Modified</span>
              <span className="text-slate-200">2025-01-08 14:17 UTC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Owner</span>
              <span className="text-slate-200">platform-team</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Instance ID</span>
              <span className="font-mono text-xs text-slate-300">{instanceId}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
