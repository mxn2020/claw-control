import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  X,
  AlertTriangle,
  Download,
  Bot,
  User,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/sessions/$sessionId/')({
  component: SessionDetail,
})

const mockMessages = [
  {
    id: 1,
    role: 'user' as const,
    content: 'Hi, I need help with my billing. I was charged twice this month.',
    timestamp: '10:32 AM',
  },
  {
    id: 2,
    role: 'assistant' as const,
    content:
      'I can see your account. Let me look into the duplicate charge. I found two transactions on Jan 15th — one for $29.99 and another for $29.99. The second one appears to be a duplicate.',
    timestamp: '10:32 AM',
  },
  {
    id: 3,
    role: 'user' as const,
    content: 'Yes, exactly. Can you refund the extra one?',
    timestamp: '10:33 AM',
  },
  {
    id: 4,
    role: 'assistant' as const,
    content:
      "I've initiated a refund for the duplicate charge of $29.99. It should appear in your account within 3-5 business days. Is there anything else I can help with?",
    timestamp: '10:34 AM',
  },
]

const tabs = [
  { label: 'Conversation', active: true },
  { label: 'Trace', active: false },
  { label: 'Replay', active: false },
  { label: 'Audit', active: false },
]

function SessionDetail() {
  const { sessionId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Billing inquiry</h1>
          <p className="text-sm text-slate-400 mt-1">Session {sessionId}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors">
            <X className="w-4 h-4" />
            Close Session
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 transition-colors">
            <AlertTriangle className="w-4 h-4" />
            Escalate
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              tab.active
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conversation */}
        <div className="lg:col-span-3 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-cyan-600/20'
                    : 'bg-slate-700'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-cyan-400" />
                ) : (
                  <User className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-xl px-4 py-3 ${
                  msg.role === 'assistant'
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-cyan-600/20 text-slate-200'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs text-slate-500 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Info Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Agent Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-xs text-slate-400">Name</span>
                <p className="text-sm text-white">Support Agent</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Model</span>
                <p className="text-sm text-white">gpt-4o</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Instance</span>
                <p className="text-sm text-white">Production Gateway</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Channel</span>
                <div className="mt-1">
                  <Badge variant="info">WebChat</Badge>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Status</span>
                <div className="mt-1">
                  <Badge variant="success">active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
