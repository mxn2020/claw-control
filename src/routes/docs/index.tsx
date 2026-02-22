import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Code2, Terminal, Zap, Puzzle, Shield } from 'lucide-react'

export const Route = createFileRoute('/docs/')({ component: DocsIndex })

function DocsIndex() {
    const categories = [
        {
            title: 'Getting Started',
            description: 'Learn the fundamentals of OpenClaw and ClawControl architecture.',
            icon: <Zap className="w-6 h-6 text-amber-400" />,
            links: [
                { label: 'Quickstart Guide', href: '/docs/quickstart' },
                { label: 'Core Concepts', href: '#' },
                { label: 'Architecture Overview', href: '#' },
            ]
        },
        {
            title: 'Fleet Management',
            description: 'Provisioning and monitoring instances at scale.',
            icon: <Server className="w-6 h-6 text-cyan-400" />,
            links: [
                { label: 'Deploying Instances', href: '#' },
                { label: 'Instance Provisioning Wizard', href: '#' },
                { label: 'Health Monitoring', href: '#' },
            ]
        },
        {
            title: 'Agent Intelligence',
            description: 'Configuring agent personas, memory, and cognitive behaviors.',
            icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
            links: [
                { label: 'Personality System (SOUL.md)', href: '#' },
                { label: 'Memory Management', href: '#' },
                { label: 'Tool Policies', href: '#' },
            ]
        },
        {
            title: 'Skills & Integrations',
            description: 'Extending agent capabilities with the Skills Marketplace.',
            icon: <Puzzle className="w-6 h-6 text-purple-400" />,
            links: [
                { label: 'Installing Skills', href: '#' },
                { label: 'Building Custom Skills', href: '#' },
                { label: 'Connecting Channels (Slack, Discord)', href: '#' },
            ]
        },
        {
            title: 'Security & Governance',
            description: 'Securing your swarm and auditing actions.',
            icon: <Shield className="w-6 h-6 text-red-400" />,
            links: [
                { label: 'Secrets Vault', href: '#' },
                { label: 'Quarantine & Kill Switch', href: '#' },
                { label: 'Audit Logs', href: '#' },
            ]
        },
        {
            title: 'API & CLI',
            description: 'Automate operations with our developer tools.',
            icon: <Terminal className="w-6 h-6 text-slate-400" />,
            links: [
                { label: 'REST API Reference', href: '#' },
                { label: 'Claw CLI Basics', href: '#' },
                { label: 'Generating API Keys', href: '#' },
            ]
        }
    ]

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
                            <li><Link to="/docs" className="block pl-3 border-l text-cyan-400 border-cyan-400">Introduction</Link></li>
                            <li><Link to="/docs/quickstart" className="block pl-3 border-l border-transparent hover:border-slate-500 hover:text-slate-300 transition-colors">Quickstart</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-3">Guides</h4>
                        <ul className="space-y-2 text-sm text-slate-400 border-l border-slate-800">
                            <li><a href="#" className="block pl-3 border-l border-transparent hover:border-slate-500 hover:text-slate-300 transition-colors">Fleet Operations</a></li>
                            <li><a href="#" className="block pl-3 border-l border-transparent hover:border-slate-500 hover:text-slate-300 transition-colors">Agent Configurations</a></li>
                            <li><a href="#" className="block pl-3 border-l border-transparent hover:border-slate-500 hover:text-slate-300 transition-colors">Security Model</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">ClawControl Documentation</h1>
                        <p className="text-lg text-slate-400 max-w-3xl">
                            Welcome to the ClawControl documentation. Whether you are deploying your first OpenClaw instance or orchestrating a mega-swarm of 10,000 agents, you will find everything you need here.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categories.map((cat, i) => (
                            <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-slate-900 rounded-lg shadow-sm border border-slate-700/50">
                                        {cat.icon}
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">{cat.title}</h2>
                                </div>
                                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">
                                    {cat.description}
                                </p>
                                <div className="space-y-2 text-sm">
                                    {cat.links.map((link, j) => (
                                        link.href.startsWith('/') ? (
                                            <Link key={j} to={link.href} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                                                <Code2 className="w-3 h-3" />
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a key={j} href={link.href} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                                                <Code2 className="w-3 h-3" />
                                                {link.label}
                                            </a>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

function Server(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg>
}
