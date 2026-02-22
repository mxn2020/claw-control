import { createFileRoute, Link } from '@tanstack/react-router'
import { Shield, Lock, Server, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/security')({ component: SecurityPage })

function SecurityPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur top-0 sticky z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🦞</span> ClawControl
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
                        <Link to="/fleet" className="text-cyan-400 hover:text-cyan-300 font-medium">Dashboard →</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Security & Trust</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        ClawControl is built from the ground up for maximum security. We employ a zero-trust model to ensure your agent fleets are protected.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <Lock className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Zero Inbound Ports</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            OpenClaw instances never expose inbound ports. They establish outbound, secure WebSocket connections to the control plane, making them invisible to external network scans.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <Server className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Isolated Execution</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Every agent operates within a dedicated sandbox. Skills and tools execute with strict capability boundaries, preventing lateral movement in case of compromise.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Architecture Overview</h2>
                    <div className="space-y-4">
                        {[
                            "End-to-end encryption for all control plane communications.",
                            "Role-based access control (RBAC) with granular permissions.",
                            "Secure secrets vault for managing provider credentials.",
                            "Immutable audit logging for all fleet actions and tool executions.",
                            "Global kill switches to instantly suspend instances or agents."
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
