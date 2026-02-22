import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Clipboard, Terminal } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/docs/quickstart')({ component: DocsQuickstart })

function CodeBlock({ code, language }: { code: string, language: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group my-6 border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                {language}
                <button onClick={handleCopy} className="hover:text-cyan-400 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Clipboard className="w-4 h-4" />}
                </button>
            </div>
            <pre className="p-4 text-sm font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                {code}
            </pre>
        </div>
    )
}

function DocsQuickstart() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur top-0 sticky z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🦞</span> ClawControl
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link to="/docs" className="text-cyan-400 hover:text-cyan-300 transition-colors">Documentation</Link>
                        <Link to="/fleet" className="text-white hover:text-cyan-400 font-medium">Dashboard →</Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0 space-y-8 hidden md:block">
                    <div>
                        <h4 className="font-semibold text-white mb-3">Overview</h4>
                        <ul className="space-y-2 text-sm text-slate-400 border-l border-slate-800">
                            <li><Link to="/docs" className="block pl-3 border-l border-transparent hover:border-slate-500 hover:text-slate-300 transition-colors">Introduction</Link></li>
                            <li><Link to="/docs/quickstart" className="block pl-3 border-l text-cyan-400 border-cyan-400">Quickstart</Link></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 max-w-3xl pb-24">
                    <div className="mb-12 border-b border-slate-800 pb-8">
                        <div className="flex items-center gap-3 mb-4 text-cyan-400 font-medium">
                            <Terminal className="w-5 h-5" />
                            <span>Getting Started</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Quickstart Guide</h1>
                        <p className="text-lg text-slate-400">
                            Get your first OpenClaw instance connected to ClawControl in under 5 minutes.
                        </p>
                    </div>

                    <div className="space-y-12 prose prose-invert prose-slate max-w-none">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Generate an API Key</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Instances authenticate with ClawControl using Organization API Keys. Head over to your dashboard settings to generate one.
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 text-slate-300 marker:text-cyan-500">
                                <li>Navigate to <Link to="/settings/api-keys" className="text-cyan-400 hover:underline">Settings &gt; API Keys</Link></li>
                                <li>Click <strong>Generate New Key</strong></li>
                                <li>Copy the key. You will only see it once.</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Bootstrapping a Local Instance</h2>
                            <p className="text-slate-300 leading-relaxed">
                                If you have Docker installed, you can spin up an OpenClaw instance locally and connect it immediately to your dashboard using the bootstrap script.
                            </p>

                            <CodeBlock
                                language="bash"
                                code={`export CLAW_CONTROL_API_KEY="sk_live_123456789"
export CLAW_CONTROL_URL="wss://api.clawcontrol.com"

# Pull and run the official docker image
docker run -d \\
  --name claw-instance-1 \\
  -e CONTROL_PLANE_URL=$CLAW_CONTROL_URL \\
  -e CONTROL_PLANE_KEY=$CLAW_CONTROL_API_KEY \\
  minions/openclaw:latest`}
                            />
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Verify Connection</h2>
                            <p className="text-slate-300 leading-relaxed">
                                In a few seconds, you should see the new instance appear in your <Link to="/fleet" className="text-cyan-400 hover:underline">Fleet Dashboard</Link>. Its status will change to <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">online</span>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Next Steps</h2>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300 marker:text-slate-500">
                                <li><a href="#" className="text-cyan-400 hover:underline">Configure Instance Personality</a></li>
                                <li><a href="#" className="text-cyan-400 hover:underline">Provision Your First Agent</a></li>
                                <li><a href="#" className="text-cyan-400 hover:underline">Install Skills from the Marketplace</a></li>
                            </ul>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}
