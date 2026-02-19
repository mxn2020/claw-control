import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { AlertTriangle } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/kill-switch')({
  component: SwarmKillSwitch,
})

const mockLog = [
  { time: '12:00:00', event: 'Kill switch armed', actor: 'admin@acme.com' },
  { time: '11:45:12', event: 'All-clear issued', actor: 'admin@acme.com' },
  { time: '11:30:05', event: 'Emergency stop triggered', actor: 'system' },
  { time: '11:29:55', event: 'Anomaly detected: runaway tool loop', actor: 'system' },
]

function SwarmKillSwitch() {
  const { swarmId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Kill Switch</h1>
        <p className="text-sm text-slate-400 mt-1">Emergency halt for swarm {swarmId}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">This will immediately halt all agents in this swarm.</span>
            </div>
            <button
              type="button"
              className="rounded-2xl bg-red-600 px-16 py-8 text-2xl font-bold text-white shadow-lg shadow-red-900/50 hover:bg-red-500 active:scale-95 transition-all"
            >
              STOP ALL
            </button>
            <p className="text-xs text-slate-500">
              A confirmation dialog will appear before execution. All active sessions will be suspended.
            </p>
            <Badge variant="success">Status: Operational</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockLog.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
              >
                <span className="font-mono text-xs text-slate-500 mt-0.5 shrink-0">{entry.time}</span>
                <div>
                  <p className="text-sm text-white">{entry.event}</p>
                  <p className="text-xs text-slate-400 mt-0.5">by {entry.actor}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
