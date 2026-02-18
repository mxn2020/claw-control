import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Clock, Globe, Image, Monitor } from 'lucide-react'

export const Route = createFileRoute('/_app/browser/sessions')({
  component: BrowserSessions,
})

const pastSessions = [
  { id: 'ps_1', url: 'github.com/claw-control/pulls', agent: 'Code Reviewer', timestamp: 'Today 10:23 AM', duration: '8 min', status: 'completed' as const },
  { id: 'ps_2', url: 'docs.google.com/document/d/...', agent: 'Research Assistant', timestamp: 'Today 9:15 AM', duration: '22 min', status: 'completed' as const },
  { id: 'ps_3', url: 'slack.com/messages/team-eng', agent: 'Email Drafter', timestamp: 'Yesterday 4:30 PM', duration: '5 min', status: 'completed' as const },
  { id: 'ps_4', url: 'jira.atlassian.com/board/sprint', agent: 'Task Agent', timestamp: 'Yesterday 2:00 PM', duration: '15 min', status: 'error' as const },
  { id: 'ps_5', url: 'figma.com/file/design-system', agent: 'Design Assistant', timestamp: 'Yesterday 11:00 AM', duration: '30 min', status: 'completed' as const },
  { id: 'ps_6', url: 'notion.so/meeting-notes', agent: 'Meeting Summarizer', timestamp: 'Jan 13, 3:45 PM', duration: '12 min', status: 'completed' as const },
]

function BrowserSessions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Past Browser Sessions</h1>
        <p className="text-sm text-slate-400 mt-1">
          History of agent web automation sessions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pastSessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700">
                    <Monitor size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Globe size={12} className="text-slate-500" />
                      <p className="text-sm font-medium text-white">{s.url}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{s.agent} · {s.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Image size={12} />
                    <span>Screenshot</span>
                  </div>
                  <span className="text-xs text-slate-500">{s.duration}</span>
                  <Badge variant={s.status === 'completed' ? 'success' : 'danger'}>
                    {s.status}
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
