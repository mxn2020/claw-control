import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Download, Paintbrush } from 'lucide-react'

export const Route = createFileRoute('/_app/canvas/$canvasId')({
  component: CanvasDetail,
})

function CanvasDetail() {
  const { canvasId } = Route.useParams()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/canvas" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Canvas Detail</h1>
            <p className="text-sm text-slate-400 mt-0.5">ID: {canvasId}</p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Download size={16} />
          Export
        </Button>
      </div>

      {/* Canvas Area */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-[16/9] rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Paintbrush size={48} className="text-slate-600 mx-auto" />
              <p className="text-slate-500 text-sm">Canvas content will render here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replay Controls */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center justify-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition-colors">
              <Play size={20} />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Pause size={20} />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-slate-700">
            <div className="h-1.5 w-1/3 rounded-full bg-cyan-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
