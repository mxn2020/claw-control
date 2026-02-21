import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Calendar, Clock, Users, Bot, FileText } from 'lucide-react'

export const Route = createFileRoute('/_app/work/meetings')({
  component: WorkMeetings,
})

const upcomingMeetings = [
  {
    title: 'Team Standup',
    time: '10:00 AM',
    date: 'Today',
    duration: '15 min',
    attendees: ['You', 'Sarah C.', 'Marcus J.', 'Elena R.', 'David P.', '+1'],
    platform: 'Zoom',
    prepStatus: 'ready' as const,
    agentPrep: 'Agenda generated, yesterday\'s action items summarized',
  },
  {
    title: 'Client Review — Acme Corp',
    time: '1:00 PM',
    date: 'Today',
    duration: '1 hr',
    attendees: ['You', 'Jane Smith', 'Bob Miller', 'Sarah C.'],
    platform: 'Google Meet',
    prepStatus: 'ready' as const,
    agentPrep: 'Client brief updated, project status slides prepared',
  },
  {
    title: 'Design Sprint Kickoff',
    time: '3:30 PM',
    date: 'Today',
    duration: '45 min',
    attendees: ['You', 'Elena R.', 'Design Team', '+5'],
    platform: 'Figma',
    prepStatus: 'partial' as const,
    agentPrep: 'Research summary ready, awaiting competitor screenshots',
  },
  {
    title: 'Board Meeting',
    time: '10:00 AM',
    date: 'Tomorrow',
    duration: '2 hrs',
    attendees: ['You', 'Board Members', '+8'],
    platform: 'Zoom',
    prepStatus: 'pending' as const,
    agentPrep: 'Gathering Q4 financial data, deck in progress',
  },
  {
    title: '1:1 with Marcus',
    time: '2:00 PM',
    date: 'Tomorrow',
    duration: '30 min',
    attendees: ['You', 'Marcus J.'],
    platform: 'Slack Huddle',
    prepStatus: 'ready' as const,
    agentPrep: 'Performance notes compiled, OKR progress pulled',
  },
]

const meetingNotes = [
  { title: 'Team Standup — Jan 19', date: 'Yesterday', actionItems: 3, summary: 'Discussed migration timeline, assigned code review tasks' },
  { title: 'Product Roadmap Review', date: 'Jan 17', actionItems: 5, summary: 'Finalized Q1 priorities, deferred mobile app to Q2' },
  { title: 'Client Onboarding — TechStart', date: 'Jan 16', actionItems: 4, summary: 'Agreed on integration timeline, SOW amendments' },
  { title: 'Engineering All-Hands', date: 'Jan 15', actionItems: 2, summary: 'New hire introductions, platform reliability update' },
]

const followUpQueue = [
  { task: 'Send revised SOW to TechStart Inc', from: 'Client Onboarding — TechStart', dueDate: 'Today', status: 'pending' as const },
  { task: 'Schedule follow-up with Acme Corp legal', from: 'Client Review — Acme Corp', dueDate: 'Tomorrow', status: 'pending' as const },
  { task: 'Share design sprint research doc', from: 'Team Standup — Jan 19', dueDate: 'Today', status: 'done' as const },
  { task: 'Update Q1 roadmap in Notion', from: 'Product Roadmap Review', dueDate: 'Jan 22', status: 'pending' as const },
  { task: 'Review PR #138 as discussed', from: 'Team Standup — Jan 19', dueDate: 'Tomorrow', status: 'pending' as const },
]

const prepStatusColor = {
  ready: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  partial: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  pending: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

const followUpStatusColor = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

function WorkMeetings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Meetings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Meeting management, agent prep status, notes, and follow-ups
        </p>
      </div>

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
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.title} className="rounded-md bg-slate-800/50 px-3 py-3 hover:bg-slate-800/80 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 w-16">{meeting.time}</span>
                    <p className="text-sm text-white font-medium">{meeting.title}</p>
                  </div>
                  <Badge className={`text-xs ${prepStatusColor[meeting.prepStatus]}`}>
                    {meeting.prepStatus === 'ready' ? '✓ prep ready' : meeting.prepStatus === 'partial' ? '◐ partial' : '○ pending'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 ml-[4.5rem]">
                  <span className="flex items-center gap-1"><Clock size={10} /> {meeting.duration}</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {meeting.attendees.slice(0, 3).join(', ')}{meeting.attendees.length > 3 ? ` +${meeting.attendees.length - 3}` : ''}</span>
                  <span>{meeting.platform}</span>
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600 mt-1 ml-[4.5rem]">
                  <Bot size={10} />
                  <span>{meeting.agentPrep}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Meeting Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {meetingNotes.map((note) => (
                <div key={note.title} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <p className="text-sm text-white">{note.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{note.summary}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{note.date} · {note.actionItems} action items</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Follow-up Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {followUpQueue.map((item) => (
                <div key={item.task} className="flex items-start gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${item.status === 'done' ? 'text-slate-500 line-through' : 'text-white'}`}>{item.task}</p>
                    <p className="text-xs text-slate-500">From: {item.from} · Due: {item.dueDate}</p>
                  </div>
                  <Badge className={`text-xs ${followUpStatusColor[item.status]}`}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
