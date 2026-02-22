import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Mail,
  Calendar,
  Users,
  Ticket,
  FileText,
  Link2,
  Globe,
} from 'lucide-react'
import { useTasks, useSessions } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/work/')({
  component: Work,
})

const workSections = [
  {
    label: 'Inbox',
    icon: Mail,
    iconColor: 'text-cyan-400',
    description: 'Work email inbox',
    to: '/work/inbox',
    integrationHint: 'Gmail, Outlook, IMAP',
  },
  {
    label: 'Meetings',
    icon: Calendar,
    iconColor: 'text-cyan-400',
    description: 'Schedule & calendar',
    to: '/work/meetings',
    integrationHint: 'Google Calendar, Outlook',
  },
  {
    label: 'Clients',
    icon: Users,
    iconColor: 'text-emerald-400',
    description: 'Client management',
    to: '/work/clients',
    integrationHint: 'CRM integration',
  },
  {
    label: 'CRM',
    icon: Ticket,
    iconColor: 'text-amber-400',
    description: 'Pipeline & deals',
    to: '/work/crm',
    integrationHint: 'Salesforce, HubSpot',
  },
  {
    label: 'Documents',
    icon: FileText,
    iconColor: 'text-purple-400',
    description: 'Files & documents',
    to: '/work/documents',
    integrationHint: 'Google Drive, Notion',
  },
]

function Work() {
  const allTasks = useTasks() ?? []
  const allSessions = useSessions() ?? []

  const activeTasks = allTasks.filter(
    (t) => t.status === 'running' || t.status === 'queued' || t.status === 'needs_review'
  )
  const activeSessions = allSessions.filter((s) => s.status === 'active')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Work</h1>
        <p className="text-sm text-slate-400 mt-1">
          Your professional dashboard — connect services to unlock each section
        </p>
      </div>

      {/* Summary Stats from Real Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Tasks</span>
              <Ticket className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{activeTasks.length}</span>
            {activeTasks.filter((t) => t.priority === 'high').length > 0 && (
              <span className="text-xs text-amber-400 ml-2">
                {activeTasks.filter((t) => t.priority === 'high').length} high priority
              </span>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Sessions</span>
              <Mail className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{activeSessions.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Completed Tasks</span>
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-emerald-400">
              {allTasks.filter((t) => t.status === 'done').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Sessions</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{allSessions.length}</span>
          </CardContent>
        </Card>
      </div>

      {/* Active Tasks from Real Data */}
      {activeTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Ticket className="w-4 h-4 text-cyan-400" />
              Active Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeTasks.slice(0, 5).map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm text-slate-300 truncate">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {workSections.map((section) => {
          const Icon = section.icon
          return (
            <Link key={section.label} to={section.to}>
              <Card className="hover:border-cyan-500/50 transition-all cursor-pointer h-full">
                <CardContent className="py-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Icon size={22} className={section.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{section.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{section.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <Link2 size={10} />
                    <span>{section.integrationHint}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Integration Notice */}
      <Card className="border-slate-700/50">
        <CardContent className="py-6 text-center">
          <Globe className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">
            Work sections require external service integrations
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Connect your email, calendar, CRM, and document services in Settings → Integrations to
            populate these dashboards
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
