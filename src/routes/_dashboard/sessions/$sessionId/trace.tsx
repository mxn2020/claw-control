import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Code,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/sessions/$sessionId/trace',
)({
  component: SessionTrace,
})

const mockToolCalls = [
  {
    id: 1,
    tool: 'lookup_account',
    timestamp: '10:32:02 AM',
    duration: '120ms',
    status: 'success' as const,
    args: '{ "email": "user@example.com" }',
  },
  {
    id: 2,
    tool: 'list_transactions',
    timestamp: '10:32:04 AM',
    duration: '340ms',
    status: 'success' as const,
    args: '{ "account_id": "acc_123", "month": "2024-01" }',
  },
  {
    id: 3,
    tool: 'check_duplicate',
    timestamp: '10:32:06 AM',
    duration: '85ms',
    status: 'success' as const,
    args: '{ "tx_ids": ["tx_456", "tx_789"] }',
  },
  {
    id: 4,
    tool: 'initiate_refund',
    timestamp: '10:34:02 AM',
    duration: '1.2s',
    status: 'success' as const,
    args: '{ "tx_id": "tx_789", "amount": 29.99 }',
  },
  {
    id: 5,
    tool: 'send_confirmation',
    timestamp: '10:34:04 AM',
    duration: '450ms',
    status: 'error' as const,
    args: '{ "channel": "email", "template": "refund_confirm" }',
  },
]

function SessionTrace() {
  const { sessionId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Trace</h1>
          </div>
          <p className="text-sm text-slate-400">
            Tool-call waterfall for session {sessionId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            {mockToolCalls.filter((c) => c.status === 'success').length} passed
          </Badge>
          <Badge variant="danger">
            {mockToolCalls.filter((c) => c.status === 'error').length} failed
          </Badge>
        </div>
      </div>

      {/* Waterfall */}
      <Card>
        <CardHeader>
          <CardTitle>Tool Invocations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockToolCalls.map((call, idx) => (
              <div
                key={call.id}
                className="flex items-start gap-4 rounded-lg border border-slate-700/50 bg-slate-900/50 p-4"
              >
                {/* Timeline indicator */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      call.status === 'success'
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                    }`}
                  />
                  {idx < mockToolCalls.length - 1 && (
                    <div className="w-px h-8 bg-slate-700" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-mono font-medium text-white">
                        {call.tool}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {call.duration}
                      </span>
                      {call.status === 'success' ? (
                        <Badge variant="success">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          success
                        </Badge>
                      ) : (
                        <Badge variant="danger">
                          <XCircle className="w-3 h-3 mr-1" />
                          error
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    {call.timestamp}
                  </div>
                  <pre className="text-xs text-slate-400 bg-slate-800/50 rounded p-2 overflow-x-auto border border-slate-700/30">
                    {call.args}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
