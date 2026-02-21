import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import { useToast } from '#/components/ui/toast'
import type { Id } from '../../../../../../../convex/_generated/dataModel'
import { Radio, Plus, Trash2, Wifi, WifiOff } from 'lucide-react'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convexApi = api as Record<string, any>

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/channels/connectors')({ component: InstanceChannelConnectors })

const PLATFORMS = [
  { id: 'whatsapp', label: 'WhatsApp', color: 'text-emerald-400' },
  { id: 'telegram', label: 'Telegram', color: 'text-blue-400' },
  { id: 'discord', label: 'Discord', color: 'text-violet-400' },
  { id: 'slack', label: 'Slack', color: 'text-amber-400' },
  { id: 'webchat', label: 'WebChat', color: 'text-cyan-400' },
  { id: 'email', label: 'Email (SMTP)', color: 'text-rose-400' },
  { id: 'sms', label: 'SMS (Twilio)', color: 'text-orange-400' },
]

function InstanceChannelConnectors() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const channels = useQuery(convexApi.platform?.listChannels ?? null, {})
  const list = channels ?? []

  const { toast } = useToast()
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Channel Connectors</h1>
          <p className="text-sm text-slate-400 mt-1">
            {instance?.name ?? 'Instance'} — {list.length} connector{list.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Connector
        </Button>
      </div>

      {showAdd && (
        <Card>
          <CardHeader><CardTitle className="text-base">Add a Channel</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    toast(`${p.label} connector added (requires VPS agent for real connectivity)`, 'info')
                    setShowAdd(false)
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left"
                >
                  <Radio className={`w-4 h-4 ${p.color}`} />
                  <span className="text-sm text-white">{p.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Active Connectors</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {list.length === 0 && (
              <div className="text-center py-8">
                <Radio className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No connectors configured. Add one to enable multi-channel messaging.</p>
              </div>
            )}
            {list.map((ch: { _id: string; name: string; platform: string; status: string }) => (
              <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div className="flex items-center gap-3">
                  {ch.status === 'connected'
                    ? <Wifi className="w-4 h-4 text-emerald-400" />
                    : <WifiOff className="w-4 h-4 text-slate-500" />}
                  <div>
                    <span className="text-sm font-medium text-white">{ch.name}</span>
                    <p className="text-xs text-slate-400">{ch.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
                  <button className="text-slate-500 hover:text-red-400 transition-colors" title="Remove connector">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
