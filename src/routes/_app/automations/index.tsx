import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Workflow, Plus, Play, Pause, Zap, GitBranch } from 'lucide-react'

export const Route = createFileRoute('/_app/automations/')({
  component: Automations,
})

const workflows = [
  {
    id: 'w1',
    name: 'Morning Briefing Pipeline',
    description: 'Collects weather, calendar, email, and news data to generate daily briefing',
    status: 'active' as const,
    trigger: 'Daily at 7:00 AM',
    steps: 5,
    lastRun: '7:00 AM today',
    agent: 'Research Assistant',
  },
  {
    id: 'w2',
    name: 'Email Auto-Draft',
    description: 'Monitors inbox for high-priority emails and drafts replies for approval',
    status: 'active' as const,
    trigger: 'On new email',
    steps: 3,
    lastRun: '9:30 AM today',
    agent: 'Email Drafter',
  },
  {
    id: 'w3',
    name: 'PR Review Automation',
    description: 'Auto-reviews new pull requests and posts comments with suggestions',
    status: 'active' as const,
    trigger: 'On PR opened',
    steps: 4,
    lastRun: 'Yesterday 4:15 PM',
    agent: 'Code Reviewer',
  },
  {
    id: 'w4',
    name: 'Weekly Expense Report',
    description: 'Aggregates expenses, categorizes, and generates report every Friday',
    status: 'paused' as const,
    trigger: 'Weekly on Friday',
    steps: 6,
    lastRun: 'Jan 10, 2025',
    agent: 'Finance Tracker',
  },
  {
    id: 'w5',
    name: 'Meeting Notes Compiler',
    description: 'Records meeting audio, transcribes, and creates action items',
    status: 'active' as const,
    trigger: 'On meeting end',
    steps: 4,
    lastRun: 'Yesterday 3:30 PM',
    agent: 'Meeting Summarizer',
  },
]

const templates = [
  { name: 'Social Media Monitor', description: 'Track mentions and sentiment across platforms', category: 'Marketing' },
  { name: 'Invoice Processor', description: 'Extract data from invoices and update records', category: 'Finance' },
  { name: 'Customer Feedback Loop', description: 'Collect, analyze, and route customer feedback', category: 'Support' },
  { name: 'Content Pipeline', description: 'Research, draft, edit, and schedule content', category: 'Content' },
]

function Automations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automations</h1>
          <p className="text-sm text-slate-400 mt-1">
            Build and manage automated workflows powered by your agents
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          New Workflow
        </Button>
      </div>

      {/* Workflow List */}
      <div className="space-y-3">
        {workflows.map((wf) => (
          <Card key={wf.id} className="hover:border-cyan-500/30 transition-all">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Workflow size={16} className="text-cyan-400" />
                    <p className="text-sm font-medium text-white">{wf.name}</p>
                    <Badge className={wf.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}>
                      {wf.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{wf.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Zap size={11} /> Trigger: {wf.trigger}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch size={11} /> {wf.steps} steps
                    </span>
                    <span>Agent: {wf.agent}</span>
                    <span>Last run: {wf.lastRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {wf.status === 'active' ? (
                    <Button size="sm" variant="outline" className="text-slate-400 border-slate-600">
                      <Pause size={14} className="mr-1" /> Pause
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Play size={14} className="mr-1" /> Resume
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visual Flow Builder Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            Visual Flow Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] rounded-lg border border-dashed border-slate-700 bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <Workflow size={32} className="text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Drag-and-drop flow builder coming soon</p>
              <p className="text-xs text-slate-600 mt-1">Create complex multi-step automations visually</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Workflow Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {templates.map((tpl) => (
              <div key={tpl.name} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 hover:border-cyan-500/50 transition-all cursor-pointer">
                <Badge className="bg-slate-700 text-slate-300 text-xs mb-2">{tpl.category}</Badge>
                <p className="text-sm font-medium text-white">{tpl.name}</p>
                <p className="text-xs text-slate-500 mt-1">{tpl.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
