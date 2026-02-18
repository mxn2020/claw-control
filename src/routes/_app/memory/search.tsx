import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Search, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/_app/memory/search')({
  component: MemorySearch,
})

const sampleResults = [
  { id: '1', content: 'Prefers dark mode across all applications and interfaces', relevance: 0.97, source: 'Preference' },
  { id: '2', content: 'Uses TypeScript as primary programming language, prefers strict mode', relevance: 0.89, source: 'Work' },
  { id: '3', content: 'Weekly standup every Monday at 9:30 AM Pacific time', relevance: 0.82, source: 'Calendar' },
  { id: '4', content: 'Primary project repo is claw-control on GitHub', relevance: 0.76, source: 'Projects' },
  { id: '5', content: 'Reads Hacker News daily for tech updates', relevance: 0.71, source: 'General' },
]

function MemorySearch() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Semantic Search</h1>
        <p className="text-sm text-slate-400 mt-1">
          Search your knowledge base by meaning
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="py-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by meaning... e.g. 'what do I prefer for coding'"
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleResults.map((r) => (
              <div key={r.id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-slate-200">{r.content}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className="bg-slate-700 text-slate-300">{r.source}</Badge>
                    <Badge className="bg-cyan-900/50 text-cyan-300">{Math.round(r.relevance * 100)}%</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
