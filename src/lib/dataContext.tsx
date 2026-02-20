import { createContext, useContext } from 'react'
import type { Doc } from '../../convex/_generated/dataModel'

// The shape of all app data — fed by Convex queries
export interface AppData {
  instances: Doc<"instances">[] | undefined
  agents: Doc<"agents">[] | undefined
  tasks: Doc<"tasks">[] | undefined
  canvases: Doc<"canvases">[] | undefined
  cronJobs: Doc<"cronJobs">[] | undefined
  approvals: Doc<"approvals">[] | undefined
  usageRecords: Doc<"usageRecords">[] | undefined
  discoverItems: Doc<"discoverItems">[] | undefined
  browserSessions: Doc<"browserSessions">[] | undefined
  sessions: Doc<"sessions">[] | undefined
  nodes: Doc<"nodes">[] | undefined
  memoryFiles: Doc<"memoryFiles">[] | undefined
  voiceSettings: Doc<"voiceSettings"> | null | undefined
}

export const DataContext = createContext<AppData | null>(null)

export function useDataContext(): AppData | null {
  return useContext(DataContext)
}
