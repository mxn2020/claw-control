import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '#/lib/authContext'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { UserPlus, Eye, EyeOff } from 'lucide-react'

export const Route = createFileRoute('/_auth/auth/register')({
    component: RegisterPage,
})

function RegisterPage() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsSubmitting(true)
        try {
            await register(name, email, password)
            await navigate({ to: '/home' })
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Create account</h2>
                <p className="text-sm text-slate-400 mt-1">Set up your ClawControl instance</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                        Full name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full"
                    />
                </div>

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

                <div className="space-y-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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

                <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                        Confirm password
                    </label>
                    <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Creating account…' : 'Create account'}
                </Button>
            </form>

            <div className="mt-4 text-center text-sm">
                <span className="text-slate-400">Already have an account? </span>
                <Link
                    to="/auth/login"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                    Sign in
                </Link>
            </div>
        </>
    )
}
