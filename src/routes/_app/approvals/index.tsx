import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ShieldCheck, Bot, Clock, CheckCircle2, XCircle } from 'lucide-react'

export const Route = createFileRoute('/_app/approvals/')({
  component: Approvals,
})

interface ApprovalRequest {
  id: string
  title: string
  agent: string
  description: string
  context: string
  risk: 'low' | 'medium' | 'high'
  timestamp: string
  status: 'pending' | 'approved' | 'denied'
}

const pendingApprovals: ApprovalRequest[] = [
  {
    id: 'ap1',
    title: 'Send partnership follow-up email',
    agent: 'Email Drafter',
    description: 'Ready to send the follow-up email to Acme Corp regarding the partnership proposal.',
    context: 'Recipient: jane@acmecorp.com. Email includes pricing tier details and NDA reference.',
    risk: 'medium',
    timestamp: '10 min ago',
    status: 'pending',
  },
  {
    id: 'ap2',
    title: 'Deploy security patch to production',
    agent: 'Code Reviewer',
    description: 'PR #247 auth middleware fix is ready for production deployment.',
    context: 'Changes: 3 files modified, fixes CVE-2024-1234. All tests passing. Staging verified.',
    risk: 'high',
    timestamp: '25 min ago',
    status: 'pending',
  },
  {
    id: 'ap3',
    title: 'Purchase domain clawverse.ai',
    agent: 'Research Assistant',
    description: 'Found the domain clawverse.ai available at $89/year. Requesting approval to purchase.',
    context: 'Registrar: Cloudflare. Auto-renewal enabled. Payment method: company card on file.',
    risk: 'low',
    timestamp: '1 hr ago',
    status: 'pending',
  },
  {
    id: 'ap4',
    title: 'Share monthly report with board',
    agent: 'Finance Tracker',
    description: 'Monthly financial report is compiled and ready to be shared with board members.',
    context: 'Report covers December 2024 financials. 14 recipients on the distribution list.',
    risk: 'medium',
    timestamp: '2 hrs ago',
    status: 'pending',
  },
  {
    id: 'ap5',
    title: 'Schedule recurring team standup',
    agent: 'Meeting Summarizer',
    description: 'Wants to create a recurring calendar event for daily standups at 10:00 AM.',
    context: 'Invitees: 6 team members. Duration: 15 min. Platform: Zoom.',
    risk: 'low',
    timestamp: '3 hrs ago',
    status: 'pending',
  },
]

const pastDecisions: ApprovalRequest[] = [
  { id: 'ph1', title: 'Update API rate limits', agent: 'Code Reviewer', description: '', context: '', risk: 'high', timestamp: 'Yesterday', status: 'approved' },
  { id: 'ph2', title: 'Send client invoice', agent: 'Finance Tracker', description: '', context: '', risk: 'medium', timestamp: 'Yesterday', status: 'approved' },
  { id: 'ph3', title: 'Post on company Twitter', agent: 'Research Assistant', description: '', context: '', risk: 'medium', timestamp: '2 days ago', status: 'denied' },
  { id: 'ph4', title: 'Upgrade server instance', agent: 'Code Reviewer', description: '', context: '', risk: 'high', timestamp: '3 days ago', status: 'approved' },
]

const riskColor = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
}

function Approvals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Approvals</h1>
          <p className="text-sm text-slate-400 mt-1">
            Human-in-the-loop approval queue — review agent actions before execution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-sm px-3 py-1">
            {pendingApprovals.length} pending
          </Badge>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-3">
        {pendingApprovals.map((req) => (
          <Card key={req.id} className="border-l-2 border-l-amber-500/50">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{req.title}</p>
                    <Badge className={riskColor[req.risk]}>{req.risk} risk</Badge>
                  </div>
                  <p className="text-sm text-slate-400">{req.description}</p>
                  <div className="rounded-md bg-slate-800/50 px-3 py-2 text-xs text-slate-500">
                    <span className="text-slate-400 font-medium">Context: </span>{req.context}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Bot size={12} />
                      <span>{req.agent}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{req.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CheckCircle2 size={14} className="mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <XCircle size={14} className="mr-1" />
                    Deny
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Past Decisions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            Past Decisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pastDecisions.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-md bg-slate-800/30 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  {d.status === 'approved' ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <XCircle size={16} className="text-red-400" />
                  )}
                  <span className="text-sm text-white">{d.title}</span>
                  <Badge className={riskColor[d.risk]}>{d.risk}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{d.agent}</span>
                  <span>{d.timestamp}</span>
                  <Badge variant={d.status === 'approved' ? 'success' : 'danger'}>
                    {d.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
