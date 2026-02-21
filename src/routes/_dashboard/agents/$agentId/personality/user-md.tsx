import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Save, CheckCircle } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/agents/$agentId/personality/user-md')({
  component: AgentUserMdEditor,
})

function AgentUserMdEditor() {
  const { agentId } = Route.useParams()
  const agent = useQuery(api.agents.get, { id: agentId as any })
  const updatePersonality = useMutation(api.agents.updatePersonality)
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (agent?.personality?.userMd) setContent(agent.personality.userMd)
  }, [agent?.personality?.userMd])

  async function handleSave() {
    try {
      await updatePersonality({
        id: agentId as any,
        personality: {
          ...agent?.personality,
          userMd: content,
        },
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
          <h2 className="text-lg font-semibold text-white">USER.md</h2>
          <p className="text-xs text-slate-500">Define user-specific personalization and preferences</p>
        </div>
        <Button size="sm" onClick={handleSave}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save'}
        </Button>
      </div>
      <textarea
        className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg px-3 py-2 min-h-[400px] font-mono focus:border-cyan-500 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="# USER.md&#10;&#10;Define user preferences and context here..."
      />
    </div>
  )
}
