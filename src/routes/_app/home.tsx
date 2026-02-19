import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Bot, CheckSquare, Newspaper, Zap, MessageSquare, Clock, TrendingUp } from 'lucide-react'
import { useAuth } from '#/lib/authContext'
import { useTasks, useApprovals, useCronJobs } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/home')({
  component: Home,
})

const timeAgo = (ms: number) => {
  const diff = Date.now() - ms
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
  return `${Math.floor(diff / 86_400_000)}d ago`
}

function Home() {
  const { user } = useAuth()
  const allTasks = useTasks()
  const allApprovals = useApprovals()
  const allCron = useCronJobs()

  const activeTasks = allTasks.filter((t) => t.status === 'running' || t.status === 'queued')
  const pendingApprovals = allApprovals.filter((a) => a.status === 'pending')
  const runningCron = allCron.filter((c) => c.enabled)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const quickActions = [
    { label: 'New Chat', icon: <MessageSquare size={16} />, to: '/chat' },
    { label: 'View Tasks', icon: <CheckSquare size={16} />, to: '/tasks' },
    { label: "Today's Briefing", icon: <Newspaper size={16} />, to: '/briefing' },
    { label: 'Pending Approvals', icon: <Clock size={16} />, to: '/approvals' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {greeting()}, {user?.name ?? 'User'} 👋
        </h1>
        <p className="text-sm text-slate-400 mt-1">Here's what's happening across your ClawVerse</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Tasks</span>
              <CheckSquare className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{activeTasks.length}</span>
            <span className="text-xs text-amber-400 ml-2">
              {allTasks.filter((t) => t.priority === 'high' && t.status !== 'done').length} high priority
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Pending Approvals</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{pendingApprovals.length}</span>
            {pendingApprovals.filter((a) => a.riskLevel === 'high').length > 0 && (
              <span className="text-xs text-red-400 ml-2">
                {pendingApprovals.filter((a) => a.riskLevel === 'high').length} high risk
              </span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Automations</span>
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{runningCron.length}</span>
            <span className="text-xs text-emerald-400 ml-2">running</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Completed Today</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {allTasks.filter((t) => t.status === 'done').length}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Active Tasks</CardTitle>
              <Link to="/tasks" className="text-xs text-cyan-400 hover:text-cyan-300">View all →</Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Bot size={14} className="text-cyan-400 flex-shrink-0" />
                    <p className="text-sm text-white truncate">{task.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}>
                      {task.priority}
                    </Badge>
                    <Badge variant={task.status === 'running' ? 'success' : 'default'}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {activeTasks.length === 0 && (
                <p className="text-sm text-slate-500 py-4 text-center">No active tasks</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Pending Approvals</CardTitle>
              <Link to="/approvals" className="text-xs text-cyan-400 hover:text-cyan-300">Review all →</Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{a.description}</p>
                    <p className="text-xs text-slate-500">{timeAgo(a.createdAt)}</p>
                  </div>
                  <Badge variant={a.riskLevel === 'high' ? 'danger' : a.riskLevel === 'medium' ? 'warning' : 'default'}>
                    {a.riskLevel}
                  </Badge>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <p className="text-sm text-slate-500 py-4 text-center">All caught up! 🎉</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all"
              >
                {action.icon}
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
