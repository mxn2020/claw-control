import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { ClipboardList, Shield, User, Clock, Search } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/org/audit')({ component: OrgAuditPage })

function OrgAuditPage() {
    const { user } = useAuth()
    const orgId = user?.orgId as any

    // Use the platform query since it lists audit logs
    const rawLogs = useQuery(api.platform.listAuditLogs, orgId ? { orgId } : "skip")
    const members = useQuery(api.organizations.listMembers, orgId ? { orgId } : "skip")
    const [searchTerm, setSearchTerm] = useState('')

    if (!orgId) return <div className="p-8 text-slate-400">Loading...</div>

    // Create lookup for user names
    const userLookup = new Map(members?.map(m => [m.userId, m.name]))

    const logs = rawLogs?.filter(log =>
        !searchTerm ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resourceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-cyan-400" />
                        Audit Log
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Immutable record of all organization activity and config changes</p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-slate-300">Activity Stream</CardTitle>
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="bg-slate-900 border border-slate-700 pl-9 pr-3 py-2 text-sm text-white rounded-lg focus:border-cyan-500 outline-none w-64"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-800/50">
                        {logs?.map(log => (
                            <div key={log._id} className="p-4 hover:bg-slate-800/30 transition-colors flex gap-4">
                                <div className="mt-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-slate-200">
                                            {log.action} <span className="text-slate-500 font-normal">on</span> {log.resourceType}
                                        </p>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(log.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    {log.details && (
                                        <p className="text-xs text-slate-400 mt-1.5 bg-slate-900 border border-slate-800 p-2 rounded truncate max-w-full">
                                            {log.details}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" />
                                            {log.userId ? (userLookup.get(log.userId) || 'Unknown User') : 'System'}
                                        </div>
                                        {log.resourceId && (
                                            <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                                                id: {log.resourceId}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {logs?.length === 0 && (
                            <div className="py-12 text-center text-slate-500">
                                <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-20 text-slate-400" />
                                <p>No activity logs found.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
