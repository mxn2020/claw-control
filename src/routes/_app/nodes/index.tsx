import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Smartphone, Monitor, Plus, Wifi } from 'lucide-react'

export const Route = createFileRoute('/_app/nodes/')({
  component: NodesIndex,
})

const devices = [
  { id: 'node_1', name: 'MacBook Pro', type: 'macOS', status: 'online' as const, capabilities: ['Screen Record', 'Camera', 'Mic', 'Location'] },
  { id: 'node_2', name: 'iPhone 15 Pro', type: 'iOS', status: 'online' as const, capabilities: ['Camera', 'Mic', 'Location', 'Wake Word'] },
  { id: 'node_3', name: 'Pixel 8', type: 'Android', status: 'offline' as const, capabilities: ['Camera', 'Mic', 'Location'] },
  { id: 'node_4', name: 'iPad Air', type: 'iOS', status: 'idle' as const, capabilities: ['Camera', 'Mic', 'Screen Record'] },
]

function NodesIndex() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Nodes</h1>
          <p className="text-sm text-slate-400 mt-1">
            All paired devices and their capabilities
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Pair New Device
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {devices.map((device) => (
          <Link
            key={device.id}
            to="/nodes/$nodeId"
            params={{ nodeId: device.id }}
            className="block"
          >
            <Card className="hover:border-cyan-500/50 transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700">
                      {device.type === 'macOS' ? (
                        <Monitor size={18} className="text-cyan-400" />
                      ) : (
                        <Smartphone size={18} className="text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <p className="text-xs text-slate-500">{device.type}</p>
                    </div>
                  </div>
                  <Badge variant={device.status === 'online' ? 'success' : device.status === 'idle' ? 'warning' : 'danger'}>
                    {device.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1.5 mb-2">
                  <Wifi size={12} className="text-slate-500" />
                  <span className="text-xs text-slate-500">Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {device.capabilities.map((cap) => (
                    <Badge key={cap} className="bg-slate-700 text-slate-300 text-xs">{cap}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
