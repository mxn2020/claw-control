import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { Bot, CheckSquare, Clock, AlertCircle, CheckCircle2, Play, Trash2 } from 'lucide-react'
import { useTasks } from '#/lib/dataHooks'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import type { Id } from '../../../../convex/_generated/dataModel'
import { useDataContext } from '#/lib/dataContext'
import type { MockTask } from '#/lib/dataContext'

export const Route = createFileRoute('/_app/tasks/')({
  component: Tasks,
})

const priorityColor = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const formatDeadline = (ts: number) => {
  const d = new Date(ts)
  const now = new Date()
  const diffDays = Math.round((ts - now.getTime()) / 86_400_000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function TaskCard({
  task,
  onStart,
  onComplete,
  onDelete,
}: {
  task: MockTask
  onStart?: (id: string) => Promise<void>
  onComplete?: (id: string) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}) {
  return (
    <Card className="hover:border-cyan-500/30 transition-all">
      <CardContent className="py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-white">{task.title}</p>
              <Badge className={priorityColor[task.priority]}>{task.priority}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">{task.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Bot size={12} />
                <span>{task.agentId}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                <span>{formatDeadline(task.deadline)}</span>
              </div>
            </div>
          </div>
          {(onStart || onComplete || onDelete) && (
            <div className="flex items-center gap-1 ml-3 shrink-0">
              {task.status === 'queued' && onStart && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => onStart(task.id)}
                >
                  <Play size={11} className="mr-1" /> Start
                </Button>
              )}
              {(task.status === 'running' || task.status === 'needs_review') && onComplete && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                  onClick={() => onComplete(task.id)}
                >
                  <CheckCircle2 size={11} className="mr-1" /> Done
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs border-red-500/40 text-red-400 hover:bg-red-500/10"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 size={11} />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Connected variant — useMutation safe here (inside ConvexProvider)
function TasksConnected({ allTasks }: { allTasks: MockTask[] }) {
  const updateTask = useMutation(api.tasks.update)
  const deleteTask = useMutation(api.tasks.remove)

  const handleStart = async (id: string) => {
    await updateTask({ id: id as Id<'tasks'>, status: 'running' })
  }
  const handleComplete = async (id: string) => {
    await updateTask({ id: id as Id<'tasks'>, status: 'done' })
  }
  const handleDelete = async (id: string) => {
    await deleteTask({ id: id as Id<'tasks'> })
  }

  return <TaskTabView
    allTasks={allTasks}
    onStart={handleStart}
    onComplete={handleComplete}
    onDelete={handleDelete}
  />
}

function TaskTabView({
  allTasks,
  onStart,
  onComplete,
  onDelete,
}: {
  allTasks: MockTask[]
  onStart?: (id: string) => Promise<void>
  onComplete?: (id: string) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}) {
  const inbox = allTasks.filter((t) => t.status === 'queued')
  const active = allTasks.filter((t) => t.status === 'running')
  const pending = allTasks.filter((t) => t.status === 'needs_review')
  const completed = allTasks.filter((t) => t.status === 'done')

  return (
    <Tabs defaultValue="inbox">
      <TabsList>
        <TabsTrigger value="inbox">Inbox ({inbox.length})</TabsTrigger>
        <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
        <TabsTrigger value="pending">Pending Approval ({pending.length})</TabsTrigger>
        <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <div className="space-y-2 mt-4">{inbox.map((t) => <TaskCard key={t.id} task={t} onStart={onStart} onDelete={onDelete} />)}</div>
      </TabsContent>
      <TabsContent value="active">
        <div className="space-y-2 mt-4">{active.map((t) => <TaskCard key={t.id} task={t} onComplete={onComplete} onDelete={onDelete} />)}</div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="space-y-2 mt-4">{pending.map((t) => <TaskCard key={t.id} task={t} onComplete={onComplete} onDelete={onDelete} />)}</div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="space-y-2 mt-4">{completed.map((t) => <TaskCard key={t.id} task={t} />)}</div>
      </TabsContent>
    </Tabs>
  )
}

function Tasks() {
  const allTasks = useTasks()
  const ctx = useDataContext()

  const inbox = allTasks.filter((t) => t.status === 'queued')
  const active = allTasks.filter((t) => t.status === 'running')
  const pending = allTasks.filter((t) => t.status === 'needs_review')
  const completed = allTasks.filter((t) => t.status === 'done')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage tasks across all your agents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-xl font-bold text-white">{inbox.length}</p>
              <p className="text-xs text-slate-500">Inbox</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-xl font-bold text-white">{active.length}</p>
              <p className="text-xs text-slate-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-xl font-bold text-white">{pending.length}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xl font-bold text-white">{completed.length}</p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {ctx ? (
        <TasksConnected allTasks={allTasks} />
      ) : (
        <TaskTabView allTasks={allTasks} />
      )}
    </div>
  )
}
