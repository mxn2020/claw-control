import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { BookCopy, Plus, Rocket, Eye, BarChart2 } from 'lucide-react'
import { useDataContext } from '#/lib/dataContext'
import { mockBlueprints } from '#/lib/mockData'

export const Route = createFileRoute('/_dashboard/blueprints/')({
  component: BlueprintsPage,
})

function BlueprintsPage() {
  const ctx = useDataContext()
  const blueprints = (ctx as unknown as Record<string, unknown>)?.blueprints as typeof mockBlueprints ?? mockBlueprints

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blueprints</h1>
          <p className="text-sm text-slate-400 mt-1">Agent templates and deployment definitions</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> New Blueprint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blueprints.map((bp) => (
          <Card key={bp.id} className="flex flex-col hover:border-cyan-500/50 transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-2">
                <BookCopy className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <CardTitle className="text-base">{bp.name}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-0.5">{bp.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  <BarChart2 className="w-3 h-3" />
                  {bp.deployCount} deploys
                </span>
              </div>
              <div className="flex gap-2">
                <Link to="/blueprints/$blueprintId" params={{ blueprintId: bp.id }} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-3.5 h-3.5 mr-1" /> View
                  </Button>
                </Link>
                <Link to="/blueprints/$blueprintId/deploy" params={{ blueprintId: bp.id }}>
                  <Button size="sm">
                    <Rocket className="w-3.5 h-3.5 mr-1" /> Deploy
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {blueprints.length === 0 && (
          <div className="col-span-3 text-center py-12 text-slate-500">
            No blueprints yet. Create your first blueprint to define reusable agent templates.
          </div>
        )}
      </div>
    </div>
  )
}
