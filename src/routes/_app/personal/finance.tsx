import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { DollarSign, TrendingUp, CreditCard, RefreshCw } from 'lucide-react'

export const Route = createFileRoute('/_app/personal/finance')({
  component: PersonalFinance,
})

const overviewStats = [
  { label: 'Total Balance', value: '$24,580', icon: <DollarSign className="w-5 h-5 text-emerald-400" />, sub: 'Across 3 accounts' },
  { label: 'Monthly Spend', value: '$3,247', icon: <CreditCard className="w-5 h-5 text-amber-400" />, sub: '68% of $4,800 budget' },
  { label: 'Savings Rate', value: '22%', icon: <TrendingUp className="w-5 h-5 text-cyan-400" />, sub: '+3% vs last month' },
  { label: 'Subscriptions', value: '$187/mo', icon: <RefreshCw className="w-5 h-5 text-slate-400" />, sub: '12 active services' },
]

const budgetCategories = [
  { category: 'Housing', spent: 1500, budget: 1500, pct: 100 },
  { category: 'Food & Dining', spent: 620, budget: 800, pct: 78 },
  { category: 'Transportation', spent: 340, budget: 400, pct: 85 },
  { category: 'Entertainment', spent: 185, budget: 300, pct: 62 },
  { category: 'Shopping', spent: 290, budget: 350, pct: 83 },
  { category: 'Health & Fitness', spent: 120, budget: 200, pct: 60 },
  { category: 'Utilities', spent: 192, budget: 250, pct: 77 },
]

const recentTransactions = [
  { merchant: 'Whole Foods Market', amount: -87.43, date: 'Today', category: 'Food & Dining' },
  { merchant: 'Uber', amount: -24.50, date: 'Today', category: 'Transportation' },
  { merchant: 'Payroll Deposit', amount: 4200.00, date: 'Yesterday', category: 'Income' },
  { merchant: 'Netflix', amount: -15.99, date: 'Yesterday', category: 'Entertainment' },
  { merchant: 'Shell Gas Station', amount: -52.30, date: 'Jan 18', category: 'Transportation' },
  { merchant: 'Amazon', amount: -134.99, date: 'Jan 17', category: 'Shopping' },
  { merchant: 'Spotify', amount: -10.99, date: 'Jan 15', category: 'Entertainment' },
  { merchant: 'Gym Membership', amount: -49.99, date: 'Jan 15', category: 'Health & Fitness' },
]

const subscriptions = [
  { name: 'Netflix', cost: 15.99, renewal: 'Feb 1', status: 'active' as const },
  { name: 'Spotify Premium', cost: 10.99, renewal: 'Feb 3', status: 'active' as const },
  { name: 'iCloud+ 200GB', cost: 2.99, renewal: 'Feb 5', status: 'active' as const },
  { name: 'ChatGPT Plus', cost: 20.00, renewal: 'Feb 8', status: 'active' as const },
  { name: 'GitHub Copilot', cost: 10.00, renewal: 'Feb 10', status: 'active' as const },
  { name: 'Adobe Creative Cloud', cost: 54.99, renewal: 'Feb 12', status: 'review' as const },
  { name: 'Gym Membership', cost: 49.99, renewal: 'Feb 15', status: 'active' as const },
  { name: 'Cloud Storage', cost: 9.99, renewal: 'Feb 18', status: 'active' as const },
]

function PersonalFinance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Finance Overview</h1>
        <p className="text-sm text-slate-400 mt-1">
          Balances, budgets, spending, and subscription tracking
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{stat.label}</span>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Budget Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {budgetCategories.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{cat.category}</span>
                    <span className="text-slate-400">${cat.spent} / ${cat.budget}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.pct >= 100 ? 'bg-red-500' : cat.pct >= 80 ? 'bg-amber-500' : 'bg-cyan-500'}`}
                      style={{ width: `${Math.min(cat.pct, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{tx.merchant}</p>
                    <p className="text-xs text-slate-500">{tx.date} · {tx.category}</p>
                  </div>
                  <span className={`text-sm font-mono ${tx.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Tracker */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              Subscription Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subscriptions.map((sub) => (
                <div key={sub.name} className="flex items-center justify-between rounded-md bg-slate-800/50 px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{sub.name}</p>
                    <p className="text-xs text-slate-500">Renews {sub.renewal}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-slate-300">${sub.cost}</span>
                    <Badge className={sub.status === 'review'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs'
                    }>{sub.status}</Badge>
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
