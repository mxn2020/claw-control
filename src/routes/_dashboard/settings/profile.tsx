import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { User, Upload, Globe, FileText } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/settings/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account details and preferences
        </p>
      </div>

      {/* Avatar */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-base">Avatar</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
              <User className="w-8 h-8 text-slate-400" />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
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
                <label className="block text-xs text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Alex Morgan"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="alex@acme.co"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timezone */}
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
            <option value="America/Los_Angeles">
              America / Los Angeles (PST)
            </option>
            <option value="Europe/London">Europe / London (GMT)</option>
            <option value="Asia/Tokyo">Asia / Tokyo (JST)</option>
          </select>
        </CardContent>
      </Card>

      {/* Bio */}
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
            defaultValue="Platform engineer at Acme Corp. Working on AI agent infrastructure."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button variant="default" size="sm">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
