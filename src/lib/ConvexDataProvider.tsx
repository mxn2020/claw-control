import type { ReactNode } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { DataContext } from './dataContext'
import {
  mockInstances,
  mockAgents,
  mockTasks,
  mockCanvases,
  mockCronJobs,
  mockApprovals,
  mockUsageRecords,
  mockDiscoverItems,
  mockBrowserSessions,
  mockNodes,
  mockMemoryFiles,
  mockVoiceSettings,
} from './mockData'
import type { AppData } from './dataContext'

/**
 * ConvexDataProvider — subscribes to all Convex queries and exposes results
 * via DataContext. Falls back to mock data while Convex results are loading.
 *
 * Must be rendered inside a <ConvexProvider>.
 */
export function ConvexDataProvider({ children }: { children: ReactNode }) {
  const instances = useQuery(api.instances.list, {})
  const agents = useQuery(api.agents.list, {})
  const tasks = useQuery(api.tasks.list, {})
  const canvases = useQuery(api.canvases.list, {})
  const cronJobs = useQuery(api.cronJobs.list, {})
  const approvals = useQuery(api.approvals.list, {})
  const usageRecords = useQuery(api.usage.list, {})
  const discoverItems = useQuery(api.discover.list, {})
  const browserSessions = useQuery(api.browserSessions.list, {})
  const nodes = useQuery(api.nodes.list, {})
  const memoryFiles = useQuery(api.memoryFiles.list, {})
  const voiceSettings = useQuery(api.voiceSettings.getByUser, { userId: 'user_demo' })

  const value: AppData = {
    // Use Convex results when available, fall back to mock data while loading
    instances: (instances as AppData['instances'] | undefined) ?? mockInstances,
    agents: (agents as AppData['agents'] | undefined) ?? mockAgents,
    tasks: (tasks as AppData['tasks'] | undefined) ?? mockTasks,
    canvases: (canvases as AppData['canvases'] | undefined) ?? mockCanvases,
    cronJobs: (cronJobs as AppData['cronJobs'] | undefined) ?? mockCronJobs,
    approvals: (approvals as AppData['approvals'] | undefined) ?? mockApprovals,
    usageRecords: (usageRecords as AppData['usageRecords'] | undefined) ?? mockUsageRecords,
    discoverItems: (discoverItems as AppData['discoverItems'] | undefined) ?? mockDiscoverItems,
    browserSessions: (browserSessions as AppData['browserSessions'] | undefined) ?? mockBrowserSessions,
    nodes: (nodes as AppData['nodes'] | undefined) ?? mockNodes,
    memoryFiles: (memoryFiles as AppData['memoryFiles'] | undefined) ?? mockMemoryFiles,
    voiceSettings: (voiceSettings as AppData['voiceSettings'] | null | undefined) ?? mockVoiceSettings,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
