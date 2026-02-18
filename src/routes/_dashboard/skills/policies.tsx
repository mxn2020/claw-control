import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ShieldCheck,
  Plus,
  FileText,
  Server,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/skills/policies')({
  component: SkillsPolicies,
})

const policies = [
  {
    name: 'Production Safety',
    description: 'Restrict high-risk skills in production environments. Require approval for CRITICAL-rated skills.',
    rulesCount: 8,
    appliedTo: ['prod-gateway', 'prod-worker-1', 'prod-worker-2'],
    status: 'active',
  },
  {
    name: 'Dev Permissive',
    description: 'Allow all skills with risk ≤ HIGH in development instances. Log all executions.',
    rulesCount: 4,
    appliedTo: ['dev-instance'],
    status: 'active',
  },
  {
    name: 'Staging Mirror',
    description: 'Mirror production policy but allow MEDIUM-risk skills without approval.',
    rulesCount: 6,
    appliedTo: ['staging-server'],
    status: 'active',
  },
  {
    name: 'Data Compliance',
    description: 'Block skills that access external APIs or databases without encryption. Enforce data-at-rest policies.',
    rulesCount: 12,
    appliedTo: ['prod-gateway', 'staging-server'],
    status: 'active',
  },
  {
    name: 'Legacy Lockdown',
    description: 'Freeze skill versions for legacy agents pending migration review.',
    rulesCount: 3,
    appliedTo: [],
    status: 'draft',
  },
]

function SkillsPolicies() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Skill Policies</h1>
          <p className="text-sm text-slate-400 mt-1">
            Global policy templates governing skill usage across the fleet
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Policy
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Policies</span>
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{policies.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {policies.filter((p) => p.status === 'active').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Rules</span>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {policies.reduce((sum, p) => sum + p.rulesCount, 0)}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((policy) => (
          <Card key={policy.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-sm">{policy.name}</CardTitle>
                </div>
                <Badge variant={policy.status === 'active' ? 'success' : 'default'}>
                  {policy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400 mb-3">{policy.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <FileText className="w-3 h-3" />
                  <span>{policy.rulesCount} rules</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {policy.appliedTo.length > 0 ? (
                    policy.appliedTo.map((inst) => (
                      <Badge key={inst} variant="outline" className="text-xs">
                        <Server className="w-3 h-3 mr-1" />
                        {inst}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">not applied</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
