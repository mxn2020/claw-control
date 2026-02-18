import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Bot, CheckSquare, Newspaper, Zap, MessageSquare, Clock } from 'lucide-react'

export const Route = createFileRoute('/_app/home')({
  component: Home,
})

const recentAgents = [
  { id: 'agent_1', name: 'Research Assistant', status: 'online', lastUsed: '2 min ago' },
  { id: 'agent_2', name: 'Email Drafter', status: 'online', lastUsed: '15 min ago' },
  { id: 'agent_3', name: 'Code Reviewer', status: 'idle', lastUsed: '1 hr ago' },
  { id: 'agent_4', name: 'Meeting Summarizer', status: 'offline', lastUsed: '3 hrs ago' },
]

const quickActions = [
  { label: 'New Chat', icon: <MessageSquare size={16} />, to: '/chat' },
  { label: 'View Tasks', icon: <CheckSquare size={16} />, to: '/tasks' },
  { label: "Today's Briefing", icon: <Newspaper size={16} />, to: '/briefing' },
  { label: 'Pending Approvals', icon: <Clock size={16} />, to: '/approvals' },
]

function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Good morning, User 👋</h1>
        <p className="text-sm text-slate-400 mt-1">
          Here's what's happening across your ClawVerse today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Agents</span>
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">4</span>
            <span className="text-xs text-emerald-400 ml-2">2 online</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Tasks</span>
              <CheckSquare className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">12</span>
            <span className="text-xs text-amber-400 ml-2">3 due today</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Pending Approvals</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">5</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Automations</span>
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">8</span>
            <span className="text-xs text-emerald-400 ml-2">all running</span>
          </CardContent>
        </Card>
      </div>

      {/* Briefing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-cyan-400" />
            Today's Briefing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>3 emails need responses — Research Assistant drafted replies for review</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Team standup at 10:00 AM — Meeting Summarizer will attend</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Code review pending on PR #247 — Code Reviewer flagged 2 issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Weather: 72°F, sunny — good day for outdoor lunch</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Agents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
                      <Bot size={14} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.lastUsed}</p>
                    </div>
                  </div>
                  <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'idle' ? 'warning' : 'danger'}>
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
