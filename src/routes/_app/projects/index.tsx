import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { FolderKanban, Bot, Plus, Calendar } from 'lucide-react'

export const Route = createFileRoute('/_app/projects/')({
  component: Projects,
})

const projects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with new branding',
    status: 'active' as const,
    progress: 65,
    agents: ['Code Reviewer', 'Research Assistant'],
    tasks: { total: 24, done: 16 },
    dueDate: 'Feb 15, 2025',
  },
  {
    id: 'p2',
    name: 'Q1 Marketing Campaign',
    description: 'Multi-channel marketing push for the new product launch',
    status: 'active' as const,
    progress: 40,
    agents: ['Email Drafter', 'Research Assistant'],
    tasks: { total: 18, done: 7 },
    dueDate: 'Mar 1, 2025',
  },
  {
    id: 'p3',
    name: 'API v2 Migration',
    description: 'Migrate all clients to the new API version with zero downtime',
    status: 'active' as const,
    progress: 82,
    agents: ['Code Reviewer'],
    tasks: { total: 30, done: 25 },
    dueDate: 'Jan 31, 2025',
  },
  {
    id: 'p4',
    name: 'Annual Financial Report',
    description: '2024 annual report compilation and review',
    status: 'completed' as const,
    progress: 100,
    agents: ['Finance Tracker'],
    tasks: { total: 12, done: 12 },
    dueDate: 'Jan 10, 2025',
  },
  {
    id: 'p5',
    name: 'Customer Onboarding Flow',
    description: 'Redesign the onboarding experience for new customers',
    status: 'planning' as const,
    progress: 10,
    agents: ['Research Assistant', 'Email Drafter'],
    tasks: { total: 15, done: 1 },
    dueDate: 'Apr 1, 2025',
  },
]

const statusColor = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  planning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track projects and their assigned agents
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:border-cyan-500/30 transition-all cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FolderKanban size={16} className="text-cyan-400" />
                  {project.name}
                </CardTitle>
                <Badge className={statusColor[project.status]}>{project.status}</Badge>
              </div>
              <p className="text-sm text-slate-400">{project.description}</p>
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
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Bot size={12} />
                    <span>{project.agents.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar size={12} />
                    <span>{project.dueDate}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  {project.tasks.done}/{project.tasks.total} tasks completed
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
