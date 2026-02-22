import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Workflow, Plus, Clock, Zap, GitBranch, Power } from 'lucide-react'
import { useCronJobs } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/automations/')({
  component: Automations,
})

const templates = [
  {
    name: 'Social Media Monitor',
    description: 'Track mentions and sentiment across platforms',
    category: 'Marketing',
  },
  {
    name: 'Invoice Processor',
    description: 'Extract data from invoices and update records',
    category: 'Finance',
  },
  {
    name: 'Customer Feedback Loop',
    description: 'Collect, analyze, and route customer feedback',
    category: 'Support',
  },
  {
    name: 'Content Pipeline',
    description: 'Research, draft, edit, and schedule content',
    category: 'Content',
  },
]

function Automations() {
  const cronJobs = useCronJobs() ?? []

  const active = cronJobs.filter((j) => j.enabled)
  const paused = cronJobs.filter((j) => !j.enabled)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automations</h1>
          <p className="text-sm text-slate-400 mt-1">
            Build and manage automated workflows powered by your agents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/automations/triggers">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Clock size={14} className="mr-1" />
              Triggers
            </Button>
          </Link>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-white">{cronJobs.length}</p>
            <p className="text-xs text-slate-400 mt-1">Total Workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">{active.length}</p>
            <p className="text-xs text-slate-400 mt-1">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-slate-400">{paused.length}</p>
            <p className="text-xs text-slate-400 mt-1">Paused</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow List */}
      {cronJobs.length > 0 ? (
        <div className="space-y-3">
          {cronJobs.map((job) => (
            <Card key={job._id} className="hover:border-cyan-500/30 transition-all">
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Workflow size={16} className="text-cyan-400" />
                      <p className="text-sm font-medium text-white">{job.name}</p>
                      <Badge
                        className={
                          job.enabled
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        }
                      >
                        {job.enabled ? 'active' : 'paused'}
                      </Badge>
                    </div>
                    {job.instruction && (
                      <p className="text-sm text-slate-400">{job.instruction}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Zap size={11} />
                        Schedule: <code className="font-mono text-slate-400">{job.schedule}</code>
                      </span>
                      {job.lastRunAt && (
                        <span>
                          Last run: {new Date(job.lastRunAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={job.enabled ? 'text-emerald-400' : 'text-slate-400'}
                    >
                      <Power size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Workflow className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No automations configured yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Create a cron job to get started with automated workflows
            </p>
          </CardContent>
        </Card>
      )}

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
              <p className="text-xs text-slate-600 mt-1">
                Create complex multi-step automations visually
              </p>
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
              <div
                key={tpl.name}
                className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
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
