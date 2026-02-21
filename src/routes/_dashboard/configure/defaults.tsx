import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  Settings,
  Brain,
  Wrench,
  ShieldCheck,
  Zap,
  Box,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/configure/defaults')({
  component: ConfigureDefaults,
})

const defaultModel = {
  provider: 'OpenAI',
  model: 'gpt-4o',
  maxTokens: 4096,
  temperature: 0.7,
}

const defaultTools = [
  { name: 'knowledge-base', enabled: true },
  { name: 'web-search', enabled: true },
  { name: 'file-reader', enabled: true },
  { name: 'code-executor', enabled: false },
  { name: 'shell-access', enabled: false },
]

const defaultSkills = [
  { name: 'Slack Notifier', enabled: true },
  { name: 'Web Scraper', enabled: false },
  { name: 'GitHub PR Reviewer', enabled: true },
]

const defaultPolicies = [
  { name: 'Production Safety', applied: true },
  { name: 'Data Compliance', applied: true },
  { name: 'Dev Permissive', applied: false },
]

function ConfigureDefaults() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500">Provider</p>
              <p className="text-sm text-white font-medium">{defaultModel.provider}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Model</p>
              <p className="text-sm text-cyan-400 font-mono">{defaultModel.model}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Max Tokens</p>
              <p className="text-sm text-white font-medium">{defaultModel.maxTokens.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Temperature</p>
              <p className="text-sm text-white font-medium">{defaultModel.temperature}</p>
            </div>
          </div>

          {/* Sandbox Mode */}
          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-sm text-white">Sandbox Mode</p>
                <p className="text-xs text-slate-500">New agents start in sandbox with no external access</p>
              </div>
            </div>
            <div className="w-8 h-4 rounded-full relative cursor-pointer transition-colors bg-cyan-600">
              <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white translate-x-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Tools */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Default Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {defaultTools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
              >
                <span className="text-sm text-white">{tool.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={tool.enabled ? 'success' : 'default'}>
                    {tool.enabled ? 'enabled' : 'disabled'}
                  </Badge>
                  <div
                    className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                      tool.enabled ? 'bg-cyan-600' : 'bg-slate-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                        tool.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Default Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-base">Default Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {defaultSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
              >
                <span className="text-sm text-white">{skill.name}</span>
                <div
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                    skill.enabled ? 'bg-cyan-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      skill.enabled ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Default Policies */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <CardTitle className="text-base">Default Policies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {defaultPolicies.map((policy) => (
              <div
                key={policy.name}
                className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-3 h-3 text-slate-500" />
                  <span className="text-sm text-white">{policy.name}</span>
                </div>
                <div
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                    policy.applied ? 'bg-cyan-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      policy.applied ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
