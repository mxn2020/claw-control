import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Network, Activity, Key, Save, AlertTriangle } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/org/siem')({ component: OrgSIEMPage })

function OrgSIEMPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Network className="w-6 h-6 text-cyan-400" />
                        SIEM Integration
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Stream audit logs and security events directly to your Security Information and Event Management platform</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> Active
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Streaming Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Target Provider</label>
                                <select className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded p-2 focus:border-cyan-500 outline-none">
                                    <option value="datadog">Datadog</option>
                                    <option value="splunk" selected>Splunk HEC (HTTP Event Collector)</option>
                                    <option value="elastic">Elasticsearch</option>
                                    <option value="aws_cloudwatch">AWS CloudWatch</option>
                                    <option value="custom_webhook">Custom Webhook</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300">Endpoint URL</label>
                                <input type="text" defaultValue="https://http-inputs-clawcontrol.splunkcloud.com/services/collector/event" className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded px-3 py-2 focus:border-cyan-500 outline-none font-mono" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                                    <Key className="w-3 h-3 text-emerald-400" /> Authentication Token
                                </label>
                                <input type="password" defaultValue="••••••••••••••••••••••••••••••••" className="w-full bg-slate-900 border border-slate-700 text-sm text-white rounded px-3 py-2 focus:border-cyan-500 outline-none font-mono" />
                            </div>

                            <div className="pt-2">
                                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center">
                                    <Save className="w-4 h-4" /> Update Streaming Config
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Event Filter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-400 mb-4">Select the event categories to stream. High-frequency events may incur higher costs downstream.</p>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-slate-800 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-800/80 transition-colors">
                                    <input type="checkbox" defaultChecked className="text-cyan-500 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500 focus:ring-offset-slate-900 w-4 h-4" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Authentication & Access Control</p>
                                        <p className="text-xs text-slate-500">Logins, failed attempts, role changes, API key issuance</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-slate-800 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-800/80 transition-colors">
                                    <input type="checkbox" defaultChecked className="text-cyan-500 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500 focus:ring-offset-slate-900 w-4 h-4" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Configuration Drift</p>
                                        <p className="text-xs text-slate-500">Modifications to instance policies, tool allowances, agent personality</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-slate-800 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-800/80 transition-colors">
                                    <input type="checkbox" defaultChecked className="text-cyan-500 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500 focus:ring-offset-slate-900 w-4 h-4" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Tool Executions (High Volume)</p>
                                        <p className="text-xs text-slate-500 font-mono">resourceType === 'tool'</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-slate-800 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-800/80 transition-colors">
                                    <input type="checkbox" className="text-cyan-500 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500 focus:ring-offset-slate-900 w-4 h-4" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Raw Message Traces (Extreme Volume)</p>
                                        <p className="text-xs text-slate-500">Every message exchanged in active sessions</p>
                                    </div>
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-400" />
                                <CardTitle>Stream Health</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">Status</p>
                                    <p className="text-sm text-emerald-400 font-medium">Healthy</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">Latency</p>
                                    <p className="text-sm text-white font-medium">~120ms</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">Last Delivery</p>
                                    <p className="text-sm text-white font-medium">Just now</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-1">24h Volume</p>
                                    <p className="text-sm text-white font-medium">14,204 Events</p>
                                </div>

                                <div className="pt-4 border-t border-slate-800 mt-2">
                                    <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium w-full text-center">
                                        View Delivery Logs
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
                        <div className="text-xs text-slate-300">
                            <strong className="text-orange-400 font-medium block mb-1">Payload Sanitization</strong>
                            SIEM payloads strip sensitive agent outputs and secret references automatically. For strict PII masking, configure a middleware processor before ingestion.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
