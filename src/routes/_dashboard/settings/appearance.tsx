import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Palette, Monitor, LayoutGrid, PanelLeft } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/settings/appearance')({
  component: AppearancePage,
})

function AppearancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Appearance</h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize the look and feel of the dashboard
        </p>
      </div>

      {/* Theme */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-base">Theme</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {['Dark', 'Light', 'Auto'].map((theme) => (
              <button
                key={theme}
                className={`rounded-lg border p-4 text-sm font-medium transition-colors ${
                  theme === 'Dark'
                    ? 'border-cyan-500 bg-slate-800 text-white'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Density */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <CardTitle className="text-base">Density</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {['Compact', 'Default', 'Comfortable'].map((density) => (
              <button
                key={density}
                className={`rounded-lg border p-4 text-sm font-medium transition-colors ${
                  density === 'Default'
                    ? 'border-cyan-500 bg-slate-800 text-white'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                {density}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sidebar Position */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <PanelLeft className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-base">Sidebar Position</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            {['Left', 'Right'].map((pos) => (
              <button
                key={pos}
                className={`rounded-lg border p-4 text-sm font-medium transition-colors ${
                  pos === 'Left'
                    ? 'border-cyan-500 bg-slate-800 text-white'
                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-base">Preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[60px] rounded-lg border border-dashed border-slate-700 bg-slate-900 p-4">
            <p className="text-sm text-slate-500">
              Live preview of your appearance settings will be shown here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
