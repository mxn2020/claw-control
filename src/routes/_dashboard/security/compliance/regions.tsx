import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/security/compliance/regions')({ component: ComplianceRegions })
function ComplianceRegions() {
  const stats = useQuery(api.platform.getStats, {})
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Data Regions</h1><p className="text-sm text-slate-400 mt-1">Data residency and region configuration</p></div>
      <div className="grid grid-cols-2 gap-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Total Instances</p><p className="text-2xl font-bold text-white mt-1">{stats?.totalInstances ?? 0}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-slate-400">Online</p><p className="text-2xl font-bold text-emerald-400 mt-1">{stats?.onlineInstances ?? 0}</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Region Configuration</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-400">Data region policies are managed at the infrastructure level. Current instances are running in the regions configured during deployment.</p></CardContent></Card>
    </div>
  )
}
