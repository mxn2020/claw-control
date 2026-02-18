import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Home,
  MessageSquare,
  Paintbrush,
  Mic,
  Newspaper,
  CheckSquare,
  Clock,
  ShieldCheck,
  User as UserIcon,
  FolderKanban,
  Briefcase,
  Workflow,
  ArrowRightLeft,
  Search,
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
    title: 'MAIN',
    items: [
      { label: 'Home', to: '/home', icon: <Home size={16} /> },
      { label: 'Chat', to: '/chat', icon: <MessageSquare size={16} /> },
      { label: 'Canvas', to: '/home', icon: <Paintbrush size={16} /> },
      { label: 'Voice', to: '/home', icon: <Mic size={16} /> },
    ],
  },
  {
    title: 'DAILY',
    items: [
      { label: 'Briefing', to: '/briefing', icon: <Newspaper size={16} /> },
      { label: 'Tasks', to: '/tasks', icon: <CheckSquare size={16} /> },
      { label: 'Cron', to: '/cron', icon: <Clock size={16} /> },
      { label: 'Approvals', to: '/approvals', icon: <ShieldCheck size={16} /> },
    ],
  },
  {
    title: 'SPACES',
    items: [
      { label: 'Personal', to: '/personal', icon: <UserIcon size={16} /> },
      { label: 'Projects', to: '/projects', icon: <FolderKanban size={16} /> },
      { label: 'Work', to: '/work', icon: <Briefcase size={16} /> },
      { label: 'Automations', to: '/automations', icon: <Workflow size={16} /> },
    ],
  },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="flex h-full w-56 flex-shrink-0 flex-col bg-slate-900 border-r border-slate-700/60">
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-700/60">
          <span className="text-xl">🌌</span>
          <span className="text-base font-bold tracking-tight text-white">ClawVerse</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
          {navSections.map((section) => {
            const isCollapsed = collapsed[section.title]
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between px-2 py-1 text-[10px] font-semibold tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <span>{section.title}</span>
                  {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                </button>
                {!isCollapsed && (
                  <div className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        activeProps={{
                          className:
                            'flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm bg-slate-800/80 text-cyan-400 font-medium transition-colors',
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

        {/* Switch to Admin */}
        <div className="border-t border-slate-700/60 p-2">
          <Link
            to="/fleet"
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium',
              'text-slate-400 hover:bg-slate-800 hover:text-white transition-colors',
            )}
          >
            <ArrowRightLeft size={14} />
            <span>Switch to Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/50 px-5 py-2.5">
          <div className="flex items-center gap-2 rounded-md bg-slate-700/50 px-3 py-1.5 text-sm text-slate-300">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              className="w-48 bg-transparent outline-none placeholder-slate-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Welcome back</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-600 text-white text-xs font-semibold">
              U
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
