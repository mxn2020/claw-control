import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Activity, Clock, Wrench, User, Bot, Server, Terminal } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/sessions/$sessionId/trace')({
  component: SessionTrace,
})

function SessionTrace() {
  const { sessionId } = Route.useParams()
  const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
  const msgList = messages ?? []

  // Calculate total session time if we have messages
  const firstMsgTime = msgList.length > 0 ? msgList[0].createdAt : 0;
  const lastMsgTime = msgList.length > 0 ? msgList[msgList.length - 1].createdAt : 0;
  const totalDuration = lastMsgTime - firstMsgTime;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Trace Waterfall</h1>
          </div>
          <p className="text-sm text-slate-400">Execution trace for session {sessionId}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-slate-300">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {totalDuration > 0 ? `${(totalDuration / 1000).toFixed(2)}s total` : '--'}
          </Badge>
          <Badge variant="info">{msgList.length} interactions</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Execution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 relative">
            {msgList.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No trace data available.</p>}

            {/* Vertical timeline line */}
            {msgList.length > 0 && (
              <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-700 z-0"></div>
            )}

            {msgList.map((msg, idx) => {
              const isTool = msg.role === 'tool' || msg.toolCalls?.length;
              const isAssistant = msg.role === 'assistant';
              const isUser = msg.role === 'user';

              let Icon = Terminal;
              let colorClass = 'text-slate-400 bg-slate-800 border-slate-700';
              let badgeVariant: "default" | "success" | "info" | "warning" | "error" | "outline" = "outline";

              if (isUser) {
                Icon = User;
                colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                badgeVariant = 'success';
              } else if (isTool) {
                Icon = Wrench;
                colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                badgeVariant = 'warning';
              } else if (isAssistant) {
                Icon = Bot;
                colorClass = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
                badgeVariant = 'info';
              } else {
                Icon = Server;
              }

              return (
                <div key={msg._id} className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center flex-shrink-0 z-10 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 rounded-lg border border-slate-700/50 bg-slate-900/80 p-4 relative overflow-hidden group">
                    {/* Hover highlight line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-700 group-hover:bg-cyan-500 transition-colors"></div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={badgeVariant}>{msg.role}</Badge>
                        {msg.timingMs && (
                          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            {msg.timingMs}ms
                          </span>
                        )}
                        {msg.tokens && (
                          <span className="text-xs text-slate-500">{msg.tokens} tokens</span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        {new Date(msg.createdAt).toISOString().split('T')[1].replace('Z', '')}
                      </span>
                    </div>

                    {msg.content && (
                      <div className="text-sm text-slate-300 whitespace-pre-wrap mb-3 border-l-2 border-slate-700/50 pl-3">
                        {msg.content.substring(0, 300)}
                        {msg.content.length > 300 && <span className="text-slate-500">... (truncated)</span>}
                      </div>
                    )}

                    {msg.toolCalls && msg.toolCalls.length > 0 && (
                      <div className="space-y-2 mt-3 bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Tool Invocations</p>
                        {msg.toolCalls.map((tc, tIdx) => (
                          <div key={tIdx} className="text-xs">
                            <span className="font-mono text-amber-400">{tc.name}</span>
                            <span className="text-slate-400 ml-2">
                              {tc.arguments ? tc.arguments.substring(0, 50) + (tc.arguments.length > 50 ? '...' : '') : '{}'}
                            </span>
                            {tc.result && (
                              <div className="mt-1 text-slate-500 font-mono truncate">
                                ↳ {tc.result}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
