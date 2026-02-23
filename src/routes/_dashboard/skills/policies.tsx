import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ShieldCheck,
  Plus,
  Server,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/skills/policies')({
  component: SkillsPolicies,
})

function SkillsPolicies() {
  const skills = useQuery(api.platform.list, {})
  const instances = useQuery(api.instances.list, {})

  if (!skills || !instances) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading policies…</span>
      </div>
    )
  }

  // Derive policies from skill risk levels and instance distribution
  const highRiskSkills = skills.filter((s) => s.riskLevel === 'high' || s.riskLevel === 'critical')
  const enabledSkills = skills.filter((s) => s.isEnabled)
  const disabledSkills = skills.filter((s) => !s.isEnabled)

  const policies = [
    {
      name: 'High-Risk Restrictions',
      description: `${highRiskSkills.length} high/critical risk skills detected. These should be reviewed and restricted in production.`,
      rulesCount: highRiskSkills.length,
      appliedTo: instances.filter((i: any) => i.status === 'online').map((i: any) => i.name),
      status: highRiskSkills.length > 0 ? 'active' : 'inactive',
    },
    {
      name: 'Enabled Skills Policy',
      description: `${enabledSkills.length} skills are currently enabled across the fleet.`,
      rulesCount: enabledSkills.length,
      appliedTo: instances.map((i: any) => i.name),
      status: 'active',
    },
    {
      name: 'Disabled Skills Registry',
      description: `${disabledSkills.length} skills are disabled and blocked from execution.`,
      rulesCount: disabledSkills.length,
      appliedTo: [],
      status: disabledSkills.length > 0 ? 'active' : 'draft',
    },
  ]

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
              <span className="text-sm text-slate-400">Total Skills</span>
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">{skills.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">High-Risk</span>
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {highRiskSkills.length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Enabled</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {enabledSkills.length}
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
                <span className="text-xs text-slate-500">
                  {policy.rulesCount} items
                </span>
                <div className="flex gap-1 flex-wrap">
                  {policy.appliedTo.length > 0 ? (
                    policy.appliedTo.slice(0, 3).map((inst: any) => (
                      <Badge key={inst} variant="outline" className="text-xs">
                        <Server className="w-3 h-3 mr-1" />
                        {inst}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">not applied</span>
                  )}
                  {policy.appliedTo.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{policy.appliedTo.length - 3}
                    </Badge>
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
