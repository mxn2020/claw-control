import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { CheckCircle2, Bot, Zap } from 'lucide-react'

export const Route = createFileRoute('/pricing')({ component: PricingPage })

function PricingPage() {
    const [agents, setAgents] = useState(10)
    const [tokensMillions, setTokensMillions] = useState(2)

    // Example calculation: $0.10 per agent after first 5, plus $0.50 per 1M tokens
    const agentCost = Math.max(0, (agents - 5) * 0.10)
    const computeCost = tokensMillions * 0.50
    const estimatedTotal = (19 + agentCost + computeCost).toFixed(2)

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-300">
            {/* Navigation (Matches index.tsx) */}
            <header className="border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">🦞</span>
                        <span className="text-xl font-bold text-white">ClawControl</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
                        <Link to="/" className="hover:text-white transition-colors">Features</Link>
                        <Link to="/pricing" className="text-white font-medium">Pricing</Link>
                        <Link to="/fleet" className="hover:text-white transition-colors">Dashboard</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/fleet"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700 text-sm"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Simple, predictable pricing
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Start for free, upgrade when you need advanced orchestration and unlimited fleet capacity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 flex flex-col hover:border-slate-500 transition-colors">
                        <h3 className="text-2xl font-bold text-white mb-2">Community</h3>
                        <p className="text-slate-400 mb-6 min-h-[48px]">Perfect for individuals and hobby projects.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white">$0</span>
                            <span className="text-slate-400">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> Up to 3 Agents</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> Basic Instance telemetry</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> 1 Organization</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> Community Support</li>
                        </ul>
                        <Link to="/fleet" className="block text-center w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors">
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-gradient-to-b from-cyan-900/40 to-slate-900 border border-cyan-500/50 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-cyan-900/20">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                        <p className="text-cyan-200/70 mb-6 min-h-[48px]">For startups scaling their AI workloads.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white">$19</span>
                            <span className="text-cyan-200/70">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Unlimited Agents</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Full observability suite</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Advanced RBAC</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-cyan-400" /> Skill Marketplace access</li>
                        </ul>
                        <Link to="/fleet" className="block text-center w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20">
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 flex flex-col hover:border-slate-500 transition-colors">
                        <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                        <p className="text-slate-400 mb-6 min-h-[48px]">For large organizations needing compliance and SSO.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white">Custom</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> Dedicated hardware</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> SAML / OIDC SSO</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> Custom SIEM integrations</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-slate-500" /> 24/7 SLA Support</li>
                        </ul>
                        <button className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>

                {/* Interactive Calculator Segment */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="text-center mb-10 relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Calculate Your Usage</h2>
                            <p className="text-slate-400">Estimate your monthly Pro tier costs based on your deployed fleet.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex items-center gap-2">
                                            <Bot className="w-5 h-5 text-cyan-400" />
                                            <label className="text-sm font-medium text-white">Active Agents</label>
                                        </div>
                                        <span className="text-2xl font-bold text-white">{agents}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="500"
                                        value={agents}
                                        onChange={(e) => setAgents(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">First 5 agents included. $0.10/mo per additional agent.</p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-cyan-400" />
                                            <label className="text-sm font-medium text-white">Monthly Tokens (Millions)</label>
                                        </div>
                                        <span className="text-2xl font-bold text-white">{tokensMillions}M</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={tokensMillions}
                                        onChange={(e) => setTokensMillions(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Compute rate: $0.50 per 1M tokens.</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 text-center ring-1 ring-white/5">
                                    <p className="text-slate-400 font-medium mb-2 uppercase tracking-wide text-sm">Estimated Total</p>
                                    <div className="flex items-center justify-center gap-1 mb-4">
                                        <span className="text-3xl text-slate-500 font-medium">$</span>
                                        <span className="text-6xl font-black text-white">{estimatedTotal}</span>
                                        <span className="text-xl text-slate-500 font-medium mt-auto mb-2">/mo</span>
                                    </div>
                                    <div className="space-y-2 text-sm text-slate-400">
                                        <div className="flex justify-between">
                                            <span>Base Platform (Pro)</span>
                                            <span className="text-white">$19.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Agent Capacity</span>
                                            <span className="text-white">${agentCost.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-700/50 pb-2">
                                            <span>Processed Compute</span>
                                            <span className="text-white">${computeCost.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Matches Index */}
            <footer className="border-t border-slate-700/50 py-8 px-6 mt-12 bg-slate-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
                    <div className="flex items-center gap-2">
                        <span>🦞</span>
                        <span>ClawControl</span>
                    </div>
                    <p>AI Agent Fleet Management</p>
                </div>
            </footer>
        </div>
    )
}
