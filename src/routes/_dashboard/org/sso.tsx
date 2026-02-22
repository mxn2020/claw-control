import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { KeyRound, ShieldCheck, Save, Loader2 } from 'lucide-react'
import { useAuth } from '#/lib/authContext'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useState, useEffect } from 'react'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/org/sso')({ component: OrgSSOPage })

function OrgSSOPage() {
    const { user, token } = useAuth()
    const orgId = user?.orgId as Id<"organizations"> | undefined
    const org = useQuery(api.organizations.get, orgId ? { id: orgId } : "skip")
    const ssoConfig = useQuery(api.sso.getSsoConfig, orgId ? { orgId, token } as any : "skip")
    const configureSso = useMutation(api.sso.configureSso)
    const updateOrg = useMutation(api.organizations.update)

    // Form state
    const [provider, setProvider] = useState<"saml" | "oidc">("saml")
    const [domain, setDomain] = useState("")
    const [issuer, setIssuer] = useState("")
    const [ssoUrl, setSsoUrl] = useState("")
    const [x509Certificate, setX509Certificate] = useState("")
    const [active, setActive] = useState(false)

    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Pre-fill from existing config
    useEffect(() => {
        if (ssoConfig) {
            setProvider((ssoConfig as any).provider ?? "saml")
            setDomain((ssoConfig as any).domain ?? "")
            setIssuer((ssoConfig as any).issuer ?? "")
            setSsoUrl((ssoConfig as any).ssoUrl ?? "")
            setX509Certificate((ssoConfig as any).x509Certificate ?? "")
            setActive((ssoConfig as any).active ?? false)
        }
    }, [ssoConfig])

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    const isEnterprise = org?.plan === 'enterprise'

    async function handleSave() {
        if (!orgId || !token) return
        setSaving(true)
        setError(null)
        try {
            await configureSso({
                orgId,
                provider,
                domain: domain.trim(),
                issuer: issuer.trim(),
                ssoUrl: ssoUrl.trim(),
                x509Certificate: x509Certificate.trim(),
                active,
                token,
            } as any)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save SSO configuration.')
        } finally {
            setSaving(false)
        }
    }

    async function handleToggleRequireSso(val: boolean) {
        if (!orgId) return
        try {
            await updateOrg({ id: orgId, requireSso: val })
        } catch (err) {
            console.error(err)
        }
    }

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
                                <CardTitle>SSO Provider Setup</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Status:</span>
                                {active ? (
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                                    </span>
                                ) : (
                                    <span className="bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Disabled
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Provider type toggle */}
                        <div className="space-y-2">
                            <label className="text-xs text-slate-400">Protocol</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setProvider("saml")}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${provider === 'saml' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                >SAML 2.0</button>
                                <button
                                    onClick={() => setProvider("oidc")}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${provider === 'oidc' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                >OIDC</button>
                            </div>
                        </div>

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
                                    <label className="text-xs text-slate-400">Email Domain</label>
                                    <input type="text" placeholder="example.com" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">IdP Entity ID / Issuer</label>
                                    <input type="text" placeholder="https://idp.example.com/metadata" value={issuer} onChange={(e) => setIssuer(e.target.value)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs text-slate-400">SSO Login URL</label>
                                    <input type="text" placeholder="https://idp.example.com/sso" value={ssoUrl} onChange={(e) => setSsoUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                                </div>

                                {provider === 'saml' && (
                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">X.509 Certificate</label>
                                        <textarea placeholder="-----BEGIN CERTIFICATE-----..." value={x509Certificate} onChange={(e) => setX509Certificate(e.target.value)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-mono text-white rounded focus:border-cyan-500 outline-none h-24 resize-none"></textarea>
                                    </div>
                                )}

                                {/* Active toggle */}
                                <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
                                    <span className="text-sm text-slate-300">Enable SSO</span>
                                    <button
                                        onClick={() => setActive(!active)}
                                        className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-cyan-600' : 'bg-slate-700'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${active ? 'translate-x-7' : 'translate-x-1'}`}></div>
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-sm text-red-400">{error}</div>
                                )}

                                <div className="pt-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={saving || !domain.trim() || !issuer.trim()}
                                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Configuration'}
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
                            <button
                                onClick={() => handleToggleRequireSso(!(org as any)?.requireSso)}
                                disabled={!active}
                                className={`w-12 h-6 rounded-full relative transition-colors ${!active ? 'opacity-50 cursor-not-allowed' : ''} ${(org as any)?.requireSso ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${(org as any)?.requireSso ? 'translate-x-7' : 'translate-x-1'}`}></div>
                            </button>
                        </div>
                        {!active && (
                            <p className="text-xs text-orange-400 mt-2">
                                You must enable and save your SSO configuration before enforcing strict policies.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
