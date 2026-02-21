import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { User, Save, CheckCircle, Key, Plus, Trash2, Copy, Eye, EyeOff } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import { useAuth } from '#/lib/authContext'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/settings/')({
  component: SettingsProfile,
})

function SettingsProfile() {
  const { user, token } = useAuth()
  const updateUser = useMutation(api.auth.updateUser)
  const [name, setName] = useState(user?.name ?? '')
  const [email] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  // API Keys
  const apiKeys = useQuery(api.apiKeys.list, user?.id ? { userId: user.id as any } : 'skip')
  const createApiKey = useMutation(api.apiKeys.create)
  const revokeApiKey = useMutation(api.apiKeys.revoke)
  const [newKeyName, setNewKeyName] = useState('')
  const [justCreatedKey, setJustCreatedKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    try {
      await updateUser({ token, name })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save profile:', err)
    }
  }

  async function handleCreateKey() {
    if (!user?.id || !newKeyName.trim()) return
    try {
      const result = await createApiKey({ userId: user.id as any, name: newKeyName.trim() })
      setJustCreatedKey(result.key)
      setNewKeyName('')
    } catch (err) {
      console.error('Failed to create API key:', err)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account and platform preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <CardTitle>Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-cyan-600 flex items-center justify-center text-xl font-bold text-white">
                {(user?.name ?? 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Full Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <Input
                value={email}
                readOnly
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-slate-500">Email cannot be changed in OSS mode.</p>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit">
                {saved ? <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-400" /> : <Save className="w-4 h-4 mr-1.5" />}
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              <CardTitle>API Keys</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Just-created key banner */}
          {justCreatedKey && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-2">
              <p className="text-sm font-medium text-emerald-400">Key created! Copy it now — it won't be shown again.</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-emerald-300 px-3 py-1.5 rounded text-xs font-mono overflow-x-auto">
                  {showKey ? justCreatedKey : '••••••••••••••••••••••••••'}
                </code>
                <Button variant="ghost" size="sm" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(justCreatedKey); }}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-slate-400" onClick={() => { setJustCreatedKey(null); setShowKey(false); }}>
                Dismiss
              </Button>
            </div>
          )}

          {/* Create new key */}
          <div className="flex items-center gap-2">
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name, e.g. 'CLI' or 'CI/CD'"
              className="flex-1"
            />
            <Button size="sm" onClick={handleCreateKey} disabled={!newKeyName.trim()}>
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Create
            </Button>
          </div>

          {/* Key list */}
          {apiKeys && apiKeys.length > 0 ? (
            <div className="divide-y divide-slate-700/50">
              {apiKeys.map((k) => (
                <div key={k._id} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm text-white">{k.name}</p>
                    <p className="text-xs text-slate-500">
                      Created {new Date(k.createdAt).toLocaleDateString()}
                      {k.lastUsedAt && ` · Last used ${new Date(k.lastUsedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-700 text-slate-300 border-slate-600 text-xs font-mono">
                      ck_••••
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => revokeApiKey({ id: k._id })}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No API keys yet. Create one to get started.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
