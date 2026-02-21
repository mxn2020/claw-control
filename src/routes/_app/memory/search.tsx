import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Search, Sparkles } from 'lucide-react'
import { useMemoryFiles } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/memory/search')({
  component: MemorySearch,
})

function MemorySearch() {
  const [query, setQuery] = useState('')
  const memoryFiles = useMemoryFiles() ?? []

  // Client-side filtering — a real implementation would use vector search
  const results = query.trim()
    ? memoryFiles.filter((f) =>
      f.content.toLowerCase().includes(query.toLowerCase()) ||
      f.path.toLowerCase().includes(query.toLowerCase()) ||
      (f.tags ?? []).some((t) => t.toLowerCase().includes(query.toLowerCase()))
    )
    : memoryFiles.slice(0, 10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Semantic Search</h1>
        <p className="text-sm text-slate-400 mt-1">
          Search your knowledge base
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="py-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search memories... e.g. 'coding preferences'"
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
            Results ({results.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((r) => (
                <div key={r._id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 font-mono mb-1">{r.path}</p>
                      <p className="text-sm text-slate-200 line-clamp-2">{r.content}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {r.fileType && <Badge className="bg-slate-700 text-slate-300">{r.fileType}</Badge>}
                      {(r.tags ?? []).map((tag) => (
                        <Badge key={tag} className="bg-cyan-900/50 text-cyan-300">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-6">
              {query ? `No results for "${query}"` : 'No memory files yet. Inject memories from the agent dashboard.'}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
