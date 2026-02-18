import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Star, TrendingUp, Layout, Award } from 'lucide-react'

export const Route = createFileRoute('/_app/discover/')({
  component: DiscoverIndex,
})

const tabs = ['Skills', 'Automations', 'Blueprints', 'Showcase'] as const

const featuredSkills = [
  { name: 'Web Scraper Pro', author: 'ClawTeam', installs: '2.3k', rating: 4.8, tag: 'Popular' },
  { name: 'PDF Analyzer', author: 'community', installs: '1.1k', rating: 4.6, tag: 'New' },
  { name: 'Slack Integration', author: 'ClawTeam', installs: '5.2k', rating: 4.9, tag: 'Official' },
]

const trendingAutomations = [
  { name: 'Daily Email Digest', author: 'user_jane', uses: 342, description: 'Summarize and prioritize daily emails' },
  { name: 'PR Review Pipeline', author: 'devtools', uses: 218, description: 'Auto-review PRs with code analysis' },
  { name: 'Meeting Notes → Tasks', author: 'productivity', uses: 189, description: 'Convert meeting notes to actionable tasks' },
]

const communityBlueprints = [
  { name: 'Research Agent Starter', author: 'ClawTeam', forks: 87, description: 'Full research agent with memory and web search' },
  { name: 'Customer Support Bot', author: 'support_co', forks: 54, description: 'Multi-channel support agent with escalation' },
  { name: 'Personal Finance Tracker', author: 'fintech_dev', forks: 41, description: 'Track expenses and generate reports' },
]

function DiscoverIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Discover</h1>
        <p className="text-sm text-slate-400 mt-1">
          ClawHub community — skills, automations, and blueprints
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'Skills'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="w-4 h-4 text-cyan-400" />
            Featured Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {featuredSkills.map((skill) => (
              <div key={skill.name} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 hover:border-cyan-500/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={
                    skill.tag === 'Official' ? 'bg-cyan-900/50 text-cyan-300'
                      : skill.tag === 'Popular' ? 'bg-amber-900/50 text-amber-300'
                        : 'bg-emerald-900/50 text-emerald-300'
                  }>
                    {skill.tag}
                  </Badge>
                  <span className="text-xs text-slate-500">⭐ {skill.rating}</span>
                </div>
                <p className="text-sm font-medium text-white">{skill.name}</p>
                <p className="text-xs text-slate-500 mt-1">by {skill.author} · {skill.installs} installs</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Automations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Trending Automations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingAutomations.map((a) => (
                <div key={a.name} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <p className="text-sm font-medium text-white">{a.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.description}</p>
                  <p className="text-xs text-slate-500 mt-1">by {a.author} · {a.uses} uses</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Blueprints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layout className="w-4 h-4 text-cyan-400" />
              Community Blueprints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {communityBlueprints.map((b) => (
                <div key={b.name} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{b.name}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Award size={12} />
                      {b.forks} forks
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{b.description}</p>
                  <p className="text-xs text-slate-500 mt-1">by {b.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
