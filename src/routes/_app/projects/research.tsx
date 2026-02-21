import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Search, BookMarked, FileText, StickyNote } from 'lucide-react'

export const Route = createFileRoute('/_app/projects/research')({
  component: ProjectsResearch,
})

const topicWorkspaces = [
  { topic: 'AI Agent Architectures', papers: 24, notes: 18, lastActive: 'Today', status: 'active' as const },
  { topic: 'Competitor Analysis — Q1 2025', papers: 12, notes: 8, lastActive: 'Yesterday', status: 'active' as const },
  { topic: 'Distributed Systems Patterns', papers: 35, notes: 22, lastActive: '3 days ago', status: 'active' as const },
  { topic: 'Market Entry Strategy — APAC', papers: 9, notes: 14, lastActive: '1 week ago', status: 'paused' as const },
  { topic: 'User Onboarding Best Practices', papers: 16, notes: 10, lastActive: '2 weeks ago', status: 'completed' as const },
]

const paperLibrary = [
  { title: 'Attention Is All You Need', authors: 'Vaswani et al.', year: 2017, citations: 98000, status: 'read' as const },
  { title: 'ReAct: Synergizing Reasoning and Acting in LLMs', authors: 'Yao et al.', year: 2023, citations: 1200, status: 'read' as const },
  { title: 'Constitutional AI: Harmlessness from AI Feedback', authors: 'Bai et al.', year: 2022, citations: 850, status: 'reading' as const },
  { title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al.', year: 2020, citations: 4200, status: 'read' as const },
  { title: 'Tree of Thoughts: Deliberate Problem Solving', authors: 'Yao et al.', year: 2023, citations: 680, status: 'queued' as const },
  { title: 'Retrieval-Augmented Generation for Knowledge-Intensive Tasks', authors: 'Lewis et al.', year: 2020, citations: 5600, status: 'read' as const },
]

const synthesizedReports = [
  { title: 'AI Agent Landscape — January 2025', pages: 24, generated: 'Jan 18, 2025', topics: 3, confidence: 'high' as const },
  { title: 'Competitive Intelligence Briefing', pages: 12, generated: 'Jan 15, 2025', topics: 2, confidence: 'high' as const },
  { title: 'Technical Feasibility: Multi-Agent Orchestration', pages: 18, generated: 'Jan 10, 2025', topics: 4, confidence: 'medium' as const },
  { title: 'APAC Market Research Summary', pages: 32, generated: 'Jan 5, 2025', topics: 5, confidence: 'medium' as const },
]

const researchNotes = [
  { title: 'Key findings from ReAct paper', topic: 'AI Agent Architectures', date: 'Today', wordCount: 1400 },
  { title: 'Competitor product feature comparison matrix', topic: 'Competitor Analysis', date: 'Yesterday', wordCount: 2200 },
  { title: 'Consensus protocols comparison', topic: 'Distributed Systems', date: '2 days ago', wordCount: 900 },
  { title: 'Interview notes: APAC market expert', topic: 'Market Entry Strategy', date: '1 week ago', wordCount: 1800 },
]

const workspaceStatusColor = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

const paperStatusColor = {
  read: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  reading: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  queued: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const confidenceColor = {
  high: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

function ProjectsResearch() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div>
        <h1 className="text-2xl font-bold text-white">Research</h1>
        <p className="text-sm text-slate-400 mt-1">
          Topic workspaces, paper library, synthesized reports, and research notes
        </p>
      </div>

      {/* Topic Workspaces */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            Topic Workspaces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topicWorkspaces.map((workspace) => (
              <div key={workspace.topic} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5 cursor-pointer hover:bg-slate-800/80 transition-colors">
                <div>
                  <p className="text-sm text-white">{workspace.topic}</p>
                  <p className="text-xs text-slate-500">{workspace.papers} papers · {workspace.notes} notes · Last active {workspace.lastActive}</p>
                </div>
                <Badge className={`text-xs ${workspaceStatusColor[workspace.status]}`}>{workspace.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paper Library */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-cyan-400" />
              Paper Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {paperLibrary.map((paper) => (
                <div key={paper.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{paper.title}</p>
                    <p className="text-xs text-slate-500">{paper.authors} · {paper.year} · {paper.citations.toLocaleString()} citations</p>
                  </div>
                  <Badge className={`text-xs ${paperStatusColor[paper.status]}`}>{paper.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Synthesized Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Synthesized Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {synthesizedReports.map((report) => (
                <div key={report.title} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div>
                    <p className="text-sm text-white">{report.title}</p>
                    <p className="text-xs text-slate-500">{report.pages} pages · {report.topics} topics · {report.generated}</p>
                  </div>
                  <Badge className={`text-xs ${confidenceColor[report.confidence]}`}>{report.confidence}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Notes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-cyan-400" />
              Research Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {researchNotes.map((note) => (
                <div key={note.title} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <p className="text-sm text-white">{note.title}</p>
                  <p className="text-xs text-slate-500">{note.topic} · {note.date} · {note.wordCount.toLocaleString()} words</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
