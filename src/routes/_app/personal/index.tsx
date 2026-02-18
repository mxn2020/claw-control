import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Calendar, CheckSquare, Heart, DollarSign } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/')({
  component: Personal,
})

const quickLinks = [
  { label: 'Calendar', icon: <Calendar size={18} className="text-cyan-400" />, description: 'View & manage schedule' },
  { label: 'Tasks', icon: <CheckSquare size={18} className="text-cyan-400" />, description: 'Personal to-do list' },
  { label: 'Health', icon: <Heart size={18} className="text-emerald-400" />, description: 'Fitness & wellness' },
  { label: 'Finance', icon: <DollarSign size={18} className="text-amber-400" />, description: 'Budget & expenses' },
]

function Personal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Personal</h1>
        <p className="text-sm text-slate-400 mt-1">
          Your personal dashboard — calendar, tasks, health, and finances
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Card key={link.label} className="hover:border-cyan-500/50 transition-all cursor-pointer">
            <CardContent className="py-5 flex flex-col items-center gap-2 text-center">
              {link.icon}
              <p className="text-sm font-medium text-white">{link.label}</p>
              <p className="text-xs text-slate-500">{link.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { time: '8:00 AM', event: 'Morning routine', type: 'personal' },
                { time: '10:00 AM', event: 'Team Standup', type: 'work' },
                { time: '12:00 PM', event: 'Lunch with Sarah', type: 'personal' },
                { time: '1:00 PM', event: 'Client Review', type: 'work' },
                { time: '5:30 PM', event: 'Gym — Leg Day', type: 'health' },
                { time: '7:00 PM', event: 'Dinner reservation', type: 'personal' },
              ].map((item) => (
                <div key={item.event} className="flex items-center gap-3 text-sm">
                  <span className="text-xs font-mono text-cyan-400 w-16">{item.time}</span>
                  <span className="text-slate-300 flex-1">{item.event}</span>
                  <Badge className={
                    item.type === 'work' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                    item.type === 'health' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }>{item.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              Personal Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { task: 'Book dentist appointment', done: false, due: 'Today' },
                { task: 'Pick up dry cleaning', done: false, due: 'Today' },
                { task: 'Renew gym membership', done: true, due: 'Done' },
                { task: 'Research vacation destinations', done: false, due: 'This week' },
                { task: 'Call insurance company', done: true, due: 'Done' },
              ].map((item) => (
                <div key={item.task} className="flex items-center gap-3 text-sm">
                  <div className={`h-4 w-4 rounded border ${item.done ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'} flex items-center justify-center`}>
                    {item.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`flex-1 ${item.done ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{item.task}</span>
                  <span className="text-xs text-slate-500">{item.due}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-400" />
              Health & Wellness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Steps', value: '6,847', target: '10,000', pct: 68 },
                { label: 'Sleep', value: '7.2 hrs', target: '8 hrs', pct: 90 },
                { label: 'Water', value: '5 glasses', target: '8 glasses', pct: 63 },
                { label: 'Workouts', value: '3/5', target: '5 this week', pct: 60 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-300">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-600">Goal: {item.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Finance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              Finance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Monthly Budget</span>
                <span className="text-lg font-bold text-white">$4,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Spent this month</span>
                <span className="text-lg font-bold text-amber-400">$2,847</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }} />
              </div>
              <p className="text-xs text-slate-500">68% of budget used — $1,353 remaining</p>
              <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                <p className="text-xs text-slate-500 font-medium">TOP CATEGORIES:</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Housing</span>
                  <span className="text-slate-400">$1,500</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Food & Dining</span>
                  <span className="text-slate-400">$620</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Transportation</span>
                  <span className="text-slate-400">$340</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
