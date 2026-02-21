import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { FileText, Bot, FileCheck, LayoutTemplate, ClipboardList } from 'lucide-react'

export const Route = createFileRoute('/_app/work/documents')({
  component: WorkDocuments,
})

const agentDraftedDocs = [
  { title: 'Q1 Marketing Strategy Proposal', type: 'Proposal', agent: 'Research Assistant', status: 'review' as const, date: 'Today', pages: 12 },
  { title: 'Technical Architecture Overview', type: 'Technical', agent: 'Code Reviewer', status: 'draft' as const, date: 'Yesterday', pages: 8 },
  { title: 'Client Onboarding Playbook', type: 'Playbook', agent: 'Email Drafter', status: 'approved' as const, date: 'Jan 17', pages: 15 },
  { title: 'Monthly Performance Report — Dec', type: 'Report', agent: 'Finance Tracker', status: 'approved' as const, date: 'Jan 10', pages: 6 },
  { title: 'Partnership Agreement — TechStart', type: 'Legal', agent: 'Research Assistant', status: 'review' as const, date: 'Jan 15', pages: 10 },
]

const templates = [
  { name: 'Statement of Work', uses: 24, lastUsed: '2 days ago', category: 'Legal' },
  { name: 'Project Proposal', uses: 18, lastUsed: '1 week ago', category: 'Business' },
  { name: 'Meeting Minutes', uses: 42, lastUsed: 'Today', category: 'Operations' },
  { name: 'Invoice Template', uses: 36, lastUsed: 'Yesterday', category: 'Finance' },
  { name: 'NDA — Mutual', uses: 12, lastUsed: '2 weeks ago', category: 'Legal' },
  { name: 'Project Status Update', uses: 30, lastUsed: 'Today', category: 'Operations' },
]

const contractReviewQueue = [
  { title: 'MSA — Acme Corp (Renewal)', status: 'agent_reviewing' as const, priority: 'high' as const, assignedAgent: 'Legal Analyzer', dueDate: 'Jan 25' },
  { title: 'NDA — FinServe Capital', status: 'pending_review' as const, priority: 'medium' as const, assignedAgent: 'Legal Analyzer', dueDate: 'Jan 28' },
  { title: 'SOW — EduLearn Platform', status: 'completed' as const, priority: 'low' as const, assignedAgent: 'Legal Analyzer', dueDate: 'Jan 20' },
  { title: 'Vendor Agreement — CloudScale', status: 'pending_review' as const, priority: 'medium' as const, assignedAgent: 'Legal Analyzer', dueDate: 'Feb 1' },
]

const generatedReports = [
  { title: 'Weekly KPI Dashboard', frequency: 'Weekly', lastGenerated: 'Today', pages: 4 },
  { title: 'Client Revenue Analysis', frequency: 'Monthly', lastGenerated: 'Jan 1', pages: 8 },
  { title: 'Team Productivity Report', frequency: 'Weekly', lastGenerated: 'Today', pages: 3 },
  { title: 'Expense Summary — January', frequency: 'Monthly', lastGenerated: 'Jan 15', pages: 5 },
]

const docStatusColor = {
  draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  review: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const contractStatusColor = {
  agent_reviewing: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  pending_review: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const priorityColor = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function WorkDocuments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Documents</h1>
        <p className="text-sm text-slate-400 mt-1">
          Agent-drafted documents, templates, contracts, and generated reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent-Drafted Documents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              Agent-Drafted Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {agentDraftedDocs.map((doc) => (
                <div key={doc.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white truncate">{doc.title}</p>
                      <Badge className={`text-xs ${docStatusColor[doc.status]}`}>{doc.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{doc.type} · by {doc.agent} · {doc.pages} pages · {doc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-cyan-400" />
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {templates.map((template) => (
                <div key={template.name} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{template.name}</p>
                    <p className="text-xs text-slate-500">{template.category} · Used {template.uses} times · Last {template.lastUsed}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Review Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Contract Review Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contractReviewQueue.map((contract) => (
                <div key={contract.title} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white">{contract.title}</p>
                    <Badge className={`text-xs ${priorityColor[contract.priority]}`}>{contract.priority}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{contract.assignedAgent} · Due {contract.dueDate}</span>
                    <Badge className={`text-xs ${contractStatusColor[contract.status]}`}>
                      {contract.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generated Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-cyan-400" />
              Generated Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {generatedReports.map((report) => (
                <div key={report.title} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div>
                    <p className="text-sm text-white">{report.title}</p>
                    <p className="text-xs text-slate-500">{report.frequency} · {report.pages} pages · Last: {report.lastGenerated}</p>
                  </div>
                  <FileText size={14} className="text-slate-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
