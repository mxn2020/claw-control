import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Plus, Webhook, Activity } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/settings/webhooks')({ component: SettingsWebhooks })

function SettingsWebhooks() {
  const channels = useQuery(api.platform.listChannels, {})
  const channelList = channels?.filter(c => c.platform === 'webhook') ?? []
  const [isAdding, setIsAdding] = useState(false)
  const [newUrl, setNewUrl] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Webhooks</h1>
          <p className="text-sm text-slate-400 mt-1">Manage outbound webhook integrations</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "outline" : "default"}>
          {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Webhook</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-cyan-500/50 bg-cyan-950/10">
          <CardHeader>
            <CardTitle className="text-base text-cyan-400">Add Webhook Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="https://api.example.com/webhook"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
              />
              <Button disabled={!newUrl.trim()}>Save Endpoint</Button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Payloads will be signed using HMAC SHA-256 signatures.</p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Webhook className="w-4 h-4 text-cyan-400" />
            <CardTitle>Configured Webhooks</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {channelList.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No webhooks configured yet.</p>}
            {channelList.map(ch => (
              <div key={ch._id} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <div>
                  <span className="text-sm font-medium text-white">{ch.name}</span>
                  <p className="text-xs text-slate-400 font-mono mt-1">{ch.config || 'https://example.com/webhook'}</p>
                </div>
                <Badge variant={ch.status === 'connected' ? 'success' : 'default'}>{ch.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <CardTitle>Recent Deliveries</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-slate-500">
            <Activity className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p>No recent webhook deliveries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
