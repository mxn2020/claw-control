import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  KeyRound,
  Plus,
  BarChart3,
  Eye,
  EyeOff,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/configure/providers')({
  component: ConfigureProviders,
})

const providers = [
  {
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'o1-preview'],
    keyConfigured: true,
    keyHint: 'sk-…3xKm',
    usage: { requests: 124500, tokens: 48200000, cost: '$342.10' },
    status: 'active',
  },
  {
    name: 'Anthropic',
    models: ['claude-3.5-sonnet', 'claude-3-haiku'],
    keyConfigured: true,
    keyHint: 'sk-ant-…9fGz',
    usage: { requests: 38200, tokens: 15800000, cost: '$118.50' },
    status: 'active',
  },
  {
    name: 'Google',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro'],
    keyConfigured: true,
    keyHint: 'AIza…xR4q',
    usage: { requests: 12100, tokens: 5400000, cost: '$28.40' },
    status: 'active',
  },
  {
    name: 'Mistral',
    models: ['mistral-large', 'mistral-medium'],
    keyConfigured: false,
    keyHint: '',
    usage: { requests: 0, tokens: 0, cost: '$0.00' },
    status: 'not configured',
  },
  {
    name: 'Groq',
    models: ['llama-3.1-70b', 'mixtral-8x7b'],
    keyConfigured: false,
    keyHint: '',
    usage: { requests: 0, tokens: 0, cost: '$0.00' },
    status: 'not configured',
  },
]

function ConfigureProviders() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">LLM Providers</h1>
          <p className="text-sm text-slate-400 mt-1">
            Global provider vault — API keys, usage stats, and model availability
          </p>
        </div>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Providers</span>
              <KeyRound className="w-5 h-5 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {providers.filter((p) => p.status === 'active').length}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Requests</span>
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">
              {providers.reduce((sum, p) => sum + p.usage.requests, 0).toLocaleString()}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Cost</span>
              <BarChart3 className="w-5 h-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-white">$489.00</span>
          </CardContent>
        </Card>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <Card key={provider.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{provider.name}</CardTitle>
                <Badge variant={provider.status === 'active' ? 'success' : 'default'}>
                  {provider.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* API Key */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">API Key</span>
                  {provider.keyConfigured ? (
                    <span className="flex items-center gap-1 text-xs text-slate-300 font-mono">
                      <EyeOff className="w-3 h-3" />
                      {provider.keyHint}
                    </span>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  )}
                </div>

                {/* Models */}
                <div>
                  <span className="text-xs text-slate-400">Models</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {provider.models.map((model) => (
                      <Badge key={model} variant="outline" className="text-xs">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Usage */}
                {provider.keyConfigured && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500">Requests</p>
                      <p className="text-sm text-white font-medium">
                        {provider.usage.requests.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Tokens</p>
                      <p className="text-sm text-white font-medium">
                        {(provider.usage.tokens / 1_000_000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Cost</p>
                      <p className="text-sm text-white font-medium">
                        {provider.usage.cost}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
