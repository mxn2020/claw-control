import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { FileCheck, Download, Server, Clock, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/org/compliance')({ component: OrgCompliancePage })

function OrgCompliancePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileCheck className="w-6 h-6 text-cyan-400" />
                        Compliance & Data
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Manage data residency, retention policies, and compliance exports</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Server className="w-5 h-5 text-cyan-400" />
                            <CardTitle>Data Residency</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <p className="text-sm text-slate-400">Choose the primary region where your organization's data at rest is stored.</p>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-3 border border-cyan-500/50 bg-cyan-950/10 rounded-lg cursor-pointer">
                                <input type="radio" name="residency" defaultChecked className="text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 focus:ring-offset-slate-900" />
                                <div>
                                    <p className="text-sm font-medium text-white">United States (US East)</p>
                                    <p className="text-xs text-slate-400">Default global region</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-slate-800 hover:border-slate-700 bg-slate-900/50 rounded-lg cursor-pointer transition-colors">
                                <input type="radio" name="residency" className="text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500 focus:ring-offset-slate-900" />
                                <div>
                                    <p className="text-sm font-medium text-white">European Union (Frankfurt)</p>
                                    <p className="text-xs text-slate-400">GDPR hardened cluster</p>
                                </div>
                            </label>
                        </div>
                        <button className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full">
                            Request Region Migration
                        </button>
                        <p className="text-xs text-orange-400 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Migration may involve temporary downtime.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-400" />
                            <CardTitle>Data Retention</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <p className="text-sm text-slate-400">Configure how long audit logs and session memory are retained before automated destruction.</p>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Audit Log Retention</label>
                                <select className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded p-2 focus:border-cyan-500 outline-none">
                                    <option value="30">30 Days</option>
                                    <option value="90">90 Days</option>
                                    <option value="365" selected>1 Year</option>
                                    <option value="forever">Indefinite (Extra charges apply)</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Session Trace & Telemetry Retention</label>
                                <select className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded p-2 focus:border-cyan-500 outline-none">
                                    <option value="7">7 Days</option>
                                    <option value="14">14 Days</option>
                                    <option value="30" selected>30 Days</option>
                                    <option value="90">90 Days</option>
                                </select>
                            </div>
                        </div>

                        <button className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full mt-2">
                            Save Retention Policies
                        </button>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Download className="w-5 h-5 text-purple-400" />
                            <CardTitle>Compliance Exports & Takeout</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                            <div className="mb-4 md:mb-0">
                                <h4 className="text-sm font-medium text-white mb-1">Full Organization Export</h4>
                                <p className="text-xs text-slate-400 max-w-lg">Generate a comprehensive, cryptographically signed JSON/CSV archive containing all org data, members, session traces, and audit logs.</p>
                            </div>
                            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-medium transition-colors shrink-0">
                                <Download className="w-4 h-4" /> Start Export Job
                            </button>
                        </div>

                        <div className="mt-6">
                            <h5 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Recent Exports</h5>
                            <div className="text-sm text-slate-400 italic">No recent exports found.</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
