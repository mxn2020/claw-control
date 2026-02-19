import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { User, Save, CheckCircle } from 'lucide-react'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/settings/')({
  component: SettingsProfile,
})

function SettingsProfile() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire to Convex updateUser mutation
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-slate-500 border border-dashed border-slate-700 rounded-lg">
            <p className="text-sm">API key management coming soon.</p>
            <p className="text-xs mt-1">Keys will be stored securely in Convex.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
