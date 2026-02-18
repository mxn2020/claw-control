import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Key, Plus, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/settings/api-keys')({
  component: ApiKeysPage,
})

const mockKeys = [
  {
    id: 1,
    name: 'Production API',
    prefix: 'ck_prod_…3xKm',
    created: '2025-01-02',
    lastUsed: '2025-01-15 10:32 UTC',
    status: 'active',
  },
  {
    id: 2,
    name: 'CI / CD Pipeline',
    prefix: 'ck_ci_…9fGz',
    created: '2024-12-18',
    lastUsed: '2025-01-14 22:15 UTC',
    status: 'active',
  },
  {
    id: 3,
    name: 'Local Development',
    prefix: 'ck_dev_…xR4q',
    created: '2024-11-05',
    lastUsed: '2025-01-10 08:44 UTC',
    status: 'active',
  },
  {
    id: 4,
    name: 'Legacy Integration',
    prefix: 'ck_leg_…2bNp',
    created: '2024-06-12',
    lastUsed: '2024-09-01 14:20 UTC',
    status: 'revoked',
  },
]

function ApiKeysPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-sm text-slate-400 mt-1">
            Create and manage API keys for programmatic access
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Key
        </Button>
      </div>

      {/* Keys Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-base">Active Keys</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Prefix
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Last Used
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockKeys.map((key) => (
                  <tr
                    key={key.id}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="px-4 py-3 text-white whitespace-nowrap">
                      {key.name}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap font-mono text-xs">
                      {key.prefix}
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {key.created}
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap font-mono text-xs">
                      {key.lastUsed}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge
                        variant={
                          key.status === 'active' ? 'success' : 'danger'
                        }
                      >
                        {key.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {key.status === 'active' && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-400" />
                          Revoke
                        </Button>
                      )}
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
