import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Search, Download, Star } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/skills/marketplace')({
  component: SkillsMarketplace,
})

const categories = ['All', 'Data', 'Code', 'Communication', 'Security', 'Analytics']

function SkillsMarketplace() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const discoverItems = useQuery(api.discover.list, { type: 'skill' })
  const items = discoverItems ?? []

  const filtered = items.filter((item) => {
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Skill Marketplace</h1>
        <p className="text-sm text-slate-400 mt-1">Browse and install skills for your agents</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat === activeCategory
                ? 'bg-cyan-600 text-white'
                : 'border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <Card key={skill._id} className="hover:border-cyan-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{skill.title}</CardTitle>
                  {skill.rating && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs">{skill.rating}</span>
                    </div>
                  )}
                </div>
                <CardDescription>{skill.description ?? 'No description'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{skill.author ?? 'Community'}</span>
                    {skill.category && <Badge className="bg-slate-700 text-slate-300 border-slate-600 text-xs">{skill.category}</Badge>}
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Install
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-sm text-slate-500">
              {search ? `No skills matching "${search}"` : 'No skills available in the marketplace yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
