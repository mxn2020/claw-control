import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Smartphone, Monitor, Plus, Wifi } from 'lucide-react'
import { useNodes } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/nodes/')({
  component: NodesIndex,
})

function NodesIndex() {
  const devices = useNodes()
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
                      {device.deviceType === 'macos' || device.deviceType === 'linux' ? (
                        <Monitor size={18} className="text-cyan-400" />
                      ) : (
                        <Smartphone size={18} className="text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <p className="text-xs text-slate-500">{device.deviceType}</p>
                    </div>
                  </div>
                  <Badge variant={device.status === 'online' ? 'success' : device.status === 'sleeping' ? 'warning' : 'danger'}>
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
                  {Object.entries(device.capabilities)
                    .filter(([, v]) => v)
                    .map(([cap]) => (
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
