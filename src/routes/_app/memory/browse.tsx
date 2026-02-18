import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { FolderOpen, File, ChevronRight, User, Briefcase, Code, Globe } from 'lucide-react'

export const Route = createFileRoute('/_app/memory/browse')({
  component: MemoryBrowse,
})

const categories = [
  { name: 'Personal', icon: <User size={16} />, count: 87, facts: ['Favorite color is blue', 'Allergic to shellfish', 'Birthday is March 15'] },
  { name: 'Work', icon: <Briefcase size={16} />, count: 142, facts: ['Standup at 9:30 AM Mon', 'Manager is Sarah Chen', 'Uses Slack for comms'] },
  { name: 'Projects', icon: <Code size={16} />, count: 63, facts: ['ClawVerse uses React + Convex', 'Current sprint ends Jan 19', 'Primary repo is claw-control'] },
  { name: 'General', icon: <Globe size={16} />, count: 45, facts: ['Prefers metric units', 'Timezone is PST', 'News source: Hacker News'] },
]

function MemoryBrowse() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Browse Knowledge</h1>
        <p className="text-sm text-slate-400 mt-1">
          File and knowledge browser organized by category
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Directory Tree */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-cyan-400" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 text-slate-300">
                    {cat.icon}
                    <span className="text-sm">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-700 text-slate-400 text-xs">{cat.count}</Badge>
                    <ChevronRight size={14} className="text-slate-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <File className="w-4 h-4 text-cyan-400" />
              Facts & Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center gap-2 mb-2">
                    {cat.icon}
                    <span className="text-sm font-medium text-white">{cat.name}</span>
                  </div>
                  <div className="space-y-1.5 ml-6">
                    {cat.facts.map((fact) => (
                      <div key={fact} className="flex items-center gap-2 text-sm text-slate-300 rounded-lg border border-slate-700/60 bg-slate-800/30 px-3 py-2">
                        <File size={12} className="text-slate-500 flex-shrink-0" />
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
