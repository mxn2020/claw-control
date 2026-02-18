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
  Cpu,
  DollarSign,
  Clock,
  Zap,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/$agentId/model/')({
  component: AgentModelIndex,
})

const mockProviders = [
  { name: 'OpenAI', selected: true },
  { name: 'Anthropic', selected: false },
  { name: 'Google', selected: false },
  { name: 'Mistral', selected: false },
]

const mockModels = [
  { name: 'gpt-4o', provider: 'OpenAI', selected: true, costPer1k: 0.005 },
  { name: 'gpt-4o-mini', provider: 'OpenAI', selected: false, costPer1k: 0.00015 },
  { name: 'gpt-4-turbo', provider: 'OpenAI', selected: false, costPer1k: 0.01 },
  { name: 'o1-preview', provider: 'OpenAI', selected: false, costPer1k: 0.015 },
]

const mockConfig = {
  maxInputTokens: 128_000,
  maxOutputTokens: 4096,
  temperature: 0.3,
  dailySpendCap: 50.0,
  monthlySpendCap: 1200.0,
  currentDailySpend: 12.38,
  currentMonthlySpend: 284.52,
}

const mockSchedule = [
  { timeRange: '00:00 – 06:00', model: 'gpt-4o-mini', reason: 'Low traffic — cost optimization' },
  { timeRange: '06:00 – 18:00', model: 'gpt-4o', reason: 'Peak hours — full capability' },
  { timeRange: '18:00 – 00:00', model: 'gpt-4o', reason: 'Evening support window' },
]

function AgentModelIndex() {
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
        <h1 className="text-2xl font-bold text-white">Model Configuration</h1>
        <p className="mt-1 text-sm text-slate-400">
          Agent {agentId} — provider, model, token limits, and spend caps
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Provider Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <CardTitle>Provider</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {mockProviders.map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  className={`rounded-lg border p-3 text-left text-sm font-medium transition-colors ${
                    provider.selected
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-700/50 bg-slate-900/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <CardTitle>Model</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockModels.map((model) => (
                <button
                  key={model.name}
                  type="button"
                  className={`w-full flex items-center justify-between rounded-lg border p-3 transition-colors ${
                    model.selected
                      ? 'border-cyan-500/50 bg-cyan-500/10'
                      : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600'
                  }`}
                >
                  <span className="text-sm font-mono text-white">{model.name}</span>
                  <span className="text-xs text-slate-400">${model.costPer1k}/1k tokens</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Token Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Token Limits</CardTitle>
            <CardDescription>Configure maximum input and output token counts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Max Input Tokens</label>
                <input
                  type="number"
                  defaultValue={mockConfig.maxInputTokens}
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Max Output Tokens</label>
                <input
                  type="number"
                  defaultValue={mockConfig.maxOutputTokens}
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Temperature</label>
                <input
                  type="number"
                  defaultValue={mockConfig.temperature}
                  step={0.1}
                  min={0}
                  max={2}
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spend Caps */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <CardTitle>Spend Caps</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Daily</span>
                  <span className="text-sm text-white">
                    ${mockConfig.currentDailySpend.toFixed(2)} / ${mockConfig.dailySpendCap.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full"
                    style={{ width: `${(mockConfig.currentDailySpend / mockConfig.dailySpendCap) * 100}%` }}
                  />
                </div>
              </div>
              <div className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Monthly</span>
                  <span className="text-sm text-white">
                    ${mockConfig.currentMonthlySpend.toFixed(2)} / ${mockConfig.monthlySpendCap.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full"
                    style={{ width: `${(mockConfig.currentMonthlySpend / mockConfig.monthlySpendCap) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time-of-Day Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <CardTitle>Time-of-Day Schedule</CardTitle>
          </div>
          <CardDescription>
            Automatically switch models based on time of day to optimize cost and performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockSchedule.map((slot) => (
              <div
                key={slot.timeRange}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/50 p-3"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-cyan-400 w-32">{slot.timeRange}</span>
                  <Badge variant="info">{slot.model}</Badge>
                </div>
                <span className="text-xs text-slate-400">{slot.reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
