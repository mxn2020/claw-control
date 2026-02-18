import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  ArrowLeft,
  Variable,
  Plus,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/agents/$agentId/personality/variables',
)({
  component: AgentPersonalityVariables,
})

const mockVariables = [
  { name: '{{role}}', value: 'Customer Support Agent', description: 'The primary role this agent assumes in conversations' },
  { name: '{{timezone}}', value: 'America/New_York', description: 'Default timezone for date/time references' },
  { name: '{{language}}', value: 'English', description: 'Primary language for agent responses' },
  { name: '{{company}}', value: 'Acme Corp', description: 'Company name used in greetings and signatures' },
  { name: '{{escalation_email}}', value: 'support@acme.dev', description: 'Email address for human escalation handoff' },
]

function AgentPersonalityVariables() {
  const { agentId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/agents/$agentId/personality"
        params={{ agentId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Personality
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Variable className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Template Variables</h1>
            <p className="text-sm text-slate-400">Agent {agentId}</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Variable
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-400">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-400">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody>
                {mockVariables.map((variable) => (
                  <tr key={variable.name} className="border-b border-slate-700/50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-cyan-400">{variable.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Input defaultValue={variable.value} className="max-w-xs" />
                    </td>
                    <td className="py-3 px-4 text-slate-400">{variable.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
