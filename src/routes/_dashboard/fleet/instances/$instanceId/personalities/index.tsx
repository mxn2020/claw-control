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
  Users,
  FileText,
  Bot,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/personalities/',
)({
  component: PersonalitiesIndex,
})

const personalityFiles = [
  {
    title: 'SOUL.md',
    description: 'Core personality definition — tone, values, and behavioral guidelines',
    to: '/fleet/instances/$instanceId/personalities/soul' as const,
    icon: Users,
    status: 'configured' as const,
    lastModified: '2 days ago',
    lines: 142,
  },
  {
    title: 'AGENTS.md',
    description: 'Agent-specific instructions and multi-agent coordination rules',
    to: '/fleet/instances/$instanceId/personalities/agents-md' as const,
    icon: Bot,
    status: 'configured' as const,
    lastModified: '5 days ago',
    lines: 87,
  },
]

function PersonalitiesIndex() {
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
        <h1 className="text-2xl font-bold text-white">Personalities</h1>
        <p className="mt-1 text-sm text-slate-400">
          Instance {instanceId} — personality and behavior configuration files
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalityFiles.map((file) => (
          <Link
            key={file.title}
            to={file.to}
            params={{ instanceId }}
            className="block group"
          >
            <Card className="h-full transition-colors group-hover:border-cyan-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <file.icon className="w-5 h-5 text-cyan-400" />
                    <CardTitle>{file.title}</CardTitle>
                  </div>
                  <Badge variant="success">{file.status}</Badge>
                </div>
                <CardDescription>{file.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{file.lines} lines</span>
                  </div>
                  <span>·</span>
                  <span>Modified {file.lastModified}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
