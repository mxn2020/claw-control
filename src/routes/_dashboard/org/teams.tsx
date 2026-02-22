import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Users2, Plus, Trash2, FolderPlus } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/org/teams')({ component: OrgTeamsPage })

function OrgTeamsPage() {
    const { user } = useAuth()
    const orgId = user?.orgId as any

    const teams = useQuery(api.teams.list, orgId ? { orgId } : "skip")
    const createTeam = useMutation(api.teams.create)
    const removeTeam = useMutation(api.teams.remove)

    const [isCreating, setIsCreating] = useState(false)
    const [newTeamName, setNewTeamName] = useState("")
    const [newTeamDesc, setNewTeamDesc] = useState("")

    const handleCreate = async () => {
        if (!newTeamName.trim() || !orgId) return
        await createTeam({ orgId, name: newTeamName, description: newTeamDesc })
        setIsCreating(false)
        setNewTeamName("")
        setNewTeamDesc("")
    }

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users2 className="w-6 h-6 text-cyan-400" />
                        Teams
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Group members into teams for easier access management</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    {isCreating ? "Cancel" : <><Plus className="w-4 h-4" /> Create Team</>}
                </button>
            </div>

            {isCreating && (
                <Card className="border-cyan-500/30 bg-cyan-950/10 mb-6">
                    <CardHeader>
                        <CardTitle className="text-base text-cyan-400">Create New Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3 items-end">
                            <div className="space-y-1.5 flex-1 max-w-sm">
                                <label className="text-xs text-slate-400">Team Name</label>
                                <input type="text" placeholder="e.g. Engineering" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                            </div>
                            <div className="space-y-1.5 flex-1 max-w-sm">
                                <label className="text-xs text-slate-400">Description (optional)</label>
                                <input type="text" placeholder="Handles infrastructure" value={newTeamDesc} onChange={e => setNewTeamDesc(e.target.value)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                            </div>
                            <button
                                onClick={handleCreate}
                                disabled={!newTeamName.trim()}
                                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium transition-colors h-[38px]"
                            >
                                Create
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams?.map(team => (
                    <Card key={team._id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 relative">
                            <div>
                                <CardTitle className="text-base text-white">{team.name}</CardTitle>
                                <p className="text-xs text-slate-400 mt-1">{team.description || "No description"}</p>
                            </div>
                            <button
                                onClick={() => removeTeam({ teamId: team._id })}
                                className="text-slate-500 hover:text-red-400 transition-colors absolute top-4 right-4"
                                title="Delete team"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </CardHeader>
                        <CardContent className="pt-4 flex-1 flex flex-col justify-end">
                            <div className="flex items-center justify-between text-sm text-slate-400 border-t border-slate-800 pt-4 mt-auto">
                                <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
                                <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                                    Manage Members →
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {teams?.length === 0 && !isCreating && (
                    <div className="col-span-full py-12 text-center text-slate-500 border border-slate-800 rounded-xl border-dashed">
                        <FolderPlus className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p>No teams created yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
