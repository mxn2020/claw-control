import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Clock, Bot, Plus, CheckCircle2, XCircle, Calendar } from 'lucide-react'

export const Route = createFileRoute('/_app/cron/')({
  component: Cron,
})

const jobs = [
  {
    id: 'cron1',
    name: 'Morning Briefing',
    schedule: 'Every day at 7:00 AM',
    nextRun: 'Tomorrow, 7:00 AM',
    lastRun: 'Today, 7:00 AM',
    lastStatus: 'success' as const,
    agent: 'Research Assistant',
    enabled: true,
  },
  {
    id: 'cron2',
    name: 'Inbox Triage',
    schedule: 'Every 30 minutes',
    nextRun: 'In 12 min',
    lastRun: '18 min ago',
    lastStatus: 'success' as const,
    agent: 'Email Drafter',
    enabled: true,
  },
  {
    id: 'cron3',
    name: 'Weekly Expense Report',
    schedule: 'Every Friday at 5:00 PM',
    nextRun: 'Fri, Jan 17',
    lastRun: 'Jan 10, 2025',
    lastStatus: 'success' as const,
    agent: 'Finance Tracker',
    enabled: true,
  },
  {
    id: 'cron4',
    name: 'Competitor Monitor',
    schedule: 'Every day at 9:00 AM',
    nextRun: 'Tomorrow, 9:00 AM',
    lastRun: 'Today, 9:00 AM',
    lastStatus: 'failed' as const,
    agent: 'Research Assistant',
    enabled: true,
  },
  {
    id: 'cron5',
    name: 'Database Backup Check',
    schedule: 'Every 6 hours',
    nextRun: 'In 4 hrs',
    lastRun: '2 hrs ago',
    lastStatus: 'success' as const,
    agent: 'Code Reviewer',
    enabled: true,
  },
  {
    id: 'cron6',
    name: 'Social Media Post',
    schedule: 'Mon, Wed, Fri at 10:00 AM',
    nextRun: 'Fri, Jan 17',
    lastRun: 'Jan 15, 2025',
    lastStatus: 'success' as const,
    agent: 'Research Assistant',
    enabled: false,
  },
]

function Cron() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cron Jobs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Scheduled and recurring agent tasks
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-xl font-bold text-white">{jobs.filter(j => j.enabled).length}</p>
              <p className="text-xs text-slate-500">Active Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xl font-bold text-white">{jobs.filter(j => j.lastStatus === 'success').length}</p>
              <p className="text-xs text-slate-500">Last Run OK</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-xl font-bold text-white">{jobs.filter(j => j.lastStatus === 'failed').length}</p>
              <p className="text-xs text-slate-500">Failed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job List */}
      <div className="space-y-2">
        {jobs.map((job) => (
          <Card key={job.id} className={`transition-all ${!job.enabled ? 'opacity-60' : 'hover:border-cyan-500/30'}`}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-cyan-400" />
                    <p className="text-sm font-medium text-white">{job.name}</p>
                    {!job.enabled && <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20">disabled</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Schedule: {job.schedule}</span>
                    <span className="flex items-center gap-1">
                      <Bot size={11} /> {job.agent}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <div className="text-right">
                    <p className="text-slate-500">Next run</p>
                    <p className="text-slate-300">{job.nextRun}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500">Last run</p>
                    <div className="flex items-center gap-1">
                      {job.lastStatus === 'success' ? (
                        <CheckCircle2 size={12} className="text-emerald-400" />
                      ) : (
                        <XCircle size={12} className="text-red-400" />
                      )}
                      <span className="text-slate-300">{job.lastRun}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar View Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] rounded-lg border border-dashed border-slate-700 bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <Calendar size={32} className="text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Calendar view coming soon</p>
              <p className="text-xs text-slate-600 mt-1">Visualize your scheduled jobs on a weekly/monthly calendar</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
