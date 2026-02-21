import { DemoDataBanner } from '#/components/ui/demo-data-banner'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { GitBranch, GitPullRequest, Rocket, AlertCircle, Bot } from 'lucide-react'

export const Route = createFileRoute('/_app/projects/dev')({
  component: ProjectsDev,
})

const connectedRepos = [
  { name: 'acme/web-app', branch: 'main', lastCommit: '2 hrs ago', language: 'TypeScript', stars: 142 },
  { name: 'acme/api-server', branch: 'develop', lastCommit: '5 hrs ago', language: 'Go', stars: 89 },
  { name: 'acme/mobile-app', branch: 'main', lastCommit: '1 day ago', language: 'Swift', stars: 56 },
  { name: 'acme/design-system', branch: 'main', lastCommit: '3 days ago', language: 'TypeScript', stars: 210 },
]

const openPRs = [
  { title: 'feat: Add user dashboard analytics', repo: 'acme/web-app', number: 142, author: 'sarah-chen', agentReview: 'approved' as const, reviewers: 2, additions: 340, deletions: 45 },
  { title: 'fix: API rate limiting edge case', repo: 'acme/api-server', number: 87, author: 'marcus-j', agentReview: 'changes_requested' as const, reviewers: 1, additions: 28, deletions: 12 },
  { title: 'refactor: Migrate to React Server Components', repo: 'acme/web-app', number: 138, author: 'elena-r', agentReview: 'pending' as const, reviewers: 3, additions: 890, deletions: 620 },
  { title: 'chore: Update dependencies', repo: 'acme/design-system', number: 45, author: 'dependabot', agentReview: 'approved' as const, reviewers: 0, additions: 150, deletions: 150 },
  { title: 'feat: Push notification support', repo: 'acme/mobile-app', number: 23, author: 'david-p', agentReview: 'reviewing' as const, reviewers: 1, additions: 520, deletions: 30 },
]

const deployments = [
  { env: 'Production', repo: 'acme/web-app', version: 'v2.4.1', status: 'healthy' as const, deployed: '2 days ago' },
  { env: 'Staging', repo: 'acme/web-app', version: 'v2.5.0-beta.3', status: 'healthy' as const, deployed: '3 hrs ago' },
  { env: 'Production', repo: 'acme/api-server', version: 'v1.8.2', status: 'healthy' as const, deployed: '1 week ago' },
  { env: 'Staging', repo: 'acme/api-server', version: 'v1.9.0-rc.1', status: 'degraded' as const, deployed: '1 day ago' },
]

const issues = [
  { title: 'Memory leak in WebSocket handler', repo: 'acme/api-server', number: 312, priority: 'critical' as const, assignee: 'marcus-j', age: '2 days' },
  { title: 'Mobile navigation flicker on iOS 17', repo: 'acme/mobile-app', number: 89, priority: 'high' as const, assignee: 'david-p', age: '3 days' },
  { title: 'Dark mode inconsistency in settings page', repo: 'acme/web-app', number: 456, priority: 'medium' as const, assignee: 'elena-r', age: '5 days' },
  { title: 'Add aria-labels to icon buttons', repo: 'acme/design-system', number: 78, priority: 'low' as const, assignee: 'unassigned', age: '1 week' },
]

const agentReviewColor = {
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  changes_requested: 'bg-red-500/10 text-red-400 border-red-500/20',
  pending: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  reviewing: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

const deployStatusColor = {
  healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const priorityColor = {
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  medium: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

function ProjectsDev() {
  return (
    <div className="space-y-6">
      <DemoDataBanner />
      <div>
        <h1 className="text-2xl font-bold text-white">Development</h1>
        <p className="text-sm text-slate-400 mt-1">
          Repositories, pull requests, deployments, and issues
        </p>
      </div>

      {/* Connected Repos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            Connected Repositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {connectedRepos.map((repo) => (
              <div key={repo.name} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2.5">
                <div>
                  <p className="text-sm text-white font-mono">{repo.name}</p>
                  <p className="text-xs text-slate-500">{repo.language} · {repo.branch} · {repo.lastCommit}</p>
                </div>
                <span className="text-xs text-slate-500">★ {repo.stars}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open PRs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-cyan-400" />
              Open Pull Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {openPRs.map((pr) => (
                <div key={`${pr.repo}-${pr.number}`} className="flex items-center gap-3 rounded-md bg-slate-800/50 px-3 py-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white truncate">{pr.title}</p>
                      <span className="text-xs text-slate-500 font-mono">#{pr.number}</span>
                    </div>
                    <p className="text-xs text-slate-500">{pr.repo} · by {pr.author} · +{pr.additions} −{pr.deletions}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Bot size={12} className="text-slate-500" />
                    <Badge className={`text-xs ${agentReviewColor[pr.agentReview]}`}>
                      {pr.agentReview.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Rocket className="w-4 h-4 text-cyan-400" />
              Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {deployments.map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{d.env} — {d.repo.split('/')[1]}</p>
                    <p className="text-xs text-slate-500">{d.version} · {d.deployed}</p>
                  </div>
                  <Badge className={`text-xs ${deployStatusColor[d.status]}`}>{d.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Open Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {issues.map((issue) => (
                <div key={`${issue.repo}-${issue.number}`} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{issue.title}</p>
                    <p className="text-xs text-slate-500">{issue.repo} #{issue.number} · {issue.assignee} · {issue.age}</p>
                  </div>
                  <Badge className={`text-xs ${priorityColor[issue.priority]}`}>{issue.priority}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
