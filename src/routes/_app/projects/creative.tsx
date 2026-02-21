import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Palette, PenTool, ImagePlus, Share2 } from 'lucide-react'

export const Route = createFileRoute('/_app/projects/creative')({
  component: ProjectsCreative,
})

const writingProjects = [
  { title: 'Q1 Product Launch Blog Series', status: 'drafting' as const, wordCount: 4200, posts: 3, deadline: 'Jan 30' },
  { title: 'Developer Documentation Overhaul', status: 'review' as const, wordCount: 12800, posts: 8, deadline: 'Feb 5' },
  { title: 'Company Newsletter — February', status: 'outline' as const, wordCount: 600, posts: 1, deadline: 'Feb 1' },
  { title: 'Case Study: Acme Corp Migration', status: 'completed' as const, wordCount: 3100, posts: 1, deadline: 'Jan 15' },
]

const mediaQueue = [
  { title: 'Product Hero Banner', type: 'Image', model: 'DALL-E 3', status: 'generating' as const, eta: '~2 min' },
  { title: 'Explainer Video Storyboard', type: 'Video', model: 'Runway Gen-3', status: 'queued' as const, eta: '~15 min' },
  { title: 'Social Media Template Set', type: 'Image', model: 'Midjourney', status: 'completed' as const, eta: 'Done' },
  { title: 'Podcast Intro Jingle', type: 'Audio', model: 'Suno', status: 'completed' as const, eta: 'Done' },
  { title: 'App Walkthrough Animation', type: 'Video', model: 'Runway Gen-3', status: 'queued' as const, eta: '~20 min' },
]

const socialPipeline = [
  { platform: 'Twitter/X', scheduled: 5, drafted: 3, posted: 12, engagement: '4.2%' },
  { platform: 'LinkedIn', scheduled: 2, drafted: 4, posted: 8, engagement: '6.1%' },
  { platform: 'Instagram', scheduled: 3, drafted: 1, posted: 6, engagement: '3.8%' },
  { platform: 'YouTube', scheduled: 1, drafted: 2, posted: 4, engagement: '8.5%' },
]

const contentWorkspace = [
  { name: 'Brand Voice Guide', type: 'Document', lastEdited: 'Today', collaborators: 3 },
  { name: 'Content Calendar — Q1', type: 'Spreadsheet', lastEdited: 'Yesterday', collaborators: 5 },
  { name: 'Visual Identity Kit', type: 'Design', lastEdited: '2 days ago', collaborators: 2 },
  { name: 'Editorial Style Guide', type: 'Document', lastEdited: '1 week ago', collaborators: 4 },
]

const writingStatusColor = {
  drafting: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  review: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  outline: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const mediaStatusColor = {
  generating: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  queued: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

function ProjectsCreative() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Creative</h1>
        <p className="text-sm text-slate-400 mt-1">
          Content workspace, media generation, writing, and social pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Workspace */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              Content Workspace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contentWorkspace.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div>
                    <p className="text-sm text-white">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.type} · Last edited {item.lastEdited} · {item.collaborators} collaborators</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Generation Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-cyan-400" />
              Media Generation Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mediaQueue.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.type} · {item.model} · {item.eta}</p>
                  </div>
                  <Badge className={`text-xs ${mediaStatusColor[item.status]}`}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Writing Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PenTool className="w-4 h-4 text-cyan-400" />
              Writing Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {writingProjects.map((proj) => (
                <div key={proj.title} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white">{proj.title}</p>
                    <Badge className={`text-xs ${writingStatusColor[proj.status]}`}>{proj.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{proj.wordCount.toLocaleString()} words · {proj.posts} post{proj.posts > 1 ? 's' : ''} · Due {proj.deadline}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Content Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" />
              Social Content Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {socialPipeline.map((platform) => (
                <div key={platform.platform} className="rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-white">{platform.platform}</p>
                    <span className="text-xs text-emerald-400">{platform.engagement} engagement</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{platform.scheduled} scheduled</span>
                    <span>{platform.drafted} drafted</span>
                    <span>{platform.posted} posted</span>
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
