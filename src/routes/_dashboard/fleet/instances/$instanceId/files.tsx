import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { FolderGit2, FileTerminal, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/files')({ component: InstanceFiles })

const MOCK_FILES = [
  { path: '/etc/claw/agent.yaml', status: 'synced', desired: 'v1.4.2', actual: 'v1.4.2', type: 'config' },
  { path: '/var/lib/claw/SOUL.md', status: 'drift', desired: 'Hash: 8f4e2a1', actual: 'Hash: 3b1c9f2', type: 'personality' },
  { path: '/usr/local/bin/claw-worker', status: 'synced', desired: 'v2.1.0', actual: 'v2.1.0', type: 'binary' },
  { path: '/etc/claw/tools/web_search.js', status: 'missing', desired: 'Hash: a1b2c3d', actual: 'Not found', type: 'tool' },
]

function InstanceFiles() {
  const { instanceId } = Route.useParams()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  const driftCount = MOCK_FILES.filter(f => f.status === 'drift' || f.status === 'missing').length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'synced': return <Badge variant="success" className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Synced</Badge>
      case 'drift': return <Badge variant="warning" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Drift Detected</Badge>
      case 'missing': return <Badge variant="danger" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Missing</Badge>
      default: return <Badge variant="default">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderGit2 className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">File Sync & Drift</h1>
            <p className="text-sm text-slate-400 mt-1">Consistency analyzer for instance {instanceId.slice(-8)}</p>
          </div>
        </div>
        <Button onClick={handleSync} disabled={isSyncing || driftCount === 0} className={driftCount > 0 ? "bg-amber-600 hover:bg-amber-500 text-white font-medium" : ""}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Deploying Fixes...' : 'Sync Config Space'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Drift Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-lg">
              {driftCount > 0 ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{driftCount} files out of sync</div>
                  <p className="text-sm text-center text-slate-400">Configuration drift detected between ClawControl schema and instance filesystem.</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Fully Synced</div>
                  <p className="text-sm text-center text-slate-400">No configuration drift detected.</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileTerminal className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm">Sync Telemetry</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">File Path</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">State</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Desired</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase">Actual</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_FILES.map((file, i) => (
                    <tr key={i} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/50">
                      <td className="px-4 py-3">
                        <div className="font-mono text-cyan-400 text-xs">{file.path}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{file.type}</div>
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(file.status)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-300">{file.desired}</td>
                      <td className={`px-4 py-3 font-mono text-xs ${file.status !== 'synced' ? 'text-amber-400' : 'text-slate-300'}`}>{file.actual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
