import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ShieldCheck, Bot, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { useApprovals } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/approvals/')({
  component: Approvals,
})

const riskColor = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const formatRelativeTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return Math.floor(diff / 1000) + 's ago'
  if (diff < 3600000) return Math.floor(diff / 60000) + ' min ago'
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' hrs ago'
  return Math.floor(diff / 86400000) + ' days ago'
}

function Approvals() {
  const approvals = useApprovals()

  const pendingApprovals = approvals.filter((a) => a.status === 'pending')
  const pastDecisions = approvals.filter((a) => a.status !== 'pending')
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Approvals</h1>
          <p className="text-sm text-slate-400 mt-1">
            Human-in-the-loop approval queue — review agent actions before execution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-sm px-3 py-1">
            {pendingApprovals.length} pending
          </Badge>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-3">
        {pendingApprovals.map((req) => (
          <Card key={req.id} className="border-l-2 border-l-amber-500/50">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{req.description}</p>
                    <Badge className={riskColor[req.riskLevel]}>{req.riskLevel} risk</Badge>
                  </div>
                  <p className="text-sm text-slate-400">{req.actionDetail}</p>
                  <div className="rounded-md bg-slate-800/50 px-3 py-2 text-xs text-slate-500">
                    <span className="text-slate-400 font-medium">Context: </span>{req.actionDetail}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Bot size={12} />
                      <span>{req.agentId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{formatRelativeTime(req.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CheckCircle2 size={14} className="mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <XCircle size={14} className="mr-1" />
                    Deny
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Past Decisions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            Past Decisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pastDecisions.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-md bg-slate-800/30 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  {d.status === 'approved' ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <XCircle size={16} className="text-red-400" />
                  )}
                  <span className="text-sm text-white">{d.description}</span>
                  <Badge className={riskColor[d.riskLevel]}>{d.riskLevel}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{d.agentId}</span>
                  <span>{d.decidedAt ? formatRelativeTime(d.decidedAt) : ''}</span>
                  <Badge variant={d.status === 'approved' ? 'success' : 'danger'}>
                    {d.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
