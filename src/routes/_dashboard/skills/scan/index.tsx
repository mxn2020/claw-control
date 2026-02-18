import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/skills/scan/')({
  component: SkillScanOverview,
})

function SkillScanOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Skill Security Scan</h1>
        <p className="text-sm text-slate-400 mt-1">Overview of skill security scanning status</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Skills', value: '24', color: 'text-white' },
          { label: 'Pending', value: '3', color: 'text-amber-400' },
          { label: 'Passed', value: '19', color: 'text-emerald-400' },
          { label: 'Quarantined', value: '2', color: 'text-red-400' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scan Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { skill: 'web-search', result: 'passed', date: '2025-01-15' },
              { skill: 'code-interpreter', result: 'passed', date: '2025-01-15' },
              { skill: 'file-manager', result: 'quarantined', date: '2025-01-14' },
            ].map((row) => (
              <div
                key={row.skill}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
              >
                <span className="font-mono text-sm text-white">{row.skill}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{row.date}</span>
                  <Badge variant={row.result === 'passed' ? 'success' : 'danger'}>{row.result}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
