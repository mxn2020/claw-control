import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  ArrowLeft,
  Variable,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/fleet/instances/$instanceId/config/environment',
)({
  component: EnvironmentConfig,
})

const mockEnvVars = [
  { id: 1, key: 'NODE_ENV', value: 'production', secret: false },
  { id: 2, key: 'LOG_LEVEL', value: 'info', secret: false },
  { id: 3, key: 'DATABASE_URL', value: '••••••••••••••••', secret: true },
  { id: 4, key: 'REDIS_URL', value: '••••••••••••••••', secret: true },
  { id: 5, key: 'MAX_WORKERS', value: '4', secret: false },
  { id: 6, key: 'RATE_LIMIT_RPM', value: '600', secret: false },
  { id: 7, key: 'SENTRY_DSN', value: '••••••••••••••••', secret: true },
]

function EnvironmentConfig() {
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
          <Variable className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Environment</h1>
            <p className="text-sm text-slate-400">Instance {instanceId}</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Variable
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription className="mt-1">
                Key-value pairs injected into the instance runtime
              </CardDescription>
            </div>
            <Badge variant="info">{mockEnvVars.length} variables</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="pb-3 font-medium text-slate-400">Key</th>
                  <th className="pb-3 font-medium text-slate-400">Value</th>
                  <th className="pb-3 font-medium text-slate-400">Type</th>
                  <th className="pb-3 font-medium text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockEnvVars.map((envVar) => (
                  <tr
                    key={envVar.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="py-3">
                      <span className="font-mono text-xs font-medium text-white">
                        {envVar.key}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-xs text-slate-400">
                        {envVar.value}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant={envVar.secret ? 'warning' : 'default'}>
                        {envVar.secret ? 'secret' : 'plain'}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1">
                        {envVar.secret && (
                          <button
                            type="button"
                            className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                            title="Reveal value"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {!envVar.secret && (
                          <button
                            type="button"
                            className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                            title="Hide value"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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
