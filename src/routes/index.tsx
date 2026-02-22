import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Server,
  Bot,
  Shield,
  Activity,
  Network,
  Puzzle,
  ArrowRight,
  Zap,
  Globe,
  Lock,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const features = [
    {
      icon: <Server className="w-10 h-10 text-cyan-400" />,
      title: 'Fleet Management',
      description:
        'Provision, monitor, and manage OpenClaw instances across any infrastructure. Cloud, BYO, or managed.',
    },
    {
      icon: <Bot className="w-10 h-10 text-cyan-400" />,
      title: 'Agent Orchestration',
      description:
        'Deep agent management with personality, tools, skills, and memory. Full inheritance model from instance to agent.',
    },
    {
      icon: <Network className="w-10 h-10 text-cyan-400" />,
      title: 'Swarm Operations',
      description:
        'Bulk fleet operations from μ-swarm to Ω-swarm. Rolling deploys, topology visualization, and kill switches.',
    },
    {
      icon: <Puzzle className="w-10 h-10 text-cyan-400" />,
      title: 'Skills Marketplace',
      description:
        'Install, scan, and manage agent skills with security-first governance. Drift detection across your fleet.',
    },
    {
      icon: <Activity className="w-10 h-10 text-cyan-400" />,
      title: 'Real-time Observability',
      description:
        'Mission control with live event streams, trace waterfalls, cost dashboards, and spend velocity monitoring.',
    },
    {
      icon: <Shield className="w-10 h-10 text-cyan-400" />,
      title: 'Security First',
      description:
        'No inbound ports. Agent-initiated tunnels. Secret vaults, quarantine, and one-click kill switch from anywhere.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="text-xl font-bold text-white">ClawControl</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/fleet" className="hover:text-white transition-colors">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/fleet"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-6xl">🦞</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ClawControl
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            AI Agent Fleet Management Platform
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
            Provision, orchestrate, and observe your entire OpenClaw fleet from a single control plane.
            From a single agent to an Ω-swarm of 10,000.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/fleet"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Demo Embed Placeholder */}
          <div className="mt-16 relative mx-auto w-full max-w-4xl aspect-video bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10" />
            <div className="text-center z-10">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-cyan-400 border-b-8 border-b-transparent ml-1" />
              </div>
              <p className="text-slate-300 font-medium">Watch Demo: Managing 1,000 Agents</p>
            </div>
            {/* Fake browser UI */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Zap className="w-5 h-5" />, label: 'Instances', value: '∞' },
              { icon: <Bot className="w-5 h-5" />, label: 'Agents', value: '∞' },
              { icon: <Globe className="w-5 h-5" />, label: 'Channels', value: '10+' },
              { icon: <Lock className="w-5 h-5" />, label: 'Zero Trust', value: '✓' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-cyan-400 mb-1">
                  {stat.icon}
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Everything you need to manage your AI fleet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-500">
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
