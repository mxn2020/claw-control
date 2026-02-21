import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Bell, Shield, CreditCard, Bot, MonitorPlay } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/settings/notifications')({
  component: NotificationsPage,
})

const categories = [
  {
    title: 'Security Alerts',
    description: 'Login attempts, permission changes, suspicious activity.',
    icon: <Shield className="w-5 h-5 text-red-400" />,
    email: true,
    sms: true,
    inApp: true,
  },
  {
    title: 'Billing',
    description: 'Invoices, payment failures, usage warnings.',
    icon: <CreditCard className="w-5 h-5 text-amber-400" />,
    email: true,
    sms: false,
    inApp: true,
  },
  {
    title: 'Agent Events',
    description: 'Deployments, errors, performance anomalies.',
    icon: <Bot className="w-5 h-5 text-cyan-400" />,
    email: false,
    sms: false,
    inApp: true,
  },
  {
    title: 'Sessions',
    description: 'Session starts, completions, and time-outs.',
    icon: <MonitorPlay className="w-5 h-5 text-emerald-400" />,
    email: false,
    sms: false,
    inApp: true,
  },
]

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
        enabled ? 'bg-cyan-500' : 'bg-slate-700'
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
          enabled ? 'left-[18px]' : 'left-0.5'
        }`}
      />
    </div>
  )
}

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
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
        {categories.map((cat) => (
          <Card key={cat.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {cat.icon}
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
                  <Toggle enabled={cat.email} />
                  <span className="text-sm text-slate-300">Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Toggle enabled={cat.sms} />
                  <span className="text-sm text-slate-300">SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Toggle enabled={cat.inApp} />
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
