import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Mail, ArrowLeft, CheckCircle, KeyRound, Eye, EyeOff } from 'lucide-react'

export const Route = createFileRoute('/_auth/auth/recovery')({
    component: RecoveryPage,
})

function RecoveryPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [recoveryToken, setRecoveryToken] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [step, setStep] = useState<'email' | 'reset' | 'done'>('email')
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convexApi = api as Record<string, any>
    const requestRecoveryMutation = useMutation(convexApi.auth?.requestRecovery ?? null)
    const resetPasswordMutation = useMutation(convexApi.auth?.resetPassword ?? null)

    async function handleRequestRecovery(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)
        try {
            const result = await requestRecoveryMutation({ email })
            if (result?.recoveryToken) {
                // In OSS mode, the token is returned directly
                setRecoveryToken(result.recoveryToken)
            }
            setStep('reset')
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to request recovery.')
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        if (!recoveryToken) {
            setError('Please enter the recovery token.')
            return
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }
        setIsSubmitting(true)
        try {
            const result = await resetPasswordMutation({ recoveryToken, newPassword })
            if (result?.token) {
                localStorage.setItem('cc_session_token', result.token)
            }
            setStep('done')
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to reset password.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (step === 'done') {
        return (
            <>
                <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Password reset!</h2>
                    <p className="text-sm text-slate-400">
                        Your password has been updated and all previous sessions have been invalidated.
                    </p>
                </div>
                <div className="mt-6 flex gap-3 justify-center">
                    <Button onClick={() => navigate({ to: '/auth/login' })}>
                        Sign in with new password
                    </Button>
                </div>
            </>
        )
    }

    if (step === 'reset') {
        return (
            <>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">Set new password</h2>
                    <p className="text-sm text-slate-400 mt-1">Enter the recovery token and your new password</p>
                </div>

                {recoveryToken && (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-2.5 text-sm text-cyan-300 mb-4">
                        <p className="text-xs text-slate-400 mb-1">Recovery token (OSS mode — auto-filled):</p>
                        <code className="text-xs break-all">{recoveryToken}</code>
                    </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                    {!recoveryToken && (
                        <div className="space-y-1.5">
                            <label htmlFor="token" className="block text-sm font-medium text-slate-300">Recovery Token</label>
                            <Input
                                id="token"
                                type="text"
                                placeholder="recovery_..."
                                value={recoveryToken}
                                onChange={(e) => setRecoveryToken(e.target.value)}
                                required
                                className="w-full font-mono text-xs"
                            />
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300">New Password</label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        <KeyRound className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Resetting…' : 'Reset password'}
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => { setStep('email'); setError(null) }}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Start over
                    </button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Reset password</h2>
                <p className="text-sm text-slate-400 mt-1">Enter your email to receive a recovery token</p>
            </div>

            <form onSubmit={handleRequestRecovery} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                    />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Mail className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Sending…' : 'Send recovery token'}
                </Button>
            </form>

            <div className="mt-4 text-center">
                <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to sign in
                </Link>
            </div>
        </>
    )
}
