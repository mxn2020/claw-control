import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Search, GitBranch, AlertTriangle } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/observe/traces')({
  component: ObserveTraces,
})

function ObserveTraces() {
  const { user } = useAuth()
  const orgId = user?.orgId as any
  const logs = useQuery(api.platform.listTraces, orgId ? { orgId } : "skip")
  const entries = logs ?? []
  const [showOnlySlow, setShowOnlySlow] = useState(false)

  const SLOW_THRESHOLD = 5000 // 5 seconds
  const slowCount = entries.filter(e => e.timingMs > SLOW_THRESHOLD).length
  const displayEntries = showOnlySlow ? entries.filter(e => e.timingMs > SLOW_THRESHOLD) : entries


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Traces</h1>
        <p className="text-sm text-slate-400 mt-1">Distributed trace view for agent operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search traces by agent or content..."
                className="flex-1 bg-transparent border-none text-sm text-slate-300 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${showOnlySlow ? 'border-amber-500 bg-amber-900/20' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800'}`}
          onClick={() => setShowOnlySlow(!showOnlySlow)}
        >
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${slowCount > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">Slow Traces (&gt; 5s)</div>
                <div className="text-xs text-slate-400">Click to filter out normal traces</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{slowCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Recent Traces</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Agent</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Latency</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Preview</th>
                </tr>
              </thead>
              <tbody>
                {displayEntries.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No traces found.</td></tr>
                )}
                {displayEntries.map((entry) => (
                  <tr key={entry._id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50 cursor-pointer">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {new Date(entry.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap font-medium text-sm">{entry.agentName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline" className={entry.role === 'tool' ? 'bg-purple-900/30 text-purple-400 border-purple-800' : ''}>
                        {entry.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={entry.timingMs > SLOW_THRESHOLD ? 'danger' : 'success'} className="font-mono">
                        {entry.timingMs}ms
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-[300px] truncate text-xs font-mono">{entry.content ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
