import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Calendar, ChevronLeft, ChevronRight, AlertTriangle, Clock } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/calendar')({
  component: PersonalCalendar,
})

const todayEvents = [
  { time: '8:00 AM', title: 'Morning Standup', type: 'work' as const, duration: '15 min' },
  { time: '9:30 AM', title: 'Dentist Appointment', type: 'personal' as const, duration: '1 hr' },
  { time: '11:00 AM', title: 'Design Review', type: 'work' as const, duration: '45 min' },
  { time: '12:30 PM', title: 'Lunch with Alex', type: 'personal' as const, duration: '1 hr' },
  { time: '2:00 PM', title: 'Sprint Planning', type: 'work' as const, duration: '1 hr' },
  { time: '4:00 PM', title: 'Yoga Class', type: 'health' as const, duration: '1 hr' },
  { time: '6:30 PM', title: 'Dinner Reservation — Nobu', type: 'personal' as const, duration: '2 hrs' },
]

const upcomingEvents = [
  { date: 'Tomorrow', title: 'Board Meeting', time: '10:00 AM', type: 'work' as const },
  { date: 'Tomorrow', title: 'Piano Lesson', time: '5:00 PM', type: 'personal' as const },
  { date: 'Wed, Jan 22', title: 'Client Demo — Acme Corp', time: '2:00 PM', type: 'work' as const },
  { date: 'Thu, Jan 23', title: 'Annual Physical', time: '9:00 AM', type: 'health' as const },
  { date: 'Fri, Jan 24', title: 'Team Happy Hour', time: '5:30 PM', type: 'personal' as const },
  { date: 'Sat, Jan 25', title: 'Weekend Hiking Trip', time: '7:00 AM', type: 'personal' as const },
]

const conflicts = [
  { events: ['Design Review', 'Client Call'], time: '11:00 AM — Tomorrow', severity: 'overlap' as const },
  { events: ['Sprint Planning', 'Dentist Follow-up'], time: '2:00 PM — Wed', severity: 'overlap' as const },
]

const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 2
  return {
    day: day < 1 ? 28 + day : day > 31 ? day - 31 : day,
    isCurrentMonth: day >= 1 && day <= 31,
    isToday: day === 20,
    events: day === 20 ? 4 : day === 22 ? 2 : day === 25 ? 1 : day === 15 ? 3 : 0,
  }
})

const typeColor = {
  work: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  personal: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  health: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

function PersonalCalendar() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-sm text-slate-400 mt-1">
            Unified schedule — events, appointments, and reminders
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Calendar size={16} />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Calendar Grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                January 2025
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 w-7">
                  <ChevronLeft size={14} />
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-cyan-400">
                  Today
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7">
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-center text-xs text-slate-500 font-medium pb-2">
                  {d}
                </div>
              ))}
              {calendarDays.map((d, i) => (
                <div
                  key={i}
                  className={`h-12 rounded-md flex flex-col items-center justify-center gap-0.5 text-sm cursor-pointer transition-colors ${
                    d.isToday
                      ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                      : d.isCurrentMonth
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-600'
                  }`}
                >
                  {d.day}
                  {d.events > 0 && (
                    <div className="flex gap-0.5">
                      {Array.from({ length: Math.min(d.events, 3) }).map((_, j) => (
                        <div key={j} className="w-1 h-1 rounded-full bg-cyan-400" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Agenda Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Today's Agenda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todayEvents.map((event) => (
                <div key={event.title} className="flex items-start gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <span className="text-xs font-mono text-cyan-400 w-16 pt-0.5 shrink-0">{event.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{event.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{event.duration}</span>
                      <Badge className={`text-xs ${typeColor[event.type]}`}>{event.type}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.date} · {event.time}</p>
                  </div>
                  <Badge className={`text-xs ${typeColor[event.type]}`}>{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduling Conflicts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Scheduling Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {conflicts.length > 0 ? (
              <div className="space-y-2">
                {conflicts.map((conflict, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-md bg-amber-500/5 border border-amber-500/20 px-3 py-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{conflict.events.join(' & ')}</p>
                      <p className="text-xs text-slate-500">{conflict.time}</p>
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                      {conflict.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No conflicts detected</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
