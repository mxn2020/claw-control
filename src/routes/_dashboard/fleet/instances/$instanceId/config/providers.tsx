import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Cloud,
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Trash2,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/providers',
)({
  component: ProvidersConfig,
})

const mockProviders = [
  {
    id: 'prov_1',
    name: 'OpenAI',
    model: 'gpt-4o',
    status: 'active' as const,
    apiKey: 'sk-proj-••••••••••••••••a3Tk',
    lastUsed: '2 min ago',
    requests: 12847,
  },
  {
    id: 'prov_2',
    name: 'Anthropic',
    model: 'claude-3.5-sonnet',
    status: 'active' as const,
    apiKey: 'sk-ant-••••••••••••••••vX9m',
    lastUsed: '14 min ago',
    requests: 5231,
  },
  {
    id: 'prov_3',
    name: 'OpenAI',
    model: 'gpt-4o-mini',
    status: 'inactive' as const,
    apiKey: 'sk-proj-••••••••••••••••p7Rz',
    lastUsed: '3 days ago',
    requests: 892,
  },
]

function ProvidersConfig() {
  const { instanceId } = Route.useParams()

  return (
    <div className="space-y-6">
      <Link
        to="/fleet/instances/$instanceId/config"
        params={{ instanceId }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Configuration
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cloud className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Providers</h1>
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>LLM API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="pb-3 font-medium text-slate-400">Provider</th>
                  <th className="pb-3 font-medium text-slate-400">Model</th>
                  <th className="pb-3 font-medium text-slate-400">Status</th>
                  <th className="pb-3 font-medium text-slate-400">API Key</th>
                  <th className="pb-3 font-medium text-slate-400">Requests</th>
                  <th className="pb-3 font-medium text-slate-400">Last Used</th>
                  <th className="pb-3 font-medium text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProviders.map((provider) => (
                  <tr
                    key={provider.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="py-3 text-white font-medium">{provider.name}</td>
                    <td className="py-3">
                      <span className="font-mono text-xs text-slate-300">
                        {provider.model}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant={provider.status === 'active' ? 'success' : 'default'}>
                        {provider.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-xs text-slate-400">
                        {provider.apiKey}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">
                      {provider.requests.toLocaleString()}
                    </td>
                    <td className="py-3 text-slate-400">{provider.lastUsed}</td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                          title="Reveal key"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                          title="Hide key"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
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
