import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Users, UserPlus, Trash2, Mail } from 'lucide-react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/org/members')({ component: OrgMembersPage })

function OrgMembersPage() {
    const { user, token } = useAuth()
    const orgId = user?.orgId as any

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convexApi = api as Record<string, any>

    const membersQuery = useQuery(convexApi.orgs?.getMembers ?? null, orgId && token ? { orgId, token } : "skip")
    const updateRole = useMutation(convexApi.orgs?.updateMemberRole ?? null)
    const removeMember = useMutation(convexApi.orgs?.removeMember ?? null)
    const inviteMember = useMutation(convexApi.orgs?.inviteMember ?? null)

    const [isInviting, setIsInviting] = useState(false)
    const [inviteEmail, setInviteEmail] = useState("")
    const [inviteRole, setInviteRole] = useState<"owner" | "admin" | "member" | "viewer">("member")
    const [inviteError, setInviteError] = useState("")

    const members = membersQuery ?? []

    const handleInvite = async () => {
        if (!token) return
        setInviteError("")
        try {
            await inviteMember({ orgId, token, email: inviteEmail, role: inviteRole })
            setIsInviting(false)
            setInviteEmail("")
        } catch (err: any) {
            setInviteError(err.message)
        }
    }

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-cyan-400" />
                        Members & RBAC
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Manage organization members and role-based access</p>
                </div>
                <button
                    onClick={() => setIsInviting(!isInviting)}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    {isInviting ? "Cancel" : <><UserPlus className="w-4 h-4" /> Invite Member</>}
                </button>
            </div>

            {isInviting && (
                <Card className="border-cyan-500/30 bg-cyan-950/10 mb-6">
                    <CardHeader>
                        <CardTitle className="text-base text-cyan-400">Invite New Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {inviteError && <p className="text-red-400 text-sm mb-4 bg-red-500/10 p-2 rounded">{inviteError}</p>}
                        <div className="flex gap-3 items-end">
                            <div className="space-y-1.5 flex-1 max-w-sm">
                                <label className="text-xs text-slate-400">Email Address (must be registered)</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                    <input type="email" placeholder="colleague@example.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-700 pl-9 pr-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1.5 w-40">
                                <label className="text-xs text-slate-400">Role</label>
                                <select value={inviteRole} onChange={e => setInviteRole(e.target.value as any)} className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white rounded focus:border-cyan-500 outline-none">
                                    <option value="viewer">Viewer</option>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                    <option value="owner">Owner</option>
                                </select>
                            </div>
                            <button
                                onClick={handleInvite}
                                disabled={!inviteEmail}
                                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium transition-colors h-[38px]"
                            >
                                Send Invite
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-3 font-medium">User</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Joined</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {members.map((member: any) => (
                                <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-200">{member.name}</div>
                                        <div className="text-xs text-slate-500">{member.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={member.role}
                                            onChange={(e) => updateRole({ orgId, token: token!, memberId: member.id, newRole: e.target.value as any })}
                                            disabled={member.userId === user?.id} // Don't let users change their own role here
                                            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 outline-none focus:border-cyan-500"
                                        >
                                            <option value="viewer">Viewer</option>
                                            <option value="member">Member</option>
                                            <option value="admin">Admin</option>
                                            <option value="owner">Owner</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-xs">
                                        {new Date(member.joinedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => removeMember({ orgId, token: token!, memberId: member.id })}
                                            disabled={member.userId === user?.id}
                                            className="text-slate-500 hover:text-red-400 disabled:opacity-20 transition-colors"
                                            title="Remove member"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {members.length === 0 && (
                        <div className="py-12 text-center text-slate-500">No members found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
