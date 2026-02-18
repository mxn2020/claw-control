import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Brain,
  FolderTree,
  AlertTriangle,
  Plus,
  Activity,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/')({
  component: AgentMemoryIndex,
})

const mockFileTree = [
  { path: '/memory/facts.json', size: '2.4 KB', entries: 38 },
  { path: '/memory/preferences.json', size: '1.1 KB', entries: 12 },
  { path: '/memory/sessions/', size: '18.6 KB', entries: 142 },
  { path: '/memory/embeddings/', size: '4.2 MB', entries: 1024 },
]

const mockFacts = [
  { id: 'f1', text: 'User prefers concise responses', source: 'session_901', confidence: 0.94 },
  { id: 'f2', text: 'Primary language is English', source: 'config', confidence: 1.0 },
  { id: 'f3', text: 'Works in fintech industry', source: 'session_887', confidence: 0.82 },
  { id: 'f4', text: 'Timezone is EST (UTC-5)', source: 'session_890', confidence: 0.91 },
  { id: 'f5', text: 'Has premium subscription tier', source: 'api_lookup', confidence: 1.0 },
]

const mockConflicts = [
  {
    id: 'c1',
    factA: 'User prefers detailed explanations',
    factB: 'User prefers concise responses',
    sourceA: 'session_842',
    sourceB: 'session_901',
  },
]

const memoryHealthScore = 87

function AgentMemoryIndex() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Memory</h1>
          <p className="mt-1 text-sm text-slate-400">
            Agent {agentId} — memory browser, facts, and conflict detection
          </p>
        </div>
        <Badge
          variant={memoryHealthScore >= 80 ? 'success' : memoryHealthScore >= 60 ? 'warning' : 'danger'}
        >
          Health: {memoryHealthScore}%
        </Badge>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Facts</span>
              <Brain className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">{mockFacts.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Memory Files</span>
              <FolderTree className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">{mockFileTree.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Conflicts</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-white">{mockConflicts.length}</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Tree */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-cyan-400" />
              <CardTitle>File Tree</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockFileTree.map((file) => (
                <div
                  key={file.path}
                  className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                >
                  <span className="text-sm font-mono text-slate-300">{file.path}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{file.entries} entries</span>
                    <span>{file.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fact List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <CardTitle>Facts</CardTitle>
              </div>
              <Badge variant="info">{mockFacts.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockFacts.map((fact) => (
                <div
                  key={fact.id}
                  className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
                >
                  <div>
                    <div className="text-sm text-white">{fact.text}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Source: {fact.source}</div>
                  </div>
                  <Badge variant={fact.confidence >= 0.9 ? 'success' : 'warning'}>
                    {(fact.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Fact Injector */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            <CardTitle>Quick Fact Injector</CardTitle>
          </div>
          <CardDescription>Manually inject a fact into the agent's memory store.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter a fact, e.g. 'User is based in New York'"
              className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            />
            <button
              type="button"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Inject
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Conflict Detection */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <CardTitle>Memory Conflicts</CardTitle>
          </div>
          <CardDescription>
            Detected contradictions between stored facts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockConflicts.length === 0 ? (
            <p className="text-sm text-slate-400">No conflicts detected.</p>
          ) : (
            <div className="space-y-3">
              {mockConflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Fact A ({conflict.sourceA})</div>
                      <div className="text-sm text-white">{conflict.factA}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Fact B ({conflict.sourceB})</div>
                      <div className="text-sm text-white">{conflict.factB}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600 transition-colors"
                    >
                      Keep A
                    </button>
                    <button
                      type="button"
                      className="rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600 transition-colors"
                    >
                      Keep B
                    </button>
                    <button
                      type="button"
                      className="rounded bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
