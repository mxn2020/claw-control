import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Webhook,
  Mail,
  Clock,
  Zap,
  Plus,
  Filter,
  Activity,
} from 'lucide-react'

export const Route = createFileRoute('/_app/automations/triggers')({
  component: AutomationTriggers,
})

const triggerTypes = [
  { label: 'All', icon: Zap },
  { label: 'Webhook', icon: Webhook },
  { label: 'Email', icon: Mail },
  { label: 'Cron', icon: Clock },
  { label: 'Event', icon: Activity },
]

const mockTriggers = [
  {
    id: 't1',
    name: 'Stripe Payment Webhook',
    type: 'Webhook',
    description: 'Fires on successful payment events from Stripe',
    status: 'active' as const,
    lastFired: '3 min ago',
    fireCount: 2_841,
    icon: Webhook,
  },
  {
    id: 't2',
    name: 'Gmail Inbox Monitor',
    type: 'Email',
    description: 'Watches for new emails via Gmail Pub/Sub push notifications',
    status: 'active' as const,
    lastFired: '12 min ago',
    fireCount: 1_456,
    icon: Mail,
  },
  {
    id: 't3',
    name: 'Daily Report Generator',
    type: 'Cron',
    description: 'Runs every day at 08:00 UTC to compile analytics reports',
    status: 'active' as const,
    lastFired: '6 hours ago',
    fireCount: 312,
    icon: Clock,
  },
  {
    id: 't4',
    name: 'GitHub PR Review',
    type: 'Webhook',
    description: 'Triggers code review agent when a PR is opened or updated',
    status: 'active' as const,
    lastFired: '1 hour ago',
    fireCount: 956,
    icon: Webhook,
  },
  {
    id: 't5',
    name: 'Weekly Digest Email',
    type: 'Cron',
    description: 'Sends a weekly summary email every Monday at 09:00 UTC',
    status: 'paused' as const,
    lastFired: '8 days ago',
    fireCount: 48,
    icon: Clock,
  },
  {
    id: 't6',
    name: 'User Signup Event',
    type: 'Event',
    description: 'Fires when a new user completes onboarding flow',
    status: 'active' as const,
    lastFired: '25 min ago',
    fireCount: 4_210,
    icon: Activity,
  },
  {
    id: 't7',
    name: 'Support Ticket Created',
    type: 'Event',
    description: 'Triggers triage agent when a new support ticket is created',
    status: 'active' as const,
    lastFired: '45 min ago',
    fireCount: 1_890,
    icon: Activity,
  },
  {
    id: 't8',
    name: 'Invoice Email Parser',
    type: 'Email',
    description: 'Parses incoming invoice emails and extracts line items',
    status: 'paused' as const,
    lastFired: '3 days ago',
    fireCount: 234,
    icon: Mail,
  },
]

function formatCount(n: number) {
  return n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n)
}

function AutomationTriggers() {
  const activeCount = mockTriggers.filter((t) => t.status === 'active').length
  const pausedCount = mockTriggers.filter((t) => t.status === 'paused').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Triggers</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage automation triggers — webhooks, email watchers, cron jobs,
            and events
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Create Trigger
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Triggers</span>
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {mockTriggers.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active</span>
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{activeCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Paused</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{pausedCount}</span>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        {triggerTypes.map((tt, i) => (
          <button
            key={tt.label}
            type="button"
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-cyan-600 text-white'
                : 'border border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <tt.icon className="w-3.5 h-3.5" />
            {tt.label}
          </button>
        ))}
      </div>

      {/* Trigger List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTriggers.map((trigger) => (
          <Card
            key={trigger.id}
            className="hover:border-cyan-500/50 transition-colors"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <trigger.icon className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-base">{trigger.name}</CardTitle>
                </div>
                <Badge
                  variant={
                    trigger.status === 'active' ? 'success' : 'warning'
                  }
                >
                  {trigger.status}
                </Badge>
              </div>
              <CardDescription>{trigger.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Badge className="bg-slate-700/50 text-slate-300 border-slate-600">
                    {trigger.type}
                  </Badge>
                </span>
                <span>Last fired: {trigger.lastFired}</span>
                <span>Fires: {formatCount(trigger.fireCount)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
