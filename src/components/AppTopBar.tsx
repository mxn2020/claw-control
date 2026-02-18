import { Search, OctagonX, ChevronDown, User } from 'lucide-react'

export default function AppTopBar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-6 py-3">
      {/* Breadcrumb area */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="text-slate-500">Dashboard</span>
        <span className="text-slate-600">/</span>
        <span className="text-white">Overview</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-md bg-slate-700 px-3 py-1.5 text-sm text-slate-300">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search agents, sessions…"
          className="w-56 bg-transparent outline-none placeholder-slate-500"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Kill switch */}
        <button className="flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors">
          <OctagonX size={14} />
          <span>Kill Switch</span>
        </button>

        {/* Org selector */}
        <button className="flex items-center gap-1.5 rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
          <span>Org</span>
          <ChevronDown size={14} />
        </button>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-slate-300">
          <User size={16} />
        </div>
      </div>
    </header>
  )
}
