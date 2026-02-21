import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Clock, Timer, Webhook, Mail, Calendar, Filter, Plus, Power } from 'lucide-react'
import { useCronJobs } from '#/lib/dataHooks'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_app/automations/triggers')({
  component: TriggersPage,
})

const typeIcons: Record<string, typeof Clock> = {
  Cron: Timer,
  Webhook: Webhook,
  Email: Mail,
  Calendar: Calendar,
}

const typeLabels = ['All', 'Cron', 'Webhook', 'Email', 'Calendar']

function TriggersPage() {
  const [activeType, setActiveType] = useState('All')
  const cronJobs = useCronJobs() ?? []
  const updateCronJob = useMutation(api.cronJobs.update)

  // Map cron jobs to trigger-like items
  const triggers = cronJobs.map((job) => ({
    id: job._id,
    name: job.name,
    type: 'Cron',
    description: job.instruction ?? `Scheduled: ${job.schedule}`,
    status: job.enabled ? ('active' as const) : ('paused' as const),
    lastFired: job.lastRunAt ? new Date(job.lastRunAt).toLocaleString() : 'Never',
    schedule: job.schedule,
  }))

  const filtered = activeType === 'All' ? triggers : triggers.filter((t) => t.type === activeType)

  async function toggleEnabled(id: string, currentlyEnabled: boolean) {
    try {
      await updateCronJob({ id: id as any, enabled: !currentlyEnabled })
    } catch (err) {
      console.error('Failed to toggle trigger:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Triggers</h1>
          <p className="text-sm text-slate-400 mt-1">
            Automate workflows with scheduled and event-driven triggers
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-3.5 h-3.5 mr-1" />
          Create Trigger
        </Button>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {typeLabels.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeType === type
              ? 'bg-cyan-600 text-white'
              : 'border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((trigger) => {
          const Icon = typeIcons[trigger.type] ?? Clock
          return (
            <Card key={trigger.id}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">{trigger.name}</span>
                      <Badge variant={trigger.status === 'active' ? 'success' : 'warning'}>{trigger.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{trigger.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Schedule: <code className="font-mono text-slate-400">{trigger.schedule}</code></span>
                      <span>Last fired: {trigger.lastFired}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleEnabled(trigger.id, trigger.status === 'active')}
                    className={trigger.status === 'active' ? 'text-emerald-400' : 'text-slate-400'}
                  >
                    <Power className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No {activeType === 'All' ? '' : activeType.toLowerCase() + ' '}triggers configured</p>
          </div>
        )}
      </div>
    </div>
  )
}
