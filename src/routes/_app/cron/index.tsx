import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Clock, Plus, ToggleLeft, ToggleRight, Calendar, CheckCircle, XCircle, Minus } from 'lucide-react'
import { useCronJobs } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/cron/')({
  component: CronPage,
})

function CronPage() {
  const cronJobs = useCronJobs()
  const [showNew, setShowNew] = useState(false)

  const enabled = cronJobs.filter((j) => j.enabled).length
  const nextJob = cronJobs
    .filter((j) => j.enabled && j.nextRunAt)
    .sort((a, b) => (a.nextRunAt ?? 0) - (b.nextRunAt ?? 0))[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Scheduled Automations</h1>
          <p className="text-sm text-slate-400 mt-1">
            {enabled} active · {cronJobs.length - enabled} paused
          </p>
        </div>
        <Button size="sm" onClick={() => setShowNew(!showNew)}>
          <Plus className="w-4 h-4 mr-1.5" /> New Schedule
        </Button>
      </div>

      {nextJob && (
        <div className="flex items-center gap-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
          <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <p className="text-sm text-slate-300">
            Next: <span className="text-white font-medium">{nextJob.name}</span>
            {nextJob.nextRunAt && (
              <span className="text-slate-400 ml-2">
                in {Math.ceil(((nextJob.nextRunAt ?? 0) - Date.now()) / 60_000)} min
              </span>
            )}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {cronJobs.map((job) => (
          <Card key={job.id} className={!job.enabled ? 'opacity-60' : ''}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-cyan-400 transition-colors"
                  title={job.enabled ? 'Disable' : 'Enable'}
                >
                  {job.enabled
                    ? <ToggleRight className="w-5 h-5 text-cyan-400" />
                    : <ToggleLeft className="w-5 h-5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-white">{job.name}</p>
                    <code className="text-xs text-slate-500 font-mono bg-slate-800/60 px-1.5 py-0.5 rounded">
                      {job.schedule}
                    </code>
                  </div>
                  {job.instruction && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{job.instruction}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    {job.lastRunStatus && (
                      <span className="flex items-center gap-1">
                        {job.lastRunStatus === 'success'
                          ? <CheckCircle className="w-3 h-3 text-emerald-400" />
                          : job.lastRunStatus === 'failed'
                            ? <XCircle className="w-3 h-3 text-red-400" />
                            : <Minus className="w-3 h-3 text-slate-500" />}
                        Last: {job.lastRunStatus}
                      </span>
                    )}
                    {job.nextRunAt && job.enabled && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Next in {Math.ceil(((job.nextRunAt) - Date.now()) / 60_000)} min
                      </span>
                    )}
                    {job.agentId && <span className="font-mono">{job.agentId}</span>}
                  </div>
                </div>
                <Badge variant={job.enabled ? 'success' : 'default'}>
                  {job.enabled ? 'active' : 'paused'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {cronJobs.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Clock className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p>No scheduled automations yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
