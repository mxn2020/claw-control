import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { Key, Plus, Trash2, Copy, CheckCircle, Eye, EyeOff } from 'lucide-react'
import type { Id } from '../../../../convex/_generated/dataModel'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convexApi = api as Record<string, any>

export const Route = createFileRoute('/_dashboard/settings/api-keys')({ component: SettingsApiKeys })

function SettingsApiKeys() {
  const { user } = useAuth()
  const userId = user?.id as Id<"users"> | undefined
  const keys = useQuery(convexApi.apiKeys?.list ?? null, userId ? { userId } : "skip")
  const createKey = useMutation(convexApi.apiKeys?.create ?? null)
  const revokeKey = useMutation(convexApi.apiKeys?.revoke ?? null)

  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!userId || !newKeyName.trim()) return
    setIsCreating(true)
    try {
      const result = await createKey({ userId, name: newKeyName.trim() })
      setCreatedKey(result.key)
      setNewKeyName('')
    } finally {
      setIsCreating(false)
    }
  }

  async function handleRevoke(id: Id<"apiKeys">) {
    if (!confirm('Are you sure? This action cannot be undone.')) return
    await revokeKey({ id })
  }

  function handleCopy() {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleCloseCreate() {
    setShowCreate(false)
    setCreatedKey(null)
    setNewKeyName('')
    setShowKey(false)
  }

  const keyList = keys ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-sm text-slate-400 mt-1">Manage personal API keys for ClawControl REST API access</p>
        </div>
        {!showCreate && (
          <Button onClick={() => setShowCreate(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Create Key
          </Button>
        )}
      </div>

      {/* Create Key Dialog */}
      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              {createdKey ? 'Key Created' : 'Create New API Key'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {createdKey ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2.5 text-sm text-emerald-300">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Key created successfully</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Copy this key now — it won't be shown again.
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-slate-800 px-3 py-2 rounded font-mono break-all">
                      {showKey ? createdKey : '•'.repeat(20) + createdKey.slice(-4)}
                    </code>
                    <button onClick={() => setShowKey(!showKey)} className="text-slate-400 hover:text-white transition-colors">
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
                      {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={handleCloseCreate}>Done</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Key Name</label>
                  <Input
                    placeholder="e.g. CI/CD Pipeline, CLI Access"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isCreating || !newKeyName.trim()}>
                  {isCreating ? 'Creating…' : 'Create'}
                </Button>
                <Button type="button" variant="ghost" onClick={handleCloseCreate}>Cancel</Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {keyList.length === 0 ? (
            <div className="text-center py-8">
              <Key className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No API keys yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {keyList.map((k: { _id: Id<"apiKeys">; name: string; createdAt: number; lastUsedAt?: number; keyHash?: string }) => (
                <div key={k._id} className="flex items-center justify-between py-3 px-4 border border-slate-700/50 rounded-lg bg-slate-900/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <Key className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{k.name}</p>
                      <p className="text-xs text-slate-500">
                        Created {new Date(k.createdAt).toLocaleDateString()}
                        {k.lastUsedAt && ` · Last used ${new Date(k.lastUsedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant="outline">ck_•••{k.keyHash?.slice(-4) ?? '••••'}</Badge>
                    <button
                      onClick={() => handleRevoke(k._id)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                      title="Revoke key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
