import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Calendar,
  Heart,
  DollarSign,
  Mail,
  GraduationCap,
  Globe,
  Users,
  Plane,
  Link2,
} from 'lucide-react'
import { useTasks } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/personal/')({
  component: Personal,
})

const sections = [
  {
    label: 'Calendar',
    icon: Calendar,
    iconColor: 'text-cyan-400',
    description: 'View & manage schedule',
    to: '/personal/calendar',
    needsIntegration: true,
    integrationHint: 'Google Calendar, Apple Calendar',
  },
  {
    label: 'Health',
    icon: Heart,
    iconColor: 'text-emerald-400',
    description: 'Fitness & wellness',
    to: '/personal/health',
    needsIntegration: true,
    integrationHint: 'Apple Health, Fitbit, Garmin',
  },
  {
    label: 'Finance',
    icon: DollarSign,
    iconColor: 'text-amber-400',
    description: 'Budget & expenses',
    to: '/personal/finance',
    needsIntegration: true,
    integrationHint: 'Plaid, bank connections',
  },
  {
    label: 'Inbox',
    icon: Mail,
    iconColor: 'text-cyan-400',
    description: 'Personal email',
    to: '/personal/inbox',
    needsIntegration: true,
    integrationHint: 'Gmail, Outlook',
  },
  {
    label: 'Learning',
    icon: GraduationCap,
    iconColor: 'text-purple-400',
    description: 'Courses & reading',
    to: '/personal/learning',
    needsIntegration: true,
    integrationHint: 'Kindle, Pocket, Readwise',
  },
  {
    label: 'Social',
    icon: Users,
    iconColor: 'text-pink-400',
    description: 'Social connections',
    to: '/personal/social',
    needsIntegration: true,
    integrationHint: 'Contacts, social networks',
  },
  {
    label: 'Travel',
    icon: Plane,
    iconColor: 'text-sky-400',
    description: 'Trips & bookings',
    to: '/personal/travel',
    needsIntegration: true,
    integrationHint: 'TripIt, Google Flights',
  },
]

function Personal() {
  const allTasks = useTasks() ?? []
  const personalTasks = allTasks.filter(
    (t) =>
      t.status !== 'done' &&
      t.status !== 'failed'
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Personal</h1>
        <p className="text-sm text-slate-400 mt-1">
          Your personal dashboard — connect services to unlock each section
        </p>
      </div>

      {/* Active Tasks Summary */}
      {personalTasks.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {personalTasks.slice(0, 5).map((task) => (
                <div key={task._id} className="flex items-center gap-2 text-sm">
                  <div
                    className={`h-2 w-2 rounded-full flex-shrink-0 ${task.status === 'running'
                        ? 'bg-emerald-500'
                        : task.status === 'needs_review'
                          ? 'bg-amber-500'
                          : 'bg-slate-500'
                      }`}
                  />
                  <span className="text-slate-300 flex-1 truncate">{task.title}</span>
                  <Badge
                    className={
                      task.priority === 'high'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }
                  >
                    {task.priority ?? 'normal'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sections.map((section) => {
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
                  {section.needsIntegration && (
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Link2 size={10} />
                      <span>{section.integrationHint}</span>
                    </div>
                  )}
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
            Personal sections require external service integrations
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Connect your calendar, email, fitness, and finance services in Settings → Integrations
            to populate these dashboards
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
