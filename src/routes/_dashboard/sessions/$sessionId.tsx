import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ArrowLeft, Bot, MessageSquare, Send, Clock, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/sessions/$sessionId')({
    component: SessionDetailPage,
})

const timeAgo = (ms: number) => {
    const d = Date.now() - ms
    if (d < 60_000) return 'just now'
    if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`
    return `${Math.floor(d / 3_600_000)}h ago`
}

function SessionDetailPage() {
    const { sessionId } = Route.useParams()
    const session = useQuery(api.sessions.get, { id: sessionId as Id<"sessions"> })
    const messages = useQuery(api.sessions.getMessages, { sessionId: sessionId as Id<"sessions"> })
    const addMessage = useMutation(api.sessions.addMessage)
    const [newMsg, setNewMsg] = useState('')
    const [godMode, setGodMode] = useState(false)

    if (session === undefined) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-pulse text-slate-400">Loading session…</div>
            </div>
        )
    }

    if (session === null) {
        return (
            <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Session not found.</p>
                <Link to="/sessions" className="text-cyan-400 hover:underline text-sm mt-2 inline-block">← Back</Link>
            </div>
        )
    }

    const msgList = messages ?? []

    const handleSend = async () => {
        if (!newMsg.trim()) return
        await addMessage({
            sessionId: session._id,
            role: godMode ? 'system' : 'user',
            content: newMsg.trim(),
        })
        setNewMsg('')
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 flex-shrink-0">
                <Link to="/sessions" className="text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-bold text-white truncate">{session.title ?? 'Untitled Session'}</h1>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{session.channel ?? 'default'}</span>
                        <span>·</span>
                        <span>{session.messageCount} messages</span>
                        <span>·</span>
                        <span><Clock className="w-3 h-3 inline mr-1" />{timeAgo(session.startedAt)}</span>
                    </div>
                </div>
                <Badge variant={session.status === 'active' ? 'success' : 'default'}>{session.status}</Badge>
            </div>

            {/* Message thread */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {msgList.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <Bot className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p>No messages in this session yet.</p>
                    </div>
                ) : (
                    msgList.map((msg: any) => (
                        <div key={msg._id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'assistant' && (
                                <div className="w-7 h-7 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                            )}
                            <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.role === 'user'
                                ? 'bg-cyan-600 text-white rounded-tr-sm'
                                : msg.role === 'system'
                                    ? 'bg-amber-900/30 text-amber-200 border border-amber-700/40 rounded-tl-sm'
                                    : 'bg-slate-800 text-slate-200 rounded-tl-sm'
                                }`}>
                                <p>{msg.content}</p>
                                <p className="text-xs opacity-50 mt-1">{timeAgo(msg.createdAt)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            {session.status === 'active' && (
                <div className="flex-shrink-0 flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        title="God Mode (Inject system instruction)"
                        onClick={() => setGodMode(!godMode)}
                        className={`px-3 transition-colors ${godMode ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'text-slate-400'}`}
                    >
                        <ShieldAlert className="w-4 h-4" />
                    </Button>
                    <input
                        type="text"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={godMode ? "Inject system overriding instruction..." : "Send a message…"}
                        className={`flex-1 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors ${godMode
                                ? 'bg-amber-950/20 border-amber-500/50 focus:ring-amber-500'
                                : 'bg-slate-800 border-slate-600 focus:ring-cyan-500'
                            }`}
                    />
                    <Button type="button" onClick={handleSend} disabled={!newMsg.trim()} className={godMode ? 'bg-amber-600 hover:bg-amber-700' : ''}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}
