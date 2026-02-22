import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Terminal, ShieldCheck, AlertCircle } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useToast } from '#/components/ui/toast'

export const Route = createFileRoute('/_auth/device')({
    component: DevicePair,
})

function DevicePair() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const [code, setCode] = useState('')
    const [isPairing, setIsPairing] = useState(false)
    const [success, setSuccess] = useState(false)

    const claimDevice = useMutation(api.nodes.claimDevice)

    async function handlePair(e: React.FormEvent) {
        e.preventDefault()
        if (code.length < 6) return

        setIsPairing(true)
        try {
            // Provide basic OS info if possible, mock for now
            await claimDevice({
                pairingCode: code,
                osVersion: navigator.userAgent
            })

            setSuccess(true)
            toast('Device successfully paired!', 'success')

            // Auto-redirect after success
            setTimeout(() => {
                navigate({ to: '/' })
            }, 2000)
        } catch (err) {
            toast(err instanceof Error ? err.message : 'Invalid or expired code', 'error')
        } finally {
            setIsPairing(false)
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                        <Terminal className="w-6 h-6 text-cyan-400" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Pair Device</h1>
                <p className="text-slate-400 text-sm">
                    Enter the 6-digit code displayed on your OpenClaw node CLI.
                </p>
            </div>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="pt-6">
                    {success ? (
                        <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white">Device Paired!</h3>
                                <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handlePair} className="space-y-5">
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                        className="w-full text-center text-3xl tracking-[0.5em] font-mono bg-slate-950 border border-slate-700 rounded-lg py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-700"
                                        required
                                    />
                                </div>

                                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-200/70">
                                        Pairing a local OS node allows Claw Control to securely tunnel to its file system and terminals.
                                    </p>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-[0_0_20px_rgba(8,145,178,0.2)]"
                                disabled={isPairing || code.length < 6}
                            >
                                {isPairing ? 'Pairing...' : 'Link Device'}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>

            {!success && (
                <p className="text-center text-xs text-slate-500">
                    Need help? <a href="https://docs.minions.wtf/claw-control/pairing" className="text-cyan-400 hover:text-cyan-300">Read setup guide</a>
                </p>
            )}
        </div>
    )
}
