import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Sun, Calendar, Mail, CheckSquare, Newspaper, Clock } from 'lucide-react'

export const Route = createFileRoute('/_app/briefing/')({
  component: Briefing,
})

const pastBriefings = [
  { date: 'Jan 15, 2025', highlights: 3, tasks: 5, status: 'read' as const },
  { date: 'Jan 14, 2025', highlights: 4, tasks: 3, status: 'read' as const },
  { date: 'Jan 13, 2025', highlights: 2, tasks: 7, status: 'read' as const },
  { date: 'Jan 12, 2025', highlights: 5, tasks: 4, status: 'unread' as const },
]

function Briefing() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div>
        <h1 className="text-2xl font-bold text-white">Today's Briefing</h1>
        <p className="text-sm text-slate-400 mt-1">
          Thursday, January 16, 2025 — prepared by your agents at 7:00 AM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="text-4xl">☀️</span>
              <div>
                <p className="text-2xl font-bold text-white">72°F</p>
                <p className="text-sm text-slate-400">Sunny, high of 78°F. No rain expected.</p>
                <p className="text-xs text-slate-500 mt-1">UV Index: Moderate — sunscreen recommended after 11 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { time: '10:00 AM', title: 'Team Standup', location: 'Zoom', duration: '15 min' },
                { time: '1:00 PM', title: 'Client Review — Acme Corp', location: 'Meeting Room B', duration: '1 hr' },
                { time: '3:30 PM', title: 'Design Sprint Kickoff', location: 'Figma', duration: '45 min' },
              ].map((event) => (
                <div key={event.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <span className="text-xs font-mono text-cyan-400 w-16">{event.time}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.location} · {event.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Email Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Unread emails</span>
                <Badge>12</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Needs response</span>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">3</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Drafts ready</span>
                <Badge variant="success">2</Badge>
              </div>
              <div className="mt-3 space-y-1.5">
                <p className="text-xs text-slate-500 font-medium">PRIORITY EMAILS:</p>
                <p className="text-sm text-slate-300">• Partnership proposal from Acme Corp (reply drafted)</p>
                <p className="text-sm text-slate-300">• Board meeting agenda for next week</p>
                <p className="text-sm text-slate-300">• Invoice approval request from vendor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Priorities */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              Task Priorities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { task: 'Review & send partnership reply', priority: 'high', agent: 'Email Drafter' },
                { task: 'Approve PR #247 security patch', priority: 'high', agent: 'Code Reviewer' },
                { task: 'Finalize investor update draft', priority: 'medium', agent: 'Email Drafter' },
                { task: 'Review expense report', priority: 'low', agent: 'Finance Tracker' },
              ].map((item) => (
                <div key={item.task} className="flex items-center gap-2 text-sm">
                  <Badge className={
                    item.priority === 'high'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : item.priority === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }>
                    {item.priority}
                  </Badge>
                  <span className="text-slate-300 flex-1">{item.task}</span>
                  <span className="text-xs text-slate-500">{item.agent}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* News */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-cyan-400" />
              News & Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'OpenAI launches GPT-5 preview', source: 'TechCrunch', category: 'AI' },
                { title: 'Fed signals rate cut in March', source: 'Bloomberg', category: 'Finance' },
                { title: 'New React compiler hits stable', source: 'Vercel Blog', category: 'Tech' },
              ].map((news) => (
                <div key={news.title} className="rounded-md bg-slate-800/50 p-3">
                  <Badge className="bg-slate-700 text-slate-300 text-xs mb-2">{news.category}</Badge>
                  <p className="text-sm text-white">{news.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{news.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Briefings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Past Briefings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pastBriefings.map((b) => (
              <div key={b.date} className="flex items-center justify-between rounded-md bg-slate-800/30 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white">{b.date}</span>
                  {b.status === 'unread' && <Badge className="bg-cyan-600 text-white text-xs">new</Badge>}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{b.highlights} highlights</span>
                  <span>{b.tasks} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
