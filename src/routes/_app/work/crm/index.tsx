import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  DollarSign,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
  Clock,
} from 'lucide-react'

export const Route = createFileRoute('/_app/work/crm/')({
  component: CrmIndex,
})

const pipelineStages = [
  { name: 'Lead', deals: 12, value: '$84,000', color: 'bg-slate-500' },
  { name: 'Qualified', deals: 8, value: '$156,000', color: 'bg-blue-500' },
  { name: 'Proposal', deals: 5, value: '$210,000', color: 'bg-cyan-500' },
  { name: 'Negotiation', deals: 3, value: '$175,000', color: 'bg-amber-500' },
  { name: 'Closed', deals: 6, value: '$320,000', color: 'bg-emerald-500' },
]

const recentActivities = [
  {
    id: 1,
    action: 'Deal moved to Negotiation',
    deal: 'Acme Corp — Enterprise Plan',
    time: '10 min ago',
  },
  {
    id: 2,
    action: 'New lead added',
    deal: 'TechStart Inc — Starter',
    time: '45 min ago',
  },
  {
    id: 3,
    action: 'Proposal sent',
    deal: 'GlobalTrade Co — Custom',
    time: '2 hours ago',
  },
  {
    id: 4,
    action: 'Deal closed (won)',
    deal: 'DataFlow LLC — Pro Plan',
    time: '4 hours ago',
  },
  {
    id: 5,
    action: 'Follow-up scheduled',
    deal: 'CloudNet — Enterprise',
    time: 'Yesterday',
  },
]

function CrmIndex() {
  const totalDeals = pipelineStages.reduce((s, st) => s + st.deals, 0)

  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM</h1>
          <p className="text-sm text-slate-400 mt-1">
            Pipeline overview and deal management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowRight className="w-3.5 h-3.5 mr-1.5" />
            View Pipeline
          </Button>
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Deals</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{totalDeals}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Pipeline Value</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">$945K</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Win Rate</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">34%</span>
            <span className="text-xs text-emerald-400 ml-2">↑ 6%</span>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pipelineStages.map((stage) => (
              <div key={stage.name} className="flex items-center gap-4">
                <div className="w-28 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <span className="text-sm text-slate-300">{stage.name}</span>
                </div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stage.color}`}
                    style={{
                      width: `${(stage.deals / totalDeals) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center gap-3 w-40 justify-end">
                  <Badge className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                    {stage.deals} deals
                  </Badge>
                  <span className="text-sm font-medium text-white w-20 text-right">
                    {stage.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between gap-4 border-b border-slate-700/30 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-slate-300">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.deal}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-slate-500">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
