import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Mail, MessageSquare, Ticket, Bot, ArrowUpDown } from 'lucide-react'

export const Route = createFileRoute('/_app/work/inbox')({
  component: WorkInbox,
})

const emailSummary = [
  { from: 'Jane Smith (Acme Corp)', subject: 'Partnership Proposal — Updated Terms', time: '9:30 AM', priority: 'urgent' as const, aiSummary: 'Revised partnership terms with 15% revenue share. Needs response by EOD.' },
  { from: 'Board of Directors', subject: 'Q1 Planning Meeting Agenda', time: '8:45 AM', priority: 'high' as const, aiSummary: 'Board meeting agenda for Jan 21. Your section is financial overview.' },
  { from: 'Legal Team', subject: 'NDA Review — Acme Corp', time: '8:00 AM', priority: 'high' as const, aiSummary: 'Legal flagged 2 clauses in Section 4. Needs your sign-off.' },
  { from: 'DevOps Team', subject: 'Server Migration Schedule', time: '7:30 AM', priority: 'medium' as const, aiSummary: 'Migration window scheduled for Jan 25, 2–6 AM PST. No action needed.' },
  { from: 'HR Department', subject: 'Updated PTO Policy', time: 'Yesterday', priority: 'low' as const, aiSummary: 'New PTO policy effective Feb 1. Unlimited PTO with 2-week min notice.' },
  { from: 'Marketing Team', subject: 'Q1 Campaign Assets Ready', time: 'Yesterday', priority: 'low' as const, aiSummary: 'Campaign creative approved. Launch date confirmed for Feb 3.' },
]

const slackSummaries = [
  { channel: '#engineering', unread: 24, highlights: 'Discussion about API v2 migration progress. Marcus raised concern about backwards compatibility.', urgency: 'medium' as const },
  { channel: '#general', unread: 12, highlights: 'New team member introduction. Company all-hands moved to Friday.', urgency: 'low' as const },
  { channel: '#product', unread: 8, highlights: 'Feature request from Acme Corp flagged as high priority. Sarah starting research.', urgency: 'high' as const },
  { channel: '#incidents', unread: 3, highlights: 'Staging API latency spike resolved. Root cause: database connection pool exhaustion.', urgency: 'medium' as const },
  { channel: '#sales', unread: 6, highlights: 'New lead from FinServe Capital. Demo scheduled for next Tuesday.', urgency: 'medium' as const },
]

const supportTickets = [
  { id: 'TK-142', title: 'API rate limit exceeded — Acme Corp', priority: 'critical' as const, age: '2 days', assignee: 'Marcus J.', aiTriage: 'Client-impacting. Recommend priority escalation.' },
  { id: 'TK-139', title: 'Dashboard loading slow on mobile', priority: 'medium' as const, age: '3 days', assignee: 'Elena R.', aiTriage: 'Performance issue. Non-blocking. Scheduled for next sprint.' },
  { id: 'TK-137', title: 'Email notifications not sending', priority: 'high' as const, age: '1 day', assignee: 'David P.', aiTriage: 'Bug in notification queue. Fix in PR #138.' },
  { id: 'TK-135', title: 'Update billing address form validation', priority: 'low' as const, age: '5 days', assignee: 'Unassigned', aiTriage: 'Minor UX issue. Can be deferred to Q2.' },
]

const priorityColor = {
  urgent: 'bg-red-500/10 text-red-400 border-red-500/20',
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  medium: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function WorkInbox() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inbox</h1>
          <p className="text-sm text-slate-400 mt-1">
            AI-triaged professional communications — email, Slack, and support
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ArrowUpDown size={12} />
          <span>Sorted by AI priority</span>
        </div>
      </div>

      {/* Priority Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Urgent', value: '1', color: 'text-red-400' },
          { label: 'High Priority', value: '3', color: 'text-amber-400' },
          { label: 'Medium', value: '4', color: 'text-cyan-400' },
          { label: 'Low / FYI', value: '3', color: 'text-slate-400' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-4 text-center">
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Email Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            Email Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {emailSummary.map((email) => (
              <div key={email.subject} className="rounded-md bg-slate-800/50 px-3 py-2.5 hover:bg-slate-800/80 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white truncate">{email.subject}</p>
                      <Badge className={`text-xs ${priorityColor[email.priority]}`}>{email.priority}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{email.from} · {email.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1 mt-1 text-xs text-slate-600">
                  <Bot size={10} className="mt-0.5 shrink-0" />
                  <span>{email.aiSummary}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Slack Channel Summaries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Slack Channel Summaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {slackSummaries.map((channel) => (
                <div key={channel.channel} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white font-mono">{channel.channel}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{channel.unread} unread</span>
                      <Badge className={`text-xs ${priorityColor[channel.urgency]}`}>{channel.urgency}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{channel.highlights}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Ticket className="w-4 h-4 text-amber-400" />
              Support Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                      <p className="text-sm text-white">{ticket.title}</p>
                    </div>
                    <Badge className={`text-xs ${priorityColor[ticket.priority]}`}>{ticket.priority}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{ticket.assignee} · {ticket.age}</p>
                  <div className="flex items-start gap-1 mt-1 text-xs text-slate-600">
                    <Bot size={10} className="mt-0.5 shrink-0" />
                    <span>{ticket.aiTriage}</span>
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
