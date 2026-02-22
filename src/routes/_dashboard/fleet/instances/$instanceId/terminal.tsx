import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardContent } from '#/components/ui/card'
import { Terminal as TerminalIcon, Maximize2, RefreshCw } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/terminal')({ component: InstanceTerminal })

function InstanceTerminal() {
  const { instanceId } = Route.useParams()
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: `Connected to instance ${instanceId}` },
    { type: 'output', text: 'ClawControl TUI v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of simulated commands.' }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim()
      setHistory(prev => [...prev, { type: 'input', text: `$ ${cmd}` }])
      setInput('')

      setTimeout(() => {
        let response = `bash: ${cmd}: command not found`
        if (cmd === 'help') {
          response = 'Available commands: help, clear, ping, ps, top'
        } else if (cmd === 'clear') {
          setHistory([])
          return
        } else if (cmd === 'ping') {
          response = 'PONG'
        } else if (cmd === 'ps' || cmd === 'top') {
          response = '  PID TTY          TIME CMD\n    1 ?        00:00:01 init\n   14 ?        00:00:00 bash\n  102 ?        00:00:05 node app.js'
        }

        setHistory(prev => [...prev, { type: 'output', text: response }])
      }, 300)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TerminalIcon className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Terminal Server</h1>
            <p className="text-sm text-slate-400 mt-1">Direct TUI access for instance {instanceId.slice(-8)}</p>
          </div>
        </div>
      </div>

      <Card className="border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <CardHeader className="bg-slate-900 border-b border-slate-800 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <span className="text-xs font-mono text-slate-400 ml-4">root@{instanceId.slice(-8)}:~</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <button type="button" onClick={() => setHistory([{ type: 'output', text: 'Terminal reloaded.' }])} className="hover:text-white transition-colors"><RefreshCw className="w-4 h-4" /></button>
              <button type="button" className="hover:text-white transition-colors"><Maximize2 className="w-4 h-4" /></button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="font-mono text-sm p-4 h-[500px] overflow-y-auto flex flex-col" onClick={() => document.getElementById('term-input')?.focus()}>
            {history.map((line, i) => (
              <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-emerald-400' : 'text-slate-300'}`}>
                {line.text}
              </div>
            ))}
            <div className="flex mt-1">
              <span className="text-emerald-400 mr-2">$</span>
              <input
                id="term-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none text-emerald-400 placeholder-transparent focus:ring-0"
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
            </div>
            <div ref={bottomRef} className="h-4"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
