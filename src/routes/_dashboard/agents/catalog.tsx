import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Search,
  Rocket,
  Download,
  Headphones,
  BookOpen,
  Code,
  Palette,
  DollarSign,
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/agents/catalog')({
  component: AgentCatalogPage,
})

const categories = [
  { label: 'All', icon: Rocket },
  { label: 'Support', icon: Headphones },
  { label: 'Research', icon: BookOpen },
  { label: 'Dev', icon: Code },
  { label: 'Creative', icon: Palette },
  { label: 'Finance', icon: DollarSign },
]

const mockTemplates = [
  {
    name: 'Customer Support Pro',
    description:
      'Enterprise-grade support agent with multi-language capabilities and sentiment analysis.',
    model: 'gpt-4o',
    category: 'Support',
    capabilities: ['Multi-language', 'Sentiment', 'Escalation'],
    installs: 12_450,
  },
  {
    name: 'Research Analyst',
    description:
      'Deep research agent that synthesises information from multiple sources with citations.',
    model: 'claude-3.5-sonnet',
    category: 'Research',
    capabilities: ['Web Search', 'Summarisation', 'Citations'],
    installs: 8_320,
  },
  {
    name: 'Code Reviewer',
    description:
      'Automated PR review bot that catches bugs, style issues and security vulnerabilities.',
    model: 'gpt-4o',
    category: 'Dev',
    capabilities: ['Static Analysis', 'Security', 'Style'],
    installs: 15_780,
  },
  {
    name: 'Content Writer',
    description:
      'Blog posts, social copy and marketing content with brand-voice consistency.',
    model: 'claude-3.5-sonnet',
    category: 'Creative',
    capabilities: ['SEO', 'Brand Voice', 'Multi-format'],
    installs: 6_190,
  },
  {
    name: 'Invoice Processor',
    description:
      'Extracts line items from invoices and receipts, reconciles against POs automatically.',
    model: 'gpt-4o-mini',
    category: 'Finance',
    capabilities: ['OCR', 'Reconciliation', 'Export'],
    installs: 4_870,
  },
  {
    name: 'Ticket Triage Bot',
    description:
      'Classifies, prioritises and routes incoming tickets to the right team instantly.',
    model: 'gpt-4o-mini',
    category: 'Support',
    capabilities: ['Classification', 'Routing', 'Priority'],
    installs: 9_640,
  },
  {
    name: 'Data Pipeline Scout',
    description:
      'Monitors data pipelines, detects anomalies and auto-generates incident reports.',
    model: 'gpt-4o',
    category: 'Dev',
    capabilities: ['Monitoring', 'Alerts', 'Reports'],
    installs: 3_210,
  },
  {
    name: 'Expense Auditor',
    description:
      'Reviews expense reports for policy violations and flags anomalies for review.',
    model: 'gpt-4o-mini',
    category: 'Finance',
    capabilities: ['Policy Check', 'Anomaly Detection', 'Reporting'],
    installs: 2_540,
  },
]

function formatInstalls(n: number) {
  return n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n)
}

function AgentCatalogPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Agent Catalog</h1>
        <p className="text-sm text-slate-400 mt-1">
          Browse and deploy pre-built agent templates
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search templates…" className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? 'bg-cyan-600 text-white'
                  : 'border border-slate-600 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockTemplates.map((tpl) => (
          <Card key={tpl.name} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{tpl.name}</CardTitle>
                <Badge variant="info">{tpl.category}</Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {tpl.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <span className="font-mono">{tpl.model}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {formatInstalls(tpl.installs)}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tpl.capabilities.map((cap) => (
                  <Badge
                    key={cap}
                    className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs"
                  >
                    {cap}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                <Rocket className="w-3.5 h-3.5 mr-1.5" />
                Deploy Agent
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
