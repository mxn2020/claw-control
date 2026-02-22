import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, AlertCircle, Clock, Server, Globe } from 'lucide-react'

export const Route = createFileRoute('/status')({ component: StatusPage })

const services = [
    { name: 'Control Plane API', status: 'operational', uptime: '99.99%' },
    { name: 'Swarm Orchestrator', status: 'operational', uptime: '99.98%' },
    { name: 'Audit Logs Database', status: 'operational', uptime: '100%' },
    { name: 'Skills Marketplace', status: 'degraded', uptime: '98.5%' },
    { name: 'WebSocket Tunnels', status: 'operational', uptime: '99.95%' },
]

function StatusPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur top-0 sticky z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🦞</span> ClawControl
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link to="/security" className="hover:text-white transition-colors">Security</Link>
                        <Link to="/fleet" className="text-cyan-400 hover:text-cyan-300 font-medium">Dashboard →</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">System Status</h1>
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                        <span className="text-emerald-400 font-medium">All core systems are operational</span>
                    </div>
                </div>

                <div className="grid gap-4 mb-16">
                    {services.map(s => (
                        <div key={s.name} className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-lg p-5">
                            <div className="flex items-center gap-3">
                                <Server className="w-5 h-5 text-slate-400" />
                                <span className="text-white font-medium">{s.name}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-sm text-slate-400 hidden sm:inline-block">Uptime: {s.uptime}</span>
                                {s.status === 'operational' ? (
                                    <span className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Operational
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                                        <span className="w-2 h-2 rounded-full bg-amber-400" /> Degraded
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Past Incidents</h2>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                        {/* Mock Incident 1 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-[.is-active]:bg-cyan-900 group-[.is-active]:border-cyan-500 text-slate-500 group-[.is-active]:text-cyan-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <AlertCircle className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700 bg-slate-800/50">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-white">Skills API Latency</div>
                                    <time className="font-mono text-xs text-amber-500">Today</time>
                                </div>
                                <div className="text-slate-400 text-sm">Investigating degraded performance in the Skills Marketplace listing endpoint.</div>
                            </div>
                        </div>
                        {/* Mock Incident 2 */}
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700 bg-slate-800/50">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-white">Database Migration Completed</div>
                                    <time className="font-mono text-xs text-slate-500">Feb 20</time>
                                </div>
                                <div className="text-slate-400 text-sm">Scheduled maintenance for telemetry database compaction was completed successfully.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
