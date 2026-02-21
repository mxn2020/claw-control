import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { DollarSign, User, Calendar } from 'lucide-react'

export const Route = createFileRoute('/_app/work/crm/pipeline')({
  component: CrmPipeline,
})

interface Deal {
  id: string
  company: string
  value: string
  contact: string
  expectedClose: string
}

const pipelineColumns: { stage: string; color: string; deals: Deal[] }[] = [
  {
    stage: 'Lead',
    color: 'border-slate-500',
    deals: [
      { id: 'd1', company: 'NovaTech', value: '$12,000', contact: 'Sarah Lin', expectedClose: 'Feb 15' },
      { id: 'd2', company: 'Vertex AI', value: '$8,500', contact: 'James Wu', expectedClose: 'Feb 20' },
      { id: 'd3', company: 'PeakSoft', value: '$6,200', contact: 'Maria Santos', expectedClose: 'Mar 1' },
    ],
  },
  {
    stage: 'Qualified',
    color: 'border-blue-500',
    deals: [
      { id: 'd4', company: 'Acme Corp', value: '$45,000', contact: 'Jane Smith', expectedClose: 'Feb 10' },
      { id: 'd5', company: 'TechStart Inc', value: '$22,000', contact: 'Bob Lee', expectedClose: 'Feb 28' },
    ],
  },
  {
    stage: 'Proposal',
    color: 'border-cyan-500',
    deals: [
      { id: 'd6', company: 'GlobalTrade Co', value: '$68,000', contact: 'Amy Chen', expectedClose: 'Feb 5' },
      { id: 'd7', company: 'CloudNet', value: '$54,000', contact: 'Tom Harris', expectedClose: 'Feb 18' },
    ],
  },
  {
    stage: 'Negotiation',
    color: 'border-amber-500',
    deals: [
      { id: 'd8', company: 'DataFlow LLC', value: '$92,000', contact: 'David Park', expectedClose: 'Feb 3' },
    ],
  },
  {
    stage: 'Closed',
    color: 'border-emerald-500',
    deals: [
      { id: 'd9', company: 'FinStack', value: '$35,000', contact: 'Lisa Ng', expectedClose: 'Jan 28' },
      { id: 'd10', company: 'Infra.io', value: '$78,000', contact: 'Kevin Cho', expectedClose: 'Jan 30' },
    ],
  },
]

function stageTotal(deals: Deal[]) {
  const sum = deals.reduce((s, d) => {
    const n = Number(d.value.replace(/[$,]/g, ''))
    return s + n
  }, 0)
  return `$${sum.toLocaleString()}`
}

function CrmPipeline() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Pipeline</h1>
        <p className="text-sm text-slate-400 mt-1">
          Kanban view of your deal pipeline
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineColumns.map((col) => (
          <div key={col.stage} className="flex-shrink-0 w-72">
            {/* Column Header */}
            <div className={`rounded-t-lg border-t-2 ${col.color} bg-slate-800/50 px-4 py-3 mb-2`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {col.stage}
                </h3>
                <Badge className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                  {col.deals.length}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                <DollarSign className="w-3 h-3" />
                {stageTotal(col.deals)}
              </div>
            </div>

            {/* Deal Cards */}
            <div className="space-y-2">
              {col.deals.map((deal) => (
                <Card
                  key={deal.id}
                  className="cursor-pointer hover:border-cyan-500/50 transition-colors"
                >
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm">{deal.company}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <DollarSign className="w-3 h-3" />
                        {deal.value}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <User className="w-3 h-3" />
                        {deal.contact}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {deal.expectedClose}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
