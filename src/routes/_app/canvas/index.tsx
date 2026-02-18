import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Plus, Paintbrush, Clock, Image } from 'lucide-react'

export const Route = createFileRoute('/_app/canvas/')({
  component: CanvasIndex,
})

const activeCanvases = [
  { id: 'canvas_1', name: 'UI Mockup — Dashboard', agent: 'Design Assistant', lastActivity: '2 min ago', status: 'live' as const },
  { id: 'canvas_2', name: 'Architecture Diagram', agent: 'Code Reviewer', lastActivity: '15 min ago', status: 'live' as const },
  { id: 'canvas_3', name: 'Brainstorm Session', agent: 'Research Assistant', lastActivity: '1 hr ago', status: 'idle' as const },
]

const historySnapshots = [
  { id: 'snap_1', name: 'Landing Page v2', agent: 'Design Assistant', date: 'Jan 14, 2024' },
  { id: 'snap_2', name: 'Data Flow Diagram', agent: 'Code Reviewer', date: 'Jan 13, 2024' },
  { id: 'snap_3', name: 'Wireframe — Settings', agent: 'Design Assistant', date: 'Jan 12, 2024' },
  { id: 'snap_4', name: 'ER Diagram', agent: 'Code Reviewer', date: 'Jan 11, 2024' },
]

function CanvasIndex() {
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
                      <p className="text-sm font-medium text-white">{canvas.name}</p>
                      <p className="text-xs text-slate-500">{canvas.agent} · {canvas.lastActivity}</p>
                    </div>
                  </div>
                  <Badge variant={canvas.status === 'live' ? 'success' : 'warning'}>
                    {canvas.status}
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
                  <p className="text-sm font-medium text-white truncate">{snap.name}</p>
                  <p className="text-xs text-slate-500">{snap.agent} · {snap.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
