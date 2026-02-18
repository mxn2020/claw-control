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
  Bot,
  User,
  FileText,
  Variable,
  History,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/personality/',
)({
  component: AgentPersonalityIndex,
})

const personalityFiles = [
  {
    title: 'SOUL.md',
    description: 'Core personality definition — tone, values, and behavioral guidelines',
    to: '/agents/$agentId/personality/soul' as const,
    icon: Users,
    inheritance: 'Inherited from instance' as const,
    lastModified: '2 days ago',
    lines: 142,
  },
  {
    title: 'AGENTS.md',
    description: 'Agent-specific instructions and multi-agent coordination rules',
    to: '/agents/$agentId/personality/agents-md' as const,
    icon: Bot,
    inheritance: 'Override' as const,
    lastModified: '5 days ago',
    lines: 87,
  },
  {
    title: 'USER.md',
    description: 'User context and personalization — memory, preferences, and history',
    to: '/agents/$agentId/personality/user-md' as const,
    icon: User,
    inheritance: 'Override' as const,
    lastModified: '1 day ago',
    lines: 54,
  },
]

const subPages = [
  {
    title: 'Variables',
    description: 'Template variables injected into personality files',
    icon: Variable,
    count: 12,
  },
  {
    title: 'History',
    description: 'Personality change log and version diffs',
    icon: History,
    count: 23,
  },
]

function AgentPersonalityIndex() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agent
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Personality</h1>
        <p className="mt-1 text-sm text-slate-400">
          Agent {agentId} — personality and behavior configuration files
        </p>
      </div>

      {/* Personality File Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personalityFiles.map((file) => (
          <Link
            key={file.title}
            to={file.to}
            params={{ agentId }}
            className="block group"
          >
            <Card className="h-full transition-colors group-hover:border-cyan-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <file.icon className="w-5 h-5 text-cyan-400" />
                    <CardTitle>{file.title}</CardTitle>
                  </div>
                  <Badge
                    variant={file.inheritance === 'Override' ? 'warning' : 'info'}
                  >
                    {file.inheritance}
                  </Badge>
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

      {/* Sub-pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subPages.map((page) => (
          <Card key={page.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <page.icon className="w-5 h-5 text-cyan-400" />
                  <CardTitle>{page.title}</CardTitle>
                </div>
                <Badge variant="default">{page.count}</Badge>
              </div>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
