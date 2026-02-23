import { createFileRoute, Link } from '@tanstack/react-router'
import { PackageOpen, Rocket } from 'lucide-react'

export const Route = createFileRoute('/changelog')({ component: ChangelogPage })

function ChangelogPage() {
    const releases = [
        {
            version: 'v0.5.0',
            date: 'February 21, 2026',
            title: 'Sprint 5: Security & Observability',
            description: 'Major platform upgrades focusing on fleet safety, compliance, and deep audit traces.',
            highlights: [
                'Added God Mode message injection for emergency session interventions.',
                'Introduced the Secrets Vault with encrypted storage and masked values.',
                'New Quarantine backend allowing immediate suspension of rogue agents.',
                'Global Kill Switch now directly mapped to instance pausing.',
                'Enhanced Webhooks page with full delivery logs and HMAC verification.'
            ],
            type: 'major'
        },
        {
            version: 'v0.4.0',
            date: 'February 15, 2026',
            title: 'Sprint 4: Agent Traces',
            description: 'Total visibility into agent executions and tool calls.',
            highlights: [
                'Session trace waterfall views with token and timing data.',
                'Immutable tool execution audit ledgers.',
                'Skills marketplace integration for secure tool installations.'
            ],
            type: 'minor'
        },
        {
            version: 'v0.3.0',
            date: 'February 10, 2026',
            title: 'Sprint 3: Memory & Personas',
            description: 'Agent cognition and identity capabilities.',
            highlights: [
                'Agent personality editor with inheritance from instances.',
                'Memory file browser and inline editor.',
                'Tool policy governance grids.'
            ],
            type: 'minor'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur top-0 sticky z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🦞</span> ClawControl
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link to="/status" className="hover:text-white transition-colors">Status</Link>
                        <Link to="/fleet" className="text-cyan-400 hover:text-cyan-300 font-medium">Dashboard →</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-20">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
                    <p className="text-lg text-slate-400">
                        Keep track of all new features, improvements, and fixes in ClawControl.
                    </p>
                </div>

                <div className="space-y-16">
                    {releases.map((release) => (
                        <article key={release.version} className="relative">
                            <div className="md:flex gap-8 items-start">
                                <div className="md:w-1/4 shrink-0 mb-4 md:mb-0 sticky top-24">
                                    <span className="text-cyan-400 font-mono font-medium block">{release.version}</span>
                                    <span className="text-sm text-slate-500">{release.date}</span>
                                </div>
                                <div className="md:w-3/4 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        {release.type === 'major' ? <Rocket className="w-5 h-5 text-purple-400" /> : <PackageOpen className="w-5 h-5 text-emerald-400" />}
                                        <h2 className="text-2xl font-bold text-white">{release.title}</h2>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        {release.description}
                                    </p>
                                    <div className="space-y-3">
                                        {release.highlights.map((hlt, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                                <span className="text-slate-400">{hlt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    )
}
