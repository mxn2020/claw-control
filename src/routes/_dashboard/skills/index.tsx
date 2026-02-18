import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Search, Code, Mail, FolderOpen } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/skills/')({
  component: SkillsOverview,
})

const mockSkills = [
  {
    id: 'skill_1',
    name: 'web-search',
    description: 'Search the web using multiple providers',
    version: '1.2.0',
    riskLevel: 'low' as const,
    enabled: true,
    icon: <Search className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'skill_2',
    name: 'code-interpreter',
    description: 'Execute code in sandboxed environments',
    version: '2.0.1',
    riskLevel: 'high' as const,
    enabled: true,
    icon: <Code className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'skill_3',
    name: 'email-sender',
    description: 'Send emails via configured SMTP or API',
    version: '1.0.3',
    riskLevel: 'medium' as const,
    enabled: true,
    icon: <Mail className="w-5 h-5 text-blue-400" />,
  },
  {
    id: 'skill_4',
    name: 'file-manager',
    description: 'Read, write, and manage files on disk',
    version: '1.1.0',
    riskLevel: 'high' as const,
    enabled: false,
    icon: <FolderOpen className="w-5 h-5 text-amber-400" />,
  },
]

const riskVariant = (level: string) => {
  switch (level) {
    case 'low':
      return 'success' as const
    case 'medium':
      return 'warning' as const
    case 'high':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

const tabs = [
  { label: 'Installed', active: true },
  { label: 'Marketplace', active: false },
  { label: 'Policies', active: false },
  { label: 'Scan', active: false },
]

function SkillsOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <p className="text-sm text-slate-400 mt-1">
          Fleet-wide skill inventory and policies
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              tab.active
                ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSkills.map((skill) => (
          <Card key={skill.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {skill.icon}
                  <CardTitle className="text-base">{skill.name}</CardTitle>
                </div>
                <div
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                    skill.enabled ? 'bg-cyan-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      skill.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">
                {skill.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  v{skill.version}
                </span>
                <Badge variant={riskVariant(skill.riskLevel)}>
                  {skill.riskLevel} risk
                </Badge>
                <span className="text-xs text-slate-500">
                  {skill.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
