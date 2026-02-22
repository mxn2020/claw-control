import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { User, Upload, Globe, FileText, Save, CheckCircle } from 'lucide-react'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/settings/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your account details and preferences</p>
        </div>
        <Button size="sm" onClick={handleSave}>
          {saved ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-base">Avatar</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <p className="text-sm text-white font-medium">{user?.name ?? 'User'}</p>
              <p className="text-xs text-slate-400">{user?.email ?? ''}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-base">Personal Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name ?? ''}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email ?? ''}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-base">Timezone</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <select className="w-full sm:w-64 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
            <option value="America/New_York">America / New York (EST)</option>
            <option value="America/Chicago">America / Chicago (CST)</option>
            <option value="America/Los_Angeles">America / Los Angeles (PST)</option>
            <option value="Europe/London">Europe / London (GMT)</option>
            <option value="Europe/Berlin">Europe / Berlin (CET)</option>
            <option value="Asia/Tokyo">Asia / Tokyo (JST)</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-base">Bio</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            rows={3}
            placeholder="Tell us about yourself..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </CardContent>
      </Card>
    </div>
  )
}
