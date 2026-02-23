import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { FolderKanban, Bot, Plus, CheckSquare } from 'lucide-react'
import { useTasks, useAgents } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/projects/')({
  component: Projects,
})

const statusColor: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  planning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

function Projects() {
  const allTasks = useTasks() ?? []
  const allAgents = useAgents() ?? []

  // Group tasks by agent to simulate project-like views
  const agentIds = [...new Set(allTasks.filter((t) => t.agentId).map((t) => t.agentId!))]
  const agentMap = new Map(allAgents.map((a) => [a._id, a]))

  const projects = agentIds.map((agentId) => {
    const agent = agentMap.get(agentId as any)
    const tasks = allTasks.filter((t) => t.agentId === agentId)
    const done = tasks.filter((t) => t.status === 'done').length
    const total = tasks.length
    const progress = total > 0 ? Math.round((done / total) * 100) : 0
    const hasActive = tasks.some((t) => t.status === 'running' || t.status === 'queued')
    const allDone = total > 0 && done === total

    return {
      id: agentId,
      name: agent?.name ?? 'Unknown Agent',
      tasks,
      done,
      total,
      progress,
      status: allDone ? 'completed' : hasActive ? 'active' : 'planning',
    }
  })

  // Also show unassigned tasks as a "General" project
  const unassigned = allTasks.filter((t) => !t.agentId)
  if (unassigned.length > 0) {
    const done = unassigned.filter((t) => t.status === 'done').length
    projects.push({
      id: '__unassigned',
      name: 'Unassigned Tasks',
      tasks: unassigned,
      done,
      total: unassigned.length,
      progress: Math.round((done / unassigned.length) * 100),
      status: done === unassigned.length ? 'completed' : 'active',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-400 mt-1">
            Tasks grouped by assigned agent — {allTasks.length} total tasks across{' '}
            {projects.length} projects
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Task
        </Button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover:border-cyan-500/30 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FolderKanban size={16} className="text-cyan-400" />
                    {project.name}
                  </CardTitle>
                  <Badge className={statusColor[project.status] ?? statusColor.active}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-300">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Task breakdown */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-400">
                      <CheckSquare size={12} />
                      <span>
                        {project.done}/{project.total} tasks completed
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Bot size={12} />
                      <span>{project.name}</span>
                    </div>
                  </div>

                  {/* Recent tasks */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                    {project.tasks.slice(0, 3).map((task) => (
                      <div key={task._id} className="flex items-center gap-2 text-xs">
                        <div
                          className={`h-3 w-3 rounded-full flex-shrink-0 ${task.status === 'done'
                            ? 'bg-cyan-500'
                            : task.status === 'running'
                              ? 'bg-emerald-500'
                              : task.status === 'failed'
                                ? 'bg-red-500'
                                : 'bg-slate-600'
                            }`}
                        />
                        <span
                          className={`truncate ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-300'}`}
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No tasks or projects yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Create tasks and assign them to agents to see project progress here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
