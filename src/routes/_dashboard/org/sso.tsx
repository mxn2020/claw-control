import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { KeyRound, ShieldCheck, Save } from 'lucide-react'
import { useAuth } from '#/lib/authContext'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export const Route = createFileRoute('/_dashboard/org/sso')({ component: OrgSSOPage })

function OrgSSOPage() {
    const { user } = useAuth()
    const orgId = user?.orgId as any
    const org = useQuery(api.organizations.get, orgId ? { id: orgId } : "skip")

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    const isEnterprise = org?.plan === 'enterprise'

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <KeyRound className="w-6 h-6 text-cyan-400" />
                        SSO & Identity
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Configure Single Sign-On via SAML or OIDC for your organization</p>
                </div>
            </div>

            {!isEnterprise && (
                <Card className="border-amber-500/30 bg-amber-950/10">
                    <CardContent className="py-4">
                        <p className="text-sm text-amber-400">
                            SSO is available on the Enterprise plan. Your organization is currently on the <strong>{org?.plan ?? 'free'}</strong> plan.
                        </p>
                    </CardContent>
                </Card>
            )}

            <div className="max-w-4xl space-y-6">
                <Card className={`border-cyan-500/20 bg-cyan-950/5 ${!isEnterprise ? 'opacity-60 pointer-events-none' : ''}`}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                <CardTitle>SAML Provider Setup</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Status:</span>
                                <span className="bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Disabled
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 border-r border-slate-800 pr-6">
                                <h3 className="text-sm font-medium text-slate-300">1. Setup IdP (Identity Provider)</h3>
                                <p className="text-xs text-slate-400">Configure your Identity Provider (e.g. Okta, Azure AD) with these settings automatically generated for your Org:</p>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500">Assertion Consumer Service (ACS) URL</label>
                                    <div className="bg-slate-900 border border-slate-800 p-2 rounded text-xs text-slate-300 font-mono break-all">
                                        https://auth.clawcontrol.dev/saml/acs/{orgId}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500">Entity ID / Audience URI</label>
                                    <div className="bg-slate-900 border border-slate-800 p-2 rounded text-xs text-slate-300 font-mono break-all">
                                        urn:clawcontrol:org:{orgId}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-slate-300">2. Configure ClawControl</h3>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">IdP Entity ID</label>
                                    <input type="text" placeholder="https://idp.example.com/metadata" className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">SSO Login URL</label>
                                    <input type="text" placeholder="https://idp.example.com/sso" className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">X.509 Certificate</label>
                                    <textarea placeholder="-----BEGIN CERTIFICATE-----..." className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-mono text-white rounded focus:border-cyan-500 outline-none h-24 resize-none"></textarea>
                                </div>

                                <div className="pt-2">
                                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center">
                                        <Save className="w-4 h-4" /> Save Configuration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={!isEnterprise ? 'opacity-60 pointer-events-none' : ''}>
                    <CardHeader>
                        <CardTitle>Strict Authentication Policies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1">Require SSO for all users</h4>
                                <p className="text-xs text-slate-400">If enabled, users can only log in via your configured Identity Provider.</p>
                            </div>
                            <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-not-allowed opacity-50">
                                <div className="w-4 h-4 bg-slate-400 rounded-full absolute left-1 top-1"></div>
                            </div>
                        </div>
                        <p className="text-xs text-orange-400 mt-2">
                            You must successfully configure and test your SSO integration before enforcing strict policies.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
