import type { ReactNode } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { DataContext } from './dataContext'
import type { AppData } from './dataContext'
import { useAuth } from './authContext'

/**
 * ConvexDataProvider — subscribes to all Convex queries and exposes results
 * via DataContext.
 *
 * Must be rendered inside a <ConvexProvider> and <AuthProvider>.
 */
export function ConvexDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id

  const instances = useQuery(api.instances.list, {})
  const agents = useQuery(api.agents.list, {})
  const tasks = useQuery(api.tasks.list, {})
  const canvases = useQuery(api.canvases.list, {})
  const cronJobs = useQuery(api.cronJobs.list, {})
  const approvals = useQuery(api.approvals.list, {})
  const usageRecords = useQuery(api.usage.list, {})
  const discoverItems = useQuery(api.discover.list, {})
  const browserSessions = useQuery(api.browserSessions.list, {})
  const sessions = useQuery(api.sessions.list, {})
  const nodes = useQuery(api.nodes.list, {})
  const memoryFiles = useQuery(api.memoryFiles.list, {})
  const voiceSettings = useQuery(
    api.voiceSettings.getByUser,
    userId ? { userId } : 'skip'
  )

  const value: AppData = {
    instances,
    agents,
    tasks,
    canvases,
    cronJobs,
    approvals,
    usageRecords,
    discoverItems,
    browserSessions,
    sessions,
    nodes,
    memoryFiles,
    voiceSettings,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
