import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Play, Pause, SkipForward, SkipBack, ListOrdered, ChevronRight } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useState, useEffect } from 'react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/sessions/$sessionId/replay')({
  component: SessionReplay,
})

function SessionReplay() {
  const { sessionId } = Route.useParams()
  const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
  const msgList = messages ?? []
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const active = msgList[currentStep - 1]

  useEffect(() => {
    let interval: number | undefined
    if (isPlaying && msgList.length > 0) {
      interval = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= msgList.length) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, msgList.length])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListOrdered className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Replay</h1>
          </div>
          <p className="text-sm text-slate-400">Step-by-step replay for session {sessionId}</p>
        </div>
        <Badge variant="info">Step {currentStep} / {msgList.length}</Badge>
      </div>

      <div className="flex items-center justify-center gap-4 py-4 bg-slate-900 rounded-lg border border-slate-800">
        <button type="button" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"><SkipBack className="w-4 h-4" /></button>
        {isPlaying ? (
          <button type="button" onClick={() => setIsPlaying(false)} className="inline-flex items-center gap-2 rounded-lg bg-amber-600/20 text-amber-500 border border-amber-500/30 px-6 py-2 text-sm font-medium hover:bg-amber-600/30 transition-colors"><Pause className="w-4 h-4" />Pause</button>
        ) : (
          <button type="button" onClick={() => {
            if (currentStep >= msgList.length) setCurrentStep(1);
            setIsPlaying(true);
          }} className="inline-flex items-center gap-2 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 px-6 py-2 text-sm font-medium hover:bg-cyan-600/30 transition-colors"><Play className="w-4 h-4" />Play</button>
        )}
        <button type="button" onClick={() => setCurrentStep(Math.min(msgList.length, currentStep + 1))} className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"><SkipForward className="w-4 h-4" /></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader><CardTitle className="text-sm">Steps</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-700/50">
                {msgList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No messages to replay.</p>}
                {msgList.map((msg: any, idx: any) => (
                  <button key={msg._id} type="button" onClick={() => setCurrentStep(idx + 1)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${idx + 1 === currentStep ? 'bg-cyan-600/10 border-l-2 border-cyan-400' : 'hover:bg-slate-800/50 border-l-2 border-transparent'}`}>
                    <ChevronRight className={`w-3 h-3 shrink-0 ${idx + 1 === currentStep ? 'text-cyan-400' : 'text-slate-600'}`} />
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">{msg.role}: {msg.content.slice(0, 40)}…</div>
                      <div className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                    </div>
                    <Badge variant={msg.role === 'user' ? 'info' : 'default'} className="ml-auto shrink-0">{msg.role}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          {active ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Step Detail</CardTitle>
                  <Badge variant={active.role === 'user' ? 'info' : 'default'}>{active.role}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div><span className="text-xs text-slate-400">Role</span><p className="text-sm font-medium text-white">{active.role}</p></div>
                <div><span className="text-xs text-slate-400">Timestamp</span><p className="text-sm text-white">{new Date(active.createdAt).toLocaleString()}</p></div>
                <div><span className="text-xs text-slate-400">Content</span><div className="mt-1 rounded-lg border border-cyan-700/40 bg-cyan-900/20 p-3 text-sm text-slate-300">{active.content}</div></div>
              </CardContent>
            </Card>
          ) : (
            <Card><CardContent className="py-12 text-center text-slate-500">No step selected.</CardContent></Card>
          )}
        </div>
      </div>
    </div>
  )
}
