import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/_auth/auth/recovery')({
    component: RecoveryPage,
})

function RecoveryPage() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // OSS placeholder — self-hosted setups configure their own SMTP
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <>
                <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
                    <p className="text-sm text-slate-400">
                        If an account exists for <span className="text-slate-300">{email}</span>, you'll
                        receive a recovery link shortly.
                    </p>
                    <p className="text-xs text-slate-500 mt-3">
                        For self-hosted OSS instances, configure <code className="text-slate-400">SMTP_*</code> environment variables to enable password recovery emails.
                    </p>
                </div>
                <div className="mt-6 text-center">
                    <Link
                        to="/auth/login"
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to sign in
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Reset password</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Enter your email and we'll send a recovery link
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                        Email
                    </label>
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

                <Button type="submit" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send recovery link
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
