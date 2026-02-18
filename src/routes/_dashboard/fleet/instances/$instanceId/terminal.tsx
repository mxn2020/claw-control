import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Terminal, Wifi, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/terminal',
)({
  component: InstanceTerminal,
})

const mockOutput = [
  { type: 'cmd' as const, text: '$ openclaw status' },
  {
    type: 'out' as const,
    text: 'openclaw daemon running (pid 2841)\n3 agents loaded · 2 active sessions\nuptime 14d 6h 32m',
  },
  { type: 'cmd' as const, text: '$ openclaw agents list' },
  {
    type: 'out' as const,
    text: 'NAME              STATUS   MODEL             SESSIONS\nsupport-bot       active   gpt-4o            124\nsales-assistant   active   gpt-4o-mini       89\ninternal-ops      idle     claude-3.5-sonnet 47',
  },
  { type: 'cmd' as const, text: '$ openclaw logs --tail 5' },
  {
    type: 'out' as const,
    text: '[2025-01-15 09:42:01] INFO  session #483 started (support-bot)\n[2025-01-15 09:41:55] INFO  health check passed\n[2025-01-15 09:40:12] INFO  session #482 completed (sales-assistant)\n[2025-01-15 09:38:30] WARN  token budget 80% for support-bot\n[2025-01-15 09:35:01] INFO  config reloaded',
  },
]

function InstanceTerminal() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">
              Terminal — {instanceId}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Interactive shell session to your instance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3" />
            Connected
          </Badge>
        </div>
      </div>

      {/* Security Note */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-2 text-sm text-amber-300">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>
              This terminal uses an outbound-only tunnel. No inbound ports are
              exposed. All commands are audit-logged.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Terminal */}
      <Card className="overflow-hidden">
        <CardHeader className="py-2 px-4 border-b border-slate-700 bg-slate-900">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-mono">
              openclaw@{instanceId}
            </CardTitle>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-slate-950 p-4 font-mono text-sm min-h-[400px] max-h-[600px] overflow-y-auto">
            {mockOutput.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === 'cmd' ? (
                  <span className="text-emerald-400">{line.text}</span>
                ) : (
                  <pre className="text-slate-300 whitespace-pre-wrap">
                    {line.text}
                  </pre>
                )}
              </div>
            ))}
            {/* Prompt */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-emerald-400">$</span>
              <Input
                placeholder="Type a command…"
                className="flex-1 h-8 border-0 bg-transparent text-slate-100 font-mono text-sm placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
