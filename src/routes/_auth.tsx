import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-5xl">🦞</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">ClawControl</h1>
                    <p className="text-sm text-slate-400 mt-1">AI Agent Fleet Management</p>
                </div>

                {/* Form card */}
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
                    <Outlet />
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-600 mt-6">
                    Open Source · Self-Hosted · <a href="https://github.com/clawcontrol" className="hover:text-slate-400 transition-colors">GitHub</a>
                </p>
            </div>
        </div>
    )
}
