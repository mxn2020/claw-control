import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Save, CheckCircle } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/fleet/instances/$instanceId/personalities/agents-md')({
  component: InstancePersonalityAgentsMd,
})

function InstancePersonalityAgentsMd() {
  const { instanceId } = Route.useParams()
  const instance = useQuery(api.instances.get, { id: instanceId as Id<"instances"> })
  const agents = useQuery(api.agents.list, instance ? { instanceId: instance._id } : 'skip')
  const updatePersonality = useMutation(api.agents.updatePersonality)
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)

  const primaryAgent = agents?.[0]

  useEffect(() => {
    if (primaryAgent?.personality?.agentsMd) setContent(primaryAgent.personality.agentsMd)
  }, [primaryAgent?.personality?.agentsMd])

  async function handleSave() {
    if (!primaryAgent) return
    try {
      await updatePersonality({
        id: primaryAgent._id,
        personality: { ...primaryAgent.personality, agentsMd: content },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save:', err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AGENTS.md</h1>
          <p className="text-sm text-slate-400 mt-1">
            Behavioral guidelines{instance ? ` — ${instance.name}` : ''}
          </p>
        </div>
        <Button size="sm" onClick={handleSave} disabled={!primaryAgent}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save'}
        </Button>
      </div>
      {!primaryAgent && agents !== undefined && (
        <p className="text-xs text-amber-400">No agents on this instance. Deploy an agent first to edit personality files.</p>
      )}
      <textarea
        className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 min-h-[400px] font-mono focus:border-cyan-500 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="# AGENTS.md&#10;&#10;Define agent collaboration rules here..."
        disabled={!primaryAgent}
      />
    </div>
  )
}
