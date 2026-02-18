import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Mic, Settings, MessageSquare, Volume2 } from 'lucide-react'
import { useVoiceSettings } from '#/lib/dataHooks'

export const Route = createFileRoute('/_app/voice/')({
  component: VoiceIndex,
})

function VoiceIndex() {
  const settings = useVoiceSettings()
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
                <Input placeholder={settings?.ttsVoice ?? 'Nova (Default)'} readOnly />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">STT Language</label>
                <Input placeholder={settings?.language ?? 'en-US'} readOnly />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Wake Word</label>
                <div className="flex items-center gap-2">
                  <Input placeholder={settings?.wakeWord ?? 'Hey Claw'} readOnly className="flex-1" />
                  <Badge variant={settings?.enabled ? 'success' : 'danger'}>{settings?.enabled ? 'Active' : 'Inactive'}</Badge>
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
              <p className="text-sm text-slate-500">No recent transcripts</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
