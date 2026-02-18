import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Activity,
  FileText,
  DollarSign,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/observe',
)({
  component: InstanceObserve,
})

const mockTraces = [
  { id: 'tr-a1b2', operation: 'chat.completion', duration: '234ms', status: 'ok' as const, timestamp: '14:52:03' },
  { id: 'tr-c3d4', operation: 'tool.exec', duration: '1.2s', status: 'ok' as const, timestamp: '14:51:48' },
  { id: 'tr-e5f6', operation: 'memory.retrieve', duration: '89ms', status: 'ok' as const, timestamp: '14:51:30' },
  { id: 'tr-g7h8', operation: 'chat.completion', duration: '5.1s', status: 'error' as const, timestamp: '14:50:55' },
  { id: 'tr-i9j0', operation: 'tool.browser', duration: '3.4s', status: 'ok' as const, timestamp: '14:50:12' },
  { id: 'tr-k1l2', operation: 'skill.web-search', duration: '780ms', status: 'ok' as const, timestamp: '14:49:40' },
]

function InstanceObserve() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Observability</h1>
          <p className="text-sm text-slate-400">Instance {instanceId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <CardTitle>Log Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Info</span>
              <Badge variant="info">12,480</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Warning</span>
              <Badge variant="warning">342</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Error</span>
              <Badge variant="danger">18</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <CardTitle>Cost Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">LLM Tokens (today)</span>
              <span className="text-slate-200">1.24M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Estimated Cost (today)</span>
              <span className="text-slate-200">$4.82</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Month-to-Date</span>
              <span className="text-slate-200">$127.40</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Traces</CardTitle>
            <Badge variant="info">{mockTraces.length} traces</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTraces.map((trace) => (
              <div
                key={trace.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white">{trace.operation}</span>
                      <Badge variant={trace.status === 'ok' ? 'success' : 'danger'}>
                        {trace.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {trace.id} · {trace.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {trace.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
