import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { CheckCircle, XCircle, Clock, AlertTriangle, Filter } from 'lucide-react'
import { useApprovals } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/approvals/')({
  component: ApprovalsPage,
})

type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'deferred' | 'all'

const riskColors: Record<string, 'danger' | 'warning' | 'default'> = {
  high: 'danger', medium: 'warning', low: 'default',
}

const timeAgo = (ms: number) => {
  const diff = Date.now() - ms
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  return `${Math.floor(diff / 3_600_000)}h ago`
}

function ApprovalsPage() {
  const allApprovals = useApprovals() || []
  const [filter, setFilter] = useState<ApprovalStatus>('pending')
  const [decided, setDecided] = useState<Record<string, 'approved' | 'rejected'>>({})

  const visible = filter === 'all'
    ? allApprovals
    : allApprovals.filter((a) =>
      decided[a._id] ? decided[a._id] === filter : (a.status as string) === filter
    )

  const pendingCount = allApprovals.filter((a) => !decided[a._id] && (a.status as string) === 'pending').length
  const approvedCount = allApprovals.filter((a) => decided[a._id] === 'approved' || (!decided[a._id] && (a.status as string) === 'approved')).length
  const rejectedCount = allApprovals.filter((a) => decided[a._id] === 'rejected' || (!decided[a._id] && (a.status as string) === 'rejected')).length
  const counts: Record<string, number> = { pending: pendingCount, approved: approvedCount, rejected: rejectedCount }

  const filterLabels: ApprovalStatus[] = ['pending', 'approved', 'rejected', 'all']

  function decide(id: string, action: 'approved' | 'rejected') {
    // Optimistic UI update; in Convex mode a mutation would also fire here
    setDecided(prev => ({ ...prev, [id]: action }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Approvals</h1>
          <p className="text-sm text-slate-400 mt-1">Human-in-the-loop review queue</p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="danger" className="text-sm px-3 py-1">
            {pendingCount} pending
          </Badge>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filterLabels.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-cyan-600 text-white' : 'border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {s === 'all' ? `All (${allApprovals.length})` : `${s.charAt(0).toUpperCase()}${s.slice(1)} (${counts[s] ?? 0})`}
          </button>
        ))}
      </div>

      {/* Approval cards */}
      <div className="space-y-3">
        {visible.map((approval) => {
          const localDecision = decided[approval._id]
          const effectiveStatus: string = localDecision ?? (approval.status as string)
          const isPending = effectiveStatus === 'pending'
          return (
            <Card key={approval._id} className={(approval.riskLevel as string) === 'high' ? 'border-red-500/30' : ''}>
              <CardContent className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      {(approval.riskLevel as string) === 'high' && <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                      <p className="text-sm font-medium text-white">{approval.description}</p>
                    </div>
                    {(approval as { actionDetail?: string }).actionDetail && (
                      <code className="block bg-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 font-mono mb-2 whitespace-pre-wrap break-all">
                        {(approval as { actionDetail?: string }).actionDetail}
                      </code>
                    )}
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-mono">{approval.agentId}</span>
                      <span>·</span>
                      <span>{timeAgo(approval._creationTime)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <Badge variant={riskColors[approval.riskLevel as string] ?? 'default'}>{approval.riskLevel as string} risk</Badge>
                    {isPending ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decide(approval._id, 'rejected')}
                          className="border-red-600 text-red-400 hover:bg-red-600/10"
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => decide(approval._id, 'approved')}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                          Approve
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        {effectiveStatus === 'approved'
                          ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                          : <XCircle className="w-4 h-4 text-red-400" />}
                        <span className="capitalize">{effectiveStatus}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {visible.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No {filter === 'all' ? '' : filter} approvals</p>
          </div>
        )}
      </div>
    </div>
  )
}
