import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Star, TrendingUp, Layout, Award } from 'lucide-react'
import { useDiscoverItems } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/discover/')({
  component: DiscoverIndex,
})

const tabs = ['Skills', 'Automations', 'Blueprints', 'Showcase'] as const

function DiscoverIndex() {
  const items = useDiscoverItems()

  const featuredSkills = items.filter((i) => i.type === 'skill')
  const trendingAutomations = items.filter((i) => i.type === 'automation')
  const communityBlueprints = items.filter((i) => i.type === 'showcase')
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
              <div key={skill.id} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 hover:border-cyan-500/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-cyan-900/50 text-cyan-300">
                    {skill.category}
                  </Badge>
                  <span className="text-xs text-slate-500">⭐ {skill.rating}</span>
                </div>
                <p className="text-sm font-medium text-white">{skill.title}</p>
                <p className="text-xs text-slate-500 mt-1">by {skill.author} · {skill.installCount.toLocaleString()} installs</p>
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
                <div key={a.id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <p className="text-sm font-medium text-white">{a.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.description}</p>
                  <p className="text-xs text-slate-500 mt-1">by {a.author} · {a.installCount.toLocaleString()} uses</p>
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
                <div key={b.id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{b.title}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Award size={12} />
                      {b.installCount.toLocaleString()} forks
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
