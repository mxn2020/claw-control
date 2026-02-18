import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Mail, Calendar, Users, Ticket } from 'lucide-react'

export const Route = createFileRoute('/_app/work/')({
  component: Work,
})

function Work() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Work</h1>
        <p className="text-sm text-slate-400 mt-1">
          Your professional dashboard — inbox, meetings, clients, and tickets
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Inbox</span>
              <Mail className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">12</span>
            <span className="text-xs text-amber-400 ml-2">3 urgent</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Meetings Today</span>
              <Calendar className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">3</span>
            <span className="text-xs text-slate-400 ml-2">next at 10 AM</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Clients</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">8</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Open Tickets</span>
              <Ticket className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">5</span>
            <span className="text-xs text-red-400 ml-2">1 overdue</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inbox Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Inbox Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { from: 'Jane Smith (Acme Corp)', subject: 'Partnership Proposal Follow-up', time: '9:30 AM', urgent: true },
                { from: 'Board of Directors', subject: 'Q1 Planning Meeting Agenda', time: '8:45 AM', urgent: true },
                { from: 'DevOps Team', subject: 'Server Migration Schedule', time: '8:00 AM', urgent: false },
                { from: 'HR Department', subject: 'Updated PTO Policy', time: 'Yesterday', urgent: false },
                { from: 'Legal Team', subject: 'NDA Review - Acme Corp', time: 'Yesterday', urgent: true },
              ].map((email) => (
                <div key={email.subject} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white truncate">{email.subject}</p>
                      {email.urgent && <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">urgent</Badge>}
                    </div>
                    <p className="text-xs text-slate-500">{email.from} · {email.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { time: '10:00 AM', title: 'Team Standup', attendees: 6, platform: 'Zoom', duration: '15 min' },
                { time: '1:00 PM', title: 'Client Review — Acme Corp', attendees: 4, platform: 'Meet', duration: '1 hr' },
                { time: '3:30 PM', title: 'Design Sprint Kickoff', attendees: 8, platform: 'Figma', duration: '45 min' },
              ].map((meeting) => (
                <div key={meeting.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <span className="text-xs font-mono text-cyan-400 w-16">{meeting.time}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{meeting.title}</p>
                    <p className="text-xs text-slate-500">{meeting.platform} · {meeting.duration} · {meeting.attendees} attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Client Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { client: 'Acme Corp', activity: 'Partnership proposal under review', status: 'active' as const },
                { client: 'TechStart Inc', activity: 'Onboarding in progress', status: 'active' as const },
                { client: 'GlobalTrade Co', activity: 'Contract renewal due Feb 1', status: 'attention' as const },
                { client: 'DataFlow LLC', activity: 'Project completed', status: 'completed' as const },
              ].map((client) => (
                <div key={client.client} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{client.client}</p>
                    <p className="text-xs text-slate-500">{client.activity}</p>
                  </div>
                  <Badge className={
                    client.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    client.status === 'attention' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }>{client.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Ticket className="w-4 h-4 text-amber-400" />
              Open Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { id: 'TK-142', title: 'API rate limit exceeded for client', priority: 'high' as const, age: '2 days' },
                { id: 'TK-139', title: 'Dashboard loading slow on mobile', priority: 'medium' as const, age: '3 days' },
                { id: 'TK-137', title: 'Email notifications not sending', priority: 'high' as const, age: '1 day' },
                { id: 'TK-135', title: 'Update billing address form', priority: 'low' as const, age: '5 days' },
                { id: 'TK-130', title: 'Add SSO support for enterprise', priority: 'medium' as const, age: '1 week' },
              ].map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                    <span className="text-sm text-slate-300">{ticket.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{ticket.age}</span>
                    <Badge className={
                      ticket.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      ticket.priority === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }>{ticket.priority}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
