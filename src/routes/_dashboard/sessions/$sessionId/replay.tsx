import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ListOrdered,
  ChevronRight,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/sessions/$sessionId/replay',
)({
  component: SessionReplay,
})

const mockSteps = [
  {
    id: 1,
    label: 'Session opened',
    type: 'event' as const,
    timestamp: '10:32:00 AM',
    detail: 'WebChat channel connected. User identified as user_42.',
  },
  {
    id: 2,
    label: 'User message received',
    type: 'message' as const,
    timestamp: '10:32:01 AM',
    detail: '"Hi, I need help with my billing. I was charged twice this month."',
  },
  {
    id: 3,
    label: 'Tool: lookup_account',
    type: 'tool' as const,
    timestamp: '10:32:02 AM',
    detail: 'Resolved account acc_123 for user@example.com.',
  },
  {
    id: 4,
    label: 'Tool: list_transactions',
    type: 'tool' as const,
    timestamp: '10:32:04 AM',
    detail: 'Found 2 matching transactions for Jan 2024.',
  },
  {
    id: 5,
    label: 'Agent response',
    type: 'message' as const,
    timestamp: '10:32:14 AM',
    detail: 'Duplicate charge identified and communicated to user.',
  },
  {
    id: 6,
    label: 'Policy trigger',
    type: 'event' as const,
    timestamp: '10:32:15 AM',
    detail: 'Billing refund flow activated by policy engine.',
  },
  {
    id: 7,
    label: 'User message received',
    type: 'message' as const,
    timestamp: '10:33:02 AM',
    detail: '"Yes, exactly. Can you refund the extra one?"',
  },
  {
    id: 8,
    label: 'Tool: initiate_refund',
    type: 'tool' as const,
    timestamp: '10:34:02 AM',
    detail: 'Refund of $29.99 initiated for tx_789.',
  },
  {
    id: 9,
    label: 'Agent response',
    type: 'message' as const,
    timestamp: '10:34:11 AM',
    detail: 'Refund confirmation sent to user.',
  },
  {
    id: 10,
    label: 'Session closed',
    type: 'event' as const,
    timestamp: '10:34:45 AM',
    detail: 'Session ended normally. Duration: 2m 45s.',
  },
]

const currentStep = 5

const typeStyles = {
  event: 'border-amber-700/40 bg-amber-900/20',
  message: 'border-cyan-700/40 bg-cyan-900/20',
  tool: 'border-slate-700/50 bg-slate-900/50',
}

function SessionReplay() {
  const { sessionId } = Route.useParams()

  const active = mockSteps[currentStep - 1]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListOrdered className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Replay</h1>
          </div>
          <p className="text-sm text-slate-400">
            Step-by-step replay for session {sessionId}
          </p>
        </div>
        <Badge variant="info">
          Step {currentStep} / {mockSteps.length}
        </Badge>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600 transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
        >
          <Play className="w-4 h-4" />
          Play
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors"
        >
          <Pause className="w-4 h-4" />
          Pause
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steps list */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-700/50">
                {mockSteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      step.id === currentStep
                        ? 'bg-cyan-600/10 border-l-2 border-cyan-400'
                        : 'hover:bg-slate-800/50 border-l-2 border-transparent'
                    }`}
                  >
                    <ChevronRight
                      className={`w-3 h-3 shrink-0 ${
                        step.id === currentStep
                          ? 'text-cyan-400'
                          : 'text-slate-600'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">
                        {step.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {step.timestamp}
                      </div>
                    </div>
                    <Badge
                      variant={
                        step.type === 'event'
                          ? 'warning'
                          : step.type === 'message'
                            ? 'info'
                            : 'default'
                      }
                      className="ml-auto shrink-0"
                    >
                      {step.type}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step detail */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Step Detail</CardTitle>
                <Badge
                  variant={
                    active.type === 'event'
                      ? 'warning'
                      : active.type === 'message'
                        ? 'info'
                        : 'default'
                  }
                >
                  {active.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs text-slate-400">Step</span>
                <p className="text-sm font-medium text-white">
                  {active.label}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Timestamp</span>
                <p className="text-sm text-white">{active.timestamp}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Detail</span>
                <div
                  className={`mt-1 rounded-lg border p-3 text-sm text-slate-300 ${typeStyles[active.type]}`}
                >
                  {active.detail}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
