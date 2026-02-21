import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/compliance/retention')({ component: ComplianceRetention })
function ComplianceRetention() {
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Data Retention</h1><p className="text-sm text-slate-400 mt-1">Configure data retention policies</p></div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Sessions</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalSessions ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Agents</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalAgents ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Skills</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalSkills ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Retention Policy</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Data retention policies are managed at the platform level. Contact your administrator to configure custom retention periods for sessions, logs, and audit data.</p></CardContent></Card>
    </div>
  )
}
