import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Sun, Calendar, CheckSquare, Newspaper, Clock, Zap, Bot } from 'lucide-react'
import { useTasks, useApprovals, useCronJobs } from '#/lib/dataHooks'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_app/briefing/')({
  component: Briefing,
})

function Briefing() {
  const { user } = useAuth()
  const allTasks = useTasks() ?? []
  const allApprovals = useApprovals() ?? []
  const allCron = useCronJobs() ?? []

  const activeTasks = allTasks.filter(
    (t) => t.status === 'running' || t.status === 'queued' || t.status === 'needs_review'
  )
  const pendingApprovals = allApprovals.filter((a) => a.status === 'pending')
  const activeCron = allCron.filter((c) => c.enabled)

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const greeting =
    now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {greeting}, {user?.name?.split(' ')[0] ?? 'there'}
        </h1>
        <p className="text-sm text-slate-400 mt-1">{dateStr} — your daily briefing</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-white">{activeTasks.length}</p>
            <p className="text-xs text-slate-400 mt-1">Active Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-amber-400">{pendingApprovals.length}</p>
            <p className="text-xs text-slate-400 mt-1">Pending Approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">{activeCron.length}</p>
            <p className="text-xs text-slate-400 mt-1">Active Automations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-cyan-400">
              {allTasks.filter((t) => t.status === 'done').length}
            </p>
            <p className="text-xs text-slate-400 mt-1">Completed Tasks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Priorities — Real Data */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              Task Priorities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTasks.length > 0 ? (
              <div className="space-y-2">
                {activeTasks.slice(0, 6).map((task) => (
                  <div key={task._id} className="flex items-center gap-2 text-sm">
                    <Badge
                      className={
                        task.priority === 'high'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : task.priority === 'medium'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }
                    >
                      {task.priority ?? 'normal'}
                    </Badge>
                    <span className="text-slate-300 flex-1 truncate">{task.title}</span>
                    <Badge
                      className={
                        task.status === 'running'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : task.status === 'needs_review'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">No active tasks right now ✨</p>
            )}
          </CardContent>
        </Card>

        {/* Pending Approvals — Real Data */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingApprovals.length > 0 ? (
              <div className="space-y-2">
                {pendingApprovals.slice(0, 5).map((approval) => (
                  <div
                    key={approval._id}
                    className="flex items-center gap-2 text-sm rounded-md bg-slate-800/50 px-3 py-2"
                  >
                    <Badge
                      className={
                        approval.riskLevel === 'high'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : approval.riskLevel === 'medium'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }
                    >
                      {approval.riskLevel}
                    </Badge>
                    <span className="text-slate-300 flex-1 truncate">{approval.description}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">All clear — nothing to approve</p>
            )}
          </CardContent>
        </Card>

        {/* Active Automations — Real Data */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              Active Automations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeCron.length > 0 ? (
              <div className="space-y-2">
                {activeCron.slice(0, 5).map((job) => (
                  <div
                    key={job._id}
                    className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2"
                  >
                    <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{job.name}</p>
                      <p className="text-xs text-slate-500">
                        Schedule: <code className="font-mono text-slate-400">{job.schedule}</code>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">No active automations</p>
            )}
          </CardContent>
        </Card>

        {/* Weather & Calendar — Integration Placeholder */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              Weather & Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-slate-600" />
                <Sun className="w-5 h-5 text-slate-600" />
              </div>
              <p className="text-sm text-slate-500">
                Connect your calendar and location services to see weather and schedule here
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Settings → Integrations → Calendar & Weather
              </p>
            </div>
          </CardContent>
        </Card>

        {/* News — Future Integration */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-cyan-400" />
              News & Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Newspaper className="w-8 h-8 text-slate-600 mb-3" />
              <p className="text-sm text-slate-500">
                News aggregation will be available once a research agent is configured with web search skills
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Assign a research agent → Enable web-search skill → News appears here automatically
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
