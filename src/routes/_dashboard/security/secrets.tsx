import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  KeyRound,
  RefreshCw,
  Shield,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useState } from 'react'
import { Input } from '#/components/ui/input'

export const Route = createFileRoute('/_dashboard/security/secrets')({
  component: SecuritySecrets,
})

function SecuritySecrets() {
  const instances = useQuery(api.instances.list, {})
  const agents = useQuery(api.agents.list, {})
  const secrets = useQuery(api.secrets.list, {})
  const createSecret = useMutation(api.secrets.create)
  const removeSecret = useMutation(api.secrets.remove)

  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newValue, setNewValue] = useState('')
  const [newType, setNewType] = useState<'api_key' | 'token' | 'password' | 'certificate'>('api_key')
  const [submitting, setSubmitting] = useState(false)
  const [visibleSecrets, setVisibleSecrets] = useState<Record<string, boolean>>({})

  if (!instances || !agents || !secrets) {
    return (
      <div className="flex items-center justify-center py-20 animate-pulse text-slate-400">
        Loading secrets data…
      </div>
    )
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newValue.trim()) return
    setSubmitting(true)
    try {
      // Mock orgId for demo
      await createSecret({
        orgId: "org_1" as any, // This would normally come from auth or layout context
        name: newName.trim(),
        value: newValue.trim(),
        type: newType,
      })
      setIsAdding(false)
      setNewName('')
      setNewValue('')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleVisibility = (id: string) => {
    setVisibleSecrets(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleDelete = async (id: any) => {
    if (confirm("Are you sure you want to delete this secret? This may break active integrations.")) {
      await removeSecret({ id })
    }
  }

  const statusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success' as const
      case 'stale': return 'warning' as const
      case 'expired': return 'danger' as const
      default: return 'default' as const
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Secrets Vault</h1>
          <p className="text-sm text-slate-400 mt-1">
            Credential management, rotation, and distribution
          </p>
        </div>
        <Button variant={isAdding ? 'outline' : 'default'} size="sm" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Secret</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-cyan-500/50 bg-cyan-950/10">
          <CardHeader>
            <CardTitle className="text-base text-cyan-400">Add New Secret</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input
                    placeholder="e.g. OPENAI_API_KEY"
                    value={newName}
                    onChange={e => setNewName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Type</label>
                  <select
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 flex h-10 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                  >
                    <option value="api_key">API Key</option>
                    <option value="token">Token</option>
                    <option value="password">Password</option>
                    <option value="certificate">Certificate</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Value</label>
                <Input
                  type="password"
                  placeholder="Secret value. Will be encrypted at rest."
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={!newName.trim() || !newValue.trim() || submitting}>
                  Save Secret
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Secrets</span>
              <KeyRound className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {secrets.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Stale / Expired</span>
              <RefreshCw className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {secrets.filter((c) => c.status !== 'active').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Instances</span>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {instances.length}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Credentials List */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Credentials</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {secrets.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <KeyRound className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No secrets configured in the vault.</p>
              <Button variant={"link" as any} onClick={() => setIsAdding(true)} className="text-cyan-400 mt-2">
                Add your first secret
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {secrets.map((cred) => (
                    <tr
                      key={cred._id}
                      className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-cyan-400 font-mono text-xs max-w-[200px] truncate">
                        {cred.name}
                      </td>
                      <td className="px-4 py-3 text-slate-300 capitalize">{cred.type.replace('_', ' ')}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-400 flex items-center gap-2">
                        {visibleSecrets[cred._id] ? (
                          <span>{cred.value}</span>
                        ) : (
                          <span>••••••••••••••••{cred.value.slice(-4)}</span>
                        )}
                        <button onClick={() => toggleVisibility(cred._id)} className="text-slate-500 hover:text-cyan-400">
                          {visibleSecrets[cred._id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(cred.status)}>
                          {cred.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(cred._id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 px-2">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
