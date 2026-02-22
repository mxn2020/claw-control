import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Users2, Plus, Trash2, FolderPlus, UserPlus, X, Loader2 } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'
import type { Id } from '../../../../convex/_generated/dataModel'

export const Route = createFileRoute('/_dashboard/org/teams')({ component: OrgTeamsPage })

function OrgTeamsPage() {
    const { user, token } = useAuth()
    const orgId = user?.orgId as Id<"organizations"> | undefined

    const teams = useQuery(api.teams.list, orgId ? { orgId } : "skip")
    const createTeam = useMutation(api.teams.create)
    const removeTeam = useMutation(api.teams.remove)

    const [isCreating, setIsCreating] = useState(false)
    const [newTeamName, setNewTeamName] = useState("")
    const [newTeamDesc, setNewTeamDesc] = useState("")
    const [expandedTeam, setExpandedTeam] = useState<string | null>(null)

    const handleCreate = async () => {
        if (!newTeamName.trim() || !orgId) return
        await createTeam({ orgId, name: newTeamName, description: newTeamDesc, token } as any)
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
                    <div key={team._id} className="flex flex-col">
                        <Card className="flex flex-col flex-1">
                            <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 relative">
                                <div>
                                    <CardTitle className="text-base text-white">{team.name}</CardTitle>
                                    <p className="text-xs text-slate-400 mt-1">{team.description || "No description"}</p>
                                </div>
                                <button
                                    onClick={() => removeTeam({ teamId: team._id, token } as any)}
                                    className="text-slate-500 hover:text-red-400 transition-colors absolute top-4 right-4"
                                    title="Delete team"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </CardHeader>
                            <CardContent className="pt-4 flex-1 flex flex-col justify-end">
                                <div className="flex items-center justify-between text-sm text-slate-400 border-t border-slate-800 pt-4 mt-auto">
                                    <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
                                    <button
                                        onClick={() => setExpandedTeam(expandedTeam === team._id ? null : team._id)}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                    >
                                        {expandedTeam === team._id ? 'Close' : 'Manage Members →'}
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {expandedTeam === team._id && (
                            <TeamMembersPanel teamId={team._id} orgId={orgId} token={token} />
                        )}
                    </div>
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

function TeamMembersPanel({ teamId, orgId, token }: { teamId: Id<"teams">; orgId: Id<"organizations">; token?: string }) {
    const members = useQuery(api.teams.getTeamMembers, { teamId, token } as any)
    const orgMembers = useQuery(api.organizations.listMembers, { orgId })
    const addMember = useMutation(api.teams.addMember)
    const removeMember = useMutation(api.teams.removeMember)

    const [addingUserId, setAddingUserId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Filter out members already in the team
    const memberUserIds = new Set(members?.map(m => m.userId) ?? [])
    const availableMembers = orgMembers?.filter(m => !memberUserIds.has(m.userId)) ?? []

    async function handleAdd() {
        if (!addingUserId) return
        setLoading(true)
        setError(null)
        try {
            await addMember({ orgId, teamId, userId: addingUserId, token } as any)
            setAddingUserId("")
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add member')
        } finally {
            setLoading(false)
        }
    }

    async function handleRemove(membershipId: Id<"teamMembers">) {
        try {
            await removeMember({ membershipId, token } as any)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Card className="mt-2 border-cyan-500/20 bg-cyan-950/5">
            <CardContent className="pt-4 space-y-4">
                <h4 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                    <Users2 className="w-4 h-4" /> Team Members
                </h4>

                {/* Add member row */}
                <div className="flex gap-2 items-center">
                    <select
                        value={addingUserId}
                        onChange={(e) => setAddingUserId(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    >
                        <option value="">Select member to add...</option>
                        {availableMembers.map(m => (
                            <option key={m.userId} value={m.userId}>{m.name} ({m.email})</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAdd}
                        disabled={!addingUserId || loading}
                        className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                    >
                        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                        Add
                    </button>
                </div>

                {error && (
                    <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded px-2 py-1.5">{error}</div>
                )}

                {/* Member list */}
                <div className="space-y-1">
                    {members?.length === 0 && (
                        <p className="text-xs text-slate-500 py-2 text-center">No members yet</p>
                    )}
                    {members?.map(m => (
                        <div key={m.id} className="flex items-center justify-between py-2 px-3 rounded bg-slate-900/50 border border-slate-800/50 group">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-medium">
                                    {m.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <span className="text-sm text-white">{m.name}</span>
                                    <span className="text-xs text-slate-500 ml-2">{m.email}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(m.id)}
                                className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                title="Remove from team"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
