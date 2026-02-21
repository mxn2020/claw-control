import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Brain,
  Wrench,
  Zap,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/configure/defaults')({
  component: ConfigureDefaults,
})

function ConfigureDefaults() {
  const instances = useQuery(api.instances.list, {})
  const skills = useQuery(api.platform.list, {})

  if (!instances) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">Loading defaults…</span>
      </div>
    )
  }

  // Derive default model from the first instance config that has one
  const configuredInstance = instances.find((i) => i.config?.defaultModel)
  const defaultModel = configuredInstance?.config?.defaultModel ?? 'Not configured'
  const sandboxMode = configuredInstance?.config?.sandboxMode ?? false

  // List enabled skills
  const skillList = skills ?? []
  const enabledSkills = skillList.filter((s) => s.isEnabled)
  const disabledSkills = skillList.filter((s) => !s.isEnabled)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Default Settings</h1>
          <p className="text-sm text-slate-400 mt-1">
            Default configurations applied to new agents
          </p>
        </div>
      </div>

      {/* Default Model */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <CardTitle className="text-base">Default Model</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500">Model</p>
              <p className="text-sm text-cyan-400 font-mono">{defaultModel}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Source Instance</p>
              <p className="text-sm text-white font-medium">
                {configuredInstance?.name ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Sandbox Mode</p>
              <Badge variant={sandboxMode ? 'success' : 'default'}>
                {sandboxMode ? 'enabled' : 'disabled'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enabled Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">
              Enabled Skills ({enabledSkills.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {enabledSkills.length === 0 ? (
            <p className="text-sm text-slate-500">No skills enabled</p>
          ) : (
            <div className="space-y-2">
              {enabledSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
                >
                  <div>
                    <span className="text-sm text-white">{skill.name}</span>
                    <span className="text-xs text-slate-500 ml-2">
                      v{skill.version}
                    </span>
                  </div>
                  <Badge variant="success">enabled</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disabled Skills */}
      {disabledSkills.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-slate-400" />
              <CardTitle className="text-base">
                Disabled Skills ({disabledSkills.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {disabledSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
                >
                  <div>
                    <span className="text-sm text-white">{skill.name}</span>
                    <span className="text-xs text-slate-500 ml-2">
                      v{skill.version}
                    </span>
                  </div>
                  <Badge variant="default">disabled</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
