import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ArrowLeft, Camera, Monitor, Mic, MapPin } from 'lucide-react'

export const Route = createFileRoute('/_app/nodes/$nodeId')({
  component: NodeDetail,
})

function NodeDetail() {
  const { nodeId } = Route.useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/nodes" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Device Detail</h1>
          <p className="text-sm text-slate-400 mt-0.5">Node ID: {nodeId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              Camera Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-3">
              <Camera size={32} className="text-slate-600" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">Capture</Button>
              <Button className="flex-1" size="sm">Stream</Button>
            </div>
          </CardContent>
        </Card>

        {/* Screen Record Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              Screen Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-3">
              <Monitor size={32} className="text-slate-600" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">Start Recording</Button>
              <Button className="flex-1" size="sm">Screenshot</Button>
            </div>
          </CardContent>
        </Card>

        {/* Voice Wake Config */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-400" />
              Voice Wake Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Wake Word</label>
                <div className="flex items-center gap-2">
                  <Input placeholder="Hey Claw" readOnly className="flex-1" />
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <span className="text-xs text-slate-400">Sensitivity</span>
                <span className="text-xs text-slate-300">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Always Listening</span>
                <Badge className="bg-slate-700 text-slate-300">On</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Location Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-3">
              <MapPin size={32} className="text-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Last Known Location</span>
                <span className="text-xs text-slate-300">San Francisco, CA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Updated</span>
                <span className="text-xs text-slate-300">2 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Location Services</span>
                <Badge variant="success">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
