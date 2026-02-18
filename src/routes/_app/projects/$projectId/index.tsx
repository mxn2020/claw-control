import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { FolderKanban, Bot, MessageSquare, FileText, Brain, Clock, Layout, CheckSquare } from 'lucide-react'

export const Route = createFileRoute('/_app/projects/$projectId/')({
  component: ProjectDetail,
})

const project = {
  name: 'Website Redesign',
  description: 'Complete overhaul of the company website with new branding, improved UX, and modernized tech stack. Includes migration from legacy CMS to headless architecture.',
  status: 'active' as const,
  progress: 65,
  startDate: 'Dec 1, 2024',
  dueDate: 'Feb 15, 2025',
  agents: [
    { name: 'Code Reviewer', status: 'active' as const },
    { name: 'Research Assistant', status: 'active' as const },
    { name: 'Content Writer', status: 'idle' as const },
  ],
}

const tabs = [
  { label: 'Chat', icon: <MessageSquare size={14} /> },
  { label: 'Canvas', icon: <Layout size={14} /> },
  { label: 'Tasks', icon: <CheckSquare size={14} /> },
  { label: 'Files', icon: <FileText size={14} /> },
  { label: 'Memory', icon: <Brain size={14} /> },
  { label: 'Timeline', icon: <Clock size={14} /> },
]

const recentActivity = [
  { action: 'Code Reviewer analyzed PR #42', time: '10 min ago', type: 'agent' as const },
  { action: 'New file uploaded: brand-guidelines-v2.pdf', time: '1 hr ago', type: 'file' as const },
  { action: 'Task "Hero section redesign" marked complete', time: '2 hrs ago', type: 'task' as const },
  { action: 'Research Assistant summarized competitor analysis', time: '3 hrs ago', type: 'agent' as const },
  { action: 'Sprint milestone: Homepage wireframes approved', time: '5 hrs ago', type: 'milestone' as const },
  { action: 'New branch created: feat/new-navigation', time: 'Yesterday', type: 'code' as const },
  { action: 'Content Writer drafted About page copy', time: 'Yesterday', type: 'agent' as const },
  { action: 'Meeting notes added: Design Sprint Kickoff', time: '2 days ago', type: 'note' as const },
]

const statusColor = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  idle: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const activityTypeColor = {
  agent: 'text-cyan-400',
  file: 'text-amber-400',
  task: 'text-emerald-400',
  milestone: 'text-purple-400',
  code: 'text-orange-400',
  note: 'text-slate-400',
}

function ProjectDetail() {
  const { projectId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{project.status}</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">{project.description}</p>
          <p className="text-xs text-slate-600 mt-1">Project ID: {projectId}</p>
        </div>
      </div>

      {/* Progress & Meta */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-white font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-slate-500">Started {project.startDate}</p>
              <p className="text-xs text-slate-500">Due {project.dueDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-700/60 pb-px">
        {tabs.map((tab, i) => (
          <Button
            key={tab.label}
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1.5 text-sm rounded-none border-b-2 ${
              i === 0
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${activityTypeColor[item.type].replace('text-', 'bg-')}`} />
                  <span className="text-sm text-slate-300 flex-1">{item.action}</span>
                  <span className="text-xs text-slate-500 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Agents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              Assigned Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.agents.map((agent) => (
                <div key={agent.name} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <FolderKanban size={14} className="text-cyan-400" />
                    <span className="text-sm text-white">{agent.name}</span>
                  </div>
                  <Badge className={`text-xs ${statusColor[agent.status]}`}>{agent.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
