import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/blueprints/new')({
  component: BlueprintNew,
})

function BlueprintNew() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Blueprint</h1>
        <p className="text-sm text-slate-400 mt-1">Create a reusable agent blueprint</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blueprint Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
              <input
                type="text"
                placeholder="e.g. Customer Support Agent"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Describe what this blueprint does…"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Base Model</label>
              <select className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>gpt-4o</option>
                <option>gpt-4o-mini</option>
                <option>claude-3.5-sonnet</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
              >
                Create Blueprint
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
