import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/blueprints/new')({
  component: BlueprintNew,
})

function BlueprintNew() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const createBlueprint = useMutation(api.blueprints.create)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !user?.orgId) return
    try {
      await createBlueprint({
        orgId: user.orgId as any,
        name: name.trim(),
        description: description.trim() || undefined,
      })
      navigate({ to: '/blueprints' })
    } catch (err) {
      console.error('Failed to create blueprint:', err)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">New Blueprint</h1>
        <p className="text-sm text-slate-400 mt-1">Create a reusable agent blueprint</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blueprint Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Customer Support Agent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this blueprint does…"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => navigate({ to: '/blueprints' })}>
                Cancel
              </Button>
              <Button type="submit" disabled={!name.trim()}>
                Create Blueprint
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
