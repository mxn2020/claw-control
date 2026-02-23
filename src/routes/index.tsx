import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
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
  ChevronRight,
  Cable,
  MonitorDot,
  Layers,
  Terminal,
  ArrowUpRight,
  Star,
  Github,
  Twitter,
  Mail,
  BookOpen,
  FileText,
  MessageSquare,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 2000, suffix = '') {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setValue(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return { value: `${value.toLocaleString()}${suffix}`, ref }
}

function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const instances = useCounter(12500, 2200, '+')
  const uptime = useCounter(99, 1800, '.99%')
  const agents = useCounter(850000, 2400, '+')
  const countries = useCounter(42, 1600, '')

  const features = [
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Fleet Management',
      description:
        'Provision, monitor, and manage OpenClaw instances across any infrastructure. Cloud, BYO, or managed — zero config required.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'Agent Orchestration',
      description:
        'Deep agent lifecycle management with personality, tools, skills, and memory. Full inheritance model from instance to agent.',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Swarm Operations',
      description:
        'Bulk fleet operations from μ-swarm to Ω-swarm. Rolling deploys, topology visualization, and global kill switches.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: 'Skills Marketplace',
      description:
        'Install, scan, and manage agent skills with security-first governance. Built-in drift detection across your fleet.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Real-time Observability',
      description:
        'Mission control with live event streams, trace waterfalls, cost dashboards, and spend velocity monitoring.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Zero-Trust Security',
      description:
        'No inbound ports. Agent-initiated tunnels. Secret vaults, quarantine zones, and one-click kill switch from anywhere.',
      gradient: 'from-rose-500 to-orange-500',
    },
  ]

  const steps = [
    {
      number: '01',
      icon: <Cable className="w-8 h-8" />,
      title: 'Connect',
      description:
        'Point your OpenClaw instances at ClawControl. Zero inbound ports — agents establish secure outbound tunnels automatically.',
    },
    {
      number: '02',
      icon: <Layers className="w-8 h-8" />,
      title: 'Configure',
      description:
        'Define agent personalities, install skills, set tool policies, and configure memory — all from a unified dashboard.',
    },
    {
      number: '03',
      icon: <MonitorDot className="w-8 h-8" />,
      title: 'Control',
      description:
        'Monitor your entire fleet in real-time. Deploy at scale, trace every action, and maintain full operational oversight.',
    },
  ]

  const testimonials = [
    {
      quote:
        "ClawControl replaced our entire homegrown orchestration layer. We went from managing 50 agents with scripts to 2,000 with zero ops overhead.",
      name: 'Sarah Chen',
      title: 'Head of AI Infrastructure',
      company: 'Meridian Labs',
      initials: 'SC',
    },
    {
      quote:
        "The security model is what sold us. Zero inbound ports plus the secrets vault means our compliance team actually sleeps at night.",
      name: 'Marcus Thompson',
      title: 'VP Engineering',
      company: 'TrustLayer',
      initials: 'MT',
    },
    {
      quote:
        "We scaled from a proof of concept to production in a week. The skills marketplace alone saved us months of integration work.",
      name: 'Yuki Tanaka',
      title: 'CTO',
      company: 'NovaBridge AI',
      initials: 'YT',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ── Sticky Navigation ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-slate-950/50'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">
              🦞
            </span>
            <span className="text-xl font-bold tracking-tight">
              ClawControl
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Architecture', href: '#architecture' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all"
              >
                {item.label}
              </a>
            ))}
            {[
              { label: 'Pricing', to: '/pricing' as const },
              { label: 'Security', to: '/security' as const },
              { label: 'Status', to: '/status' as const },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/fleet"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-0 animate-grid-flow grid-pattern opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse-glow" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-sm text-slate-300">
              Now managing 12,500+ instances worldwide
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 animate-fade-in-up stagger-1">
            <span className="block">Command Your</span>
            <span className="block text-gradient">AI Agent Fleet</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up stagger-2">
            Provision, orchestrate, and observe your entire OpenClaw fleet from a
            single control plane. From a solo agent to an Ω-swarm of 10,000.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up stagger-3">
            <Link
              to="/fleet"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="group px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-2xl transition-all border border-slate-700/50 hover:border-slate-600 flex items-center gap-2 text-lg backdrop-blur-sm"
            >
              <Terminal className="w-5 h-5" />
              See How It Works
            </a>
          </div>

          {/* Terminal preview */}
          <div className="relative max-w-3xl mx-auto animate-fade-in-up stagger-4">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-slate-800 rounded-lg text-xs text-slate-500 font-mono">
                    app.clawcontrol.io/fleet
                  </div>
                </div>
              </div>
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-2 bg-slate-950/50">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-cyan-400">$</span>
                  <span className="text-slate-300">
                    claw fleet status --watch
                  </span>
                </div>
                <div className="text-emerald-400">
                  ✓ Connected to ClawControl (us-east-1)
                </div>
                <div className="text-slate-400">
                  ┌──────────────────────────────────────────┐
                </div>
                <div className="text-slate-400">
                  │ Fleet: <span className="text-white">production</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;Instances:{' '}
                  <span className="text-cyan-400">247</span>
                  &nbsp;&nbsp;&nbsp;Agents:{' '}
                  <span className="text-cyan-400">1,892</span> │
                </div>
                <div className="text-slate-400">
                  │ Status: <span className="text-emerald-400">ALL HEALTHY</span>
                  &nbsp;&nbsp;Uptime:{' '}
                  <span className="text-emerald-400">99.99%</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
                </div>
                <div className="text-slate-400">
                  │ Tokens/hr:{' '}
                  <span className="text-purple-400">2.4M</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cost/hr:{' '}
                  <span className="text-yellow-400">$12.30</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
                </div>
                <div className="text-slate-400">
                  └──────────────────────────────────────────┘
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-cyan-400">$</span>
                  <span className="text-slate-600 animate-pulse">▊</span>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10 animate-pulse-glow" />
          </div>

          {/* Trusted by */}
          <div className="mt-16 animate-fade-in-up stagger-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600 mb-6">
              Trusted by engineering teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-600">
              {[
                'Meridian Labs',
                'TrustLayer',
                'NovaBridge AI',
                'Hyperion',
                'Arcadia',
              ].map((name) => (
                <span
                  key={name}
                  className="text-sm font-semibold tracking-wide hover:text-slate-400 transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics Strip ── */}
      <section className="relative py-16 border-y border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5" />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              ref: instances.ref,
              value: instances.value,
              label: 'Instances Managed',
              icon: <Server className="w-5 h-5" />,
            },
            {
              ref: uptime.ref,
              value: uptime.value,
              label: 'Platform Uptime',
              icon: <Activity className="w-5 h-5" />,
            },
            {
              ref: agents.ref,
              value: agents.value,
              label: 'Agents Orchestrated',
              icon: <Bot className="w-5 h-5" />,
            },
            {
              ref: countries.ref,
              value: countries.value,
              label: 'Countries',
              icon: <Globe className="w-5 h-5" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              ref={stat.ref}
              className="text-center group"
            >
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-24 px-6 relative">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-[0.2em] mb-4">
              Platform Capabilities
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Everything you need to manage
              <br />
              <span className="text-gradient">your AI fleet</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From a single agent to a fleet of thousands — full lifecycle
              management with enterprise-grade security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass-card glass-card-hover rounded-2xl p-8 transition-all duration-500 group animate-fade-in-up stagger-${index + 1}`}
                style={{ opacity: 0, animationFillMode: 'forwards' }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                  style={{
                    boxShadow: '0 0 0 0 transparent',
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="py-24 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-[0.2em] mb-4">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Three steps to{' '}
              <span className="text-gradient">full control</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px">
              <div className="w-full h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50" />
              <div className="absolute inset-0 h-px bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-30 blur-sm" />
            </div>

            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative inline-flex mb-8">
                  <div className="w-32 h-32 rounded-3xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-slate-800 transition-all duration-500">
                    <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold shadow-lg shadow-cyan-500/20">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture Diagram ── */}
      <section id="architecture" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-[0.2em] mb-4">
              Architecture
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Built for <span className="text-gradient">scale & security</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Zero-trust architecture with agent-initiated secure tunnels. No
              inbound ports, ever.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {/* Your Infrastructure */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Your Infrastructure
                </p>
                {['Agent α', 'Agent β', 'Agent γ'].map((agent, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 group hover:border-cyan-500/30 transition-all"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-300 font-medium">
                      {agent}
                    </span>
                  </div>
                ))}
              </div>

              {/* Secure Tunnels */}
              <div className="flex flex-col items-center justify-center py-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
                  Secure Tunnels
                </p>
                <div className="relative w-full flex flex-col items-center gap-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-2 w-full justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-cyan-500/60" />
                      <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/60 via-cyan-500/40 to-transparent" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-600 mt-4 text-center">
                  TLS 1.3 / mTLS
                </p>
              </div>

              {/* Control Plane */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Control Plane
                </p>
                {[
                  { icon: <Zap className="w-4 h-4" />, label: 'Orchestrator' },
                  { icon: <Activity className="w-4 h-4" />, label: 'Telemetry' },
                  { icon: <Shield className="w-4 h-4" />, label: 'Auth & RBAC' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="text-cyan-400">{item.icon}</div>
                    <span className="text-sm text-cyan-100 font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dashboard */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Dashboard
                </p>
                <div className="w-full aspect-square max-w-[180px] bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4 flex flex-col gap-2 hover:border-cyan-500/30 transition-all group">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-1.5 mt-2">
                    <div className="bg-cyan-500/10 rounded-md" />
                    <div className="bg-blue-500/10 rounded-md" />
                    <div className="col-span-2 bg-purple-500/10 rounded-md" />
                    <div className="bg-slate-700/30 rounded-md" />
                    <div className="bg-slate-700/30 rounded-md" />
                  </div>
                </div>
                <Link
                  to="/fleet"
                  className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  Open Dashboard{' '}
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-[0.2em] mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Loved by{' '}
              <span className="text-gradient">engineering teams</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card glass-card-hover rounded-2xl p-8 transition-all duration-500 flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                </div>
                <blockquote className="text-slate-300 leading-relaxed mb-8 flex-1 text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-6 border-t border-slate-800/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {t.name}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Ready to take control of
            <br />
            <span className="text-gradient">your AI fleet?</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Start for free with up to 3 agents. No credit card required. Scale
            to thousands when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/fleet"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 text-lg"
            >
              Start Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-2xl transition-all border border-slate-700/50 hover:border-slate-600 text-lg backdrop-blur-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/50 bg-slate-950 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🦞</span>
                <span className="text-lg font-bold tracking-tight">
                  ClawControl
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                AI Agent Fleet Management Platform. From solo agents to
                Ω-swarms.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Github className="w-4 h-4" />, label: 'GitHub' },
                  { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' },
                  { icon: <MessageSquare className="w-4 h-4" />, label: 'Discord' },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="w-8 h-8 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', to: '/pricing' },
                  { label: 'Security', to: '/security' },
                  { label: 'Status', to: '/status' },
                  { label: 'Changelog', to: '/changelog' },
                ].map((link) =>
                  'to' in link ? (
                    <li key={link.label}>
                      <Link
                        to={link.to as '/pricing'}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {[
                  {
                    label: 'Documentation',
                    icon: <BookOpen className="w-3.5 h-3.5" />,
                  },
                  {
                    label: 'API Reference',
                    icon: <FileText className="w-3.5 h-3.5" />,
                  },
                  {
                    label: 'Community',
                    icon: <MessageSquare className="w-3.5 h-3.5" />,
                  },
                  {
                    label: 'Newsletter',
                    icon: <Mail className="w-3.5 h-3.5" />,
                  },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact', 'Privacy', 'Terms'].map(
                  (label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} ClawControl. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
