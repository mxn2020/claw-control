import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { useMemoryFiles } from '#/lib/dataHooks'
import { useToast } from '#/components/ui/toast'
import { FileText, Search, Eye, Edit, Plus, Clock, Database } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/memory/browser')({ component: AgentMemoryBrowser })

function AgentMemoryBrowser() {
  const { agentId } = Route.useParams()
  const memory = useMemoryFiles({ agentId })
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const files = memory ?? []
  const filtered = search
    ? files.filter((f: { path: string; content?: string }) =>
      f.path.toLowerCase().includes(search.toLowerCase()) ||
      f.content?.toLowerCase().includes(search.toLowerCase())
    )
    : files

  const selectedEntry = files.find((f: { _id: string }) => f._id === selectedFile)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Memory Browser</h1>
          <p className="text-sm text-slate-400 mt-1">{files.length} memory file{files.length !== 1 ? 's' : ''}</p>
        </div>
        <Button size="sm" onClick={() => toast('Quick inject available at Memory > Inject', 'info')}>
          <Plus className="w-4 h-4 mr-1.5" />
          Add Entry
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Search memory files by path or content…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* File list */}
        <div className="lg:col-span-1 space-y-2">
          <Card>
            <CardHeader><CardTitle className="text-sm">Files</CardTitle></CardHeader>
            <CardContent>
              {filtered.length === 0 ? (
                <div className="text-center py-6">
                  <Database className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">{files.length === 0 ? 'No memory files yet' : 'No matches found'}</p>
                </div>
              ) : (
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {filtered.map((f: { _id: string; path: string; type?: string; updatedAt?: number; createdAt?: number }) => (
                    <button
                      key={f._id}
                      onClick={() => setSelectedFile(f._id)}
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedFile === f._id
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-800 border border-transparent'
                        }`}
                    >
                      <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs truncate">{f.path}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(f.updatedAt ?? f.createdAt ?? 0).toLocaleDateString()}
                        </p>
                      </div>
                      {f.type && <Badge variant="outline" className="text-[10px] flex-shrink-0">{f.type}</Badge>}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* File content viewer */}
        <div className="lg:col-span-2">
          <Card className="min-h-[400px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  {selectedEntry ? (
                    <>
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono">{(selectedEntry as { path: string }).path}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">Select a file to view</span>
                    </>
                  )}
                </CardTitle>
                {selectedEntry && (
                  <Button size="sm" variant="ghost" onClick={() => toast('Memory editor available at Memory > Editor', 'info')}>
                    <Edit className="w-3.5 h-3.5 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedEntry ? (
                <pre className="bg-slate-800 rounded-lg p-4 text-sm text-slate-300 font-mono whitespace-pre-wrap overflow-auto max-h-[500px] border border-slate-700/50">
                  {(selectedEntry as { content?: string }).content ?? '(empty file)'}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-slate-600">
                  <div className="text-center">
                    <Database className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm">Select a memory file from the list to preview its contents</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
