import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { CreditCard, Activity, Zap, CheckCircle2, Download } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'
import { Badge } from '#/components/ui/badge'

export const Route = createFileRoute('/_dashboard/org/billing')({ component: OrgBillingPage })

function OrgBillingPage() {
    const { user, token } = useAuth()
    const orgId = user?.orgId as any

    const createCheckoutSession = useMutation(api.stripe.createCheckoutSession)
    const createPortalSession = useMutation(api.stripe.createPortalSession)

    const [isManaging, setIsManaging] = useState(false)

    const dateStr = new Date().toISOString().substring(0, 7) // "YYYY-MM"
    const usageStats = useQuery(api.usage.getOrgStats, orgId ? { orgId, month: dateStr } : "skip")
    // const usageRecords = useQuery(api.usage.list, orgId ? { orgId } : "skip")
    const org = useQuery(api.organizations.get, orgId ? { id: orgId } : "skip")
    const invoices = useQuery(api.invoices.list, orgId ? { orgId } : "skip")

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    const currentPlan = org?.plan ?? 'free'
    const totalCost = usageStats?.totalCost || 0
    const totalTokens = usageStats?.totalTokens || 0

    const handleManageSubscription = async () => {
        if (!token) return
        try {
            setIsManaging(true)
            if (currentPlan === 'free') {
                const { url } = await createCheckoutSession({ orgId, token, priceId: 'price_pro_tier' })
                window.location.href = url
            } else {
                const { url } = await createPortalSession({ orgId, token })
                window.location.href = url
            }
        } catch (err) {
            console.error("Failed to redirect to billing", err)
            setIsManaging(false)
        }
    }

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
                <button
                    onClick={handleManageSubscription}
                    disabled={isManaging}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {isManaging ? "Redirecting..." : (currentPlan === 'free' ? "Upgrade to Pro" : "Manage Subscription")}
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
                            <span className="text-4xl font-bold text-white capitalize">{currentPlan}</span>
                            <span className="text-slate-400 mb-1">/ month</span>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited agents</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {currentPlan === 'enterprise' ? 'Advanced RBAC + SSO' : 'Basic RBAC'}</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {currentPlan === 'enterprise' ? 'Priority support' : 'Community support'}</li>
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
                    <CardTitle>Usage History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-3 font-medium">Month</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {(!invoices || invoices.length === 0) && (
                                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No invoices generated yet.</td></tr>
                            )}
                            {invoices?.map((invoice: any) => (
                                <tr key={invoice._id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 text-slate-300">
                                        {new Date(invoice.periodStart).toLocaleDateString()} - {new Date(invoice.periodEnd).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">${(invoice.amountDue / 100).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        {invoice.status === 'paid' ? (
                                            <Badge variant="success">Paid</Badge>
                                        ) : invoice.status === 'open' ? (
                                            <Badge variant="warning">Open</Badge>
                                        ) : (
                                            <Badge variant="default" className="capitalize">{invoice.status}</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {invoice.invoicePdf ? (
                                            <a href={invoice.invoicePdf} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 inline-block p-2 transition-colors" title="Download PDF">
                                                <Download className="w-4 h-4 ml-auto" />
                                            </a>
                                        ) : (
                                            <span className="text-slate-600">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
