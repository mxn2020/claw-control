import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { Play, Terminal, ChevronRight, Shield, Clock, Zap } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/tools/simulator')({ component: AgentToolsSimulator })

function AgentToolsSimulator() {
  const skills = useQuery(api.platform.list, {})
  const list = skills ?? []
  const [selectedTool, setSelectedTool] = useState('')
  const [args, setArgs] = useState('{}')
  const [output, setOutput] = useState<string | null>(null)
  const [running, setRunning] = useState(false)

  function handleRun() {
    setRunning(true)
    setOutput(null)
    // Simulate execution delay
    setTimeout(() => {
      setOutput(JSON.stringify({
        success: true,
        tool: selectedTool,
        result: `Simulated execution of "${selectedTool}" completed.`,
        duration: '0.42s',
        sandboxed: true,
      }, null, 2))
      setRunning(false)
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-400" />
            Tool Simulator
          </h1>
          <p className="text-sm text-slate-400 mt-1">Test tool invocations in a sandboxed environment</p>
        </div>
        <Badge variant="info" className="flex items-center gap-1.5 px-3 py-1.5">
          <Shield className="w-3 h-3" />
          Sandboxed
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tool Selector */}
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-sm">Available Tools</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-1">
              {list.length === 0 && <p className="text-sm text-slate-500 py-4 text-center">No tools available</p>}
              {list.map(s => (
                <button
                  key={s._id}
                  type="button"
                  onClick={() => setSelectedTool(s.name)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${selectedTool === s.name
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-white'
                      : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Zap className={`w-3.5 h-3.5 flex-shrink-0 ${selectedTool === s.name ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="text-sm font-medium truncate">{s.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${selectedTool === s.name ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Execution Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                {selectedTool ? <span>Execute: <code className="text-cyan-400">{selectedTool}</code></span> : 'Select a tool'}
              </CardTitle>
              <Button
                size="sm"
                disabled={!selectedTool || running}
                onClick={handleRun}
                className="bg-emerald-600 hover:bg-emerald-500"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" />
                {running ? 'Running…' : 'Run'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Arguments (JSON)</label>
              <textarea
                value={args}
                onChange={e => setArgs(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-xs font-mono rounded-lg px-3 py-2 min-h-[80px] focus:border-cyan-500 focus:outline-none"
                placeholder='{"key": "value"}'
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-slate-400">Output</label>
                {output && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <Clock className="w-3 h-3" /> 0.42s
                  </span>
                )}
              </div>
              <div className="rounded-lg border border-slate-700/50 bg-slate-950 p-4 font-mono text-xs min-h-[200px]">
                {running && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Executing in sandbox…
                  </div>
                )}
                {output && <pre className="text-emerald-400 whitespace-pre-wrap">{output}</pre>}
                {!output && !running && (
                  <p className="text-slate-500">Select a tool and click Run to simulate execution.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
