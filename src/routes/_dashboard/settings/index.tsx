import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { User, Key, Webhook, Bell, Palette } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/settings/')({
  component: Settings,
})

const sections = [
  {
    title: 'Profile',
    description: 'Manage your account details and preferences.',
    icon: <User className="w-5 h-5 text-cyan-400" />,
    placeholder: 'Name, email, avatar, and timezone settings.',
  },
  {
    title: 'API Keys',
    description: 'Create and manage API keys for programmatic access.',
    icon: <Key className="w-5 h-5 text-amber-400" />,
    placeholder: 'Generate, rotate, and revoke API keys.',
  },
  {
    title: 'Webhooks',
    description: 'Configure webhook endpoints for event notifications.',
    icon: <Webhook className="w-5 h-5 text-emerald-400" />,
    placeholder: 'Add webhook URLs and select event types.',
  },
  {
    title: 'Notifications',
    description: 'Control how and when you receive alerts.',
    icon: <Bell className="w-5 h-5 text-blue-400" />,
    placeholder: 'Email, SMS, and in-app notification preferences.',
  },
  {
    title: 'Appearance',
    description: 'Customize the look and feel of the dashboard.',
    icon: <Palette className="w-5 h-5 text-purple-400" />,
    placeholder: 'Theme, density, and layout preferences.',
  },
]

function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account and platform preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {section.icon}
                <div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[60px] rounded-lg border border-dashed border-slate-700 bg-slate-900 p-4">
                <p className="text-sm text-slate-500">
                  {section.placeholder}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
