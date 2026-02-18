import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Search,
  Download,
  Star,
  ShieldAlert,
  Package,
  Filter,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/skills/marketplace')({
  component: SkillsMarketplace,
})

const categories = ['All', 'Data', 'Code', 'Communication', 'Security', 'Analytics']

const skills = [
  {
    name: 'Web Scraper',
    author: 'claw-labs',
    description: 'Extract structured data from web pages with CSS selectors and headless browser support.',
    rating: 4.8,
    downloads: 12400,
    risk: 'MEDIUM',
    category: 'Data',
  },
  {
    name: 'SQL Query Builder',
    author: 'datatools-io',
    description: 'Generate and execute parameterised SQL queries against configured databases.',
    rating: 4.6,
    downloads: 9800,
    risk: 'HIGH',
    category: 'Data',
  },
  {
    name: 'GitHub PR Reviewer',
    author: 'devops-guild',
    description: 'Automated pull request review with code analysis, style checks, and inline comments.',
    rating: 4.9,
    downloads: 18200,
    risk: 'LOW',
    category: 'Code',
  },
  {
    name: 'Slack Notifier',
    author: 'integrations-co',
    description: 'Send rich messages, threads, and reactions to Slack channels and DMs.',
    rating: 4.4,
    downloads: 7600,
    risk: 'LOW',
    category: 'Communication',
  },
  {
    name: 'Shell Executor',
    author: 'claw-labs',
    description: 'Execute shell commands in a sandboxed environment with configurable timeouts.',
    rating: 4.2,
    downloads: 5300,
    risk: 'CRITICAL',
    category: 'Code',
  },
  {
    name: 'Anomaly Detector',
    author: 'ml-collective',
    description: 'Detect anomalies in time-series data using statistical and ML-based methods.',
    rating: 4.7,
    downloads: 3100,
    risk: 'LOW',
    category: 'Analytics',
  },
]

const riskVariant = (risk: string) => {
  switch (risk) {
    case 'LOW':
      return 'success' as const
    case 'MEDIUM':
      return 'warning' as const
    case 'HIGH':
      return 'danger' as const
    case 'CRITICAL':
      return 'danger' as const
    default:
      return 'default' as const
  }
}

function SkillsMarketplace() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Skill Marketplace</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse and install skills for your fleet
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search skills…"
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                cat === 'All'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <Card key={skill.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <CardTitle className="text-sm">{skill.name}</CardTitle>
                </div>
                <Badge variant={riskVariant(skill.risk)}>{skill.risk}</Badge>
              </div>
              <p className="text-xs text-slate-500">by {skill.author}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400 mb-4">{skill.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400" />
                    {skill.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {skill.downloads.toLocaleString()}
                  </span>
                </div>
                <Button variant="default" size="sm">
                  <ShieldAlert className="w-3 h-3 mr-1" />
                  Install
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
