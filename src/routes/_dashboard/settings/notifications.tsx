import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Bell, Shield, Bot, MonitorPlay } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/settings/notifications')({
  component: NotificationsPage,
})

const defaultCategories = [
  {
    title: 'Security Alerts',
    description: 'Login attempts, permission changes, suspicious activity.',
    icon: 'shield',
    email: true,
    sms: true,
    inApp: true,
  },
  {
    title: 'Agent Events',
    description: 'Deployments, errors, performance anomalies.',
    icon: 'bot',
    email: false,
    sms: false,
    inApp: true,
  },
  {
    title: 'Sessions',
    description: 'Session starts, completions, and time-outs.',
    icon: 'monitor',
    email: false,
    sms: false,
    inApp: true,
  },
]

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-9 h-5 rounded-full relative transition-colors ${enabled ? 'bg-cyan-500' : 'bg-slate-700'
        }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'left-[18px]' : 'left-0.5'
          }`}
      />
    </button>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-5 h-5 text-red-400" />,
  bot: <Bot className="w-5 h-5 text-cyan-400" />,
  monitor: <MonitorPlay className="w-5 h-5 text-emerald-400" />,
}

function NotificationsPage() {
  const [categories, setCategories] = useState(defaultCategories)

  const toggleChannel = (
    catIdx: number,
    channel: 'email' | 'sms' | 'inApp'
  ) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx ? { ...cat, [channel]: !cat[channel] } : cat
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-sm text-slate-400 mt-1">
          Control how and when you receive alerts
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-slate-400">
          Toggle channels per category
        </span>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((cat, catIdx) => (
          <Card key={cat.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {iconMap[cat.icon]}
                <div>
                  <CardTitle className="text-base">{cat.title}</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Toggle
                    enabled={cat.email}
                    onChange={() => toggleChannel(catIdx, 'email')}
                  />
                  <span className="text-sm text-slate-300">Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Toggle
                    enabled={cat.sms}
                    onChange={() => toggleChannel(catIdx, 'sms')}
                  />
                  <span className="text-sm text-slate-300">SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Toggle
                    enabled={cat.inApp}
                    onChange={() => toggleChannel(catIdx, 'inApp')}
                  />
                  <span className="text-sm text-slate-300">In-App</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
