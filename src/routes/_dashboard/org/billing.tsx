import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { CreditCard, Activity, Zap, CheckCircle2, Download } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/org/billing')({ component: OrgBillingPage })

function OrgBillingPage() {
    const { user } = useAuth()
    const orgId = user?.orgId as any

    // Start of current month date string
    const dateStr = new Date().toISOString().substring(0, 7) // "YYYY-MM"

    const usageStats = useQuery(api.usage.getOrgStats, orgId ? { orgId, month: dateStr } : "skip")

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    const currentPlan = "Pro" // In reality, fetch from org details
    const totalCost = usageStats?.totalCost || 0
    const totalTokens = usageStats?.totalTokens || 0

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-cyan-400" />
                        Billing & Usage
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Manage your subscription plan, payment methods, and monitor API costs</p>
                </div>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Manage Subscription
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 bg-gradient-to-br from-slate-900 to-cyan-950/20 border-cyan-500/20">
                    <CardHeader>
                        <CardTitle className="text-cyan-400 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Current Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-white">{currentPlan}</span>
                            <span className="text-slate-400 mb-1">/ month</span>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited agents</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Advanced RBAC</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority support</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-slate-400" /> Current Month Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm font-medium text-slate-400 mb-1">Total Add-on Cost</p>
                                <div className="text-3xl font-bold text-white">${totalCost.toFixed(2)}</div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                                    <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${Math.min((totalCost / 100) * 100, 100)}%` }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Soft limit: $100.00</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400 mb-1">Tokens Processed</p>
                                <div className="text-3xl font-bold text-white">{(totalTokens / 1_000_000).toFixed(2)}M</div>
                                <p className="text-xs text-slate-500 mt-3 border-t border-slate-800 pt-2">Includes input and output tokens across all models.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {/* Mock Invoices */}
                            <tr className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 text-slate-300">Oct 01, 2024</td>
                                <td className="px-6 py-4 text-slate-300">$49.00</td>
                                <td className="px-6 py-4"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs font-medium border border-emerald-500/20">Paid</span></td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-cyan-400 transition-colors" title="Download PDF">
                                        <Download className="w-4 h-4 ml-auto" />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 text-slate-300">Sep 01, 2024</td>
                                <td className="px-6 py-4 text-slate-300">$49.00</td>
                                <td className="px-6 py-4"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs font-medium border border-emerald-500/20">Paid</span></td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-cyan-400 transition-colors" title="Download PDF">
                                        <Download className="w-4 h-4 ml-auto" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
