import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Plus, Paintbrush, Clock, Image } from 'lucide-react'
import { useCanvases } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/canvas/')({
  component: CanvasIndex,
})

const formatRelativeTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return Math.floor(diff / 1000) + 's ago'
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago'
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago'
  return Math.floor(diff / 86400000) + 'd ago'
}

function CanvasIndex() {
  const canvases = useCanvases()

  // Split: recently updated (within 6h) are "active", rest are history
  const sixHoursAgo = Date.now() - 6 * 3600000
  const activeCanvases = canvases.filter((c) => c.updatedAt > sixHoursAgo)
  const historySnapshots = canvases.filter((c) => c.updatedAt <= sixHoursAgo)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Canvas</h1>
          <p className="text-sm text-slate-400 mt-1">
            Live A2UI canvases and history snapshots
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Canvas
        </Button>
      </div>

      {/* Active Canvases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Paintbrush className="w-4 h-4 text-cyan-400" />
            Active Canvases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeCanvases.map((canvas) => (
              <Link
                key={canvas.id}
                to="/canvas/$canvasId"
                params={{ canvasId: canvas.id }}
                className="block"
              >
                <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700">
                      <Image size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{canvas.title}</p>
                      <p className="text-xs text-slate-500">{canvas.agentId} · {formatRelativeTime(canvas.updatedAt)}</p>
                    </div>
                  </div>
                  <Badge variant="success">
                    live
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History Snapshots */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            History Snapshots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {historySnapshots.map((snap) => (
              <Link
                key={snap.id}
                to="/canvas/$canvasId"
                params={{ canvasId: snap.id }}
                className="block"
              >
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <div className="aspect-video rounded bg-slate-700/50 mb-2 flex items-center justify-center">
                    <Image size={24} className="text-slate-600" />
                  </div>
                  <p className="text-sm font-medium text-white truncate">{snap.title}</p>
                  <p className="text-xs text-slate-500">{snap.agentId} · {new Date(snap.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
