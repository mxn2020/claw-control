import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '#/components/ui/tabs'
import { Bot, CheckSquare, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/_app/tasks/')({
  component: Tasks,
})

interface Task {
  id: string
  title: string
  agent: string
  status: 'inbox' | 'active' | 'pending_approval' | 'completed'
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  description: string
}

const tasks: Task[] = [
  { id: 't1', title: 'Draft Q1 investor update email', agent: 'Email Drafter', status: 'inbox', priority: 'high', dueDate: 'Today', description: 'Prepare quarterly update for investors' },
  { id: 't2', title: 'Summarize competitor analysis', agent: 'Research Assistant', status: 'inbox', priority: 'medium', dueDate: 'Tomorrow', description: 'Compile competitive landscape report' },
  { id: 't3', title: 'Review PR #247 security changes', agent: 'Code Reviewer', status: 'active', priority: 'high', dueDate: 'Today', description: 'Security patch for auth middleware' },
  { id: 't4', title: 'Generate monthly expense report', agent: 'Finance Tracker', status: 'active', priority: 'medium', dueDate: 'Jan 20', description: 'December expenses categorization' },
  { id: 't5', title: 'Schedule team retrospective', agent: 'Meeting Summarizer', status: 'active', priority: 'low', dueDate: 'Jan 22', description: 'Find optimal time for all team members' },
  { id: 't6', title: 'Publish blog post on AI trends', agent: 'Research Assistant', status: 'pending_approval', priority: 'medium', dueDate: 'Jan 18', description: 'Final review before publishing' },
  { id: 't7', title: 'Send partnership follow-up', agent: 'Email Drafter', status: 'pending_approval', priority: 'high', dueDate: 'Today', description: 'Awaiting your approval to send' },
  { id: 't8', title: 'Database migration plan review', agent: 'Code Reviewer', status: 'completed', priority: 'high', dueDate: 'Jan 14', description: 'Migration plan approved and documented' },
  { id: 't9', title: 'Weekly standup notes compiled', agent: 'Meeting Summarizer', status: 'completed', priority: 'low', dueDate: 'Jan 15', description: "All notes from this week's standups" },
]

const priorityColor = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function TaskCard({ task }: { task: Task }) {
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
                <span>{task.agent}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Tasks() {
  const inbox = tasks.filter((t) => t.status === 'inbox')
  const active = tasks.filter((t) => t.status === 'active')
  const pending = tasks.filter((t) => t.status === 'pending_approval')
  const completed = tasks.filter((t) => t.status === 'completed')

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

      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox ({inbox.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval ({pending.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">
          <div className="space-y-2 mt-4">{inbox.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </TabsContent>
        <TabsContent value="active">
          <div className="space-y-2 mt-4">{active.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="space-y-2 mt-4">{pending.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="space-y-2 mt-4">{completed.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
