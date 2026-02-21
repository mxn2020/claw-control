import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Moon, Activity, Apple, FlaskConical, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/health')({
  component: PersonalHealth,
})

const healthMetrics = [
  { label: 'Sleep Score', value: '82', unit: '/100', icon: <Moon className="w-5 h-5 text-indigo-400" />, trend: '+5 vs last week', color: 'text-indigo-400' },
  { label: 'Fitness Activity', value: '4', unit: ' workouts', icon: <Activity className="w-5 h-5 text-emerald-400" />, trend: 'On track for 5/wk', color: 'text-emerald-400' },
  { label: 'Nutrition Score', value: '74', unit: '/100', icon: <Apple className="w-5 h-5 text-amber-400" />, trend: '−3 vs last week', color: 'text-amber-400' },
  { label: 'Lab Results', value: '2', unit: ' new', icon: <FlaskConical className="w-5 h-5 text-cyan-400" />, trend: 'Blood panel ready', color: 'text-cyan-400' },
]

const sleepLog = [
  { date: 'Last Night', duration: '7h 32m', quality: 'good' as const, deep: '1h 45m', rem: '2h 10m' },
  { date: 'Sat, Jan 18', duration: '8h 15m', quality: 'great' as const, deep: '2h 05m', rem: '2h 30m' },
  { date: 'Fri, Jan 17', duration: '6h 10m', quality: 'poor' as const, deep: '0h 55m', rem: '1h 20m' },
  { date: 'Thu, Jan 16', duration: '7h 50m', quality: 'good' as const, deep: '1h 40m', rem: '2h 05m' },
]

const fitnessActivity = [
  { date: 'Today', activity: 'Running — 5K', calories: 340, duration: '28 min' },
  { date: 'Yesterday', activity: 'Weight Training — Upper Body', calories: 280, duration: '45 min' },
  { date: 'Sat, Jan 18', activity: 'Yoga — Vinyasa Flow', calories: 180, duration: '60 min' },
  { date: 'Fri, Jan 17', activity: 'Cycling — Outdoor', calories: 420, duration: '50 min' },
]

const labResults = [
  { test: 'Complete Blood Panel', date: 'Jan 15, 2025', status: 'normal' as const, provider: 'Quest Diagnostics' },
  { test: 'Vitamin D Level', date: 'Jan 15, 2025', status: 'low' as const, provider: 'Quest Diagnostics' },
  { test: 'Lipid Panel', date: 'Dec 10, 2024', status: 'normal' as const, provider: 'LabCorp' },
  { test: 'Thyroid Function', date: 'Dec 10, 2024', status: 'normal' as const, provider: 'LabCorp' },
]

const journalEntries = [
  { date: 'Today', mood: 'energized', note: 'Great morning run. Felt strong and focused throughout the day.' },
  { date: 'Yesterday', mood: 'calm', note: 'Solid upper body session. Sleep could have been better.' },
  { date: 'Sat, Jan 18', mood: 'relaxed', note: 'Restorative yoga helped with back tension. Ate well all day.' },
  { date: 'Fri, Jan 17', mood: 'tired', note: 'Late night working on project. Only 6 hours of sleep.' },
]

const qualityColor = {
  great: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  good: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  poor: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const labStatusColor = {
  normal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  low: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

function PersonalHealth() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Health Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Sleep, fitness, nutrition, and wellness tracking
        </p>
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{metric.label}</span>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
              <span className="text-sm text-slate-400">{metric.unit}</span>
              <p className="text-xs text-slate-500 mt-1">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleep Log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              Sleep Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sleepLog.map((entry) => (
                <div key={entry.date} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white">{entry.duration}</p>
                      <Badge className={`text-xs ${qualityColor[entry.quality]}`}>{entry.quality}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{entry.date} · Deep {entry.deep} · REM {entry.rem}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fitness Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Fitness Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fitnessActivity.map((entry) => (
                <div key={entry.activity} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1">
                    <p className="text-sm text-white">{entry.activity}</p>
                    <p className="text-xs text-slate-500">{entry.date} · {entry.duration} · {entry.calories} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lab Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              Recent Lab Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {labResults.map((result) => (
                <div key={result.test} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{result.test}</p>
                    <p className="text-xs text-slate-500">{result.date} · {result.provider}</p>
                  </div>
                  <Badge className={`text-xs ${labStatusColor[result.status]}`}>{result.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Journal */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Health Journal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {journalEntries.map((entry) => (
                <div key={entry.date} className="rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-slate-500">{entry.date}</span>
                    <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 text-xs">{entry.mood}</Badge>
                  </div>
                  <p className="text-sm text-slate-300">{entry.note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
