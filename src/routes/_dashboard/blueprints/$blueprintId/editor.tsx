import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import {
  FileCode,
  Save,
  Brain,
  Wrench,
  Zap,
  Radio,
} from 'lucide-react'

export const Route = createFileRoute(
  '/_dashboard/blueprints/$blueprintId/editor',
)({
  component: BlueprintEditor,
})

function BlueprintEditor() {
  const { blueprintId } = Route.useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileCode className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Blueprint Editor</h1>
            <p className="text-sm text-slate-400 mt-1">
              Editing blueprint {blueprintId}
            </p>
          </div>
        </div>
        <Button variant="default" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Personality / SOUL.md */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <CardTitle className="text-sm">Personality — SOUL.md</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full min-h-[160px] rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300 font-mono resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500"
            defaultValue={`# Customer Support Agent\n\nYou are a friendly, professional support agent.\nAlways greet the user by name when available.\nEscalate billing issues to the billing team.\nNever share internal system details.\n`}
          />
        </CardContent>
      </Card>

      {/* Tools Config */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-sm">Tools Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: 'knowledge-base', server: 'mcp://kb.internal', enabled: true },
              { name: 'ticket-system', server: 'mcp://jira.internal', enabled: true },
              { name: 'billing-api', server: 'mcp://billing.internal', enabled: false },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
              >
                <div>
                  <span className="text-sm text-white">{tool.name}</span>
                  <span className="text-xs text-slate-500 ml-2">{tool.server}</span>
                </div>
                <div
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                    tool.enabled ? 'bg-cyan-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      tool.enabled ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Selection */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <CardTitle className="text-sm">Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Web Scraper', selected: true },
              { name: 'Slack Notifier', selected: true },
              { name: 'GitHub PR Reviewer', selected: false },
              { name: 'SQL Query Builder', selected: false },
              { name: 'Shell Executor', selected: false },
              { name: 'Anomaly Detector', selected: true },
            ].map((skill) => (
              <button
                key={skill.name}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  skill.selected
                    ? 'border-cyan-500 bg-cyan-900/30 text-cyan-300'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Bindings */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-400" />
            <CardTitle className="text-sm">Channel Bindings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { channel: 'Discord — #support', bound: true },
              { channel: 'WebChat — Customer Portal', bound: true },
              { channel: 'Slack — Engineering', bound: false },
              { channel: 'Email — support@acme.com', bound: false },
            ].map((ch) => (
              <div
                key={ch.channel}
                className="flex items-center justify-between py-2 px-3 rounded-lg border border-slate-700 bg-slate-900"
              >
                <span className="text-sm text-white">{ch.channel}</span>
                <div
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                    ch.bound ? 'bg-cyan-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                      ch.bound ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
