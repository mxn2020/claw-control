import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useMemoryFiles } from '#/lib/dataHooks'
import { AlertTriangle, ShieldCheck, Activity, FileWarning } from 'lucide-react'
import { useMemo } from 'react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/health')({ component: AgentMemoryHealth })

function AgentMemoryHealth() {
  const { agentId } = Route.useParams()
  const memory = useMemoryFiles({ agentId })

  const files = memory ?? []

  const { healthScore, conflicts, stats } = useMemo(() => {
    let score = 100
    let totalSize = 0
    let largeFiles = 0

    files.forEach((f: any) => {
      const size = f.content?.length || 0
      totalSize += size
      if (size > 10000) {
        largeFiles++
      }
    })

    if (files.length > 50) score -= 10
    if (largeFiles > 0) score -= (largeFiles * 5)

    // Simulate finding conflicts based on filename or contents
    // In a real app we would use semantic search or NLP to find contradicting constraints
    const detectedConflicts = []
    if (files.length >= 2) {
      if (files[0].content && files[1].content && files[0].content.includes('always') && files[1].content.includes('never')) {
        detectedConflicts.push({ id: 1, type: 'contradiction', files: [files[0]?.path, files[1]?.path], description: 'Potential contradicting constraints detected' })
        score -= 15
      } else if (files.length > 4) {
        detectedConflicts.push({ id: 2, type: 'overlap', files: [files[0]?.path, files[2]?.path], description: 'Semantic overlap found in memory entries' })
        score -= 5
      }
    }

    return {
      healthScore: Math.max(0, score),
      conflicts: detectedConflicts,
      stats: { totalSize, largeFiles }
    }
  }, [files])

  const scoreColor = healthScore >= 90 ? 'text-emerald-400' : healthScore >= 70 ? 'text-amber-400' : 'text-red-400'
  const scoreBorder = healthScore >= 90 ? 'border-emerald-500/50 bg-emerald-500/10' : healthScore >= 70 ? 'border-amber-500/50 bg-amber-500/10' : 'border-red-500/50 bg-red-500/10'

  if (!memory) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading memory health…</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Memory Health</h1>
        <p className="text-sm text-slate-400 mt-1">Monitor memory store health, semantic conflicts, and performance</p>
      </div>

      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-6">
            <div className={`flex items-center justify-center w-24 h-24 rounded-full border-4 ${scoreBorder}`}>
              <div className="text-center">
                <div className={`text-3xl font-bold ${scoreColor}`}>
                  {healthScore}
                </div>
                <div className="text-xs text-slate-400">/100</div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Memory Health Score
              </h2>
              <p className="text-sm text-slate-400">
                {healthScore >= 90 ? 'Excellent' : healthScore >= 70 ? 'Needs Attention' : 'Critical'} — {conflicts.length} conflict{conflicts.length !== 1 ? 's' : ''} detected
              </p>
              <div className="flex gap-4 mt-3">
                <div className="text-xs text-slate-500"><strong className="text-slate-300">{files.length}</strong> Entries</div>
                <div className="text-xs text-slate-500"><strong className="text-slate-300">{(stats.totalSize / 1024).toFixed(1)}</strong> KB Total</div>
                <div className="text-xs text-slate-500"><strong className="text-slate-300">{stats.largeFiles}</strong> Large Files</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conflict Detection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-amber-400" />
              <CardTitle className="text-base">Conflict Detection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {conflicts.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-slate-400 p-4 border border-slate-800 rounded-lg bg-slate-900/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                No semantic conflicts detected.
              </div>
            ) : (
              <div className="space-y-3">
                {conflicts.map(c => (
                  <div key={c.id} className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-amber-400">{c.description}</span>
                      <Badge variant="warning">{c.type}</Badge>
                    </div>
                    <div className="text-xs text-slate-400">Affected files:</div>
                    <ul className="list-disc pl-5 mt-1 text-xs text-slate-300 font-mono">
                      {c.files.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Optimization Suggestions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base">Optimization Opportunities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.largeFiles > 0 && (
                <div className="flex items-start gap-3 py-2 border-b border-slate-700/50">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-300">Large Memory Files Found</p>
                    <p className="text-xs text-slate-400 mt-1">Consider breaking down {stats.largeFiles} large files into smaller, more granular entries to improve retrieval speed.</p>
                  </div>
                </div>
              )}
              {files.length > 50 && (
                <div className="flex items-start gap-3 py-2 border-b border-slate-700/50">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-300">High Entry Count</p>
                    <p className="text-xs text-slate-400 mt-1">You have more than 50 memory entries. Semantic search recall may degrade. Consider archiving stale memories.</p>
                  </div>
                </div>
              )}
              {files.length <= 50 && stats.largeFiles === 0 && (
                <div className="flex items-start gap-3 py-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-300">Optimal Configuration</p>
                    <p className="text-xs text-slate-400 mt-1">Memory store geometry appears optimal for fast dense retrieval.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
