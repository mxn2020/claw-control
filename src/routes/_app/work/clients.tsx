import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Search, Plus, Building2 } from 'lucide-react'

export const Route = createFileRoute('/_app/work/clients')({
  component: WorkClients,
})

const clients = [
  {
    name: 'Jane Smith',
    company: 'Acme Corp',
    role: 'VP of Engineering',
    lastInteraction: 'Today',
    openProjects: 2,
    status: 'active' as const,
    value: '$120K ARR',
  },
  {
    name: 'Bob Miller',
    company: 'TechStart Inc',
    role: 'CEO',
    lastInteraction: 'Yesterday',
    openProjects: 1,
    status: 'active' as const,
    value: '$85K ARR',
  },
  {
    name: 'Lisa Wang',
    company: 'GlobalTrade Co',
    role: 'Head of Product',
    lastInteraction: '3 days ago',
    openProjects: 1,
    status: 'attention' as const,
    value: '$200K ARR',
  },
  {
    name: 'Michael Torres',
    company: 'DataFlow LLC',
    role: 'CTO',
    lastInteraction: '1 week ago',
    openProjects: 0,
    status: 'completed' as const,
    value: '$65K ARR',
  },
  {
    name: 'Priya Patel',
    company: 'FinServe Capital',
    role: 'Director of Technology',
    lastInteraction: '2 days ago',
    openProjects: 3,
    status: 'active' as const,
    value: '$340K ARR',
  },
  {
    name: 'Robert Chen',
    company: 'HealthTech Solutions',
    role: 'VP of Operations',
    lastInteraction: '5 days ago',
    openProjects: 1,
    status: 'active' as const,
    value: '$95K ARR',
  },
  {
    name: 'Amanda Foster',
    company: 'EduLearn Platform',
    role: 'Founder',
    lastInteraction: '1 week ago',
    openProjects: 2,
    status: 'attention' as const,
    value: '$45K ARR',
  },
  {
    name: 'Daniel Kim',
    company: 'CloudScale Systems',
    role: 'Engineering Manager',
    lastInteraction: '2 weeks ago',
    openProjects: 0,
    status: 'inactive' as const,
    value: '$110K ARR',
  },
]

const statusColor = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  attention: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function WorkClients() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400 mt-1">
            Client directory, contacts, and relationship management
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: '8' },
          { label: 'Active', value: '4' },
          { label: 'Needs Attention', value: '2' },
          { label: 'Total ARR', value: '$1.06M' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-4 text-center">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Search size={16} />
            <span className="text-sm">Search clients by name, company, or role...</span>
          </div>
        </CardContent>
      </Card>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clients.map((client) => (
          <Card key={client.name} className="hover:border-cyan-500/30 transition-all cursor-pointer">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-cyan-400 shrink-0">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white font-medium">{client.name}</p>
                    <Badge className={`text-xs ${statusColor[client.status]}`}>{client.status}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Building2 size={10} />
                    <span>{client.company} · {client.role}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>Last contact: {client.lastInteraction}</span>
                    <span>{client.openProjects} open project{client.openProjects !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-slate-500">{client.value}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
