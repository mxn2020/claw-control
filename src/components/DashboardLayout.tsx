// src/components/DashboardLayout.tsx
// Full management layer layout with collapsible sidebar navigation and global kill switch.

import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useAuth } from '#/lib/authContext'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useToast } from '#/components/ui/toast'
import type { Id } from '../../convex/_generated/dataModel'
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
  OctagonX,
  Play,
  AlertTriangle,
  Building2,
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
      { label: 'Vulnerabilities', to: '/security/cves' },
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
    label: 'Organization',
    icon: <Building2 className="w-4 h-4" />,
    to: '/org',
    children: [
      { label: 'General', to: '/org' },
      { label: 'Members', to: '/org/members' },
      { label: 'Teams', to: '/org/teams' },
      { label: 'Audit Log', to: '/org/audit' },
      { label: 'Billing', to: '/org/billing' },
      { label: 'SSO & Identity', to: '/org/sso' },
      { label: 'Compliance', to: '/org/compliance' },
      { label: 'SIEM Export', to: '/org/siem' },
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
  const { user, logout, setOrg } = useAuth()
  const { toast } = useToast()

  // Kill switch state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convexApi = api as Record<string, any>
  const instances = useQuery(convexApi.instances?.list ?? null, user?.orgId ? { orgId: user.orgId as Id<"organizations"> } : 'skip')
  const killSwitchActive = instances && instances.length > 0
    ? instances.every((i: any) => i.status === 'offline')
    : false

  const [showKillConfirm, setShowKillConfirm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const pauseAllInstances = useMutation(convexApi.instances?.pauseAll ?? null)
  const resumeAllInstances = useMutation(convexApi.instances?.resumeAll ?? null)
  const pauseAllAgents = useMutation(convexApi.agents?.pauseAll ?? null)
  const resumeAllAgents = useMutation(convexApi.agents?.resumeAll ?? null)

  async function handleKillSwitch() {
    if (!user?.orgId) return
    const orgId = user.orgId as Id<"organizations">
    setIsProcessing(true)
    try {
      if (killSwitchActive) {
        // Resume
        await resumeAllInstances({ orgId })
        await resumeAllAgents({ orgId })
        toast('All instances and agents resumed', 'success')
      } else {
        // Pause
        await pauseAllInstances({ orgId })
        await pauseAllAgents({ orgId })
        toast('Kill switch activated — all agents paused', 'error')
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Kill switch failed', 'error')
    } finally {
      setIsProcessing(false)
      setShowKillConfirm(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-200 ${collapsed ? 'w-14' : 'w-56'
          } flex-shrink-0`}
      >
        {/* Org Switcher Logo Area */}
        <div className="px-3 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-xl flex-shrink-0">🦞</span>
            {!collapsed && (
              <span className="text-sm font-bold text-white tracking-wide">ClawControl</span>
            )}
          </div>
          {!collapsed && user && user.organizations && user.organizations.length > 0 && (
            <div className="mt-3">
              <select
                className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded p-1.5 appearance-none cursor-pointer hover:border-slate-500 transition-colors outline-none focus:ring-1 focus:ring-cyan-500"
                value={user.orgId || ''}
                onChange={(e) => {
                  setOrg(e.target.value);
                  window.location.reload(); // Quick refresh to clear queries bounds to old org
                }}
              >
                {user.organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
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
        {/* Top bar with kill switch */}
        <header className="flex items-center justify-between px-6 py-2 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            {killSwitchActive && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full animate-pulse">
                <OctagonX className="w-3.5 h-3.5" />
                <span className="font-medium">KILL SWITCH ACTIVE</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => killSwitchActive ? handleKillSwitch() : setShowKillConfirm(true)}
              disabled={isProcessing}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${killSwitchActive
                ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30'
                : 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {killSwitchActive ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Resume All
                </>
              ) : (
                <>
                  <OctagonX className="w-3.5 h-3.5" />
                  Kill Switch
                </>
              )}
            </button>
          </div>
        </header>

        {/* Kill switch confirmation modal */}
        {showKillConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 max-w-md mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Activate Kill Switch?</h3>
                  <p className="text-sm text-slate-400">This will pause all instances and agents</p>
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm text-slate-300">
                <ul className="space-y-1">
                  <li>• All instances will be set to <strong className="text-red-400">offline</strong></li>
                  <li>• All agents will be <strong className="text-red-400">paused</strong></li>
                  <li>• Active sessions will be interrupted</li>
                  <li>• This action is logged to the audit trail</li>
                </ul>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowKillConfirm(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleKillSwitch}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors font-medium disabled:opacity-50"
                >
                  {isProcessing ? 'Activating…' : 'Activate Kill Switch'}
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
