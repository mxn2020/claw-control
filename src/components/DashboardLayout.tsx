// src/components/DashboardLayout.tsx
// Full management layer layout with collapsible sidebar navigation.

import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useAuth } from '#/lib/authContext'
import {
  Server,
  Bot,
  MessageSquare,
  Puzzle,
  Radio,
  BookCopy,
  Network,
  Activity,
  Shield,
  ClipboardList,
  Settings2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  ChevronDown,
  ChevronRight as ChevronRightSm,
} from 'lucide-react'

interface NavItem {
  label: string
  icon: React.ReactNode
  to: string
  children?: { label: string; to: string }[]
}

const navGroups: NavItem[] = [
  {
    label: 'Fleet',
    icon: <Server className="w-4 h-4" />,
    to: '/fleet',
    children: [
      { label: 'Overview', to: '/fleet' },
      { label: 'Instances', to: '/fleet/instances' },
    ],
  },
  {
    label: 'Agents',
    icon: <Bot className="w-4 h-4" />,
    to: '/agents',
    children: [
      { label: 'All Agents', to: '/agents' },
      { label: 'Catalog', to: '/agents/catalog' },
      { label: 'Compare', to: '/agents/compare' },
    ],
  },
  {
    label: 'Sessions',
    icon: <MessageSquare className="w-4 h-4" />,
    to: '/sessions',
  },
  {
    label: 'Skills',
    icon: <Puzzle className="w-4 h-4" />,
    to: '/skills',
    children: [
      { label: 'Installed', to: '/skills' },
      { label: 'Marketplace', to: '/skills/marketplace' },
      { label: 'Governance', to: '/skills/governance' },
    ],
  },
  {
    label: 'Channels',
    icon: <Radio className="w-4 h-4" />,
    to: '/channels',
    children: [
      { label: 'Connectors', to: '/channels' },
      { label: 'Routing', to: '/channels/routing' },
      { label: 'Health', to: '/channels/health' },
    ],
  },
  {
    label: 'Blueprints',
    icon: <BookCopy className="w-4 h-4" />,
    to: '/blueprints',
  },
  {
    label: 'Swarms',
    icon: <Network className="w-4 h-4" />,
    to: '/swarms',
  },
  {
    label: 'Observe',
    icon: <Activity className="w-4 h-4" />,
    to: '/observe',
    children: [
      { label: 'Live Feed', to: '/observe' },
      { label: 'Traces', to: '/observe/traces' },
      { label: 'Logs', to: '/observe/logs' },
      { label: 'Cost', to: '/observe/cost' },
      { label: 'Analytics', to: '/observe/analytics' },
    ],
  },
  {
    label: 'Security',
    icon: <Shield className="w-4 h-4" />,
    to: '/security',
    children: [
      { label: 'Posture', to: '/security' },
      { label: 'Secrets', to: '/security/secrets' },
      { label: 'Quarantine', to: '/security/quarantine' },
      { label: 'Incidents', to: '/security/incidents' },
    ],
  },
  {
    label: 'Audit',
    icon: <ClipboardList className="w-4 h-4" />,
    to: '/audit',
    children: [
      { label: 'Tools', to: '/audit' },
      { label: 'Config Changes', to: '/audit/config-changes' },
      { label: 'Access', to: '/audit/access' },
    ],
  },
  {
    label: 'Configure',
    icon: <Settings2 className="w-4 h-4" />,
    to: '/configure',
    children: [
      { label: 'Providers', to: '/configure' },
      { label: 'Defaults', to: '/configure/defaults' },
      { label: 'Integrations', to: '/configure/integrations' },
      { label: 'Self-Hosting', to: '/configure/self-hosting' },
    ],
  },
  {
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    to: '/settings',
    children: [
      { label: 'Profile', to: '/settings' },
      { label: 'API Keys', to: '/settings/api-keys' },
      { label: 'Notifications', to: '/settings/notifications' },
      { label: 'Appearance', to: '/settings/appearance' },
    ],
  },
]

function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(item.to)
  const [open, setOpen] = useState(isActive)

  const hasChildren = item.children && item.children.length > 0

  if (collapsed) {
    return (
      <Link
        to={item.to}
        title={item.label}
        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors mx-auto
          ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}`}
      >
        {item.icon}
      </Link>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && setOpen(!open)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
          ${isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}`}
      >
        {item.icon}
        <span className="flex-1 text-left font-medium">{item.label}</span>
        {hasChildren && (
          <span className="text-slate-500">
            {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRightSm className="w-3.5 h-3.5" />}
          </span>
        )}
      </button>

      {hasChildren && open && (
        <div className="ml-7 mt-0.5 space-y-0.5 border-l border-slate-700/60 pl-3">
          {item.children!.map((child) => {
            const childActive = location.pathname === child.to || location.pathname.startsWith(child.to + '/')
            return (
              <Link
                key={child.to}
                to={child.to}
                className={`block py-1.5 px-2 rounded-md text-xs transition-colors
                  ${childActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700/40'}`}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-200 ${collapsed ? 'w-14' : 'w-56'
          } flex-shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-slate-800">
          <span className="text-xl flex-shrink-0">🦞</span>
          {!collapsed && (
            <span className="text-sm font-bold text-white tracking-wide">ClawControl</span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navGroups.map((item) => (
            <NavGroup key={item.to} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* User + Logout footer */}
        <div className="border-t border-slate-800 p-2">
          {!collapsed && user && (
            <div className="flex items-center gap-2 px-2 py-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={logout}
            title="Sign out"
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-slate-400
              hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg
              text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-colors text-xs mt-1"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
