import { FlaskConical } from 'lucide-react'

/**
 * Renders a subtle "Demo Data" banner at the top of pages
 * that don't yet have a Convex backend integration.
 */
export function DemoDataBanner({ feature }: { feature?: string }) {
    return (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-amber-300/80">
                <span className="font-medium">Preview</span>
                {feature ? ` — ${feature} shows sample data.` : ' — this page shows sample data.'}
                {' '}Connect a running instance to see real data.
            </p>
        </div>
    )
}
