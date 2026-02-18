import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  LayoutDashboard,
  Server,
  Bot,
  FileCode2,
  MessageSquare,
  Network,
  Puzzle,
  Radio,
  Activity,
  GitBranch,
  FileText,
  DollarSign,
  Shield,
  AlertTriangle,
  ClipboardList,
  Settings,
  Wrench,
  OctagonX,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { cn } from '#/lib/utils'

interface NavItem {
  label: string
  to: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'FLEET',
    items: [
      { label: 'Fleet Overview', to: '/fleet', icon: <LayoutDashboard size={18} /> },
      { label: 'Instances', to: '/fleet/instances', icon: <Server size={18} /> },
    ],
  },
  {
    title: 'AGENTS',
    items: [
      { label: 'Catalog', to: '/agents/catalog', icon: <Bot size={18} /> },
      { label: 'Blueprints', to: '/blueprints', icon: <FileCode2 size={18} /> },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Sessions', to: '/sessions', icon: <MessageSquare size={18} /> },
      { label: 'Swarms', to: '/swarms', icon: <Network size={18} /> },
      { label: 'Skills', to: '/skills', icon: <Puzzle size={18} /> },
      { label: 'Channels', to: '/channels', icon: <Radio size={18} /> },
    ],
  },
  {
    title: 'OBSERVE',
    items: [
      { label: 'Live', to: '/observe/live', icon: <Activity size={18} /> },
      { label: 'Traces', to: '/observe/traces', icon: <GitBranch size={18} /> },
      { label: 'Logs', to: '/observe/logs', icon: <FileText size={18} /> },
      { label: 'Cost', to: '/observe/cost', icon: <DollarSign size={18} /> },
    ],
  },
  {
    title: 'SECURITY',
    items: [
      { label: 'Posture', to: '/security/posture', icon: <Shield size={18} /> },
      { label: 'Quarantine', to: '/security/quarantine', icon: <AlertTriangle size={18} /> },
      { label: 'Audit', to: '/audit', icon: <ClipboardList size={18} /> },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Settings', to: '/settings', icon: <Settings size={18} /> },
      { label: 'Configure', to: '/configure', icon: <Wrench size={18} /> },
    ],
  },
]

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col bg-slate-900 border-r border-slate-700">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-slate-700">
        <span className="text-2xl">🦞</span>
        <span className="text-lg font-bold tracking-tight text-white">ClawControl</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {navSections.map((section) => {
          const isCollapsed = collapsed[section.title]
          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span>{section.title}</span>
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              </button>
              {!isCollapsed && (
                <div className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      activeProps={{
                        className:
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm bg-slate-800 text-cyan-500 font-medium border-l-2 border-cyan-500 transition-colors',
                      }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Global Kill Switch */}
      <div className="border-t border-slate-700 p-3">
        <button
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold',
            'bg-red-600 text-white hover:bg-red-700 transition-colors',
          )}
        >
          <OctagonX size={18} />
          <span>Global Kill Switch</span>
        </button>
      </div>
    </aside>
  )
}
