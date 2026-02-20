import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Activity,
  Bot,
  MessageSquare,
  DollarSign,
  Power,
  Radio,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/observe/')({
  component: ObserveDashboard,
})

function ObserveDashboard() {
  const stats = useQuery(api.platform.getStats, {})
  const logs = useQuery(api.auditLogs.list, { limit: 10 })
  const events = logs ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Observe</h1>
          <p className="text-sm text-slate-400 mt-1">Mission control — live telemetry and event stream</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors border-2 border-red-500 shadow-lg shadow-red-900/30">
          <Power className="w-5 h-5" />
          KILL SWITCH
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Events</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{events.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Agents</span>
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{stats?.activeAgents ?? 0}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Sessions</span>
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{stats?.activeSessions ?? 0}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Skills</span>
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{stats?.totalSkills ?? 0}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <CardTitle className="text-base">Live Event Stream</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">No events yet.</p>
            )}
            {events.map((event) => (
              <div key={event._id} className="flex items-center gap-3 py-2 border-b border-slate-700/50 last:border-0">
                <Badge variant="outline" className="text-xs shrink-0">{event.action}</Badge>
                <span className="text-sm text-slate-300 flex-1">{event.details ?? event.resourceType}</span>
                <span className="text-xs text-slate-500 shrink-0">{new Date(event.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
