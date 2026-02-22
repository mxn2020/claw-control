import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '#/components/ui/card'
import { Network, ArrowRight, BrainCircuit, Users, Server, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'

export const Route = createFileRoute('/_dashboard/swarms/new')({ component: NewSwarmWizard })

function NewSwarmWizard() {
    const { user } = useAuth()
    const orgId = user?.orgId as any
    const navigate = useNavigate()

    const createSwarm = useMutation(api.swarms.create)

    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [tier, setTier] = useState<"micro" | "meso" | "macro" | "mega">("micro")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCreate = async () => {
        if (!orgId || !name) return
        setIsSubmitting(true)
        try {
            const newSwarmId = await createSwarm({ orgId, name, tier })
            navigate({ to: `/swarms/${newSwarmId}/topology` })
        } catch (err) {
            console.error(err)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mt-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Network className="w-6 h-6 text-cyan-400" />
                        Create Swarm
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Configure your new multi-agent cluster</p>
                </div>
            </div>

            <div className="flex gap-2 mb-8">
                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-cyan-500' : 'bg-slate-800'}`}></div>
                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-cyan-500' : 'bg-slate-800'}`}></div>
            </div>

            <Card>
                {step === 1 && (
                    <>
                        <CardHeader>
                            <CardTitle>Basic Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Swarm Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="e.g. Incident Response Delta"
                                    className="w-full bg-slate-900 border border-slate-700 p-3 text-white rounded-lg focus:border-cyan-500 outline-none"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300">Target Scale (Tier)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { val: "micro", label: "Micro", desc: "2-10 agents", icon: <Users className="w-5 h-5" /> },
                                        { val: "meso", label: "Meso", desc: "11-100 agents", icon: <BrainCircuit className="w-5 h-5" /> },
                                        { val: "macro", label: "Macro", desc: "101-1,000 agents", icon: <Server className="w-5 h-5" /> },
                                        { val: "mega", label: "Mega", desc: "1,001+ agents", icon: <Network className="w-5 h-5" /> },
                                    ].map(t => (
                                        <label
                                            key={t.val}
                                            className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${tier === t.val
                                                    ? 'bg-cyan-950/30 border-cyan-500'
                                                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="tier"
                                                checked={tier === t.val}
                                                onChange={() => setTier(t.val as any)}
                                                className="hidden"
                                            />
                                            <div className={`mt-0.5 ${tier === t.val ? 'text-cyan-400' : 'text-slate-500'}`}>
                                                {t.icon}
                                            </div>
                                            <div>
                                                <div className={`font-medium ${tier === t.val ? 'text-white' : 'text-slate-300'}`}>{t.label} Tier</div>
                                                <div className="text-xs text-slate-500 mt-0.5">Scale: {t.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t border-slate-800 pt-6">
                            <button
                                onClick={() => setStep(2)}
                                disabled={!name.trim()}
                                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        </CardFooter>
                    </>
                )}

                {step === 2 && (
                    <>
                        <CardHeader>
                            <CardTitle>Topology & Agents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-6 border border-slate-800 border-dashed rounded-xl bg-slate-900/30 text-center">
                                <AlertCircle className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                                <h3 className="text-lg font-medium text-white mb-2">Configure in Topology Editor</h3>
                                <p className="text-sm text-slate-400 max-w-md mx-auto">
                                    Once created, you will be redirected to the interactive Canvas where you can drag and drop agents, connect channels, and define the swarm architecture.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-slate-800 pt-6">
                            <button
                                onClick={() => setStep(1)}
                                className="text-slate-400 hover:text-white px-4 py-2 font-medium transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                {isSubmitting ? 'Provisioning...' : 'Complete & Open Editor'}
                            </button>
                        </CardFooter>
                    </>
                )}
            </Card>
        </div>
    )
}
