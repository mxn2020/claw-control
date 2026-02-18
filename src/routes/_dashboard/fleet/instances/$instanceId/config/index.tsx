import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import {
  ArrowLeft,
  Settings,
  Cloud,
  Wrench,
  Brain,
  Shield,
  Variable,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/',
)({
  component: ConfigIndex,
})

const configSections = [
  {
    title: 'General',
    description: 'Instance name, version, region, and resource limits',
    icon: Settings,
    to: '/fleet/instances/$instanceId/config/general' as const,
    status: 'configured',
    summary: 'v0.9.2 · nyc3 · 4 vCPU / 8 GB',
  },
  {
    title: 'Providers',
    description: 'LLM provider API keys and model configuration',
    icon: Cloud,
    to: '/fleet/instances/$instanceId/config/providers' as const,
    status: 'configured',
    summary: '3 providers · 2 active',
  },
  {
    title: 'Tools',
    description: 'Tool allow/deny list and permission controls',
    icon: Wrench,
    to: '/fleet/instances/$instanceId/config/tools' as const,
    status: 'configured',
    summary: '6 of 8 tools enabled',
  },
  {
    title: 'Skills',
    description: 'Skill modules and capability configuration',
    icon: Brain,
    to: '/fleet/instances/$instanceId/config' as const,
    status: 'default',
    summary: 'Using default skill set',
  },
  {
    title: 'Policies',
    description: 'Security policies, sandbox mode, and access rules',
    icon: Shield,
    to: '/fleet/instances/$instanceId/config/policies' as const,
    status: 'configured',
    summary: 'Sandbox enabled · 3 rules',
  },
  {
    title: 'Environment',
    description: 'Environment variables and runtime secrets',
    icon: Variable,
    to: '/fleet/instances/$instanceId/config/environment' as const,
    status: 'configured',
    summary: '7 variables set',
  },
]

function ConfigIndex() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Instance
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Configuration</h1>
        <p className="mt-1 text-sm text-slate-400">
          Instance {instanceId} — manage settings across all configuration areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configSections.map((section) => (
          <Link
            key={section.title}
            to={section.to}
            params={{ instanceId }}
            className="block group"
          >
            <Card className="h-full transition-colors group-hover:border-cyan-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <section.icon className="w-5 h-5 text-cyan-400" />
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <Badge
                    variant={
                      section.status === 'configured' ? 'success' : 'default'
                    }
                  >
                    {section.status}
                  </Badge>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">{section.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
