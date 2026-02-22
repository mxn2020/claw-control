import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Network, Bot, Activity, BrainCircuit } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useAuth } from '#/lib/authContext'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export const Route = createFileRoute('/_dashboard/swarms/$swarmId/topology')({
  component: SwarmTopology,
})

// Custom Agent Node
const AgentNode = ({ data }: any) => {
  return (
    <div className="bg-slate-900 border border-slate-700 shadow-xl rounded-xl p-3 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-3 !h-3 !border-slate-900" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${data.isController ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
          {data.isController ? <BrainCircuit className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>
        <div>
          <div className="text-sm font-bold text-white">{data.label}</div>
          <div className="text-xs text-slate-400 font-mono">{data.model || 'Base Template'}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-3 !h-3 !border-slate-900" />
    </div>
  )
}

const nodeTypes = {
  agent: AgentNode,
}

function SwarmTopology() {
  const { swarmId } = Route.useParams()
  const { user } = useAuth()
  const orgId = user?.orgId as any

  const swarm = useQuery(api.swarms.get, { id: swarmId as any })
  const allAgents = useQuery(api.agents.list, orgId ? { orgId } : "skip")

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([])

  const memberAgents = useMemo(() => {
    return (allAgents ?? []).filter((agent) => swarm?.agentIds?.includes(agent._id))
  }, [allAgents, swarm])

  // Build topology
  useEffect(() => {
    if (!swarm) return

    const newNodes: any[] = []
    const newEdges: any[] = []

    // Always have a controller node
    newNodes.push({
      id: 'controller',
      type: 'agent',
      position: { x: 250, y: 50 },
      data: { label: swarm.name, isController: true, model: `Tier: ${swarm.tier}` }
    })

    if (memberAgents.length === 0) {
      // Add some mock nodes just so the canvas isn't empty if testing
      newNodes.push({
        id: 'mock-1',
        type: 'agent',
        position: { x: 100, y: 200 },
        data: { label: 'Scout Agent', model: 'gpt-4o-mini' }
      })
      newNodes.push({
        id: 'mock-2',
        type: 'agent',
        position: { x: 400, y: 200 },
        data: { label: 'Analysis Worker', model: 'claude-3-5-sonnet' }
      })

      newEdges.push({
        id: 'e-c-m1',
        source: 'controller',
        target: 'mock-1',
        animated: true,
        style: { stroke: '#06b6d4', strokeWidth: 2 },
      })
      newEdges.push({
        id: 'e-c-m2',
        source: 'controller',
        target: 'mock-2',
        animated: true,
        style: { stroke: '#06b6d4', strokeWidth: 2 },
      })
    } else {
      // Layout real agents
      const startX = 50;
      const xSpacing = 280;
      memberAgents.forEach((agent, index) => {
        const nodeId = `agent-${agent._id}`
        newNodes.push({
          id: nodeId,
          type: 'agent',
          position: { x: startX + (index * xSpacing), y: 250 },
          data: { label: agent.name, model: agent.model }
        })

        newEdges.push({
          id: `e-c-${nodeId}`,
          source: 'controller',
          target: nodeId,
          animated: true,
          style: { stroke: '#06b6d4', strokeWidth: 2 },
        })
      })
    }

    setNodes(newNodes)
    setEdges(newEdges)
  }, [swarm, memberAgents, setNodes, setEdges])

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[800px]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Network className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              Swarm Topology
              <Badge variant={swarm?.status === 'active' ? 'success' : 'default'} className="uppercase">
                {swarm?.status || 'Loading...'}
              </Badge>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Interactive structural map of {swarm?.name ?? 'Swarm'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-[600px]">
        {/* Visual Canvas */}
        <Card className="xl:col-span-3 flex flex-col border-slate-800 bg-slate-900/50 overflow-hidden">
          <CardHeader className="pb-3 border-b border-slate-800/50 bg-slate-900 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2 text-slate-200">
              <Activity className="w-4 h-4 text-cyan-400" /> Live Data Flow
            </CardTitle>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Real-time visualization active
            </div>
          </CardHeader>
          <div className="flex-1 w-full h-[500px] relative bg-[#0f172a]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              className="dark"
              colorMode="dark"
            >
              <Background color="#1e293b" gap={16} />
              <Controls className="bg-slate-800 border-slate-700 fill-white" />
            </ReactFlow>
          </div>
        </Card>

        {/* Agents Info Side Panel */}
        <Card className="flex flex-col border-slate-800 bg-slate-900/50">
          <CardHeader className="pb-3 border-b border-slate-800/50 bg-slate-900">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-base text-slate-200">Swarm Agents</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto">
            {memberAgents.length > 0 ? (
              <div className="divide-y divide-slate-800/50">
                {memberAgents.map((agent) => (
                  <div key={agent._id} className="p-4 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-sm text-white">{agent.name}</div>
                      <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>{agent.status}</Badge>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mb-2">{agent.model}</div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/30">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Usage</div>
                        <div className="text-xs font-medium text-slate-300">{(agent.totalTokens || 0).toLocaleString()} tokt</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Sessions</div>
                        <div className="text-xs font-medium text-slate-300">{agent.sessionCount} active</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Bot className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-sm">No specific agents assigned to this swarm yet.</p>
                <p className="text-xs mt-2 text-slate-600">Drag and drop agents onto the canvas to add them.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
