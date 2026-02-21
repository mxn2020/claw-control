import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Users, Bell, Calendar, UserCircle } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/social')({
  component: PersonalSocial,
})

const recentContacts = [
  { name: 'Sarah Chen', role: 'Product Manager, Acme Corp', lastInteraction: 'Today', nextFollowUp: 'Jan 25', channel: 'Email' },
  { name: 'Marcus Johnson', role: 'CTO, TechStart Inc', lastInteraction: 'Yesterday', nextFollowUp: 'Jan 28', channel: 'Slack' },
  { name: 'Elena Rodriguez', role: 'Designer, Freelance', lastInteraction: '2 days ago', nextFollowUp: 'Jan 22', channel: 'iMessage' },
  { name: 'David Park', role: 'Engineering Lead, DataFlow', lastInteraction: '3 days ago', nextFollowUp: 'Feb 1', channel: 'LinkedIn' },
  { name: 'Olivia Thompson', role: 'Investor, Sequoia Capital', lastInteraction: '1 week ago', nextFollowUp: 'Jan 30', channel: 'Email' },
  { name: 'James Wright', role: 'College Friend', lastInteraction: '2 weeks ago', nextFollowUp: 'Feb 5', channel: 'WhatsApp' },
]

const followUpReminders = [
  { contact: 'Elena Rodriguez', reason: 'Review design mockups she sent', dueDate: 'Today', priority: 'high' as const },
  { contact: 'Sarah Chen', reason: 'Follow up on partnership proposal', dueDate: 'Jan 25', priority: 'medium' as const },
  { contact: 'Marcus Johnson', reason: 'Share API integration docs', dueDate: 'Jan 28', priority: 'medium' as const },
  { contact: 'Olivia Thompson', reason: 'Send quarterly update deck', dueDate: 'Jan 30', priority: 'high' as const },
  { contact: 'David Park', reason: 'Coffee catch-up re: new role', dueDate: 'Feb 1', priority: 'low' as const },
]

const socialEvents = [
  { title: 'Team Happy Hour', date: 'Fri, Jan 24', time: '5:30 PM', location: 'The Tap Room', attendees: 12 },
  { title: 'Sarah\'s Birthday Dinner', date: 'Sat, Jan 25', time: '7:00 PM', location: 'Nobu Downtown', attendees: 8 },
  { title: 'Tech Meetup — AI/ML', date: 'Tue, Jan 28', time: '6:00 PM', location: 'WeWork SoMa', attendees: 45 },
  { title: 'Networking Brunch', date: 'Sun, Feb 2', time: '11:00 AM', location: 'The Patio Café', attendees: 6 },
]

const priorityColor = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function PersonalSocial() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div>
        <h1 className="text-2xl font-bold text-white">Social</h1>
        <p className="text-sm text-slate-400 mt-1">
          Contact intelligence, follow-ups, and social events
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Contacts', value: '48', icon: <Users className="w-5 h-5 text-cyan-400" /> },
          { label: 'Pending Follow-ups', value: '5', icon: <Bell className="w-5 h-5 text-amber-400" /> },
          { label: 'Events This Week', value: '2', icon: <Calendar className="w-5 h-5 text-emerald-400" /> },
          { label: 'New Connections', value: '3', icon: <UserCircle className="w-5 h-5 text-cyan-400" /> },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-5 flex flex-col items-center gap-2 text-center">
              {stat.icon}
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-slate-500">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Recent Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentContacts.map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{contact.name}</p>
                    <p className="text-xs text-slate-500">{contact.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400">{contact.lastInteraction}</p>
                    <p className="text-xs text-slate-600">via {contact.channel}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              Follow-up Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {followUpReminders.map((reminder) => (
                <div key={reminder.contact} className="flex items-start gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white">{reminder.contact}</p>
                      <Badge className={`text-xs ${priorityColor[reminder.priority]}`}>{reminder.priority}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{reminder.reason}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{reminder.dueDate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Upcoming Social Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {socialEvents.map((event) => (
                <div key={event.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.date} · {event.time} · {event.location}</p>
                  </div>
                  <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 text-xs">
                    {event.attendees} people
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
