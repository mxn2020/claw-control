import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Brain, Heart, Plus, Search, FolderOpen, Clock } from 'lucide-react'
import { useMemoryFiles } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/memory/')({
  component: MemoryIndex,
})

const formatRelativeTime = (ts: number) => {
  const diff = Date.now() - ts
  if (diff < 60000) return Math.floor(diff / 1000) + 's ago'
  if (diff < 3600000) return Math.floor(diff / 60000) + ' min ago'
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' hrs ago'
  return Math.floor(diff / 86400000) + ' days ago'
}

function MemoryIndex() {
  const files = useMemoryFiles()

  // Derive topic clusters from tags
  const tagCounts: Record<string, number> = {}
  for (const f of files) {
    for (const tag of f.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }
  }
  const colors = ['bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500']
  const topicClusters = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count], i) => ({ name, count, color: colors[i % colors.length] }))

  // Recent memories (sorted by createdAt descending)
  const recentMemories = [...files]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4)
    .map((f) => ({
      id: f.id,
      content: f.path,
      source: f.fileType,
      time: formatRelativeTime(f.createdAt),
    }))
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Memory</h1>
        <p className="text-sm text-slate-400 mt-1">
          Personal knowledge base overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Memory Health</span>
              <Heart className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">94%</span>
            <span className="text-xs text-emerald-400 ml-2">Healthy</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Facts</span>
              <Brain className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{files.length}</span>
            <span className="text-xs text-slate-400 ml-2">across {topicClusters.length} topics</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Topic Clusters</span>
              <FolderOpen className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {topicClusters.map((t) => (
                <Badge key={t.name} className="bg-slate-700 text-slate-200">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${t.color}`} />
                  {t.name} ({t.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Fact Injection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            Quick Fact Injection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="e.g. My favorite color is blue" className="flex-1" />
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link to="/memory/browse" className="block">
          <Card className="hover:border-cyan-500/50 transition-all cursor-pointer">
            <CardContent className="py-4 flex items-center gap-3">
              <FolderOpen size={20} className="text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-white">Browse Knowledge</p>
                <p className="text-xs text-slate-500">Explore files and facts by category</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/memory/search" className="block">
          <Card className="hover:border-cyan-500/50 transition-all cursor-pointer">
            <CardContent className="py-4 flex items-center gap-3">
              <Search size={20} className="text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-white">Semantic Search</p>
                <p className="text-xs text-slate-500">Find facts by meaning</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Memories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Recent Memories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMemories.map((m) => (
              <div key={m.id} className="flex items-start justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
                <div>
                  <p className="text-sm text-slate-200">{m.content}</p>
                  <p className="text-xs text-slate-500 mt-1">{m.time}</p>
                </div>
                <Badge className="bg-slate-700 text-slate-300 ml-3 flex-shrink-0">{m.source}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
