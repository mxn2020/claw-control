import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Mic, Settings, MessageSquare, Volume2 } from 'lucide-react'

export const Route = createFileRoute('/_app/voice/')({
  component: VoiceIndex,
})

const recentTranscripts = [
  { id: '1', text: 'Hey Claw, schedule a meeting with the design team for tomorrow at 2pm.', time: '10 min ago', agent: 'Calendar Agent' },
  { id: '2', text: 'Summarize the last 3 emails from the marketing team.', time: '25 min ago', agent: 'Email Drafter' },
  { id: '3', text: 'What\'s the status on the deployment pipeline?', time: '1 hr ago', agent: 'Code Reviewer' },
  { id: '4', text: 'Add a reminder to review the Q3 budget report by Friday.', time: '2 hrs ago', agent: 'Task Agent' },
]

function VoiceIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Voice</h1>
        <p className="text-sm text-slate-400 mt-1">
          Voice interaction center and settings
        </p>
      </div>

      {/* Talk Mode */}
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center space-y-4">
            <button className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-700 border-2 border-slate-600 hover:border-cyan-500 hover:bg-slate-600 transition-all">
              <Mic size={36} className="text-cyan-400" />
            </button>
            <div className="text-center">
              <p className="text-sm font-medium text-white">Talk Mode</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-slate-500" />
                <span className="text-xs text-slate-400">Idle — Tap to speak</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              Voice Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">TTS Voice</label>
                <Input placeholder="Nova (Default)" readOnly />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">STT Language</label>
                <Input placeholder="English (US)" readOnly />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Wake Word</label>
                <div className="flex items-center gap-2">
                  <Input placeholder="Hey Claw" readOnly className="flex-1" />
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <div className="flex items-center gap-2">
                  <Volume2 size={14} className="text-slate-400" />
                  <span className="text-xs text-slate-400">Audio Output</span>
                </div>
                <span className="text-xs text-slate-300">System Default</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transcripts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Recent Transcripts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTranscripts.map((t) => (
                <div key={t.id} className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2.5">
                  <p className="text-sm text-slate-200">{t.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.agent} · {t.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
