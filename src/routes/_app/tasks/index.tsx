import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { CheckSquare, Plus, Clock, AlertCircle, Play, RotateCcw } from 'lucide-react'
import { useTasks } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/tasks/')({
  component: TasksPage,
})

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  done: 'success',
  running: 'warning',
  queued: 'default',
  needs_review: 'warning',
  failed: 'danger',
}

const priorityColors: Record<string, 'danger' | 'warning' | 'default'> = {
  high: 'danger', medium: 'warning', low: 'default',
}

const timeAgo = (ms: number) => {
  const diff = Date.now() - ms
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
  return `${Math.floor(diff / 86_400_000)}d ago`
}

function TasksPage() {
  const allTasks = useTasks()

  const groups = {
    active: allTasks.filter((t) => t.status === 'running' || t.status === 'queued'),
    review: allTasks.filter((t) => t.status === 'needs_review'),
    done: allTasks.filter((t) => (t.status as string) === 'done'),
    failed: allTasks.filter((t) => (t.status as string) === 'failed'),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-sm text-slate-400 mt-1">Agent-driven task pipeline</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1.5" /> New Task
        </Button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active', count: groups.active.length, icon: <Play className="w-4 h-4" />, color: 'text-cyan-400' },
          { label: 'Needs Review', count: groups.review.length, icon: <AlertCircle className="w-4 h-4" />, color: 'text-amber-400' },
          { label: 'Completed', count: groups.done.length, icon: <CheckSquare className="w-4 h-4" />, color: 'text-emerald-400' },
          { label: 'Failed', count: groups.failed.length, icon: <RotateCcw className="w-4 h-4" />, color: 'text-red-400' },
        ].map((g) => (
          <Card key={g.label}>
            <CardContent className="pt-4 pb-3">
              <div className={`flex items-center gap-2 ${g.color} mb-1`}>
                {g.icon}
                <span className="text-sm font-medium">{g.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{g.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task groups */}
      {(Object.entries(groups) as [string, typeof allTasks][]).map(([group, tasks]) => {
        if (tasks.length === 0) return null
        return (
          <div key={group}>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {group === 'active' ? 'Active' : group === 'review' ? '🔍 Needs Review' : group === 'done' ? '✅ Completed' : '❌ Failed'}
            </h2>
            <div className="space-y-2">
              {tasks.map((task) => (
                <Card key={task.id} className={task.priority === 'high' && task.status !== 'done' ? 'border-amber-500/30' : ''}>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white truncate">{task.title}</p>
                        </div>
                        {task.description && (
                          <p className="text-xs text-slate-400 truncate">{task.description}</p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
                          <span className="font-mono">{task.agentId}</span>
                          <span>·</span>
                          <span>{timeAgo(task.createdAt)}</span>
                          {task.deadline && task.status !== 'done' && (
                            <>
                              <span>·</span>
                              <Clock className="w-3 h-3" />
                              <span className={task.deadline < Date.now() ? 'text-red-400' : ''}>
                                {task.deadline < Date.now() ? 'Overdue' : `Due ${timeAgo(Date.now() - (task.deadline - Date.now()))}`}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
                        <Badge variant={statusColors[task.status]}>{task.status.replace('_', ' ')}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      {allTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">No tasks yet. Create your first task to get started.</p>
        </div>
      )}
    </div>
  )
}
