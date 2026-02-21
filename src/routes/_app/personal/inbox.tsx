import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Mail,
  Bell,
  Users,
  Archive,
  CheckCheck,
  Circle,
} from 'lucide-react'

export const Route = createFileRoute('/_app/personal/inbox')({
  component: PersonalInbox,
})

const tabs = [
  { label: 'All', count: 14, icon: Mail },
  { label: 'Email', count: 8, icon: Mail },
  { label: 'Notifications', count: 4, icon: Bell },
  { label: 'Social', count: 2, icon: Users },
]

const mockMessages = [
  {
    id: 1,
    from: 'GitHub',
    subject: 'PR #247 merged into main',
    preview: 'Your pull request "Add agent comparison view" has been merged by…',
    time: '2 min ago',
    read: false,
    tab: 'Notifications',
  },
  {
    id: 2,
    from: 'Alice Chen',
    subject: 'Re: Q1 Planning Document',
    preview: 'Thanks for the update — I think the timeline looks good. Can we…',
    time: '15 min ago',
    read: false,
    tab: 'Email',
  },
  {
    id: 3,
    from: 'Slack',
    subject: 'New message in #engineering',
    preview: 'Bob: deployed the fix for the rate limiter, should be live in…',
    time: '32 min ago',
    read: false,
    tab: 'Notifications',
  },
  {
    id: 4,
    from: 'LinkedIn',
    subject: 'You have 3 new connection requests',
    preview: 'Sarah Johnson, Mike Torres, and 1 other want to connect with you',
    time: '1 hour ago',
    read: true,
    tab: 'Social',
  },
  {
    id: 5,
    from: 'Jane Smith',
    subject: 'Partnership Proposal Follow-up',
    preview: 'Hi — just following up on our conversation from last week. I…',
    time: '2 hours ago',
    read: true,
    tab: 'Email',
  },
  {
    id: 6,
    from: 'Vercel',
    subject: 'Deployment succeeded: openclaw-dashboard',
    preview: 'Your deployment to production has completed successfully. Build…',
    time: '3 hours ago',
    read: true,
    tab: 'Notifications',
  },
  {
    id: 7,
    from: 'David Park',
    subject: 'Invoice #1042 — January Services',
    preview: 'Please find attached the invoice for January consulting…',
    time: '5 hours ago',
    read: true,
    tab: 'Email',
  },
  {
    id: 8,
    from: 'Twitter',
    subject: '@openclaw mentioned you',
    preview: '"Great thread by @you on building AI agent fleets — highly…"',
    time: 'Yesterday',
    read: true,
    tab: 'Social',
  },
]

function PersonalInbox() {
  const [activeTab, setActiveTab] = useState('All')
  const filtered = activeTab === 'All' ? mockMessages : mockMessages.filter((m) => m.tab === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inbox</h1>
          <p className="text-sm text-slate-400 mt-1">
            All your messages and notifications in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="w-3.5 h-3.5 mr-1.5" />
            Archive Read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(tab.label)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab.label === activeTab
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-white hover:border-slate-500'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <Badge className="bg-slate-700 text-slate-300 border-slate-600 text-xs px-1.5 py-0">
              {tab.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Message List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-400">
            {filtered.length} messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-700/50">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 py-3 px-2 rounded-md transition-colors cursor-pointer hover:bg-slate-700/30 ${
                  !msg.read ? 'bg-slate-800/80' : ''
                }`}
              >
                <div className="pt-1.5">
                  <Circle
                    className={`w-2.5 h-2.5 ${msg.read ? 'text-transparent' : 'text-cyan-400 fill-cyan-400'}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm truncate ${msg.read ? 'text-slate-400' : 'text-white font-semibold'}`}
                    >
                      {msg.from}
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {msg.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${msg.read ? 'text-slate-400' : 'text-slate-200'}`}
                  >
                    {msg.subject}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {msg.preview}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-600 transition-colors"
                    title="Mark read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-600 transition-colors"
                    title="Archive"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
